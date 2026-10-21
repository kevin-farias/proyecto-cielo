const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;
const DATA_FILE = path.join(__dirname, '.project-data', 'progress.json');
const ADMIN_PIN = process.env.ADMIN_PIN || '1234';

function readData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return { accounts: {}, adminSaves: [] }; }
}
function writeData(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(body));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) {
    if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }); return res.end(); }
    let raw = '';
    req.on('data', chunk => { raw += chunk; if (raw.length > 1_000_000) req.destroy(); });
    req.on('end', () => {
      let body = {};
      try { body = raw ? JSON.parse(raw) : {}; } catch { return sendJson(res, 400, { error: 'JSON inválido' }); }
      const data = readData();
      if (url.pathname === '/api/progress' && req.method === 'GET') {
        const account = String(url.searchParams.get('account') || 'explorador').slice(0, 48);
        return sendJson(res, 200, data.accounts?.[account] || (account === 'mateo' ? data.legacyProgress || legacyProgress(data) : null) || {});
      }
      if (url.pathname === '/api/progress' && req.method === 'POST') {
        const account = String(body.account || 'explorador').slice(0, 48);
        data.accounts ||= {};
        data.accounts[account] = body.progress || {};
        writeData(data);
        return sendJson(res, 200, { ok: true });
      }
      if (url.pathname === '/api/admin' && req.method === 'POST') {
        if (String(body.pin || '') !== ADMIN_PIN) return sendJson(res, 401, { error: 'PIN incorrecto' });
        data.adminSaves ||= [];
        if (body.action === 'save') {
          data.adminSaves.push({ createdAt: new Date().toISOString(), accounts: data.accounts || {} });
          writeData(data);
        } else if (body.action === 'restore') {
          const save = data.adminSaves[Number(body.index)];
          if (!save) return sendJson(res, 404, { error: 'Guardado no encontrado' });
          data.accounts = save.accounts;
          writeData(data);
        }
        return sendJson(res, 200, { ok: true, saves: data.adminSaves, accounts: data.accounts || {} });
      }
      return sendJson(res, 404, { error: 'Ruta API no encontrada' });
    });
    return;
  }
  let reqUrl = req.url === '/' ? '/index.html' : req.url;
  // Prevent path traversal
  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

function legacyProgress(data) {
  const { accounts, adminSaves, ...legacy } = data;
  return legacy;
}

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 SERVIDOR DE PROTOTIPO MÓVIL EN EJECUCIÓN`);
  console.log(`📱 Abrir en navegador: http://localhost:${PORT}`);
  console.log(`=================================================`);
});

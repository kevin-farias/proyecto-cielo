const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const PUBLIC_DIR = __dirname;
const PROGRESS_FILE = path.join(__dirname, '.project-data', 'progress.json');

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

// Lightweight LAN multiplayer relay. Rooms live only while this server process runs.
const rooms = new Map();
function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(body));
}
function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 200000) reject(new Error('Payload demasiado grande')); });
    req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch (err) { reject(err); } });
    req.on('error', reject);
  });
}
function cleanRooms() {
  const cutoff = Date.now() - 3 * 60 * 60 * 1000;
  for (const [code, room] of rooms) if (room.updatedAt < cutoff) rooms.delete(code);
}
async function handleApi(req, res, url) {
  cleanRooms();
  if (url.pathname === '/api/progress' && req.method === 'GET') {
    try {
      const progress = JSON.parse(await fs.promises.readFile(PROGRESS_FILE, 'utf8'));
      return sendJson(res, 200, progress);
    } catch (error) {
      if (error.code === 'ENOENT') return sendJson(res, 200, {});
      throw error;
    }
  }
  if (url.pathname === '/api/progress' && req.method === 'PUT') {
    const body = await readJson(req);
    const progress = {
      unlockedCreatures: Array.isArray(body.unlockedCreatures) ? body.unlockedCreatures.filter(id => typeof id === 'string') : [],
      creatureCopies: body.creatureCopies && typeof body.creatureCopies === 'object' ? body.creatureCopies : {},
      profileXP: Number.isFinite(Number(body.profileXP)) ? Math.max(0, Number(body.profileXP)) : 0,
      secretBattleWins: Number.isFinite(Number(body.secretBattleWins)) ? Math.max(0, Math.floor(Number(body.secretBattleWins))) : 0,
      secretRewardClaimed: Boolean(body.secretRewardClaimed),
      profileName: String(body.profileName || 'Explorador').slice(0, 24),
      speciesCodes: body.speciesCodes && typeof body.speciesCodes === 'object' ? body.speciesCodes : {},
      parkCheckedIn: Boolean(body.parkCheckedIn),
      parkEntryCode: /^\d{6}$/.test(String(body.parkEntryCode || '')) ? String(body.parkEntryCode) : ''
    };
    await fs.promises.mkdir(path.dirname(PROGRESS_FILE), { recursive: true });
    const tempFile = `${PROGRESS_FILE}.tmp`;
    await fs.promises.writeFile(tempFile, JSON.stringify(progress, null, 2), 'utf8');
    await fs.promises.rename(tempFile, PROGRESS_FILE);
    return sendJson(res, 200, { saved: true });
  }
  if (req.method === 'POST' && url.pathname === '/api/rooms') {
    const body = await readJson(req);
    const code = Math.random().toString(36).slice(2, 7).toUpperCase();
    rooms.set(code, { code, names: [String(body.name || 'Jugador 1').slice(0, 20), 'Jugador 2'], connected: [true, false], teams: [null, null], state: null, version: 0, updatedAt: Date.now() });
    return sendJson(res, 201, { code, player: 1 });
  }
  const match = url.pathname.match(/^\/api\/rooms\/([A-Z0-9]{5})(?:\/(team|state))?$/);
  if (!match) return false;
  const [, code, action] = match;
  const room = rooms.get(code);
  if (!room) return sendJson(res, 404, { error: 'No existe esa sala o ya venció.' });
  room.updatedAt = Date.now();
  if (req.method === 'POST' && !action) {
    if (room.connected[1]) return sendJson(res, 409, { error: 'La sala ya tiene dos jugadores.' });
    const body = await readJson(req);
    room.names[1] = String(body.name || 'Jugador 2').slice(0, 20);
    room.connected[1] = true;
    return sendJson(res, 200, { code, player: 2, names: room.names });
  }
  if (req.method === 'POST' && action === 'team') {
    const body = await readJson(req);
    const side = Number(body.player);
    if (![1, 2].includes(side) || !Array.isArray(body.team) || body.team.length !== 3 || body.team.some(k => typeof k !== 'string')) return sendJson(res, 400, { error: 'Equipo inválido.' });
    room.teams[side - 1] = body.team;
    return sendJson(res, 200, { teams: room.teams, names: room.names });
  }
  if (req.method === 'POST' && action === 'state') {
    const body = await readJson(req);
    if (!body.state || !room.teams[0] || !room.teams[1]) return sendJson(res, 409, { error: 'La partida todavía no está lista.' });
    room.state = body.state;
    room.version += 1;
    return sendJson(res, 200, { version: room.version });
  }
  if (req.method === 'GET' && action === 'state') return sendJson(res, 200, { teams: room.teams, names: room.names, state: room.state, version: room.version });
  return sendJson(res, 405, { error: 'Método no permitido.' });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) {
    handleApi(req, res, url).then(handled => {
      if (handled === false && !res.headersSent) sendJson(res, 404, { error: 'Ruta no encontrada.' });
    }).catch(() => { if (!res.headersSent) sendJson(res, 400, { error: 'Solicitud inválida.' }); });
    return;
  }
  let reqUrl = url.pathname === '/' ? '/index.html' : url.pathname;
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
      'Cache-Control': ['.html', '.js', '.css'].includes(ext) ? 'no-store' : 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(`🚀 SERVIDOR DE PROTOTIPO MÓVIL EN EJECUCIÓN`);
  console.log(`📱 Abrir en navegador: http://localhost:${PORT}`);
  const addresses = Object.values(os.networkInterfaces()).flat().filter(item => item && item.family === 'IPv4' && !item.internal).map(item => item.address);
  addresses.forEach(address => console.log(`📶 Red local: http://${address}:${PORT}`));
  console.log(`=================================================`);
});

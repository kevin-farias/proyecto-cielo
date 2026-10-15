/* ==========================================================================
   WAR IN HEAVEN / PROYECTO CIELO - INTERACTIVE PROTOTYPE JAVASCRIPT ENGINE
   ========================================================================== */

// CREATURE DATABASE (Stats, moves, and descriptions)
const CREATURE_DATABASE = {
  picaflor: {
    id: 'picaflor',
    name: 'Picaflor Cometa',
    icon: '🌸',
    badge: 'Polinizador Serrano',
    hp: 120,
    maxHp: 120,
    spd: 95,
    atk: 45,
    lvl: 12,
    habitat: 'Quebradas y Bosque Serrano',
    desc: 'Ave mítica de agilidad sorprendente que habita en las sierras cordobesas. Posee una cola iridiscente bífida y su polinización es indispensable para la flora autóctona.',
    moves: [
      { name: 'Picotazo Veloz', dmg: 35, uses: 5, maxUses: 5, text: '¡Picotazo certero!' },
      { name: 'Viento Serrano', dmg: 45, uses: 4, maxUses: 4, text: '¡Ráfaga de viento!' },
      { name: 'Tormenta Hojas', dmg: 60, uses: 2, maxUses: 2, text: '¡CRÍTICO DE HOJAS!' }
    ]
  },
  yaguarete: {
    id: 'yaguarete',
    name: 'Yaguareté',
    icon: '🐆',
    badge: 'Depredador Terciario',
    hp: 150,
    maxHp: 150,
    spd: 75,
    atk: 70,
    lvl: 15,
    habitat: 'Bosques Nativos de Córdoba',
    desc: 'El felino más grande de América. Es el apex predator de la red trófica local, vital para mantener el equilibrio poblacional de los herbívoros.',
    moves: [
      { name: 'Zarpazo Feroz', dmg: 45, uses: 5, maxUses: 5, text: '¡Impacto salvaje!' },
      { name: 'Mordisco Selvático', dmg: 55, uses: 4, maxUses: 4, text: '¡Mordisco devastador!' },
      { name: 'Garra Esmeralda', dmg: 70, uses: 2, maxUses: 2, text: '¡ATAQUE CRÍTICO FELINO!' }
    ]
  },
  pecari: {
    id: 'pecari',
    name: 'Pecarí de Collar',
    icon: '🐗',
    badge: 'Herbívoro Autóctono',
    hp: 135,
    maxHp: 135,
    spd: 60,
    atk: 50,
    lvl: 10,
    habitat: 'Monte y Matorrales',
    desc: 'Mamífero nativo gregario que vive en manadas. Se alimenta de frutos secos, raicillas y colabora dispersando semillas por el terreno.',
    moves: [
      { name: 'Embestida Serrana', dmg: 35, uses: 5, maxUses: 5, text: '¡Embestida de monte!' },
      { name: 'Pisotón Cobre', dmg: 45, uses: 4, maxUses: 4, text: '¡Pisotón contundente!' },
      { name: 'Furia Terrestre', dmg: 60, uses: 2, maxUses: 2, text: '¡DEMOLICIÓN SERRANA!' }
    ]
  },
  quebracho: {
    id: 'quebracho',
    name: 'Horco Quebracho',
    icon: '🌳',
    badge: 'Flora Insignia',
    hp: 200,
    maxHp: 200,
    spd: 20,
    atk: 30,
    lvl: 20,
    habitat: 'Bosque Serranos de Córdoba',
    desc: 'Especie vegetal insignia de la reserva natural con ejemplares milenarios de 100 a 400 años de edad que no forman bosques en ningún otro lugar.',
    moves: [
      { name: 'Raíz Milenaria', dmg: 30, uses: 5, maxUses: 5, text: '¡Golpe de raíz ancestral!' },
      { name: 'Látigo de Ramas', dmg: 40, uses: 4, maxUses: 4, text: '¡Azote de vegetación!' },
      { name: 'Espina Serrana', dmg: 55, uses: 2, maxUses: 2, text: '¡DEFENSA ESPINOSA!' }
    ]
  },
  buho: {
    id: 'buho',
    name: 'Búho Serrano',
    icon: '🦉',
    badge: 'Depredador Nocturno',
    hp: 125,
    maxHp: 125,
    spd: 85,
    atk: 55,
    lvl: 13,
    habitat: 'Algarrobales Nocturnos',
    desc: 'Depredador nocturno clave para el control biológico de roedores en las sierras. Gran visión térmica y vuelo silencioso.',
    moves: [
      { name: 'Ataque Silencioso', dmg: 40, uses: 5, maxUses: 5, text: '¡Sorpresa nocturna!' },
      { name: 'Garra Alada', dmg: 50, uses: 4, maxUses: 4, text: '¡Zarpazo aéreo!' },
      { name: 'Mirada Hipnótica', dmg: 65, uses: 2, maxUses: 2, text: '¡GOLPE DE SOMBRAS!' }
    ]
  },
  zorro: {
    id: 'zorro',
    name: 'Zorro Gris',
    icon: '🦊',
    badge: 'Carnívoro Ágil',
    hp: 130,
    maxHp: 130,
    spd: 90,
    atk: 50,
    lvl: 11,
    habitat: 'Matorrales de Punilla',
    desc: 'Cánido nativo astuto y veloz adaptado a las lomas serranas. Desempeña un rol primordial en el ecosistema local.',
    moves: [
      { name: 'Astucia Serrana', dmg: 35, uses: 5, maxUses: 5, text: '¡Movimiento veloz!' },
      { name: 'Embestida Ágil', dmg: 45, uses: 4, maxUses: 4, text: '¡Ataque sorpresa!' },
      { name: 'Colmillo Gris', dmg: 60, uses: 2, maxUses: 2, text: '¡IMPACTO ASTUTO!' }
    ]
  }
};

// STATE MANAGEMENT
const AppState = {
  currentScreen: 'splash',
  soundEnabled: true,
  musicVolume: 0.8,
  sfxVolume: 1.0,
  language: 'español',
  isLandscape: false,
  unlockedCreatures: ['picaflor', 'yaguarete', 'pecari', 'quebracho'],
  recentlyUnlocked: [], // Tracks newly captured creatures in this session!
  
  // Battle state
  battle: {
    mode: 'bot',
    pendingMode: 'bot',
    botDifficulty: 'facil', // 'facil' | 'normal' | 'dificil'
    selectedTeam: [],       // Array of 3 creature keys chosen for combat
    localPlayerOneTeam: [],
    localPlayerOneName: 'Jugador 1',
    localPlayerTwoName: 'Jugador 2',
    localTurn: 1,
    playerTeam: [],         // Array of 3 creature objects
    activePlayerIndex: 0,   // Current fighting creature in playerTeam
    enemyTeam: [],          // Array of enemy creature objects
    activeEnemyIndex: 0,    // Current fighting creature in enemyTeam
    turn: 1,
    isPlayerTurn: true,
    player: null,           // Reference to active player creature
    enemy: null             // Reference to active enemy creature
  }
};

const LanMatch = { code: null, side: 0, version: 0, timer: null, syncing: false };
const isLocalDuel = () => AppState.battle.mode === 'local' || AppState.battle.mode === 'network';

async function lanRequest(path, body) {
  const response = await fetch(`/api/rooms${path}`, {
    method: body ? 'POST' : 'GET',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'No se pudo conectar con la sala.');
  return result;
}

function lanName() {
  return (document.getElementById('lan-player-name')?.value || '').trim().slice(0, 20) || 'Entrenador';
}

async function createLanRoom() {
  try {
    const room = await lanRequest('', { name: lanName() });
    LanMatch.code = room.code; LanMatch.side = room.player; LanMatch.version = 0;
    AppState.battle.localPlayerOneName = lanName();
    AppState.battle.localPlayerTwoName = 'Esperando rival';
    AppState.battle.pendingMode = 'local';
    AppState.battle.networkMatch = true;
    setLanStatus(`Sala ${room.code}: comparte este código con tu amigo.`);
    document.getElementById('lan-room-code').value = room.code;
    AppState.battle.localPlayerOneTeam = [];
    AppState.battle.selectedTeam = [];
    document.getElementById('select-team-title').textContent = `Equipo de ${lanName()}`;
    openTeamSelection();
  } catch (error) { setLanStatus(error.message); }
}

async function joinLanRoom() {
  const code = (document.getElementById('lan-room-code')?.value || '').trim().toUpperCase();
  if (!/^[A-Z0-9]{5}$/.test(code)) return setLanStatus('Escribe el código de 5 letras o números que te compartieron.');
  try {
    const room = await lanRequest(`/${code}`, { name: lanName() });
    LanMatch.code = code; LanMatch.side = room.player; LanMatch.version = 0;
    AppState.battle.localPlayerOneName = room.names[0];
    AppState.battle.localPlayerTwoName = lanName();
    AppState.battle.pendingMode = 'local';
    AppState.battle.networkMatch = true;
    AppState.battle.localPlayerOneTeam = [];
    AppState.battle.selectedTeam = [];
    setLanStatus(`Conectado a la sala ${code}. Elige tus tres criaturas.`);
    document.getElementById('select-team-title').textContent = `Equipo de ${lanName()}`;
    openTeamSelection();
  } catch (error) { setLanStatus(error.message); }
}

function setLanStatus(message) {
  const status = document.getElementById('lan-room-status');
  if (status) status.textContent = message;
}

async function submitLanTeam() {
  const side = LanMatch.side;
  await lanRequest(`/${LanMatch.code}/team`, { player: side, team: AppState.battle.selectedTeam });
  setLanStatus('Equipo enviado. Esperando que ambos entrenadores estén listos…');
  let result;
  while (true) {
    result = await lanRequest(`/${LanMatch.code}/state`);
    if (result.teams[0] && result.teams[1]) break;
    await new Promise(resolve => setTimeout(resolve, 700));
  }
  AppState.battle.localPlayerOneName = result.names[0];
  AppState.battle.localPlayerTwoName = result.names[1];
  AppState.battle.localPlayerOneTeam = result.teams[0];
  AppState.battle.selectedTeam = result.teams[1];
  confirmTeamAndLaunchBattle();
}

function makeLanSnapshot() {
  return {
    playerTeam: AppState.battle.playerTeam, enemyTeam: AppState.battle.enemyTeam,
    activePlayerIndex: AppState.battle.activePlayerIndex, activeEnemyIndex: AppState.battle.activeEnemyIndex,
    localTurn: AppState.battle.localTurn, turn: AppState.battle.turn,
    finished: Boolean(AppState.battle.finished),
    log: document.getElementById('battle-log')?.textContent || ''
  };
}

async function publishLanSnapshot() {
  if (!AppState.battle.networkMatch || !LanMatch.code || LanMatch.syncing) return;
  try {
    const result = await lanRequest(`/${LanMatch.code}/state`, { state: makeLanSnapshot() });
    LanMatch.version = result.version;
  } catch (error) { const log = document.getElementById('battle-log'); if (log) log.textContent = error.message; }
}

function startLanPolling() {
  clearInterval(LanMatch.timer);
  LanMatch.timer = setInterval(async () => {
    if (!AppState.battle.networkMatch || !LanMatch.code || LanMatch.syncing) return;
    try {
      const result = await lanRequest(`/${LanMatch.code}/state`);
      if (!result.state || result.version <= LanMatch.version) return;
      LanMatch.syncing = true;
      const state = result.state;
      AppState.battle.playerTeam = state.playerTeam;
      AppState.battle.enemyTeam = state.enemyTeam;
      AppState.battle.activePlayerIndex = state.activePlayerIndex;
      AppState.battle.activeEnemyIndex = state.activeEnemyIndex;
      AppState.battle.localTurn = state.localTurn;
      AppState.battle.turn = state.turn;
      AppState.battle.finished = Boolean(state.finished);
      AppState.battle.player = state.playerTeam[state.activePlayerIndex];
      AppState.battle.enemy = state.enemyTeam[state.activeEnemyIndex];
      AppState.battle.localPlayerOneName = result.names[0];
      AppState.battle.localPlayerTwoName = result.names[1];
      document.getElementById('battle-log').textContent = state.log;
      LanMatch.version = result.version;
      populateAttackControls(); populateSwitchControls(); updateBattleUI(); updateBattleTeamsRosterUI();
      showBattleControlsForTurn();
      LanMatch.syncing = false;
    } catch (_) { /* A brief polling failure is retried on the next cycle. */ }
  }, 600);
}

function showBattleControlsForTurn() {
  const mine = !AppState.battle.finished && (!AppState.battle.networkMatch || AppState.battle.localTurn === LanMatch.side);
  document.getElementById('battle-controls-main').classList.toggle('hidden', !mine);
  if (!mine) {
    document.getElementById('battle-controls-attacks').classList.add('hidden');
    document.getElementById('battle-controls-switch').classList.add('hidden');
  }
  return mine;
}

// WEBAUDIO SYNTHESIZER
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.initContext();
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playClick() {
    if (!AppState.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.15 * AppState.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  playAttack() {
    if (!AppState.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.25);
      
      gain.gain.setValueAtTime(0.3 * AppState.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch(e) {}
  }

  playHeal() {
    if (!AppState.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(900, this.ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.2 * AppState.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch(e) {}
  }

  playQRScan() {
    if (!AppState.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1400, this.ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.25 * AppState.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }
}

const SFX = new SoundEngine();

// INITIALIZATION & CLOCK
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);

  // Render Initial Views
  renderCollectionGrid();
  renderFloraFaunaInfo();

  // Setup Toolbar Events
  document.getElementById('btn-toggle-landscape').addEventListener('click', toggleLandscapeMode);
  document.getElementById('btn-show-flowmap').addEventListener('click', () => openModal('modal-flowmap'));
  document.getElementById('btn-sound-toggle').addEventListener('click', toggleGlobalSound);

  // Restore saved language if exists
  try {
    const savedLang = localStorage.getItem('game_language');
    if (savedLang && languages.includes(savedLang)) {
      setLanguage(savedLang);
    }
  } catch(e) {}

  // Allow WebAudio unlocking on first click anywhere
  document.body.addEventListener('click', () => {
    if (SFX.ctx && SFX.ctx.state === 'suspended') {
      SFX.ctx.resume();
    }
  }, { once: true });
});

function updateClock() {
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const clockEl = document.getElementById('status-time');
  if (clockEl) clockEl.textContent = `${hrs}:${mins}`;
}

// RENDER COLLECTION GRID
function renderCollectionGrid() {
  const container = document.getElementById('collection-grid-container');
  const tag = document.getElementById('collection-count-tag');
  if (!container) return;

  container.innerHTML = '';
  const allKeys = ['picaflor', 'yaguarete', 'buho', 'pecari', 'zorro', 'quebracho'];
  const unlockedCount = AppState.unlockedCreatures.length;

  if (tag) {
    tag.textContent = `TUS CRIATURAS • ${unlockedCount}/${allKeys.length} DESCUBIERTAS`;
  }

  allKeys.forEach(key => {
    const data = CREATURE_DATABASE[key];
    const isUnlocked = AppState.unlockedCreatures.includes(key);

    const card = document.createElement('div');
    if (isUnlocked) {
      card.className = 'creature-card unlocked';
      card.onclick = () => showCreatureDetail(key);

      let badgeClass = '';
      if (data.badge.includes('Depredador') || data.badge.includes('Carnívoro')) badgeClass = 'carnivoro';
      else if (data.badge.includes('Herbívoro')) badgeClass = 'herbivoro';
      else if (data.badge.includes('Flora')) badgeClass = 'flora';

      card.innerHTML = `
        <div class="card-badge ${badgeClass}">${data.badge.toUpperCase()}</div>
        <div class="card-img-placeholder species-thumb"><img src="assets/species/${key}.png" alt="" hidden><span>${data.icon}</span></div>
        <div class="card-info">
          <h4>${data.name}</h4>
          <p>Nivel ${data.lvl} • Serrano</p>
        </div>
      `;
      const thumb = card.querySelector('.species-thumb img');
      const thumbFallback = card.querySelector('.species-thumb span');
      thumb.onload = () => { thumb.hidden = false; thumbFallback.hidden = true; };
      thumb.onerror = () => { thumb.hidden = true; thumbFallback.hidden = false; };
    } else {
      card.className = 'creature-card locked';
      card.onclick = () => openQRScanner(key);
      card.innerHTML = `
        <div class="card-locked-icon">?</div>
        <div class="card-info">
          <h4>${data.name}</h4>
          <p>Bloqueado (Escanear QR)</p>
        </div>
      `;
    }
    container.appendChild(card);
  });
}

// RENDER DYNAMIC FLORA AND FAUNA INFO SCREEN WITH UNLOCKED COLLECTION CREATURES!
function renderFloraFaunaInfo() {
  const container = document.getElementById('flora-fauna-dynamic-container');
  if (!container) return;

  container.innerHTML = '';

  // Render a species card for every unlocked creature in collection!
  AppState.unlockedCreatures.forEach(key => {
    const data = CREATURE_DATABASE[key];
    if (!data) return;

    const card = document.createElement('div');
    card.className = 'species-card';

    const isRecentlyUnlocked = AppState.recentlyUnlocked.includes(key);
    const newBadgeHtml = isRecentlyUnlocked 
      ? `<span class="badge-new-unlocked">✨ NUEVO DESCUBRIMIENTO</span>` 
      : ``;

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h5>${data.icon} ${data.name}</h5>
        ${newBadgeHtml}
      </div>
      <p style="color:var(--primary-accent); font-weight:700; font-size:10px; margin-top:2px;">
        ${data.badge} • Hábitat: ${data.habitat}
      </p>
      <p style="margin-top:4px;">${data.desc}</p>
      <div style="font-size:9px; color:var(--text-muted); margin-top:4px; font-weight:600;">
        Estadísticas en Colección: Vida: ${data.hp} HP | Velocidad: ${data.spd} SPD | Ataque: ${data.atk} ATK
      </div>
    `;

    container.appendChild(card);
  });
}

// SCREEN ROUTER WITH AUTOMATIC ORIENTATION SWITCHING
function navigateTo(screenId) {
  SFX.playClick();

  // Alias for "como se pelea"
  if (screenId === 'info_como_pelea') {
    screenId = 'info_como_pelear';
  }

  // Refresh dynamic screens when navigated to
  if (screenId === 'info_flora_fauna') {
    renderFloraFaunaInfo();
  } else if (screenId === 'coleccion') {
    renderCollectionGrid();
  }

  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));

  // Show target screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active');
    AppState.currentScreen = screenId;
  }

  // AUTOMATIC HORIZONTAL ORIENTATION FOR BATTLE SCREEN!
  if (screenId === 'battle_arena') {
    setLandscapeMode(true);
  } else {
    setLandscapeMode(false);
  }

  // Update sidebar active indicator
  const flowItems = document.querySelectorAll('.flow-step-item');
  flowItems.forEach(item => {
    item.classList.remove('active-step');
    if (item.getAttribute('data-target') === screenId || 
       (screenId.startsWith('info_') && item.getAttribute('data-target') === 'informacion')) {
      item.classList.add('active-step');
    }
  });
}

// PHONE ORIENTATION CONTROLLER
function toggleLandscapeMode() {
  setLandscapeMode(!AppState.isLandscape);
}

function setLandscapeMode(enable) {
  AppState.isLandscape = enable;
  const wrapper = document.getElementById('phone-wrapper');
  const btn = document.getElementById('btn-toggle-landscape');

  if (enable) {
    wrapper.classList.add('landscape');
    if (btn) btn.innerHTML = `<span class="icon">📱</span> <span class="lbl">Vertical</span>`;
  } else {
    wrapper.classList.remove('landscape');
    if (btn) btn.innerHTML = `<span class="icon">🔄</span> <span class="lbl">Girar Celular</span>`;
  }
}

// GLOBAL SOUND TOGGLE
function toggleGlobalSound() {
  AppState.soundEnabled = !AppState.soundEnabled;
  const btnIcon = document.getElementById('sound-icon');
  const btn = document.getElementById('btn-sound-toggle');
  
  if (AppState.soundEnabled) {
    if (btnIcon) btnIcon.textContent = '🔊';
    if (btn) btn.querySelector('.lbl').textContent = 'Sonido: ON';
    SFX.playClick();
  } else {
    if (btnIcon) btnIcon.textContent = 'MUTE';
    if (btn) btn.querySelector('.lbl').textContent = 'Sonido: OFF';
  }
}

// SETTINGS CONTROLS
function updateVolume(type, val) {
  if (type === 'music') {
    AppState.musicVolume = val / 100;
    document.getElementById('val-music').textContent = `${val}%`;
  } else if (type === 'sfx') {
    AppState.sfxVolume = val / 100;
    document.getElementById('val-sfx').textContent = `${val}%`;
  }
}

// ==========================================
// GOOGLE TRANSLATE & MULTI-LANGUAGE SYSTEM
// ==========================================
const languages = ['español', 'english', 'português'];
const langCodes = {
  'español': 'es',
  'english': 'en',
  'português': 'pt'
};

const TRANSLATIONS = {
  español: {
    natureBadge: '🌿 Reserva Natural Serrana',
    appSubtitle: 'PROYECTO CIELO • ECO-COMBAT',
    enterHome: '▶ ENTRAR A INICIO',
    splashFooter: 'Tu aventura comienza en la naturaleza',
    settingsTitle: 'Ajustes',
    ambientMusic: '🎵 Música Ambiental',
    soundEffects: '🔊 Efectos de Sonido',
    language: '🌐 Idioma',
    googleActive: 'Google Translate Activo',
    googleHint: 'Conectado a Google Translate API. El juego se adapta en tiempo real a español, english o português.',
    homeTitle: 'Inicio',
    scanQrTitle: 'Escanear criaturas de la naturaleza',
    btnCollection: 'COLECCIÓN',
    btnInfo: 'INFORMACIÓN',
    btnBattle: 'PELEA',
    btnSettings: 'AJUSTES',
    btnExit: 'SALIR',
    footerNature: 'Conecta con la naturaleza y conserva las especies.',
    infoTitle: 'Información',
    infoFire: 'prevención contra incendios',
    infoFireSub: 'Medidas oficiales y bomberos',
    infoFoodWeb: 'red trófica local',
    infoFoodWebSub: 'Productores, consumidores y descomponedores',
    infoFloraFauna: 'información de la flora y fauna',
    infoFloraFaunaSub: 'Especies de tu colección e información autóctona',
    infoHowToFight: 'como se pelea',
    infoHowToFightSub: 'Reglas de combate por turnos y guía de equipo',
    howToFightTitle: 'Como se pelea',
    backToInfo: '⬅ Volver a Información',
    goToBattleNow: '⚔️ IR A PELEAR AHORA',
    battleTitle: 'Pelea',
    diffBotTag: 'PELEA CONTRA BOT • 3 NIVELES DE DIFICULTAD',
    easyTitle: 'Nivel Inicial (1 Criatura)',
    easyDesc: 'Rival de nivel 10 con estadísticas estándar. Ideal para aprender el combate por turnos.',
    mediumTitle: 'Nivel Intermedio (2 Criaturas)',
    mediumDesc: 'Dúo de fauna silvestre de nivel 13. Requiere coordinar turnos y habilidades.',
    hardTitle: 'Nivel Experto (3 Criaturas)',
    hardDesc: 'Trío de depredadores alfa de nivel 16 con alto daño y gran resistencia de vida.',
    chooseTeam3: 'Elegir Equipo de 3 ›',
    localMultiplayer: 'MULTIJUGADOR LOCAL',
    localFriendTitle: 'pelea contra amigo local',
    localFriendDesc: 'Duelo entre 2 entrenadores en el mismo teléfono',
    selectTeamTitle: 'Elige 3 Criaturas',
    teamReqTag: 'FORMA TU EQUIPO DE BATALLA (3 REQUERIDAS)',
    autoPick3: '⚡ Auto-elegir 3',
    availableCreaturesTag: 'TUS CRIATURAS DISPONIBLES',
    selectHint: 'Toca una criatura para sumarla o quitarla de tu equipo:',
    btnAttack: '⚔️ Atacar',
    btnSkill: '✨ Habilidad',
    btnItem: '🎒 Mochila',
    btnSwitch: '🔄 Cambiar (3)',
    btnSurrender: '← Salir de Batalla'
  },
  english: {
    natureBadge: '🌿 Mountain Nature Reserve',
    appSubtitle: 'PROJECT CIELO • ECO-COMBAT',
    enterHome: '▶ ENTER HOME',
    splashFooter: 'Your adventure begins in nature',
    settingsTitle: 'Settings',
    ambientMusic: '🎵 Ambient Music',
    soundEffects: '🔊 Sound Effects',
    language: '🌐 Language',
    googleActive: 'Google Translate Active',
    googleHint: 'Connected to Google Translate API. The game adapts in real time to Spanish, English or Portuguese.',
    homeTitle: 'Home',
    scanQrTitle: 'Scan wild nature creatures',
    btnCollection: 'COLLECTION',
    btnInfo: 'INFORMATION',
    btnBattle: 'BATTLE',
    btnSettings: 'SETTINGS',
    btnExit: 'EXIT',
    footerNature: 'Connect with nature and preserve local species.',
    infoTitle: 'Information',
    infoFire: 'forest fire prevention',
    infoFireSub: 'Official regulations and firefighters',
    infoFoodWeb: 'local trophic network',
    infoFoodWebSub: 'Producers, consumers, and decomposers',
    infoFloraFauna: 'flora & fauna information',
    infoFloraFaunaSub: 'Species in your collection and native facts',
    infoHowToFight: 'how to battle',
    infoHowToFightSub: 'Turn-based combat rules and team guide',
    howToFightTitle: 'How to battle',
    backToInfo: '⬅ Back to Information',
    goToBattleNow: '⚔️ GO TO BATTLE NOW',
    battleTitle: 'Battle',
    diffBotTag: 'BOT BATTLE • 3 DIFFICULTY LEVELS',
    easyTitle: 'Beginner Level (1 Creature)',
    easyDesc: 'Level 10 rival with standard stats. Great for learning turn-based combat.',
    mediumTitle: 'Intermediate Level (2 Creatures)',
    mediumDesc: 'Wildlife duo at level 13. Requires tactical coordination and skills.',
    hardTitle: 'Expert Level (3 Creatures)',
    hardDesc: 'Trio of alpha predators at level 16 with heavy damage and high HP.',
    chooseTeam3: 'Choose Team of 3 ›',
    localMultiplayer: 'LOCAL MULTIPLAYER',
    localFriendTitle: 'battle against local friend',
    localFriendDesc: 'Duel between 2 trainers on the same phone',
    selectTeamTitle: 'Choose 3 Creatures',
    teamReqTag: 'FORM YOUR BATTLE TEAM (3 REQUIRED)',
    autoPick3: '⚡ Auto-pick 3',
    availableCreaturesTag: 'YOUR AVAILABLE CREATURES',
    selectHint: 'Tap a creature to add or remove it from your team:',
    btnAttack: '⚔️ Attack',
    btnSkill: '✨ Skill',
    btnItem: '🎒 Backpack',
    btnSwitch: '🔄 Switch (3)',
    btnSurrender: '← Exit Battle'
  },
  português: {
    natureBadge: '🌿 Reserva Natural Serrana',
    appSubtitle: 'PROJETO CÉU • ECO-COMBATE',
    enterHome: '▶ ENTRAR NO INÍCIO',
    splashFooter: 'Sua aventura começa na natureza',
    settingsTitle: 'Ajustes',
    ambientMusic: '🎵 Música Ambiente',
    soundEffects: '🔊 Efeitos Sonoros',
    language: '🌐 Idioma',
    googleActive: 'Google Tradutor Ativo',
    googleHint: 'Conectado à API do Google Tradutor. O jogo se adapta em tempo real para espanhol, inglês ou português.',
    homeTitle: 'Início',
    scanQrTitle: 'Escanear criaturas da natureza',
    btnCollection: 'COLEÇÃO',
    btnInfo: 'INFORMAÇÃO',
    btnBattle: 'BATALHA',
    btnSettings: 'AJUSTES',
    btnExit: 'SAIR',
    footerNature: 'Conecte-se com a natureza e preserve as espécies.',
    infoTitle: 'Informação',
    infoFire: 'prevenção contra incêndios',
    infoFireSub: 'Diretrizes oficiais e bombeiros',
    infoFoodWeb: 'rede trófica local',
    infoFoodWebSub: 'Produtores, consumidores e decompositores',
    infoFloraFauna: 'informações da flora e fauna',
    infoFloraFaunaSub: 'Espécies da sua coleção e informações nativas',
    infoHowToFight: 'como lutar',
    infoHowToFightSub: 'Regras de combate por turnos e guia de equipe',
    howToFightTitle: 'Como lutar',
    backToInfo: '⬅ Voltar à Informação',
    goToBattleNow: '⚔️ IR PARA A BATALHA',
    battleTitle: 'Batalha',
    diffBotTag: 'BATALHA CONTRA BOT • 3 NÍVEIS DE DIFICULDADE',
    easyTitle: 'Nível Inicial (1 Criatura)',
    easyDesc: 'Rival nível 10 com atributos padrão. Ideal para aprender o combate por turnos.',
    mediumTitle: 'Nível Intermediário (2 Criaturas)',
    mediumDesc: 'Dupla de fauna silvestre nível 13. Requer coordenação tática e habilidades.',
    hardTitle: 'Nível Especialista (3 Criaturas)',
    hardDesc: 'Trio de predadores alfa nível 16 com alto dano e grande resistência.',
    chooseTeam3: 'Escolher Equipe de 3 ›',
    localMultiplayer: 'MULTIJOGADOR LOCAL',
    localFriendTitle: 'batalha contra amigo local',
    localFriendDesc: 'Duelo entre 2 treinadores no mesmo celular',
    selectTeamTitle: 'Escolha 3 Criaturas',
    teamReqTag: 'FORME SUA EQUIPE DE BATALHA (3 OBRIGATÓRIAS)',
    autoPick3: '⚡ Auto-escolher 3',
    availableCreaturesTag: 'SUAS CRIATURAS DISPONÍVEIS',
    selectHint: 'Toque em uma criatura para adicioná-la ou removê-la da equipe:',
    btnAttack: '⚔️ Atacar',
    btnSkill: '✨ Habilidade',
    btnItem: '🎒 Mochila',
    btnSwitch: '🔄 Trocar (3)',
    btnSurrender: '← Sair da Batalha'
  }
};

function cycleLang(dir) {
  let idx = languages.indexOf(AppState.language);
  idx = (idx + dir + languages.length) % languages.length;
  const newLang = languages[idx];
  setLanguage(newLang);
}

function setLanguage(lang) {
  AppState.language = lang;
  SFX.playClick();

  // Update language label in Settings
  const currentLangEl = document.getElementById('current-lang');
  if (currentLangEl) currentLangEl.textContent = lang;

  const code = langCodes[lang] || 'es';

  // 1. Synchronize Google Translate Widget & Cookies
  triggerGoogleTranslate(code);

  // 2. Direct instant DOM UI translation
  applyTranslationsToDOM(lang);

  // 3. Refresh dynamic views
  renderCollectionGrid();
  renderFloraFaunaInfo();
  if (AppState.currentScreen === 'seleccionar_criatura') {
    renderTeamSelectionView();
  }

  try {
    localStorage.setItem('game_language', lang);
  } catch(e) {}
}

function triggerGoogleTranslate(langCode) {
  try {
    const host = window.location.hostname;
    // Set cookies recognized by Google Translate script
    if (langCode === 'es') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=/es/es; path=/;`;
    } else {
      document.cookie = `googtrans=/es/${langCode}; path=/;`;
      document.cookie = `googtrans=/auto/${langCode}; path=/;`;
      if (host) {
        document.cookie = `googtrans=/es/${langCode}; domain=${host}; path=/;`;
        document.cookie = `googtrans=/auto/${langCode}; domain=${host}; path=/;`;
      }
    }

    // Trigger select change in Google Translate element if mounted
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    }
  } catch (e) {
    console.log('Google Translate trigger error:', e);
  }
}

function applyTranslationsToDOM(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.español;

  // 1. Splash Screen
  const splashBadge = document.querySelector('#screen-splash .nature-badge');
  if (splashBadge) splashBadge.textContent = t.natureBadge;

  const splashSub = document.querySelector('#screen-splash .app-subtitle');
  if (splashSub) splashSub.textContent = t.appSubtitle;

  const splashBtn = document.querySelector('#screen-splash .btn-primary');
  if (splashBtn) splashBtn.innerHTML = `<span class="btn-icon">▶</span> ${t.enterHome}`;

  const splashFooter = document.querySelector('#screen-splash .splash-footer p');
  if (splashFooter) splashFooter.textContent = t.splashFooter;

  // 2. Settings Screen
  const settingsTitle = document.querySelector('#screen-ajustes .screen-header h3');
  if (settingsTitle) settingsTitle.textContent = t.settingsTitle;

  const labels = document.querySelectorAll('#screen-ajustes .setting-label span:first-child');
  if (labels[0]) labels[0].textContent = t.ambientMusic;
  if (labels[1]) labels[1].textContent = t.soundEffects;

  const langRowSpan = document.querySelector('#screen-ajustes .setting-row span:first-child');
  if (langRowSpan) langRowSpan.textContent = t.language;

  const transBadge = document.querySelector('#screen-ajustes .translate-badge');
  if (transBadge) transBadge.innerHTML = `<span class="g-icon">🌐</span> ${t.googleActive}`;

  const transHint = document.getElementById('translate-hint-text');
  if (transHint) transHint.textContent = t.googleHint;

  // 3. Inicio Screen
  const inicioTitle = document.querySelector('#screen-inicio .screen-header h3');
  if (inicioTitle) inicioTitle.textContent = t.homeTitle;

  const qrSub = document.querySelector('#screen-inicio .qr-label span');
  if (qrSub) qrSub.textContent = t.scanQrTitle;

  const menuBtns = document.querySelectorAll('#screen-inicio .dashboard-menu .btn-figma');
  if (menuBtns[0]) menuBtns[0].innerHTML = `<span class="btn-icon">🎴</span> ${t.btnCollection}`;
  if (menuBtns[1]) menuBtns[1].innerHTML = `<span class="btn-icon">ℹ️</span> ${t.btnInfo}`;
  if (menuBtns[2]) menuBtns[2].innerHTML = `<span class="btn-icon">⚔️</span> ${t.btnBattle}`;

  const secBtns = document.querySelectorAll('#screen-inicio .dashboard-secondary-grid .btn-figma');
  if (secBtns[0]) secBtns[0].innerHTML = `<span class="btn-icon">⚙</span> ${t.btnSettings}`;
  if (secBtns[1]) secBtns[1].innerHTML = `<span class="btn-icon">↳</span> ${t.btnExit}`;

  const footerNature = document.querySelector('#screen-inicio .footer-note p');
  if (footerNature) footerNature.textContent = t.footerNature;

  // 4. Información Screen
  const infoTitle = document.querySelector('#screen-informacion .screen-header h3');
  if (infoTitle) infoTitle.textContent = t.infoTitle;

  const catBtns = document.querySelectorAll('#screen-informacion .info-cat-btn');
  if (catBtns[0]) {
    catBtns[0].querySelector('strong').textContent = t.infoFire;
    catBtns[0].querySelector('span').textContent = t.infoFireSub;
  }
  if (catBtns[1]) {
    catBtns[1].querySelector('strong').textContent = t.infoFoodWeb;
    catBtns[1].querySelector('span').textContent = t.infoFoodWebSub;
  }
  if (catBtns[2]) {
    catBtns[2].querySelector('strong').textContent = t.infoFloraFauna;
    catBtns[2].querySelector('span').textContent = t.infoFloraFaunaSub;
  }
  if (catBtns[3]) {
    catBtns[3].querySelector('strong').textContent = t.infoHowToFight;
    catBtns[3].querySelector('span').textContent = t.infoHowToFightSub;
  }

  // 5. Como se pelea Screen
  const comoPelearTitle = document.querySelector('#screen-info_como_pelear .screen-header h3');
  if (comoPelearTitle) comoPelearTitle.textContent = t.howToFightTitle;

  const btnBackInfoTop = document.querySelector('#screen-info_como_pelear .btn-back-home');
  if (btnBackInfoTop) btnBackInfoTop.textContent = t.backToInfo;

  const guideHeaderTitle = document.querySelector('#screen-info_como_pelear .guide-header-text');
  if (guideHeaderTitle) guideHeaderTitle.textContent = `⚔️ ${t.howToFightTitle.toUpperCase()} • WAR IN HEAVEN`;

  const guideBtns = document.querySelectorAll('#screen-info_como_pelear .guide-actions-row .btn-figma');
  if (guideBtns[0]) guideBtns[0].textContent = t.backToInfo;
  if (guideBtns[1]) guideBtns[1].textContent = t.goToBattleNow;

  // 6. Pelea Screen
  const peleaTitle = document.querySelector('#screen-pelea .screen-header h3');
  if (peleaTitle) peleaTitle.textContent = t.battleTitle;

  const diffTag = document.querySelector('#screen-pelea .section-tag.center');
  if (diffTag) diffTag.textContent = t.diffBotTag;

  const diffCards = document.querySelectorAll('#screen-pelea .diff-card');
  if (diffCards[0]) {
    diffCards[0].querySelector('.diff-body strong').textContent = t.easyTitle;
    diffCards[0].querySelector('.diff-body p').textContent = t.easyDesc;
    diffCards[0].querySelector('.diff-action').textContent = t.chooseTeam3;
  }
  if (diffCards[1]) {
    diffCards[1].querySelector('.diff-body strong').textContent = t.mediumTitle;
    diffCards[1].querySelector('.diff-body p').textContent = t.mediumDesc;
    diffCards[1].querySelector('.diff-action').textContent = t.chooseTeam3;
  }
  if (diffCards[2]) {
    diffCards[2].querySelector('.diff-body strong').textContent = t.hardTitle;
    diffCards[2].querySelector('.diff-body p').textContent = t.hardDesc;
    diffCards[2].querySelector('.diff-action').textContent = t.chooseTeam3;
  }

  const localTag = document.querySelectorAll('#screen-pelea .section-tag.center')[1];
  if (localTag) localTag.textContent = t.localMultiplayer;

  const localCard = document.querySelector('#screen-pelea .btn-mode-card');
  if (localCard) {
    localCard.querySelector('.mode-text strong').textContent = t.localFriendTitle;
    localCard.querySelector('.mode-text span').textContent = t.localFriendDesc;
  }

  // 7. Seleccionar Criatura Screen
  const selTitle = document.querySelector('#screen-seleccionar_criatura .screen-header h3');
  if (selTitle) selTitle.textContent = t.selectTeamTitle;

  const selTag = document.querySelector('#screen-seleccionar_criatura .section-tag');
  if (selTag) selTag.textContent = t.teamReqTag;

  const quickBtn = document.querySelector('.btn-quick-fill');
  if (quickBtn) quickBtn.textContent = t.autoPick3;

  const availTag = document.querySelectorAll('#screen-seleccionar_criatura .section-tag')[1];
  if (availTag) availTag.textContent = t.availableCreaturesTag;

  const selHint = document.querySelector('#screen-seleccionar_criatura .select-hint-text');
  if (selHint) selHint.textContent = t.selectHint;

  // 8. Battle Arena Action Buttons
  const btnAtk = document.querySelector('.btn-atk');
  if (btnAtk) btnAtk.textContent = t.btnAttack;

  const btnSkill = document.querySelector('.btn-skill');
  if (btnSkill) btnSkill.textContent = t.btnSkill;

  const btnItem = document.querySelector('.btn-item');
  if (btnItem) btnItem.textContent = t.btnItem;

  const btnSwitch = document.querySelector('.btn-switch');
  if (btnSwitch) btnSwitch.textContent = t.btnSwitch;

  const btnBackBattle = document.querySelector('.btn-back-battle');
  if (btnBackBattle) btnBackBattle.textContent = t.btnSurrender;
}

function triggerExitApp() {
  SFX.playClick();
  alert('Gracias por probar WAR IN HEAVEN (Proyecto Cielo). Presiona OK para reiniciar la experiencia.');
  navigateTo('splash');
}

// QR SCANNER SIMULATOR
function openQRScanner(specificTarget = null) {
  SFX.playClick();
  openModal('modal-qr');
}

function simulateQRDiscovery() {
  SFX.playQRScan();
  closeModal('modal-qr');

  // Unlock creature
  const lockedIds = ['buho', 'zorro'];
  const targetId = lockedIds[Math.floor(Math.random() * lockedIds.length)];
  const info = CREATURE_DATABASE[targetId];

  if (!AppState.unlockedCreatures.includes(targetId)) {
    AppState.unlockedCreatures.push(targetId);
  }
  if (!AppState.recentlyUnlocked.includes(targetId)) {
    AppState.recentlyUnlocked.push(targetId);
  }

  alert(`🎉 ¡NUEVA CRIATURA CAPTURADA VÍA QR!\n\nHas descubierto a: ${info.name} ${info.icon}\n\n¡Su información completa se ha añadido tanto a tu COLECCIÓN como a INFORMACIÓN DE LA FLORA Y FAUNA!`);

  renderCollectionGrid();
  renderFloraFaunaInfo();
  navigateTo('coleccion');
}

// CREATURE DETAILS MODAL DATA
function showCreatureDetail(id) {
  SFX.playClick();
  const data = CREATURE_DATABASE[id];
  if (!data) return;

  document.getElementById('creature-modal-title').textContent = `Ficha: ${data.name}`;
  document.getElementById('creature-modal-name').textContent = data.name;
  document.getElementById('creature-modal-icon').textContent = data.icon;
  document.getElementById('creature-modal-badge').textContent = data.badge;
  document.getElementById('c-hp').textContent = data.hp;
  document.getElementById('c-spd').textContent = data.spd;
  document.getElementById('c-atk').textContent = data.atk;
  document.getElementById('c-habitat').textContent = data.habitat;
  document.getElementById('creature-modal-desc').textContent = data.desc;

  const art = document.getElementById('creature-modal-art');
  const artFallback = document.getElementById('creature-modal-icon');
  art.alt = `Ilustración de ${data.name} en su hábitat serrano`;
  art.hidden = true;
  art.onload = () => { art.hidden = false; artFallback.hidden = true; };
  art.onerror = () => { art.hidden = true; artFallback.hidden = false; };
  art.src = `assets/species/${id}.png`;

  const moves = document.getElementById('creature-modal-moves');
  moves.replaceChildren();
  const movesTitle = document.createElement('strong');
  movesTitle.className = 'species-moves-title';
  movesTitle.textContent = 'MOVIMIENTOS DE LA ESPECIE';
  moves.appendChild(movesTitle);
  data.moves.forEach(move => {
    const row = document.createElement('div');
    row.className = 'species-move-row';
    const name = document.createElement('span');
    name.textContent = move.name;
    const uses = document.createElement('small');
    uses.textContent = `${move.maxUses} usos`;
    row.append(name, uses);
    moves.appendChild(row);
  });

  openModal('modal-creature');
}

// ==========================================
// 3 NIVELES DE DIFICULTAD Y ELECCIÓN DE 3 CRIATURAS
// ==========================================

function startBotBattleWithDifficulty(diff) {
  SFX.playClick();
  AppState.battle.pendingMode = 'bot';
  AppState.battle.botDifficulty = diff;
  openTeamSelection();
}

function selectLocalPlayerMode(playerMode) {
  SFX.playClick();
  AppState.battle.pendingMode = playerMode;
  AppState.battle.botDifficulty = 'normal';
  openTeamSelection();
}

function startLocalMultiplayer(playerOne = 'Jugador 1', playerTwo = 'Jugador 2') {
  AppState.battle.networkMatch = false;
  LanMatch.code = null; LanMatch.side = 0; clearInterval(LanMatch.timer);
  AppState.battle.localPlayerOneName = playerOne;
  AppState.battle.localPlayerTwoName = playerTwo;
  AppState.battle.localPlayerOneTeam = [];
  AppState.battle.localTurn = 1;
  AppState.battle.pendingMode = 'local';
  AppState.battle.selectedTeam = [];
  document.getElementById('select-team-title').textContent = `Equipo de ${playerOne}`;
  openTeamSelection();
}

function handleTeamSelectionBack() {
  if (AppState.battle.pendingMode === 'local' && AppState.battle.localPlayerOneTeam.length) {
    AppState.battle.localPlayerOneTeam = [];
    AppState.battle.selectedTeam = [];
    document.getElementById('select-team-title').textContent = `Equipo de ${AppState.battle.localPlayerOneName}`;
  }
  navigateTo(AppState.battle.pendingMode === 'local' ? 'pelea_local' : 'pelea');
}

function handleTeamConfirm() {
  if (AppState.battle.networkMatch && AppState.battle.pendingMode === 'local') {
    if (AppState.battle.selectedTeam.length !== 3) return;
    submitLanTeam().catch(error => setLanStatus(error.message));
    return;
  }
  if (AppState.battle.pendingMode === 'local' && !AppState.battle.localPlayerOneTeam.length) {
    if (AppState.battle.selectedTeam.length !== 3) return;
    AppState.battle.localPlayerOneTeam = [...AppState.battle.selectedTeam];
    AppState.battle.selectedTeam = [];
    document.getElementById('select-team-title').textContent = `Equipo de ${AppState.battle.localPlayerTwoName}`;
    renderTeamSelectionView();
    return;
  }
  confirmTeamAndLaunchBattle();
}

function openTeamSelection() {
  // Pre-select first 3 unlocked if empty, or start empty for explicit user selection
  if (!AppState.battle.selectedTeam || AppState.battle.selectedTeam.length === 0) {
    AppState.battle.selectedTeam = [];
  }
  renderTeamSelectionView();
  navigateTo('seleccionar_criatura');
}

function renderTeamSelectionView() {
  const container = document.getElementById('creature-selection-container');
  if (!container) return;

  container.innerHTML = '';
  AppState.unlockedCreatures.forEach(key => {
    const data = CREATURE_DATABASE[key];
    const isSelected = AppState.battle.selectedTeam.includes(key);
    const card = document.createElement('div');
    card.className = `select-card ${isSelected ? 'selected-in-team' : ''}`;
    card.id = `select-card-${key}`;
    card.onclick = () => toggleCreatureInTeam(key);

    card.innerHTML = `
      <div class="select-card-avatar">${data.icon}</div>
      <div class="select-card-info">
        <h4>${data.name}</h4>
        <div class="select-card-stats">Nivel ${data.lvl} • ${data.badge} • HP: ${data.hp} | ATK: ${data.atk}</div>
      </div>
      <button class="btn-select-creature ${isSelected ? 'selected' : ''}">
        ${isSelected ? '✓ EN EQUIPO' : '+ ELEGIR'}
      </button>
    `;
    container.appendChild(card);
  });

  updateTeamSelectionUI();
}

function toggleCreatureInTeam(key) {
  SFX.playClick();
  const idx = AppState.battle.selectedTeam.indexOf(key);
  if (idx > -1) {
    AppState.battle.selectedTeam.splice(idx, 1);
  } else {
    if (AppState.battle.selectedTeam.length >= 3) {
      alert('Tu equipo ya tiene 3 criaturas. Toca un slot o una criatura seleccionada para deseleccionarla.');
      return;
    }
    AppState.battle.selectedTeam.push(key);
  }

  updateTeamSelectionUI();

  // Update card visuals
  AppState.unlockedCreatures.forEach(k => {
    const card = document.getElementById(`select-card-${k}`);
    if (card) {
      const inTeam = AppState.battle.selectedTeam.includes(k);
      card.classList.toggle('selected-in-team', inTeam);
      const btn = card.querySelector('.btn-select-creature');
      if (btn) {
        btn.classList.toggle('selected', inTeam);
        btn.textContent = inTeam ? '✓ EN EQUIPO' : '+ ELEGIR';
      }
    }
  });
}

function removeCreatureFromTeam(slotIndex) {
  if (AppState.battle.selectedTeam[slotIndex]) {
    SFX.playClick();
    AppState.battle.selectedTeam.splice(slotIndex, 1);
    updateTeamSelectionUI();
    renderTeamSelectionView();
  }
}

function quickFillTeam() {
  SFX.playClick();
  // Automatically select the first 3 unlocked creatures
  AppState.battle.selectedTeam = AppState.unlockedCreatures.slice(0, 3);
  renderTeamSelectionView();
}

function updateTeamSelectionUI() {
  const team = AppState.battle.selectedTeam;
  const count = team.length;

  // Update 3 Team Slots
  for (let i = 0; i < 3; i++) {
    const slotEl = document.getElementById(`slot-${i}`);
    const contentEl = document.getElementById(`slot-content-${i}`);
    if (!slotEl || !contentEl) continue;

    if (i < count) {
      const key = team[i];
      const data = CREATURE_DATABASE[key];
      slotEl.classList.add('filled');
      contentEl.innerHTML = `
        <span class="slot-avatar">${data.icon}</span>
        <span class="slot-name">${data.name}</span>
        <span class="slot-remove-badge">✕ Quitar</span>
      `;
    } else {
      slotEl.classList.remove('filled');
      contentEl.innerHTML = `<span class="slot-placeholder">+ Slot ${i + 1}</span>`;
    }
  }

  // Update counter
  const counterEl = document.getElementById('team-selection-counter');
  if (counterEl) {
    counterEl.textContent = `${count} / 3 seleccionadas`;
  }

  // Update confirm button
  const confirmBtn = document.getElementById('btn-confirm-team');
  if (confirmBtn) {
    if (count === 3) {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = `⚔️ ¡A LA BATALLA CON TU EQUIPO! (3/3)`;
    } else {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = `⚔️ SELECCIONA 3 CRIATURAS (${count}/3)`;
    }
  }
}

// ==========================================
// BATTLE ENGINE: 3v3 / 3-CREATURE TEAM SYSTEM
// ==========================================

function confirmTeamAndLaunchBattle() {
  if (AppState.battle.selectedTeam.length !== 3) {
    alert('Debes elegir 3 criaturas para formar tu equipo de combate.');
    return;
  }
  SFX.playClick();

  AppState.battle.mode = AppState.battle.networkMatch ? 'network' : AppState.battle.pendingMode;
  const diff = AppState.battle.botDifficulty || 'facil';

  // Build Player Team (3 chosen creatures)
  AppState.battle.playerTeam = AppState.battle.selectedTeam.map(key => {
    const data = CREATURE_DATABASE[key];
    return {
      key: key,
      name: data.name,
      icon: data.icon,
      lvl: data.lvl,
      hp: data.hp,
      maxHp: data.maxHp,
      spd: data.spd,
      atk: data.atk,
      moves: JSON.parse(JSON.stringify(data.moves)),
      isFainted: false
    };
  });

  if (isLocalDuel()) {
    AppState.battle.playerTeam = AppState.battle.localPlayerOneTeam.map(key => createBattleCreature(key));
    AppState.battle.enemyTeam = AppState.battle.selectedTeam.map(key => createBattleCreature(key));
    AppState.battle.localTurn = 1;
  }

  // Build Enemy Team based on chosen Bot Difficulty (or local player)
  else if (diff === 'facil') {
    AppState.battle.enemyTeam = [
      {
        key: 'pecari',
        name: 'Pecarí de Collar (BOT)',
        icon: '🐗',
        lvl: 10,
        hp: 110,
        maxHp: 110,
        atk: 25,
        isFainted: false,
        attacks: [
          { name: 'Embestida Suave', damage: 16 },
          { name: 'Pisotón Leve', damage: 20 },
          { name: 'Frote Serrano', damage: 14 }
        ]
      }
    ];
  } else if (diff === 'normal') {
    AppState.battle.enemyTeam = [
      {
        key: 'zorro',
        name: 'Zorro Gris (BOT)',
        icon: '🦊',
        lvl: 12,
        hp: 130,
        maxHp: 130,
        atk: 35,
        isFainted: false,
        attacks: [
          { name: 'Mordisco Ágil', damage: 24 },
          { name: 'Zarpazo Silvestre', damage: 28 },
          { name: 'Astucia de Monte', damage: 22 }
        ]
      },
      {
        key: 'picaflor',
        name: 'Picaflor Cometa (BOT)',
        icon: '🌸',
        lvl: 13,
        hp: 125,
        maxHp: 125,
        atk: 40,
        isFainted: false,
        attacks: [
          { name: 'Picotazo Veloz', damage: 26 },
          { name: 'Viento Serrano', damage: 32 },
          { name: 'Ráfaga Floral', damage: 30 }
        ]
      }
    ];
  } else { // 'dificil'
    AppState.battle.enemyTeam = [
      {
        key: 'buho',
        name: 'Búho Serrano Alfa (BOT)',
        icon: '🦉',
        lvl: 14,
        hp: 140,
        maxHp: 140,
        atk: 45,
        isFainted: false,
        attacks: [
          { name: 'Ataque Silencioso', damage: 32 },
          { name: 'Garra Nocturna', damage: 38 },
          { name: 'Mirada Hipnótica', damage: 35 }
        ]
      },
      {
        key: 'quebracho',
        name: 'Horco Quebracho Centenario (BOT)',
        icon: '🌳',
        lvl: 15,
        hp: 175,
        maxHp: 175,
        atk: 40,
        isFainted: false,
        attacks: [
          { name: 'Raíz Aplastante', damage: 35 },
          { name: 'Látigo de Espinas', damage: 40 },
          { name: 'Fuerza Ancestral', damage: 44 }
        ]
      },
      {
        key: 'yaguarete',
        name: 'Yaguareté Rey Alfa (BOT)',
        icon: '🐆',
        lvl: 17,
        hp: 190,
        maxHp: 190,
        atk: 55,
        isFainted: false,
        attacks: [
          { name: 'Zarpazo Mortal', damage: 42 },
          { name: 'Mordisco Devastador', damage: 48 },
          { name: 'Furia de Apex Predator', damage: 52 }
        ]
      }
    ];
  }

  // Set initial active fighters
  AppState.battle.activePlayerIndex = 0;
  AppState.battle.activeEnemyIndex = 0;
  AppState.battle.player = AppState.battle.playerTeam[0];
  AppState.battle.enemy = AppState.battle.enemyTeam[0];
  AppState.battle.turn = 1;
  AppState.battle.isPlayerTurn = true;
  AppState.battle.finished = false;

  // Set difficulty badge
  const diffBadge = document.getElementById('battle-diff-badge');
  if (diffBadge) {
    if (isLocalDuel()) diffBadge.textContent = AppState.battle.networkMatch ? '📶 Duelo por Wi‑Fi' : '👥 Duelo local';
    else if (diff === 'facil') diffBadge.innerHTML = '🟢 Fácil (1 Rival)';
    else if (diff === 'normal') diffBadge.innerHTML = '🟡 Normal (2 Rivales)';
    else diffBadge.innerHTML = '🔴 Difícil (3 Rivales Alfa)';
  }

  const enemyRosterTitle = document.getElementById('enemy-roster-title');
  if (enemyRosterTitle) {
    enemyRosterTitle.textContent = isLocalDuel()
      ? `${AppState.battle.localPlayerTwoName} (3):`
      : `Rival (${AppState.battle.enemyTeam.length}):`;
  }
  const playerRosterTitle = document.querySelector('.player-roster .roster-label');
  if (playerRosterTitle) playerRosterTitle.textContent = isLocalDuel()
    ? `${AppState.battle.localPlayerOneName} (3):` : 'Tu Equipo (3):';

  populateAttackControls();
  populateSwitchControls();
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = isLocalDuel()
    ? (AppState.battle.networkMatch ? `¡Comienza el duelo por Wi‑Fi! Turno de ${AppState.battle.localPlayerOneName}.` : `¡Comienza el duelo! ${AppState.battle.localPlayerOneName}, es tu turno. Pasa el teléfono cuando termine tu jugada.`)
    : `¡Combate iniciado! Tu equipo de 3 criaturas vs BOT (${diff.toUpperCase()}). ¡Turno de ${AppState.battle.player.name}!`;

  navigateTo('battle_arena');
  if (AppState.battle.networkMatch) { LanMatch.version = 0; publishLanSnapshot(); startLanPolling(); }
  if (AppState.battle.networkMatch) showBattleControlsForTurn();
}

function createBattleCreature(key) {
  const data = CREATURE_DATABASE[key];
  return { key, name: data.name, icon: data.icon, lvl: data.lvl, hp: data.hp,
    maxHp: data.maxHp, spd: data.spd, atk: data.atk,
    moves: JSON.parse(JSON.stringify(data.moves)), isFainted: false };
}

function populateAttackControls() {
  const p = isLocalDuel()
    ? (AppState.battle.localTurn === 1
      ? AppState.battle.playerTeam[AppState.battle.activePlayerIndex]
      : AppState.battle.enemyTeam[AppState.battle.activeEnemyIndex])
    : AppState.battle.player;
  const attackControls = document.getElementById('battle-controls-attacks');
  if (!attackControls || !p) return;

  attackControls.innerHTML = '';
  p.moves.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'btn-battle btn-sub';
    btn.onclick = () => executePlayerAttack(m.name, m.dmg, m.text, m);
    btn.disabled = m.uses <= 0;
    if (btn.disabled) btn.classList.add('exhausted');
    btn.innerHTML = `⚡ ${m.name} (${m.uses}/${m.maxUses})`;
    attackControls.appendChild(btn);
  });

  const backBtn = document.createElement('button');
  backBtn.className = 'btn-battle btn-back-sub';
  backBtn.onclick = hideSubMenu;
  backBtn.innerHTML = `↩ Volver`;
  attackControls.appendChild(backBtn);
}

function populateSwitchControls() {
  const switchControls = document.getElementById('battle-controls-switch');
  if (!switchControls) return;

  switchControls.innerHTML = '';
  const team = isLocalDuel() && AppState.battle.localTurn === 2
    ? AppState.battle.enemyTeam : AppState.battle.playerTeam;
  const activeIndex = isLocalDuel() && AppState.battle.localTurn === 2
    ? AppState.battle.activeEnemyIndex : AppState.battle.activePlayerIndex;
  team.forEach((creature, idx) => {
    const isCurrent = idx === activeIndex;
    const isFainted = creature.hp <= 0;

    const btn = document.createElement('button');
    btn.className = `btn-battle btn-sub ${isCurrent ? 'active' : ''}`;
    btn.disabled = isCurrent || isFainted;

    let statusText = `${creature.hp}/${creature.maxHp} HP`;
    if (isCurrent) statusText = 'EN COMBATE';
    if (isFainted) statusText = '💀 DEBILITADO';

    btn.innerHTML = `${creature.icon} ${creature.name} (${statusText})`;
    if (!isCurrent && !isFainted) {
      btn.onclick = () => switchActivePlayerCreature(idx);
    }
    switchControls.appendChild(btn);
  });

  const backBtn = document.createElement('button');
  backBtn.className = 'btn-battle btn-back-sub';
  backBtn.onclick = hideSubMenu;
  backBtn.innerHTML = `↩ Volver`;
  switchControls.appendChild(backBtn);
}

function switchActivePlayerCreature(newIndex) {
  if (AppState.battle.networkMatch && !showBattleControlsForTurn()) return;
  const localPlayerTwo = isLocalDuel() && AppState.battle.localTurn === 2;
  const team = localPlayerTwo ? AppState.battle.enemyTeam : AppState.battle.playerTeam;
  const currentIndex = localPlayerTwo ? AppState.battle.activeEnemyIndex : AppState.battle.activePlayerIndex;
  if (newIndex === currentIndex) return;
  const target = team[newIndex];
  if (!target || target.hp <= 0) return;

  SFX.playClick();
  hideSubMenu();

  if (localPlayerTwo) {
    AppState.battle.activeEnemyIndex = newIndex;
    AppState.battle.enemy = target;
  } else {
    AppState.battle.activePlayerIndex = newIndex;
    AppState.battle.player = target;
  }

  populateAttackControls();
  populateSwitchControls();
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `🔄 ¡Cambiaste a ${target.name}! Entra al combate listo para luchar.`;

  if (isLocalDuel()) {
    AppState.battle.localTurn = AppState.battle.localTurn === 1 ? 2 : 1;
    AppState.battle.turn += 1;
    populateAttackControls();
    populateSwitchControls();
    updateBattleUI();
    updateBattleTeamsRosterUI();
    document.getElementById('battle-log').textContent = `¡${target.name} entra al combate! Pasa el teléfono a ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName}.`;
    return;
  }

  // Turn passes to enemy
  AppState.battle.isPlayerTurn = false;
  setTimeout(executeEnemyTurn, 1400);
}

function updateBattleUI() {
  let p = AppState.battle.player;
  let e = AppState.battle.enemy;
  if (isLocalDuel() && AppState.battle.localTurn === 2) [p, e] = [e, p];
  if (!p || !e) return;

  // HP Bar Width percentages
  const pHpPct = Math.max(0, Math.min(100, (p.hp / p.maxHp) * 100));
  const eHpPct = Math.max(0, Math.min(100, (e.hp / e.maxHp) * 100));

  document.getElementById('player-hp-bar').style.width = `${pHpPct}%`;
  document.getElementById('enemy-hp-bar').style.width = `${eHpPct}%`;

  document.getElementById('player-hp-num').textContent = `${p.hp} / ${p.maxHp} HP`;
  document.getElementById('enemy-hp-num').textContent = `${e.hp} / ${e.maxHp} HP`;

  document.getElementById('player-name').textContent = p.name;
  document.getElementById('player-lvl').textContent = `Niv. ${p.lvl}`;
  document.getElementById('player-sprite').textContent = p.icon;

  document.getElementById('enemy-name').textContent = e.name;
  document.getElementById('enemy-lvl').textContent = `Niv. ${e.lvl}`;
  document.getElementById('enemy-sprite').textContent = e.icon;

  document.getElementById('turn-indicator').textContent = isLocalDuel()
    ? `TURNO ${AppState.battle.turn}: ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName}`
    : `TURNO ${AppState.battle.turn}: ${AppState.battle.isPlayerTurn ? p.name : e.name}`;
}

function updateBattleTeamsRosterUI() {
  // Player Roster
  const playerSlots = document.getElementById('player-roster-slots');
  if (playerSlots && AppState.battle.playerTeam) {
    playerSlots.innerHTML = '';
    AppState.battle.playerTeam.forEach((c, idx) => {
      const isCurrent = idx === AppState.battle.activePlayerIndex;
      const isFainted = c.hp <= 0;
      const pill = document.createElement('div');
      pill.className = `roster-slot-pill ${isCurrent ? 'active' : ''} ${isFainted ? 'fainted' : ''}`;
      pill.title = `${c.name}: ${c.hp}/${c.maxHp} HP ${isCurrent ? '(Actual)' : ''}`;
      pill.innerHTML = `<span>${c.icon}</span><span class="mini-hp">${c.hp}</span>`;
      if (!isCurrent && !isFainted && AppState.battle.isPlayerTurn) {
        pill.onclick = () => switchActivePlayerCreature(idx);
      }
      playerSlots.appendChild(pill);
    });
  }

  // Enemy Roster
  const enemySlots = document.getElementById('enemy-roster-slots');
  if (enemySlots && AppState.battle.enemyTeam) {
    enemySlots.innerHTML = '';
    AppState.battle.enemyTeam.forEach((c, idx) => {
      const isCurrent = idx === AppState.battle.activeEnemyIndex;
      const isFainted = c.hp <= 0;
      const pill = document.createElement('div');
      pill.className = `roster-slot-pill ${isCurrent ? 'active' : ''} ${isFainted ? 'fainted' : ''}`;
      pill.title = `${c.name}: ${c.hp}/${c.maxHp} HP`;
      pill.innerHTML = `<span>${c.icon}</span><span class="mini-hp">${c.hp}</span>`;
      enemySlots.appendChild(pill);
    });
  }
}

function showSubMenu(menuId) {
  if (AppState.battle.networkMatch && !showBattleControlsForTurn()) return;
  SFX.playClick();
  document.getElementById('battle-controls-main').classList.add('hidden');
  document.getElementById('battle-controls-attacks').classList.add('hidden');
  document.getElementById('battle-controls-switch').classList.add('hidden');

  if (menuId === 'attacks') {
    populateAttackControls();
    document.getElementById('battle-controls-attacks').classList.remove('hidden');
  } else if (menuId === 'switch') {
    populateSwitchControls();
    document.getElementById('battle-controls-switch').classList.remove('hidden');
  }
}

function hideSubMenu() {
  SFX.playClick();
  document.getElementById('battle-controls-attacks').classList.add('hidden');
  document.getElementById('battle-controls-switch').classList.add('hidden');
  document.getElementById('battle-controls-main').classList.remove('hidden');
}

function executePlayerAttack(moveName, damage, msgText) {
  if (!AppState.battle.isPlayerTurn) return;
  if (AppState.battle.networkMatch && !showBattleControlsForTurn()) return;
  if (isLocalDuel()) {
    const actorTeam = AppState.battle.localTurn === 1 ? AppState.battle.playerTeam : AppState.battle.enemyTeam;
    const targetTeam = AppState.battle.localTurn === 1 ? AppState.battle.enemyTeam : AppState.battle.playerTeam;
    const actorIndex = AppState.battle.localTurn === 1 ? AppState.battle.activePlayerIndex : AppState.battle.activeEnemyIndex;
    const targetIndex = AppState.battle.localTurn === 1 ? AppState.battle.activeEnemyIndex : AppState.battle.activePlayerIndex;
    const actor = actorTeam[actorIndex];
    const target = targetTeam[targetIndex];
    const move = actor.moves.find(m => m.name === moveName);
    if (!move || move.uses <= 0) return;
    move.uses -= 1;
    SFX.playAttack();
    hideSubMenu();
    target.hp = Math.max(0, target.hp - damage);
    if (target.hp <= 0) {
      target.isFainted = true;
      const next = targetTeam.findIndex(c => c.hp > 0);
      if (next >= 0) {
        if (AppState.battle.localTurn === 1) AppState.battle.activeEnemyIndex = next;
        else AppState.battle.activePlayerIndex = next;
      } else {
        document.getElementById('battle-log').textContent = `¡${target.name} quedó fuera de combate! ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName} gana el duelo.`;
        AppState.battle.finished = true;
        updateBattleUI();
        updateBattleTeamsRosterUI();
        document.getElementById('battle-controls-main').classList.add('hidden');
        if (AppState.battle.networkMatch) { publishLanSnapshot(); clearInterval(LanMatch.timer); }
        alert(`🏆 ¡${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName} ganó el duelo!`);
        return;
      }
    }
    AppState.battle.localTurn = AppState.battle.localTurn === 1 ? 2 : 1;
    AppState.battle.turn += 1;
    AppState.battle.player = AppState.battle.playerTeam[AppState.battle.activePlayerIndex];
    AppState.battle.enemy = AppState.battle.enemyTeam[AppState.battle.activeEnemyIndex];
    populateAttackControls();
    populateSwitchControls();
    updateBattleUI();
    updateBattleTeamsRosterUI();
    document.getElementById('battle-log').textContent = AppState.battle.networkMatch
      ? `¡${actor.name} usó ${moveName}! Turno de ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName}.`
      : `¡${actor.name} usó ${moveName}! ${msgText} Pasa el teléfono a ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName}.`;
    if (AppState.battle.networkMatch) { publishLanSnapshot(); showBattleControlsForTurn(); }
    return;
  }
  SFX.playAttack();

  hideSubMenu();
  const p = AppState.battle.player;
  const e = AppState.battle.enemy;
  const currentMove = p.moves?.find(move => move.name === moveName);
  if (!currentMove || currentMove.uses <= 0) return;
  currentMove.uses -= 1;

  // Animate sprite hit
  const eSprite = document.getElementById('enemy-sprite');
  eSprite.style.transform = 'scale(1.3) rotate(15deg)';
  setTimeout(() => eSprite.style.transform = 'scale(1) rotate(0deg)', 250);

  e.hp = Math.max(0, e.hp - damage);
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `¡${p.name} usó ${moveName}! ${msgText}`;

  // Check if current enemy fainted
  if (e.hp <= 0) {
    e.isFainted = true;
    updateBattleTeamsRosterUI();

    // Look for next non-fainted enemy in team
    const nextEnemyIdx = AppState.battle.enemyTeam.findIndex(item => item.hp > 0);

    if (nextEnemyIdx !== -1) {
      setTimeout(() => {
        SFX.playClick();
        AppState.battle.activeEnemyIndex = nextEnemyIdx;
        AppState.battle.enemy = AppState.battle.enemyTeam[nextEnemyIdx];
        updateBattleUI();
        updateBattleTeamsRosterUI();
        document.getElementById('battle-log').textContent = `¡${e.name} fue derrotado! El rival envía a ${AppState.battle.enemy.name} al combate.`;
        
        // Pass turn to player or allow enemy response
        AppState.battle.isPlayerTurn = false;
        setTimeout(executeEnemyTurn, 1500);
      }, 1000);
      return;
    } else {
      // All enemies defeated -> Complete Victory!
      setTimeout(() => {
        const diffText = (AppState.battle.botDifficulty || 'facil').toUpperCase();
        alert(`🏆 ¡VICTORIA DE BATALLA!\n\n¡Has derrotado a todo el equipo rival (${diffText}) con tus 3 criaturas!\n¡Tu equipo ha ganado +350 EXP y protegido la Reserva Natural Serrana!`);
        navigateTo('pelea');
      }, 600);
      return;
    }
  }

  // Enemy Turn Timeout
  AppState.battle.isPlayerTurn = false;
  updateBattleUI();
  setTimeout(executeEnemyTurn, 1500);
}

function executeEnemyTurn() {
  if (AppState.battle.enemy.hp <= 0) return;
  SFX.playAttack();

  const p = AppState.battle.player;
  const e = AppState.battle.enemy;

  // Attacks pool from enemy object or fallback
  const attacks = e.attacks || [
    { name: 'Zarpazo Feroz', damage: 25 },
    { name: 'Mordisco Selvático', damage: 32 },
    { name: 'Rugido Serrano', damage: 20 }
  ];

  const atk = attacks[Math.floor(Math.random() * attacks.length)];

  // Animate player sprite hit
  const pSprite = document.getElementById('player-sprite');
  pSprite.style.transform = 'scale(1.3) rotate(-15deg)';
  setTimeout(() => pSprite.style.transform = 'scale(1) rotate(0deg)', 250);

  p.hp = Math.max(0, p.hp - atk.damage);
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `¡${e.name} usó ${atk.name}!`;
  
  // Check if active player creature fainted
  if (p.hp <= 0) {
    p.isFainted = true;
    updateBattleTeamsRosterUI();

    // Check if player has other alive creatures in 3-team
    const nextPlayerIdx = AppState.battle.playerTeam.findIndex(item => item.hp > 0);

    if (nextPlayerIdx !== -1) {
      setTimeout(() => {
        SFX.playClick();
        AppState.battle.activePlayerIndex = nextPlayerIdx;
        AppState.battle.player = AppState.battle.playerTeam[nextPlayerIdx];
        populateAttackControls();
        populateSwitchControls();
        updateBattleUI();
        updateBattleTeamsRosterUI();
        document.getElementById('battle-log').textContent = `¡${p.name} se ha debilitado! ¡Entra ${AppState.battle.player.name} a defender el equipo!`;
        AppState.battle.turn += 1;
        AppState.battle.isPlayerTurn = true;
        updateBattleUI();
      }, 1000);
      return;
    } else {
      // All 3 player creatures fainted -> Defeat
      setTimeout(() => {
        const diffText = (AppState.battle.botDifficulty || 'facil').toUpperCase();
        alert(`💔 Derrota en combate.\nTus 3 criaturas se han debilitado ante el bot en nivel ${diffText}.\n¡Entrena en la reserva y vuelve a intentarlo!`);
        navigateTo('pelea');
      }, 600);
      return;
    }
  }

  AppState.battle.turn += 1;
  AppState.battle.isPlayerTurn = true;
  updateBattleUI();
}

function useSkill(skillType) {
  if (!AppState.battle.isPlayerTurn) return;
  if (AppState.battle.networkMatch && !showBattleControlsForTurn()) return;
  SFX.playHeal();

  const p = AppState.battle.player;
  const healAmount = 30;
  p.hp = Math.min(p.maxHp, p.hp + healAmount);
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `¡${p.name} usó Habilidad Refugio Natural! Regeneraste +${healAmount} HP.`;

  if (isLocalDuel()) {
    AppState.battle.localTurn = AppState.battle.localTurn === 1 ? 2 : 1;
    AppState.battle.turn += 1;
    AppState.battle.player = AppState.battle.playerTeam[AppState.battle.activePlayerIndex];
    AppState.battle.enemy = AppState.battle.enemyTeam[AppState.battle.activeEnemyIndex];
    updateBattleUI();
    updateBattleTeamsRosterUI();
    document.getElementById('battle-log').textContent = AppState.battle.networkMatch ? `¡${p.name} usó Habilidad Refugio Natural! Turno de ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName}.` : `¡${p.name} usó Habilidad Refugio Natural! Pasa el teléfono a ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName}.`;
    if (AppState.battle.networkMatch) { publishLanSnapshot(); showBattleControlsForTurn(); }
    return;
  }

  AppState.battle.isPlayerTurn = false;
  setTimeout(executeEnemyTurn, 1500);
}

function useItem(itemType) {
  if (!AppState.battle.isPlayerTurn) return;
  if (AppState.battle.networkMatch && !showBattleControlsForTurn()) return;
  SFX.playHeal();

  const p = AppState.battle.player;
  const healAmount = 45;
  p.hp = Math.min(p.maxHp, p.hp + healAmount);
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `¡Usaste Poción Ecológica de la Mochila en ${p.name}! Restauraste +${healAmount} HP.`;

  if (isLocalDuel()) {
    AppState.battle.localTurn = AppState.battle.localTurn === 1 ? 2 : 1;
    AppState.battle.turn += 1;
    AppState.battle.player = AppState.battle.playerTeam[AppState.battle.activePlayerIndex];
    AppState.battle.enemy = AppState.battle.enemyTeam[AppState.battle.activeEnemyIndex];
    updateBattleUI();
    updateBattleTeamsRosterUI();
    document.getElementById('battle-log').textContent = AppState.battle.networkMatch ? `¡${p.name} usó la mochila! Turno de ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName}.` : `¡${p.name} usó la mochila! Pasa el teléfono a ${AppState.battle.localTurn === 1 ? AppState.battle.localPlayerOneName : AppState.battle.localPlayerTwoName}.`;
    if (AppState.battle.networkMatch) { publishLanSnapshot(); showBattleControlsForTurn(); }
    return;
  }

  AppState.battle.isPlayerTurn = false;
  setTimeout(executeEnemyTurn, 1500);
}

function confirmExitBattle() {
  SFX.playClick();
  if (confirm('¿Deseas rendirte y salir de la arena de batalla?')) {
    navigateTo('pelea');
  }
}

// MODAL CONTROLLERS
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(modalId) {
  SFX.playClick();
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

function openAssetModal(imgFileName) {
  SFX.playClick();
  document.getElementById('asset-modal-title').textContent = `Asset: ${imgFileName}`;
  document.getElementById('asset-modal-img').src = `assets/${imgFileName}`;
  openModal('modal-asset');
}


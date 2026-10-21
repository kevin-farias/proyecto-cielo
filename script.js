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
    favoriteFood: { id: 'nectar', name: 'Néctar de flores', icon: '🌺' },
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
    favoriteFood: { id: 'meat', name: 'Carne fresca', icon: '🥩' },
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
    favoriteFood: { id: 'carob', name: 'Frutos de algarrobo', icon: '🌰' },
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
    favoriteFood: { id: 'compost', name: 'Humus serrano', icon: '🍂' },
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
    favoriteFood: { id: 'mouse', name: 'Ratón de campo', icon: '🐁' },
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
    favoriteFood: { id: 'berries', name: 'Bayas silvestres', icon: '🫐' },
    habitat: 'Matorrales de Punilla',
    desc: 'Cánido nativo astuto y veloz adaptado a las lomas serranas. Desempeña un rol primordial en el ecosistema local.',
    moves: [
      { name: 'Astucia Serrana', dmg: 35, uses: 5, maxUses: 5, text: '¡Movimiento veloz!' },
      { name: 'Embestida Ágil', dmg: 45, uses: 4, maxUses: 4, text: '¡Ataque sorpresa!' },
      { name: 'Colmillo Gris', dmg: 60, uses: 2, maxUses: 2, text: '¡IMPACTO ASTUTO!' }
    ]
  },
  rey_bosque: {
    id: 'rey_bosque',
    name: 'Rey del Bosque',
    icon: '🐦',
    image: 'assets/species/rey_bosque.jpeg',
    badge: 'Ave guardiana serrana',
    hp: 185,
    maxHp: 185,
    spd: 92,
    atk: 78,
    lvl: 19,
    favoriteFood: { id: 'seeds', name: 'Semillas serranas', icon: '🌻' },
    habitat: 'Bosques serranos y quebradas arboladas',
    desc: 'Pheucticus aureoventris, ave de unos 20 cm. El macho tiene cabeza, garganta y pecho negros, vientre amarillo y manchas blancas en las alas. Habita ambientes serranos y captura insectos al vuelo. Es una especie protegida en Argentina.',
    moves: [
      { name: 'Canto del Monte', dmg: 48, uses: 5, maxUses: 5, text: '¡Su canto resuena en las sierras!' },
      { name: 'Aleteo Dorado', dmg: 58, uses: 4, maxUses: 4, text: '¡Un destello amarillo cruza el bosque!' },
      { name: 'Vuelo Guardián', dmg: 72, uses: 2, maxUses: 2, text: '¡EL REY DEL BOSQUE CONTRAATACA!' }
    ]
  }
};

// STATE MANAGEMENT
const AppState = {
  currentScreen: 'splash',
  parkCheckedIn: false,
  soundEnabled: true,
  musicEnabled: true,
  musicVolume: 0.8,
  sfxVolume: 1.0,
  language: 'español',
  isLandscape: false,
  unlockedCreatures: ['picaflor', 'yaguarete', 'pecari', 'quebracho'],
  recentlyUnlocked: [], // Tracks newly captured creatures in this session!
  profileXP: 0,
  creatureCopies: { picaflor: 1, yaguarete: 1, pecari: 1, quebracho: 1 },
  inventory: { nectar: 3, meat: 3, carob: 3, compost: 3, mouse: 3, berries: 3, seeds: 3 },
  
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
    isSecretEncounter: false,
    secretIntroFinished: true,
    player: null,           // Reference to active player creature
    enemy: null             // Reference to active enemy creature
  }
};

const LanMatch = { code: null, side: 0, version: 0, timer: null, syncing: false };
const isLocalDuel = () => AppState.battle.mode === 'local' || AppState.battle.mode === 'network';

let progressSaveQueue = Promise.resolve();
function readLocalPersistentProgress() {
  const readJson = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; } catch (error) { return fallback; }
  };
  const readValue = (key, fallback = '') => {
    try { return localStorage.getItem(key) ?? fallback; } catch (error) { return fallback; }
  };
  const speciesCodes = readJson('species_qr_codes', {});
  const unlockedCreatures = readJson('explorer_unlocked_creatures', AppState.unlockedCreatures);
  const creatureCopies = readJson('explorer_creature_copies', AppState.creatureCopies);
  return {
    unlockedCreatures: Array.isArray(unlockedCreatures) ? unlockedCreatures : AppState.unlockedCreatures,
    creatureCopies: creatureCopies && typeof creatureCopies === 'object' ? creatureCopies : AppState.creatureCopies,
    profileXP: Number(readValue('explorer_profile_xp')) || AppState.profileXP,
    secretBattleWins: Number(readValue('secret_battle_bot_wins')) || 0,
    secretRewardClaimed: readValue('secret_battle_reward_claimed') === 'true',
    profileName: readValue('explorer_profile_name'),
    speciesCodes,
    parkCheckedIn: readValue('reserve_park_checked_in') === 'true',
    parkEntryCode: readValue(RESERVE_ENTRY_CODE_KEY)
  };
}

function writeLocalPersistentProgress(progress) {
  try {
    localStorage.setItem('explorer_unlocked_creatures', JSON.stringify(progress.unlockedCreatures));
    localStorage.setItem('explorer_creature_copies', JSON.stringify(progress.creatureCopies));
    localStorage.setItem('explorer_profile_xp', String(progress.profileXP));
    localStorage.setItem('secret_battle_bot_wins', String(progress.secretBattleWins));
    localStorage.setItem('secret_battle_reward_claimed', String(progress.secretRewardClaimed));
    if (progress.profileName) localStorage.setItem('explorer_profile_name', progress.profileName);
    localStorage.setItem('species_qr_codes', JSON.stringify(progress.speciesCodes));
    localStorage.setItem('reserve_park_checked_in', String(progress.parkCheckedIn));
    if (progress.parkEntryCode) localStorage.setItem(RESERVE_ENTRY_CODE_KEY, progress.parkEntryCode);
  } catch (error) {}
}

function savePersistentProgress() {
  const progress = readLocalPersistentProgress();
  progress.unlockedCreatures = [...new Set([...progress.unlockedCreatures, ...AppState.unlockedCreatures])];
  progress.creatureCopies = { ...AppState.creatureCopies, ...progress.creatureCopies };
  progress.profileXP = Math.max(progress.profileXP, AppState.profileXP);
  progress.secretBattleWins = Math.max(progress.secretBattleWins, getSecretBattleWins());
  progress.secretRewardClaimed = progress.secretRewardClaimed || hasClaimedSecretReward();
  progress.parkCheckedIn = progress.parkCheckedIn || AppState.parkCheckedIn;
  writeLocalPersistentProgress(progress);
  currentProgress = { ...currentProgress, ...progress };
  progressSaveQueue = progressSaveQueue.catch(() => {}).then(() => saveProgress()).catch(() => {});
  return progressSaveQueue;
}

async function syncPersistentProgress() {
  try {
    const response = await fetch('/api/progress', { cache: 'no-store' });
    if (!response.ok) return;
    const remote = await response.json();
    const local = readLocalPersistentProgress();
    const unlockedCreatures = [...new Set([
      ...(Array.isArray(remote.unlockedCreatures) ? remote.unlockedCreatures : []),
      ...(Array.isArray(local.unlockedCreatures) ? local.unlockedCreatures : []),
      ...AppState.unlockedCreatures
    ])].filter(id => CREATURE_DATABASE[id]);
    const copies = { ...(remote.creatureCopies || {}), ...(local.creatureCopies || {}) };
    Object.entries(AppState.creatureCopies).forEach(([id, count]) => {
      copies[id] = Math.max(Number(copies[id]) || 0, Number(count) || 0);
    });
    const progress = {
      unlockedCreatures,
      creatureCopies: copies,
      profileXP: Math.max(0, Number(remote.profileXP) || 0, Number(local.profileXP) || 0, AppState.profileXP),
      secretBattleWins: Math.max(0, Number(remote.secretBattleWins) || 0, Number(local.secretBattleWins) || 0),
      secretRewardClaimed: Boolean(remote.secretRewardClaimed || local.secretRewardClaimed),
      profileName: local.profileName || remote.profileName || 'Explorador',
      speciesCodes: { ...(remote.speciesCodes || {}), ...(local.speciesCodes || {}) },
      parkCheckedIn: Boolean(remote.parkCheckedIn || local.parkCheckedIn),
      parkEntryCode: local.parkEntryCode || remote.parkEntryCode || ''
    };
    writeLocalPersistentProgress(progress);
    AppState.parkCheckedIn = progress.parkCheckedIn;
    restoreExplorerProgress();
    renderCollectionGrid();
    renderFloraFaunaInfo();
    initializeProfile();
    restoreSpeciesCodes();
    renderSecretEncounterStatus();
    renderParkEntryStatus();
    if (reserveMap) { renderReserveAnimalMarkers(); renderReservePlayerMarkers(); }
    await savePersistentProgress();
  } catch (error) {
    // localStorage remains the fallback when the prototype is opened without its Node server.
  }
}

const RESERVE_ENTRY_CODE_KEY = 'reserve_park_entry_code';
const DEFAULT_RESERVE_ENTRY_CODE = '600040';
const RESERVE_BOT_PROFILES = [
  { id: 'bot-luna', name: 'LunaSerrana', avatar: '🌙', level: 8, xp: 375, animals: ['picaflor', 'buho', 'zorro'], coordinates: [-64.5185, -30.8591] },
  { id: 'bot-tomi', name: 'Tomi del Monte', avatar: '🧭', level: 12, xp: 580, animals: ['yaguarete', 'pecari', 'quebracho', 'zorro'], coordinates: [-64.5232, -30.8602] },
  { id: 'bot-uma', name: 'UmaSilvestre', avatar: '🍃', level: 5, xp: 210, animals: ['picaflor', 'pecari'], coordinates: [-64.5202, -30.8641] },
  { id: 'bot-nico', name: 'Nico Cóndor', avatar: '🦅', level: 16, xp: 805, animals: ['buho', 'yaguarete', 'quebracho', 'picaflor', 'zorro'], coordinates: [-64.5244, -30.8579] }
];

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

function showAppPopup(message, options = {}) {
  const { variant = 'alert', title = 'Proyecto Cielo', placeholder = 'Escribe aquí' } = options;
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'app-popup-backdrop';
    const dialog = document.createElement('section');
    dialog.className = 'app-popup';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    const heading = document.createElement('h3'); heading.textContent = title;
    const content = document.createElement('p'); content.textContent = String(message ?? '');
    dialog.append(heading, content);
    let field = null;
    if (variant === 'input') {
      field = document.createElement('input');
      field.type = 'password'; field.placeholder = placeholder; field.autocomplete = 'current-password';
      dialog.appendChild(field);
    }
    const actions = document.createElement('div'); actions.className = 'app-popup-actions';
    const finish = value => { document.removeEventListener('keydown', onKey); overlay.remove(); resolve(value); };
    const cancel = document.createElement('button'); cancel.type = 'button'; cancel.className = 'app-popup-cancel'; cancel.textContent = variant === 'alert' ? 'Cerrar' : 'Cancelar';
    cancel.addEventListener('click', () => finish(variant === 'input' ? null : false));
    if (variant !== 'alert') actions.appendChild(cancel);
    const accept = document.createElement('button'); accept.type = 'button'; accept.className = 'app-popup-accept'; accept.textContent = variant === 'alert' ? 'Aceptar' : 'Continuar';
    accept.addEventListener('click', () => finish(variant === 'input' ? field.value : true));
    actions.appendChild(accept); dialog.appendChild(actions); overlay.appendChild(dialog); document.body.appendChild(overlay);
    const onKey = event => { if (event.key === 'Escape') finish(variant === 'input' ? null : false); if (event.key === 'Enter' && variant === 'input') finish(field.value); };
    document.addEventListener('keydown', onKey);
    (field || accept).focus();
  });
}
window.alert = message => { void showAppPopup(message); };

// INITIALIZATION & CLOCK
let currentAccount = 'explorador';
let currentProgress = {};
const TROPHIC_SPECIES = [
  { id: 'yaguarete', name: 'Yaguareté', icon: '🐆', role: 'Depredador tope', level: 'apex', eats: ['pecari', 'zorro'] },
  { id: 'buho', name: 'Búho serrano', icon: '🦉', role: 'Depredador', level: 'secondary', eats: ['roedores'] },
  { id: 'zorro', name: 'Zorro gris', icon: '🦊', role: 'Depredador', level: 'secondary', eats: ['roedores', 'picaflor'] },
  { id: 'picaflor', name: 'Picaflor cometa', icon: '🌸', role: 'Polinizador', level: 'primary', eats: ['molle', 'quebracho'] },
  { id: 'pecari', name: 'Pecarí de collar', icon: '🐗', role: 'Consumidor primario', level: 'primary', eats: ['molle', 'quebracho'] },
  { id: 'roedores', name: 'Roedores e insectos', icon: '🐭', role: 'Consumidor primario', level: 'primary', eats: ['molle', 'quebracho'] },
  { id: 'quebracho', name: 'Horco quebracho', icon: '🌳', role: 'Productor', level: 'producer', eats: [] },
  { id: 'molle', name: 'Molle y frutos nativos', icon: '🌿', role: 'Productor', level: 'producer', eats: [] },
  { id: 'descomponedores', name: 'Hongos y bacterias', icon: '🍄', role: 'Descomponedores', level: 'decomposer', eats: [] }
];

document.addEventListener('DOMContentLoaded', async () => {
  await loadAccountProgress();
  updateClock();
  setInterval(updateClock, 1000);

  // Render Initial Views
  restoreExplorerProgress();
  renderCollectionGrid();
  renderFloraFaunaInfo();
  initializeProfile();
  renderSecretEncounterStatus();
  renderParkEntryStatus();
  renderTrophicNetwork();
  await saveProgress();
  const storedVolume = localStorage.getItem('music_volume');
  const savedVolume = storedVolume === null ? NaN : Number(storedVolume);
  if (Number.isFinite(savedVolume)) setMusicVolume(savedVolume);

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

function progressPayload() {
  const local = readLocalPersistentProgress();
  return { ...currentProgress, ...local, unlockedCreatures: AppState.unlockedCreatures, creatureCopies: AppState.creatureCopies, profileXP: AppState.profileXP, recentlyUnlocked: [], profileName: localStorage.getItem('explorer_profile_name') || 'Explorador', trophicAbsent: currentProgress.trophicAbsent || [], parkCheckedIn: AppState.parkCheckedIn || local.parkCheckedIn, updatedAt: new Date().toISOString() };
}
async function saveProgress() {
  try { await fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ account: currentAccount, progress: { ...currentProgress, ...progressPayload() } }) }); } catch (error) { console.warn('No se pudo guardar el progreso en el servidor.', error); }
}
async function loadAccountProgress() {
  try {
    AppState.unlockedCreatures = ['picaflor', 'yaguarete', 'pecari', 'quebracho'];
    AppState.creatureCopies = { picaflor: 1, yaguarete: 1, pecari: 1, quebracho: 1 };
    AppState.profileXP = 0;
    AppState.parkCheckedIn = false;
    const savedName = localStorage.getItem('explorer_profile_name') || 'Mateo';
    const accountName = localStorage.getItem('explorer_account_id') || savedName;
    currentAccount = (accountName.trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9_-]/g, '-') || 'explorador').slice(0, 48);
    localStorage.setItem('explorer_account_id', currentAccount);
    const response = await fetch(`/api/progress?account=${encodeURIComponent(currentAccount)}`);
    currentProgress = await response.json();
    if (Array.isArray(currentProgress.unlockedCreatures)) AppState.unlockedCreatures = currentProgress.unlockedCreatures.filter(id => CREATURE_DATABASE[id]);
    if (currentProgress.creatureCopies && typeof currentProgress.creatureCopies === 'object') AppState.creatureCopies = { ...AppState.creatureCopies, ...currentProgress.creatureCopies };
    if (Number.isFinite(Number(currentProgress.profileXP))) AppState.profileXP = Number(currentProgress.profileXP);
    writeLocalPersistentProgress({
      unlockedCreatures: AppState.unlockedCreatures,
      creatureCopies: AppState.creatureCopies,
      profileXP: AppState.profileXP,
      secretBattleWins: Number(currentProgress.secretBattleWins) || 0,
      secretRewardClaimed: Boolean(currentProgress.secretRewardClaimed),
      profileName: currentProgress.profileName || localStorage.getItem('explorer_profile_name') || 'Explorador',
      speciesCodes: currentProgress.speciesCodes || {},
      parkCheckedIn: Boolean(currentProgress.parkCheckedIn),
      parkEntryCode: currentProgress.parkEntryCode || ''
    });
    AppState.parkCheckedIn = Boolean(currentProgress.parkCheckedIn);
    restoreSpeciesCodes();
    AppState.recentlyUnlocked = [];
  } catch (error) { currentProgress = {}; console.warn('El servidor no está disponible; se inicia una sesión nueva.', error); }
}

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
  const allKeys = ['picaflor', 'yaguarete', 'buho', 'pecari', 'zorro', 'quebracho', 'rey_bosque'];
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
        <div class="card-img-placeholder species-thumb"><img src="${data.image || `assets/species/${key}.png`}" alt="${data.name}" hidden><span>${data.icon}</span></div>
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

function renderTrophicNetwork() {
  const container = document.getElementById('trophic-network');
  if (!container) return;
  const absent = new Set(currentProgress.trophicAbsent || []);
  container.innerHTML = '';
  const diagram = document.createElement('div');
  diagram.className = 'trophic-diagram';
  diagram.setAttribute('role', 'group');
  diagram.setAttribute('aria-label', 'Red trófica interactiva. Selecciona una especie para simular su desaparición.');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('trophic-connections');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<defs><marker id="trophic-arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="currentColor"></path></marker></defs>';
  diagram.appendChild(svg);

  const tiers = [
    ['apex', 'Depredador tope'],
    ['secondary', 'Consumidores secundarios'],
    ['primary', 'Consumidores primarios'],
    ['producer', 'Productores'],
    ['decomposer', 'Descomponedores']
  ];
  tiers.forEach(([level, title]) => {
    const row = document.createElement('div');
    row.className = `trophic-level trophic-level-${level}`;
    const label = document.createElement('div'); label.className = 'trophic-level-label'; label.textContent = title;
    row.appendChild(label);
    const nodes = document.createElement('div'); nodes.className = 'trophic-level-nodes';
    TROPHIC_SPECIES.filter(species => species.level === level).forEach(species => {
      const present = !absent.has(species.id);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `trophic-node ${present ? '' : 'is-absent'}`;
      button.dataset.speciesId = species.id;
      button.setAttribute('aria-pressed', String(present));
      button.setAttribute('aria-label', `${species.name}, ${species.role}. ${present ? 'Presente. Toca para simular su desaparición.' : 'Ausente. Toca para recuperarla en la simulación.'}`);
      const icon = document.createElement('span'); icon.className = 'trophic-node-icon'; icon.textContent = species.icon;
      const name = document.createElement('span'); name.className = 'trophic-node-name'; name.textContent = species.name;
      const role = document.createElement('span'); role.className = 'trophic-node-role'; role.textContent = present ? species.role : 'Ausente';
      button.append(icon, name, role);
      button.addEventListener('click', () => {
        const next = new Set(currentProgress.trophicAbsent || []);
        if (next.has(species.id)) next.delete(species.id); else next.add(species.id);
        currentProgress.trophicAbsent = [...next];
        renderTrophicNetwork();
        saveProgress();
      });
      nodes.appendChild(button);
    });
    row.appendChild(nodes); diagram.appendChild(row);
  });
  container.appendChild(diagram);
  const legend = document.createElement('div');
  legend.className = 'trophic-legend';
  legend.textContent = 'Las flechas muestran el flujo de alimento y energía; las flechas punteadas señalan relaciones afectadas.';
  container.appendChild(legend);
  drawTrophicConnections(diagram, svg, absent);
  renderTrophicImpact();
}

function drawTrophicConnections(diagram, svg, absent) {
  const bounds = diagram.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
  svg.setAttribute('width', String(bounds.width));
  svg.setAttribute('height', String(bounds.height));
  svg.querySelectorAll('path.trophic-edge').forEach(path => path.remove());
  const byId = new Map([...diagram.querySelectorAll('.trophic-node')].map(node => [node.dataset.speciesId, node]));
  const decomposerId = 'descomponedores';
  const edges = [];
  TROPHIC_SPECIES.forEach(consumer => {
    consumer.eats.forEach(foodId => edges.push([foodId, consumer.id]));
  });
  TROPHIC_SPECIES.filter(species => species.id !== decomposerId).forEach(species => edges.push([species.id, decomposerId]));
  edges.forEach(([foodId, consumerId]) => {
    const food = byId.get(foodId), consumer = byId.get(consumerId);
    if (!food || !consumer) return;
    const source = food.getBoundingClientRect(), target = consumer.getBoundingClientRect();
    const centerX1 = source.left + source.width / 2 - bounds.left;
    const centerY1 = source.top + source.height / 2 - bounds.top;
    const centerX2 = target.left + target.width / 2 - bounds.left;
    const centerY2 = target.top + target.height / 2 - bounds.top;
    const length = Math.max(1, Math.hypot(centerX2 - centerX1, centerY2 - centerY1));
    const sourceOffset = Math.min(30, length * .22);
    const targetOffset = Math.min(32, length * .24);
    const x1 = centerX1 + (centerX2 - centerX1) / length * sourceOffset;
    const y1 = centerY1 + (centerY2 - centerY1) / length * sourceOffset;
    const x2 = centerX2 - (centerX2 - centerX1) / length * targetOffset;
    const y2 = centerY2 - (centerY2 - centerY1) / length * targetOffset;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const bend = Math.max(22, Math.abs(y2 - y1) * .45);
    const direction = y2 < y1 ? -1 : 1;
    path.setAttribute('d', `M ${x1} ${y1} C ${x1} ${y1 + bend * direction}, ${x2} ${y2 - bend * direction}, ${x2} ${y2}`);
    path.setAttribute('class', `trophic-edge ${absent.has(foodId) || absent.has(consumerId) ? 'is-disrupted' : ''}`);
    path.setAttribute('marker-end', 'url(#trophic-arrowhead)');
    svg.appendChild(path);
  });
}
function refreshTrophicConnections() {
  const diagram = document.querySelector('#trophic-network .trophic-diagram');
  const svg = diagram?.querySelector('.trophic-connections');
  if (diagram && svg) drawTrophicConnections(diagram, svg, new Set(currentProgress.trophicAbsent || []));
}
window.addEventListener('resize', () => requestAnimationFrame(refreshTrophicConnections));
function renderTrophicImpact() {
  const output = document.getElementById('trophic-impact');
  if (!output) return;
  const absent = new Set(currentProgress.trophicAbsent || []);
  if (!absent.size) { output.textContent = 'La red está completa. Las flechas indican quién se alimenta de quién; cambiar una especie puede afectar varias poblaciones.'; return; }
  const effects = [];
  for (const id of absent) {
    const gone = TROPHIC_SPECIES.find(item => item.id === id);
    if (!gone) continue;
    const consumers = TROPHIC_SPECIES.filter(item => item.eats.includes(id) && !absent.has(item.id));
    if (gone.role === 'Productor') effects.push(`Sin ${gone.name}, disminuyen alimento y refugio para herbívoros, y puede bajar la polinización y regeneración del bosque.`);
    else if (gone.role === 'Descomponedores') effects.push('Sin descomponedores, se acumula materia orgánica y se ralentiza el reciclaje de nutrientes del suelo.');
    else if (gone.role.includes('Depredador')) effects.push(`Sin ${gone.name}, sus presas pueden aumentar y consumir más plantas; ${consumers.length ? `${consumers.map(x => x.name).join(' y ')} también pierde una fuente de alimento.` : 'otras especies pueden ocupar parte de su rol.'}`);
    else effects.push(`Sin ${gone.name}, cambia la dispersión de semillas o la polinización y sus depredadores pierden alimento${consumers.length ? ` (${consumers.map(x => x.name).join(', ')})` : ''}.`);
  }
  output.textContent = `Simulación hipotética: ${effects.join(' ')}`;
}

async function openAdminPanel() {
  const pin = await showAppPopup('Escribe el PIN de administrador.', { variant: 'input', title: 'Acceso administrador', placeholder: 'PIN' });
  if (pin === null) return;
  const panel = document.getElementById('admin-panel');
  panel.hidden = false;
  try {
    const result = await adminRequest({ pin, action: 'list' });
    renderAdminSaves(result.saves || [], pin);
    document.getElementById('admin-status').textContent = `Acceso de administrador habilitado. Cuentas guardadas: ${Object.keys(result.accounts || {}).length}.`;
    panel.dataset.pin = pin;
  } catch (error) { panel.hidden = true; alert(error.message); }
}
async function adminRequest(payload) {
  const response = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'No se pudo completar la acción.');
  return result;
}
function renderAdminSaves(saves, pin) {
  const list = document.getElementById('admin-save-list'); list.innerHTML = '';
  if (!saves.length) { list.textContent = 'Todavía no hay guardados de administrador.'; return; }
  saves.forEach((save, index) => {
    const row = document.createElement('div'); row.className = 'admin-save-row';
    const label = document.createElement('span'); label.textContent = `Respaldo ${index + 1} · ${new Date(save.createdAt).toLocaleString('es-AR')}`;
    const button = document.createElement('button'); button.className = 'btn-figma btn-secondary'; button.textContent = 'Restaurar';
    button.addEventListener('click', async () => {
      if (!await showAppPopup('¿Restaurar todas las cuentas a este respaldo?', { variant: 'confirm', title: 'Restaurar respaldo' })) return;
      try { await adminRequest({ pin, action: 'restore', index }); location.reload(); }
      catch (error) { document.getElementById('admin-status').textContent = error.message; }
    });
    row.append(label, button); list.appendChild(row);
  });
}
async function adminSaveAll() {
  const pin = document.getElementById('admin-panel').dataset.pin;
  try {
    await saveProgress();
    const result = await adminRequest({ pin, action: 'save' });
    renderAdminSaves(result.saves || [], pin);
    document.getElementById('admin-status').textContent = 'Guardado administrador creado para todas las cuentas.';
  } catch (error) { document.getElementById('admin-status').textContent = error.message; }
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
  } else if (screenId === 'pelea') {
    renderSecretEncounterStatus();
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
  if (screenId === 'info_red_trofica') requestAnimationFrame(refreshTrophicConnections);

  setActiveMusic(screenId === 'battle_arena' ? 'battle' : 'home', screenId === 'battle_arena');
  if (screenId === 'mapa') initializeReserveMap();

  // AUTOMATIC HORIZONTAL ORIENTATION FOR BATTLE SCREEN!
  if (screenId === 'battle_arena') {
    setLandscapeMode(true);
    requestAnimationFrame(() => playBattleEntranceAnimation());
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

function playBattleEntranceAnimation() {
  const arena = document.getElementById('screen-battle_arena');
  const message = document.getElementById('battle-intro-message');
  if (!arena || !message) return;

  const battle = AppState.battle;
  if (battle.isSecretEncounter) message.textContent = '¡Cynthia, guardiana de Villa Cielo, te desafía!';
  else if (battle.networkMatch) message.textContent = '¡Comienza el duelo por Wi‑Fi!';
  else if (battle.mode === 'local') message.textContent = `¡${battle.localPlayerTwoName} te desafía!`;
  else message.textContent = `¡${battle.enemy?.name || 'Un rival'} te desafía!`;

  arena.classList.remove('battle-entering');
  void arena.offsetWidth;
  arena.classList.add('battle-entering');
  window.setTimeout(() => arena.classList.remove('battle-entering'), 1750);
}

function initializeProfile() {
  const input = document.getElementById('profile-name');
  if (!input) return;
  const name = currentProgress.profileName || localStorage.getItem('explorer_profile_name') || 'Explorador';
  localStorage.setItem('explorer_profile_name', name);
  const accountInput = document.getElementById('account-name');
  if (accountInput) accountInput.value = currentAccount;
  input.value = name;
  renderProfileGreeting(name);
  renderExplorerProgress();
}

function restoreExplorerProgress() {
  try {
    const savedCollection = Array.isArray(currentProgress.unlockedCreatures)
      ? currentProgress.unlockedCreatures
      : JSON.parse(localStorage.getItem('explorer_unlocked_creatures') || 'null');
    if (Array.isArray(savedCollection)) {
      AppState.unlockedCreatures = [...new Set(savedCollection.filter(id => CREATURE_DATABASE[id]))];
    }
    const savedCopies = currentProgress.creatureCopies || JSON.parse(localStorage.getItem('explorer_creature_copies') || 'null');
    AppState.unlockedCreatures.forEach(id => {
      const copies = Number(savedCopies?.[id]);
      AppState.creatureCopies[id] = Number.isInteger(copies) && copies > 0 ? copies : 1;
    });
    const savedXP = Number(currentProgress.profileXP ?? localStorage.getItem('explorer_profile_xp'));
    if (Number.isFinite(savedXP) && savedXP >= 0) AppState.profileXP = savedXP;
  } catch (error) {
    // Keep the default collection and progress when browser storage is unavailable.
  }
}

function getExplorerLevel() {
  const xpPerLevel = 500;
  const xp = Math.max(0, AppState.profileXP);
  return {
    level: Math.floor(xp / xpPerLevel) + 1,
    currentXP: xp % xpPerLevel,
    xpPerLevel,
    totalXP: xp
  };
}

function renderExplorerProgress() {
  const levelLabel = document.getElementById('profile-level-label');
  const xpFill = document.getElementById('profile-xp-fill');
  const xpLabel = document.getElementById('profile-xp-label');
  const xpTrack = document.querySelector('.profile-xp-track');
  const animalList = document.getElementById('profile-animal-list');
  const level = getExplorerLevel();
  if (levelLabel) levelLabel.textContent = `Nivel ${level.level} · ${level.totalXP} EXP`;
  if (xpFill) xpFill.style.width = `${(level.currentXP / level.xpPerLevel) * 100}%`;
  if (xpLabel) xpLabel.textContent = `${level.currentXP} / ${level.xpPerLevel} EXP para el próximo nivel`;
  if (xpTrack) xpTrack.setAttribute('aria-valuenow', String(level.currentXP));
  if (animalList) {
    animalList.replaceChildren();
    if (!AppState.unlockedCreatures.length) {
      animalList.textContent = 'Aún no descubriste animales.';
    } else {
      AppState.unlockedCreatures.forEach(id => {
        const creature = CREATURE_DATABASE[id];
        if (!creature) return;
        const chip = document.createElement('span');
        chip.className = 'profile-animal-chip';
        const copies = AppState.creatureCopies[id] || 1;
        chip.textContent = `${creature.icon} ${creature.name}${copies > 1 ? ` ×${copies}` : ''}`;
        animalList.append(chip);
      });
    }
  }
}

function awardProfileXP(amount) {
  const previousLevel = getExplorerLevel().level;
  AppState.profileXP += amount;
  try { localStorage.setItem('explorer_profile_xp', String(AppState.profileXP)); } catch (error) {}
  savePersistentProgress();
  renderExplorerProgress();
  const nextLevel = getExplorerLevel().level;
  if (nextLevel > previousLevel) {
    const greeting = document.getElementById('profile-greeting');
    if (greeting) greeting.textContent = `¡Subiste al nivel ${nextLevel}! Sigue explorando la reserva.`;
  }
}

async function shareExplorerProfile() {
  const name = document.getElementById('profile-name')?.value.trim() || 'Explorador';
  const level = getExplorerLevel();
  const animals = AppState.unlockedCreatures
    .map(id => CREATURE_DATABASE[id])
    .filter(Boolean)
    .map(creature => `${creature.icon} ${creature.name}${AppState.creatureCopies[creature.id] > 1 ? ` ×${AppState.creatureCopies[creature.id]}` : ''}`);
  const profileText = [
    `🌿 Perfil de explorador · Proyecto Cielo`,
    `Nombre: ${name}`,
    `Nivel ${level.level} · ${level.totalXP} EXP`,
    `Animales descubiertos (${animals.length}/${Object.keys(CREATURE_DATABASE).length}): ${animals.join(', ') || 'ninguno todavía'}`
  ].join('\n');
  const status = document.getElementById('profile-share-status');
  try {
    if (navigator.share) {
      await navigator.share({ title: `Perfil de ${name}`, text: profileText });
      if (status) status.textContent = '¡Perfil compartido!';
      return;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(profileText);
    } else {
      const copyField = document.createElement('textarea');
      copyField.value = profileText;
      copyField.style.position = 'fixed';
      copyField.style.opacity = '0';
      document.body.append(copyField);
      copyField.select();
      const copied = document.execCommand('copy');
      copyField.remove();
      if (!copied) throw new Error('No se pudo copiar');
    }
    if (status) status.textContent = 'Perfil copiado. Ya puedes pegarlo y compartirlo.';
  } catch (error) {
    if (error.name !== 'AbortError' && status) status.textContent = 'No se pudo compartir. Inténtalo otra vez.';
  }
}

function renderProfileGreeting(name) {
  const greeting = document.getElementById('profile-greeting');
  if (greeting) greeting.textContent = `¡Hola, ${name}! Tu aventura te espera.`;
}

function saveProfileName() {
  const input = document.getElementById('profile-name');
  const name = input?.value.trim().slice(0, 24) || 'Explorador';
  if (input) input.value = name;
  try { localStorage.setItem('explorer_profile_name', name); } catch (error) {}
  const accountName = document.getElementById('account-name')?.value.trim() || name;
  currentAccount = (accountName.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9_-]/g, '-') || 'explorador').slice(0, 48);
  localStorage.setItem('explorer_account_id', currentAccount);
  loadAccountProgress().then(() => { restoreExplorerProgress(); initializeProfile(); renderCollectionGrid(); renderFloraFaunaInfo(); renderTrophicNetwork(); renderSecretEncounterStatus(); renderParkEntryStatus(); saveProgress(); });
  renderProfileGreeting(name);
  renderParkEntryStatus();
  if (reserveMap) renderReservePlayerMarkers();
}

function isCheckedIntoPark() {
  if (AppState.parkCheckedIn) return true;
  try {
    AppState.parkCheckedIn = localStorage.getItem('reserve_park_checked_in') === 'true';
    return AppState.parkCheckedIn;
  } catch (error) { return false; }
}

function renderParkEntryStatus() {
  const checkedIn = isCheckedIntoPark();
  const status = document.getElementById('park-entry-status');
  const playersButton = document.getElementById('park-players-button');
  const inlinePanel = document.getElementById('park-players-inline');
  const inlineList = document.getElementById('park-players-inline-list');
  if (status) status.textContent = checkedIn
    ? '✅ Entrada registrada. Ya figuras entre quienes están en la reserva.'
    : 'Escanea el código para registrar tu entrada.';
  if (playersButton) playersButton.disabled = !checkedIn;
  if (inlinePanel) inlinePanel.hidden = !checkedIn;
  if (inlineList) {
    if (checkedIn) renderParkPlayerCards(inlineList, getReserveVisitors());
    else inlineList.replaceChildren();
  }
  renderReserveEntryCode();
}

function renderReserveEntryCode() {
  const codeDisplay = document.getElementById('park-entry-current-code');
  if (!codeDisplay) return;
  let code = DEFAULT_RESERVE_ENTRY_CODE;
  try { code = localStorage.getItem(RESERVE_ENTRY_CODE_KEY) || code; } catch (error) {}
  codeDisplay.textContent = code;
}

function openParkEntryScanner() {
  SFX.playClick();
  const input = document.getElementById('park-entry-code');
  const feedback = document.getElementById('park-entry-feedback');
  if (input) input.value = '';
  if (feedback) feedback.textContent = '';
  previewParkEntryCode('');
  renderReserveEntryCode();
  openModal('modal-park-entry');
}

function previewParkEntryCode(value) {
  const preview = document.getElementById('park-entry-preview');
  if (preview) preview.textContent = `Código ingresado: ${value || '—'}`;
}

function simulateParkEntryScan() {
  SFX.playQRScan();
  let code = DEFAULT_RESERVE_ENTRY_CODE;
  try { code = localStorage.getItem(RESERVE_ENTRY_CODE_KEY) || ''; } catch (error) {}
  if (!code) {
    code = String(Math.floor(100000 + Math.random() * 900000));
    try { localStorage.setItem(RESERVE_ENTRY_CODE_KEY, code); } catch (error) {}
  }
  const input = document.getElementById('park-entry-code');
  if (input) input.value = code;
  previewParkEntryCode(code);
  registerParkEntry(code, true);
}

function redeemParkEntryCode() {
  const code = document.getElementById('park-entry-code')?.value.trim();
  SFX.playQRScan();
  if (!/^\d{6}$/.test(code || '')) {
    const feedback = document.getElementById('park-entry-feedback');
    if (feedback) feedback.textContent = 'Escribe exactamente 6 números para guardar tu código de acceso.';
    return;
  }
  try { localStorage.setItem(RESERVE_ENTRY_CODE_KEY, code); } catch (error) {}
  registerParkEntry(code, false);
}

function registerParkEntry(code, simulatedScan) {
  if (!/^\d{6}$/.test(code || '')) return;
  AppState.parkCheckedIn = true;
  try {
    localStorage.setItem(RESERVE_ENTRY_CODE_KEY, code);
    localStorage.setItem('reserve_park_checked_in', 'true');
  } catch (error) {}
  savePersistentProgress();
  const feedback = document.getElementById('park-entry-feedback');
  if (feedback) feedback.textContent = simulatedScan
    ? `Código ${code} escaneado. ¡Entrada registrada!`
    : `Código ${code} guardado. ¡Entrada registrada!`;
  renderParkEntryStatus();
  if (reserveMap) renderReservePlayerMarkers();
  closeModal('modal-park-entry');
  requestAnimationFrame(() => openParkPlayers());
}

function getReserveVisitors() {
  const visitors = RESERVE_BOT_PROFILES.map(profile => ({ ...profile, isBot: true }));
  if (isCheckedIntoPark()) {
    let name = 'Explorador';
    try { name = localStorage.getItem('explorer_profile_name') || name; } catch (error) {}
    visitors.unshift({
      id: 'current-player', name, avatar: '🌿', level: getExplorerLevel().level,
      xp: getExplorerLevel().totalXP, animals: [...AppState.unlockedCreatures], isBot: false
    });
  }
  return visitors;
}

function openParkPlayers() {
  if (!isCheckedIntoPark()) {
    renderParkEntryStatus();
    return;
  }
  const visitors = getReserveVisitors();
  const list = document.getElementById('park-players-list');
  const count = document.getElementById('park-player-count');
  const modal = document.getElementById('modal-park-players');
  const inlinePanel = document.getElementById('park-players-inline');
  const inlineList = document.getElementById('park-players-inline-list');
  if (inlinePanel) inlinePanel.hidden = false;
  if (inlineList) renderParkPlayerCards(inlineList, visitors);
  if (!modal || !list) return;
  if (count) count.textContent = `${visitors.length} ${visitors.length === 1 ? 'jugador presente' : 'jugadores presentes'}`;
  renderParkPlayerCards(list, visitors);
  modal.classList.remove('hidden');
  modal.style.zIndex = '1001';
}

function renderParkPlayerCards(list, visitors) {
  if (!list) return;
  list.replaceChildren();
  visitors.forEach(profile => {
    const card = document.createElement('article');
    card.className = 'park-player-card';
    const avatar = document.createElement('span');
    avatar.className = 'park-player-avatar';
    avatar.textContent = profile.avatar;
    const details = document.createElement('span');
    details.className = 'park-player-details';
    const playerName = document.createElement('strong');
    playerName.textContent = profile.name;
    const playerMeta = document.createElement('small');
    playerMeta.textContent = `Nivel ${profile.level} · ${profile.animals.length} animales`;
    details.append(playerName, playerMeta);
    const viewButton = document.createElement('button');
    viewButton.type = 'button';
    viewButton.className = 'btn-figma btn-secondary';
    viewButton.textContent = 'Ver perfil';
    viewButton.addEventListener('click', () => openReservePlayerProfile(profile.id));
    card.append(avatar, details, viewButton);
    list.append(card);
  });
}

function openReservePlayerProfile(profileId) {
  const profile = getReserveVisitors().find(visitor => visitor.id === profileId);
  if (!profile) return;
  document.getElementById('park-player-profile-title').textContent = `Perfil de ${profile.name}`;
  const content = document.getElementById('park-player-profile-content');
  if (!content) return;
  content.replaceChildren();
  const summary = document.createElement('div');
  summary.className = 'reserve-profile-summary';
  summary.innerHTML = `<span aria-hidden="true">${profile.avatar}</span><div><strong></strong><small>Nivel ${profile.level} · ${profile.xp} EXP</small></div>`;
  summary.querySelector('strong').textContent = profile.name;
  const animalsTitle = document.createElement('strong');
  animalsTitle.className = 'reserve-profile-animals-title';
  animalsTitle.textContent = `Animales (${profile.animals.length})`;
  const animals = document.createElement('div');
  animals.className = 'profile-animal-list reserve-profile-animals';
  profile.animals.forEach(id => {
    const creature = CREATURE_DATABASE[id];
    if (!creature) return;
    const chip = document.createElement('span');
    chip.className = 'profile-animal-chip';
    const copies = profile.isBot ? 1 : AppState.creatureCopies[id] || 1;
    chip.textContent = `${creature.icon} ${creature.name}${copies > 1 ? ` ×${copies}` : ''}`;
    animals.append(chip);
  });
  if (!profile.animals.length) animals.textContent = 'Todavía no tiene animales.';
  content.append(summary, animalsTitle, animals);
  openModal('modal-park-player-profile');
}

function leavePark() {
  try { localStorage.removeItem('reserve_park_checked_in'); } catch (error) {}
  AppState.parkCheckedIn = false;
  closeModal('modal-park-players');
  const inlinePanel = document.getElementById('park-players-inline');
  if (inlinePanel) inlinePanel.hidden = true;
  savePersistentProgress();
  renderParkEntryStatus();
  if (reserveMap) renderReservePlayerMarkers();
}

function setMusicVolume(value) {
  const volume = Math.max(0, Math.min(100, Number(value))) / 100;
  AppState.musicVolume = volume;
  ['home-music', 'battle-music', 'secret-encounter-music'].forEach(id => {
    const audio = document.getElementById(id);
    if (audio) audio.volume = volume;
  });
  const slider = document.getElementById('home-music-volume');
  const label = document.getElementById('home-music-volume-label');
  if (slider) slider.value = String(Math.round(volume * 100));
  if (label) label.textContent = `${Math.round(volume * 100)}%`;
  const settingsSlider = document.getElementById('slider-music');
  const settingsLabel = document.getElementById('val-music');
  if (settingsSlider) settingsSlider.value = String(Math.round(volume * 100));
  if (settingsLabel) settingsLabel.textContent = `${Math.round(volume * 100)}%`;
  localStorage.setItem('music_volume', String(Math.round(volume * 100)));
}

function setActiveMusic(scene, restart = false) {
  const home = document.getElementById('home-music');
  const battle = document.getElementById('battle-music');
  const secretIntro = document.getElementById('secret-encounter-music');
  if (!home || !battle) return;
  const current = scene === 'battle'
    ? (AppState.battle.isSecretEncounter && !AppState.battle.secretIntroFinished ? secretIntro : battle)
    : home;
  [home, battle, secretIntro].filter(track => track && track !== current).forEach(track => track.pause());
  if (!current) return;
  if (restart) {
    current.pause();
    current.currentTime = 0;
  }
  if (!AppState.soundEnabled || !AppState.musicEnabled) return;
  current.volume = AppState.musicVolume;
  current.play().then(() => {
    const toggle = document.getElementById('music-toggle');
    if (toggle) toggle.textContent = '⏸ Pausar';
  }).catch(() => {});
}

function toggleMusicPlayback() {
  const home = document.getElementById('home-music');
  const battle = document.getElementById('battle-music');
  const secretIntro = document.getElementById('secret-encounter-music');
  if (!home || !battle) return;
  const current = AppState.currentScreen === 'battle_arena'
    ? (AppState.battle.isSecretEncounter && !AppState.battle.secretIntroFinished ? secretIntro : battle)
    : home;
  if (current.paused) {
    AppState.musicEnabled = true;
    setActiveMusic(AppState.currentScreen === 'battle_arena' ? 'battle' : 'home');
  } else {
    home.pause();
    battle.pause();
    secretIntro?.pause();
    AppState.musicEnabled = false;
    const toggle = document.getElementById('music-toggle');
    if (toggle) toggle.textContent = '▶ Reproducir';
  }
}

let reserveMap;
const RESERVE_ANIMAL_SIGHTINGS = [
  { id: 'picaflor', coordinates: [-64.5184, -30.8595], zone: 'Jardín de flores nativas' },
  { id: 'yaguarete', coordinates: [-64.5248, -30.8620], zone: 'Corredor de bosque serrano' },
  { id: 'pecari', coordinates: [-64.5199, -30.8636], zone: 'Matorral y sendero bajo' },
  { id: 'quebracho', coordinates: [-64.5228, -30.8584], zone: 'Bosque de quebrachos' },
  { id: 'buho', coordinates: [-64.5255, -30.8589], zone: 'Quebrada de sombra' },
  { id: 'zorro', coordinates: [-64.5175, -30.8615], zone: 'Borde del monte' },
  { id: 'rey_bosque', coordinates: [-64.5221, -30.8569], zone: 'Arboleda alta y borde de quebrada' }
];
const reserveAnimalMarkers = new Map();
const reservePlayerMarkers = new Map();
function initializeReserveMap() {
  const container = document.getElementById('reserve-map');
  if (!container || !window.maplibregl) return;
  if (!reserveMap) {
    const villaCielo = [-64.5208, -30.8607];
    reserveMap = new maplibregl.Map({
      container,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: villaCielo,
      zoom: 15,
      attributionControl: true
    });
    reserveMap.addControl(new maplibregl.NavigationControl(), 'top-right');
    new maplibregl.Marker({ color: '#2d8a53' })
      .setLngLat(villaCielo)
      .setPopup(new maplibregl.Popup().setText('Reserva Natural Municipal Villa Cielo · Capilla del Monte'))
      .addTo(reserveMap);
    renderReserveAnimalMarkers();
  }
  renderReservePlayerMarkers();
  requestAnimationFrame(() => reserveMap.resize());
}

function renderReservePlayerMarkers() {
  const list = document.getElementById('map-player-list');
  const heading = document.getElementById('map-players-heading');
  if (!reserveMap || !list || !window.maplibregl) return;
  reservePlayerMarkers.forEach(marker => marker.remove());
  reservePlayerMarkers.clear();
  list.replaceChildren();
  const checkedIn = isCheckedIntoPark();
  if (heading) heading.hidden = !checkedIn;
  list.hidden = !checkedIn;
  if (!checkedIn) return;

  getReserveVisitors().forEach(profile => {
    const coordinates = profile.isBot ? profile.coordinates : [-64.5213, -30.8615];
    if (!coordinates) return;

    const markerElement = document.createElement('button');
    markerElement.type = 'button';
    markerElement.className = `map-player-marker${profile.isBot ? ' bot' : ' self'}`;
    markerElement.textContent = profile.avatar;
    markerElement.setAttribute('aria-label', `Ver perfil de ${profile.name}, nivel ${profile.level}`);
    markerElement.title = `${profile.name} · Nivel ${profile.level}`;

    const popupContent = document.createElement('div');
    popupContent.className = 'animal-popup map-player-popup';
    const title = document.createElement('strong');
    title.textContent = `${profile.avatar} ${profile.name}`;
    const meta = document.createElement('p');
    meta.textContent = `${profile.isBot ? 'Bot simulado' : 'Tu perfil'} · Nivel ${profile.level} · ${profile.animals.length} animales`;
    const viewButton = document.createElement('button');
    viewButton.type = 'button';
    viewButton.className = 'animal-qr-button';
    viewButton.textContent = 'Ver perfil';
    viewButton.addEventListener('click', () => openReservePlayerProfile(profile.id));
    popupContent.append(title, meta, viewButton);

    const marker = new maplibregl.Marker({ element: markerElement, anchor: 'bottom' })
      .setLngLat(coordinates)
      .setPopup(new maplibregl.Popup({ offset: 24 }).setDOMContent(popupContent))
      .addTo(reserveMap);
    reservePlayerMarkers.set(profile.id, marker);

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'map-player-item';
    const avatar = document.createElement('span');
    avatar.className = 'map-animal-icon';
    avatar.textContent = profile.avatar;
    const details = document.createElement('span');
    details.className = 'map-animal-details';
    const name = document.createElement('strong');
    name.textContent = profile.name;
    const subtitle = document.createElement('small');
    subtitle.textContent = `${profile.isBot ? 'Bot simulado' : 'Estás en la reserva'} · Nivel ${profile.level}`;
    const action = document.createElement('span');
    action.className = 'map-player-view-label';
    action.textContent = 'Ver perfil ›';
    details.append(name, subtitle);
    item.append(avatar, details, action);
    item.addEventListener('click', () => focusReservePlayer(profile.id));
    list.append(item);
  });
}

function focusReservePlayer(profileId) {
  const profile = getReserveVisitors().find(visitor => visitor.id === profileId);
  const marker = reservePlayerMarkers.get(profileId);
  const coordinates = profile?.isBot ? profile.coordinates : profile ? [-64.5213, -30.8615] : null;
  if (!coordinates || !reserveMap || !marker) return;
  reserveMap.flyTo({ center: coordinates, zoom: 16, duration: 700 });
  if (!marker.getPopup().isOpen()) marker.togglePopup();
}

function renderReserveAnimalMarkers() {
  const list = document.getElementById('map-animal-list');
  if (!reserveMap || !list || !window.maplibregl) return;
  reserveAnimalMarkers.forEach(marker => marker.remove());
  reserveAnimalMarkers.clear();
  list.replaceChildren();
  RESERVE_ANIMAL_SIGHTINGS.forEach(sighting => {
    const animal = CREATURE_DATABASE[sighting.id];
    if (!animal) return;
    const discovered = AppState.unlockedCreatures.includes(sighting.id);
    const popupContent = document.createElement('div');
    popupContent.className = 'animal-popup';
    const title = document.createElement('strong');
    title.textContent = `${animal.icon} ${animal.name}`;
    const zone = document.createElement('p');
    zone.textContent = `Zona orientativa: ${sighting.zone}`;
    const habitat = document.createElement('p');
    habitat.textContent = animal.habitat;
    const status = document.createElement('span');
    status.textContent = discovered ? 'En tu colección' : 'Aún por descubrir';
    const qrButton = document.createElement('button');
    qrButton.type = 'button';
    qrButton.className = 'animal-qr-button';
    qrButton.textContent = discovered ? 'Ver código de especie' : 'Ingresar código QR';
    qrButton.addEventListener('click', () => openQRScanner(sighting.id));
    popupContent.append(title, zone, habitat, status);
    if (sighting.id !== 'rey_bosque') {
      const qrButton = document.createElement('button');
      qrButton.type = 'button';
      qrButton.className = 'animal-qr-button';
      qrButton.textContent = discovered ? 'Ver código de especie' : 'Ingresar código QR';
      qrButton.addEventListener('click', () => openQRScanner(sighting.id));
      popupContent.append(qrButton);
    } else if (!discovered) {
      const secretHint = document.createElement('span');
      secretHint.textContent = 'Recompensa del encuentro secreto';
      popupContent.append(secretHint);
    }

    const markerElement = document.createElement('button');
    markerElement.type = 'button';
    markerElement.className = `animal-map-marker${discovered ? ' discovered' : ''}`;
    markerElement.textContent = animal.icon;
    markerElement.setAttribute('aria-label', `Ver ubicación orientativa de ${animal.name}`);
    markerElement.title = animal.name;
    const popup = new maplibregl.Popup({ offset: 24 }).setDOMContent(popupContent);
    const marker = new maplibregl.Marker({ element: markerElement, anchor: 'bottom' })
      .setLngLat(sighting.coordinates)
      .setPopup(popup)
      .addTo(reserveMap);
    reserveAnimalMarkers.set(sighting.id, marker);

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'map-animal-item';
    const icon = document.createElement('span');
    icon.className = 'map-animal-icon';
    icon.textContent = animal.icon;
    const details = document.createElement('span');
    details.className = 'map-animal-details';
    const name = document.createElement('strong');
    name.textContent = animal.name;
    const subtitle = document.createElement('small');
    subtitle.textContent = `${sighting.zone} · ${discovered ? 'Descubierto' : 'Por descubrir'}`;
    details.append(name, subtitle);
    const arrow = document.createElement('span');
    arrow.textContent = '›';
    item.append(icon, details, arrow);
    item.addEventListener('click', () => focusReserveAnimal(sighting.id));
    list.append(item);
  });
}

function focusReserveAnimal(animalId) {
  const sighting = RESERVE_ANIMAL_SIGHTINGS.find(item => item.id === animalId);
  const marker = reserveAnimalMarkers.get(animalId);
  if (!sighting || !reserveMap || !marker) return;
  reserveMap.flyTo({ center: sighting.coordinates, zoom: 16, duration: 700 });
  if (!marker.getPopup().isOpen()) marker.togglePopup();
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
    document.getElementById('home-music')?.pause();
    document.getElementById('battle-music')?.pause();
    document.getElementById('secret-encounter-music')?.pause();
  }
  if (AppState.soundEnabled) setActiveMusic(AppState.currentScreen === 'battle_arena' ? 'battle' : 'home');
}

// SETTINGS CONTROLS
function updateVolume(type, val) {
  if (type === 'music') {
    setMusicVolume(val);
  } else if (type === 'sfx') {
    AppState.sfxVolume = val / 100;
    document.getElementById('val-sfx').textContent = `${val}%`;
  }
}

// ==========================================
// BUILT-IN MULTI-LANGUAGE SYSTEM
// ==========================================
const languages = ['español', 'english', 'português'];

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
    googleActive: 'Idiomas del juego',
    googleHint: 'Cambia el idioma de los menús y textos desde este ajuste.',
    homeTitle: 'Inicio',
    scanQrTitle: 'Escanear criaturas de la naturaleza',
    btnCollection: 'COLECCIÓN',
    btnInfo: 'INFORMACIÓN',
    btnMap: 'MAPA INTEGRADO',
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
    googleActive: 'Game languages',
    googleHint: 'Change the language of menus and text here.',
    homeTitle: 'Home',
    scanQrTitle: 'Scan wild nature creatures',
    btnCollection: 'COLLECTION',
    btnInfo: 'INFORMATION',
    btnMap: 'INTEGRATED MAP',
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
    googleActive: 'Idiomas do jogo',
    googleHint: 'Altere o idioma dos menus e textos neste ajuste.',
    homeTitle: 'Início',
    scanQrTitle: 'Escanear criaturas da natureza',
    btnCollection: 'COLEÇÃO',
    btnInfo: 'INFORMAÇÃO',
    btnMap: 'MAPA INTEGRADO',
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

  // Translate the app directly; no external translation widget is used.
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
  if (menuBtns[2]) menuBtns[2].innerHTML = `<span class="btn-icon">📍</span> ${t.btnMap}`;
  if (menuBtns[3]) menuBtns[3].innerHTML = `<span class="btn-icon">⚔️</span> ${t.btnBattle}`;

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
  void showAppPopup('Gracias por probar WAR IN HEAVEN (Proyecto Cielo). Tu experiencia se reiniciará.');
  navigateTo('splash');
}

// QR SCANNER SIMULATOR
let pendingQRTarget = null;
const DEFAULT_QR_CREATURE_CODES = {
  '100001': 'picaflor',
  '100002': 'yaguarete',
  '100003': 'pecari',
  '100004': 'quebracho',
  '100005': 'buho',
  '100006': 'zorro'
};
let QR_CREATURE_CODES = { ...DEFAULT_QR_CREATURE_CODES };

function restoreSpeciesCodes() {
  try {
    const saved = JSON.parse(localStorage.getItem('species_qr_codes') || 'null');
    if (saved && typeof saved === 'object') {
      QR_CREATURE_CODES = {};
      Object.entries(saved).forEach(([id, code]) => {
        if (CREATURE_DATABASE[id] && id !== 'rey_bosque' && /^\d{6}$/.test(String(code))) QR_CREATURE_CODES[String(code)] = id;
      });
      Object.entries(DEFAULT_QR_CREATURE_CODES).forEach(([code, id]) => {
        if (!Object.values(QR_CREATURE_CODES).includes(id) && !QR_CREATURE_CODES[code]) QR_CREATURE_CODES[code] = id;
      });
    }
  } catch (error) { QR_CREATURE_CODES = { ...DEFAULT_QR_CREATURE_CODES }; }
  Object.keys(QR_CREATURE_CODES).forEach(code => {
    if (QR_CREATURE_CODES[code] === 'rey_bosque') delete QR_CREATURE_CODES[code];
  });
  Object.entries(CREATURE_DATABASE).filter(([id]) => id !== 'rey_bosque').forEach(([id], index) => {
    const field = document.getElementById(`species-code-${id}`);
    if (field) field.value = Object.entries(QR_CREATURE_CODES).find(([, target]) => target === id)?.[0] || Object.keys(DEFAULT_QR_CREATURE_CODES)[index];
  });
}

function saveSpeciesCodes() {
  const fields = Object.keys(CREATURE_DATABASE).filter(id => id !== 'rey_bosque').map(id => ({ id, field: document.getElementById(`species-code-${id}`) }));
  const values = fields.map(({ field }) => field?.value.trim() || '');
  const status = document.getElementById('species-code-settings-status');
  if (values.some(code => !/^\d{6}$/.test(code))) {
    if (status) status.textContent = 'Cada especie debe tener un código de exactamente 6 números.';
    return;
  }
  if (new Set(values).size !== values.length) {
    if (status) status.textContent = 'Cada especie necesita un código distinto.';
    return;
  }
  QR_CREATURE_CODES = Object.fromEntries(fields.map(({ id }, index) => [values[index], id]));
  const savedBySpecies = Object.fromEntries(fields.map(({ id }, index) => [id, values[index]]));
  try { localStorage.setItem('species_qr_codes', JSON.stringify(savedBySpecies)); } catch (error) {}
  savePersistentProgress();
  if (status) status.textContent = 'Códigos guardados. Ya puedes usarlos para simular el escaneo.';
}

function openQRScanner(specificTarget = null) {
  SFX.playClick();
  restoreSpeciesCodes();
  pendingQRTarget = specificTarget;
  const input = document.getElementById('manual-qr-code');
  const status = document.getElementById('qr-code-status');
  if (input) {
    input.value = '';
    previewQRCode(input.value);
  }
  if (status) status.textContent = '';
  const settingsStatus = document.getElementById('species-code-settings-status');
  if (settingsStatus) settingsStatus.textContent = '';
  openModal('modal-qr');
}

function previewQRCode(value) {
  const preview = document.getElementById('manual-qr-preview');
  if (preview) preview.textContent = `Código ingresado: ${value || '—'}`;
}

function simulateQRDiscovery() {
  SFX.playQRScan();
  let targetId = pendingQRTarget;
  if (!targetId) {
    const lockedIds = Object.keys(CREATURE_DATABASE).filter(id => id !== 'rey_bosque' && !AppState.unlockedCreatures.includes(id));
    if (lockedIds.length === 0) {
      setQRStatus('¡Ya descubriste todas las especies! Prueba los códigos para volver a verlas.');
      return;
    }
    targetId = lockedIds[Math.floor(Math.random() * lockedIds.length)];
  }
  completeQRDiscovery(targetId);
}

function redeemQRFromInput() {
  const code = document.getElementById('manual-qr-code')?.value.trim();
  const targetId = QR_CREATURE_CODES[code];
  if (!targetId) {
    setQRStatus('Código no reconocido. Escribe los 6 números del código.');
    return;
  }
  SFX.playQRScan();
  completeQRDiscovery(targetId);
}

function setQRStatus(message) {
  const status = document.getElementById('qr-code-status');
  if (status) status.textContent = message;
}

function completeQRDiscovery(targetId) {
  if (targetId === 'rey_bosque') {
    setQRStatus('El Rey del Bosque solo se obtiene al ganar el encuentro secreto.');
    return;
  }
  const info = CREATURE_DATABASE[targetId];
  if (!info) {
    setQRStatus('No encontramos esa especie.');
    return;
  }
  closeModal('modal-qr');
  pendingQRTarget = null;
  const isNew = !AppState.unlockedCreatures.includes(targetId);
  if (isNew) {
    AppState.unlockedCreatures.push(targetId);
    AppState.creatureCopies[targetId] = Math.max(1, AppState.creatureCopies[targetId] || 0);
  }
  if (isNew && !AppState.recentlyUnlocked.includes(targetId)) AppState.recentlyUnlocked.push(targetId);
  if (isNew) {
    try { localStorage.setItem('explorer_unlocked_creatures', JSON.stringify(AppState.unlockedCreatures)); } catch (error) {}
    try { localStorage.setItem('explorer_creature_copies', JSON.stringify(AppState.creatureCopies)); } catch (error) {}
    awardProfileXP(100);
  }

  alert(isNew
    ? `🎉 ¡NUEVA CRIATURA DESCUBIERTA!\n\nEncontraste a: ${info.name} ${info.icon}\n\nSe añadió a tu colección y a la información de flora y fauna.`
    : `${info.icon} ${info.name} ya está en tu colección.`);

  renderCollectionGrid();
  renderFloraFaunaInfo();
  renderExplorerProgress();
  if (reserveMap) renderReserveAnimalMarkers();
  saveProgress();
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
  art.src = data.image || `assets/species/${id}.png`;

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
  AppState.battle.networkMatch = false;
  AppState.battle.isSecretEncounter = false;
  AppState.battle.secretIntroFinished = true;
  AppState.battle.pendingMode = 'bot';
  AppState.battle.botDifficulty = diff;
  document.getElementById('select-team-title').textContent = 'Elige 3 Criaturas';
  openTeamSelection();
}

function getSecretBattleWins() {
  try {
    const wins = Number(localStorage.getItem('secret_battle_bot_wins') || 0);
    return Number.isFinite(wins) && wins > 0 ? Math.floor(wins) : 0;
  } catch (error) { return 0; }
}

function hasClaimedSecretReward() {
  try { return localStorage.getItem('secret_battle_reward_claimed') === 'true'; }
  catch (error) { return false; }
}

function renderSecretEncounterStatus() {
  const card = document.getElementById('secret-encounter-card');
  if (card) card.hidden = getSecretBattleWins() < 2 || hasClaimedSecretReward();
}

function recordStandardBotVictory() {
  const wins = getSecretBattleWins() + 1;
  try { localStorage.setItem('secret_battle_bot_wins', String(wins)); } catch (error) {}
  savePersistentProgress();
  renderSecretEncounterStatus();
  return wins;
}

function beginSecretEncounter() {
  if (getSecretBattleWins() < 2 || hasClaimedSecretReward()) return;
  SFX.playClick();
  AppState.battle.isSecretEncounter = true;
  AppState.battle.secretIntroFinished = false;
  AppState.battle.networkMatch = false;
  clearInterval(LanMatch.timer);
  AppState.battle.pendingMode = 'bot';
  AppState.battle.botDifficulty = 'secreto';
  AppState.battle.selectedTeam = [];
  document.getElementById('select-team-title').textContent = 'Elige tu equipo para el encuentro secreto';
  openTeamSelection();
}

function createSecretRivalTeam() {
  return [
    { key: 'quebracho', name: 'Horco Quebracho Ancestral', icon: '🌳', lvl: 15, hp: 160, maxHp: 160, spd: 35, atk: 50, isFainted: false,
      attacks: [{ name: 'Raíz de la Sierra', damage: 28 }, { name: 'Látigo Ancestral', damage: 32 }, { name: 'Terremoto Verde', damage: 36 }] },
    { key: 'yaguarete', name: 'Yaguareté Guardián', icon: '🐆', lvl: 16, hp: 170, maxHp: 170, spd: 76, atk: 60, isFainted: false,
      attacks: [{ name: 'Zarpazo del Guardián', damage: 31 }, { name: 'Rugido de Villa Cielo', damage: 35 }, { name: 'Furia del Monte', damage: 39 }] },
    { key: 'rey_bosque', name: 'Rey del Bosque', icon: '🐦', lvl: 17, hp: 185, maxHp: 185, spd: 82, atk: 66, isFainted: false,
      attacks: [{ name: 'Canto del Monte', damage: 34 }, { name: 'Aleteo Dorado', damage: 38 }, { name: 'Vuelo Guardián', damage: 42 }] }
  ];
}

function openSecretBattleIntro() {
  const dialogue = document.getElementById('secret-intro-dialogue');
  if (dialogue) dialogue.textContent = '“Dos victorias te guiaron hasta mí. Soy Cynthia, guardiana de Villa Cielo. Si quieres conocer el secreto de estas sierras, primero tendrás que superar a mis tres compañeros.”';
  openModal('modal-secret-battle-intro');
}

function finishSecretBattleIntro() {
  closeModal('modal-secret-battle-intro');
  AppState.battle.secretIntroFinished = true;
  document.getElementById('battle-log').textContent = '¡Cynthia envía a sus tres animales más poderosos!';
  setActiveMusic('battle', true);
}

function grantSecretBattleReward() {
  const rewardKey = 'rey_bosque';
  const isNew = !AppState.unlockedCreatures.includes(rewardKey);
  if (isNew) {
    AppState.unlockedCreatures.push(rewardKey);
    AppState.creatureCopies[rewardKey] = 1;
  } else {
    AppState.creatureCopies[rewardKey] = (AppState.creatureCopies[rewardKey] || 1) + 1;
  }
  try { localStorage.setItem('explorer_unlocked_creatures', JSON.stringify(AppState.unlockedCreatures)); } catch (error) {}
  try { localStorage.setItem('explorer_creature_copies', JSON.stringify(AppState.creatureCopies)); } catch (error) {}
  try { localStorage.setItem('secret_battle_reward_claimed', 'true'); } catch (error) {}
  savePersistentProgress();
  awardProfileXP(700);
  renderCollectionGrid();
  renderFloraFaunaInfo();
  renderExplorerProgress();
  if (reserveMap) renderReserveAnimalMarkers();
  renderSecretEncounterStatus();
  return { creature: CREATURE_DATABASE[rewardKey], isNew, copies: AppState.creatureCopies[rewardKey] };
}

function selectLocalPlayerMode(playerMode) {
  SFX.playClick();
  AppState.battle.networkMatch = false;
  AppState.battle.isSecretEncounter = false;
  AppState.battle.secretIntroFinished = true;
  AppState.battle.pendingMode = playerMode;
  AppState.battle.botDifficulty = 'normal';
  openTeamSelection();
}

function startLocalMultiplayer(playerOne = 'Jugador 1', playerTwo = 'Jugador 2') {
  AppState.battle.isSecretEncounter = false;
  AppState.battle.secretIntroFinished = true;
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
  if (AppState.battle.isSecretEncounter) {
    AppState.battle.isSecretEncounter = false;
    AppState.battle.secretIntroFinished = true;
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
  AppState.inventory = { nectar: 3, meat: 3, carob: 3, compost: 3, mouse: 3, berries: 3, seeds: 3 };
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

  if (AppState.battle.isSecretEncounter) {
    AppState.battle.enemyTeam = createSecretRivalTeam();
  } else if (isLocalDuel()) {
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
    if (AppState.battle.isSecretEncounter) diffBadge.textContent = '🌑 Encuentro secreto · Cynthia';
    else if (isLocalDuel()) diffBadge.textContent = AppState.battle.networkMatch ? '📶 Duelo por Wi‑Fi' : '👥 Duelo local';
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

  document.getElementById('battle-log').textContent = AppState.battle.isSecretEncounter
    ? 'El guardián te espera. Escucha su historia antes de comenzar.'
    : isLocalDuel()
    ? (AppState.battle.networkMatch ? `¡Comienza el duelo por Wi‑Fi! Turno de ${AppState.battle.localPlayerOneName}.` : `¡Comienza el duelo! ${AppState.battle.localPlayerOneName}, es tu turno. Pasa el teléfono cuando termine tu jugada.`)
    : `¡Combate iniciado! Tu equipo de 3 criaturas vs BOT (${diff.toUpperCase()}). ¡Turno de ${AppState.battle.player.name}!`;

  navigateTo('battle_arena');
  if (AppState.battle.isSecretEncounter) openSecretBattleIntro();
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

function populateBackpackControls() {
  const controls = document.getElementById('battle-controls-items');
  if (!controls) return;
  controls.replaceChildren();
  const hint = document.createElement('p');
  hint.className = 'bag-hint';
  if (isLocalDuel()) {
    hint.textContent = 'La captura con comida está desactivada en los duelos contra amigos.';
    controls.append(hint, createBagBackButton());
    return;
  }

  if (AppState.battle.isSecretEncounter) {
    hint.textContent = 'El guardián protege a sus compañeros: no se pueden capturar. Véncelos para recibir tu recompensa.';
    controls.append(hint, createBagBackButton());
    return;
  }

  const enemy = AppState.battle.enemy;
  const species = CREATURE_DATABASE[enemy?.key];
  if (!enemy || !species) {
    hint.textContent = 'No hay una criatura disponible para capturar.';
    controls.append(hint, createBagBackButton());
    return;
  }
  hint.textContent = `Elige un cebo para ${species.name}. Su favorito es ${species.favoriteFood.icon} ${species.favoriteFood.name}. Menos HP aumenta la probabilidad.`;
  controls.appendChild(hint);

  Object.values(CREATURE_DATABASE).forEach(creature => {
    const food = creature.favoriteFood;
    const quantity = AppState.inventory[food.id] || 0;
    const chance = Math.round(getCaptureChance(enemy, food.id) * 100);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-battle btn-sub bag-item-button';
    button.disabled = quantity <= 0;
    button.innerHTML = `<span>${food.icon} ${food.name}</span><small>${quantity} · captura ${chance}%${food.id === species.favoriteFood.id ? ' · favorito' : ''}</small>`;
    button.addEventListener('click', () => useItem(food.id));
    controls.appendChild(button);
  });
  controls.appendChild(createBagBackButton());
}

function createBagBackButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn-battle btn-back-sub';
  button.textContent = '↩ Volver';
  button.addEventListener('click', hideSubMenu);
  return button;
}

function getCaptureChance(enemy, foodId) {
  const healthRatio = Math.max(0, Math.min(1, enemy.hp / enemy.maxHp));
  const favoriteBonus = CREATURE_DATABASE[enemy.key]?.favoriteFood.id === foodId ? 0.18 : -0.08;
  return Math.max(0.03, Math.min(0.92, 0.08 + (1 - healthRatio) * 0.72 + favoriteBonus));
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
  document.getElementById('battle-controls-items').classList.add('hidden');

  if (menuId === 'attacks') {
    populateAttackControls();
    document.getElementById('battle-controls-attacks').classList.remove('hidden');
  } else if (menuId === 'switch') {
    populateSwitchControls();
    document.getElementById('battle-controls-switch').classList.remove('hidden');
  } else if (menuId === 'items') {
    populateBackpackControls();
    document.getElementById('battle-controls-items').classList.remove('hidden');
  }
}

function hideSubMenu() {
  SFX.playClick();
  document.getElementById('battle-controls-attacks').classList.add('hidden');
  document.getElementById('battle-controls-switch').classList.add('hidden');
  document.getElementById('battle-controls-items').classList.add('hidden');
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
    playBattleAnimation(AppState.battle.localTurn === 1 ? 'player-sprite' : 'enemy-sprite');
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

  playBattleAnimation('player-sprite');

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
        if (AppState.battle.isSecretEncounter) {
          const reward = grantSecretBattleReward();
          AppState.battle.isSecretEncounter = false;
          AppState.battle.secretIntroFinished = true;
          alert(`🌟 ¡EL GUARDIÁN TE RECONOCE!\n\nVenciste a los tres animales más poderosos y ganaste +700 EXP.\n\n🎁 ${reward.creature.icon} ${reward.creature.name} ${reward.isNew ? 'se unió a tu colección' : `se sumó a tus compañeros (ahora tienes ${reward.copies})`}.`);
        } else {
          const diffText = (AppState.battle.botDifficulty || 'facil').toUpperCase();
          const wins = AppState.battle.mode === 'bot' ? recordStandardBotVictory() : getSecretBattleWins();
          awardProfileXP(350);
          alert(`🏆 ¡VICTORIA DE BATALLA!\n\n¡Has derrotado a todo el equipo rival (${diffText}) con tus 3 criaturas!\n¡Tu equipo ha ganado +350 EXP y protegido la Reserva Natural Serrana!${wins === 2 ? '\n\n🌑 Algo extraño responde desde las sierras… Quizás debas volver donde comenzaron tus desafíos.' : ''}`);
        }
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

  playBattleAnimation('enemy-sprite');

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
        const wasSecretEncounter = AppState.battle.isSecretEncounter;
        const diffText = (AppState.battle.botDifficulty || 'facil').toUpperCase();
        AppState.battle.isSecretEncounter = false;
        AppState.battle.secretIntroFinished = true;
        alert(wasSecretEncounter
          ? '💔 El guardián venció esta vez. Reúne fuerzas y vuelve a investigar el eco desde la pantalla de pelea.'
          : `💔 Derrota en combate.\nTus 3 criaturas se han debilitado ante el bot en nivel ${diffText}.\n¡Entrena en la reserva y vuelve a intentarlo!`);
        navigateTo('pelea');
      }, 600);
      return;
    }
  }

  AppState.battle.turn += 1;
  AppState.battle.isPlayerTurn = true;
  updateBattleUI();
}

function playBattleAnimation(attackerId) {
  const attacker = document.getElementById(attackerId);
  const defenderId = attackerId === 'player-sprite' ? 'enemy-sprite' : 'player-sprite';
  const defender = document.getElementById(defenderId);
  const stage = document.querySelector('.battle-stage');
  if (!attacker || !defender || !stage) return;

  const lungeClass = attackerId === 'player-sprite' ? 'attack-lunge' : 'enemy-lunge';
  attacker.classList.remove(lungeClass);
  defender.classList.remove('attack-hit');
  stage.classList.remove('battle-impact');
  void stage.offsetWidth;
  attacker.classList.add(lungeClass);
  window.setTimeout(() => {
    defender.classList.add('attack-hit');
    stage.classList.add('battle-impact');
  }, 180);
  window.setTimeout(() => {
    attacker.classList.remove(lungeClass);
    defender.classList.remove('attack-hit');
    stage.classList.remove('battle-impact');
  }, 900);
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
  if (isLocalDuel()) {
    hideSubMenu();
    document.getElementById('battle-log').textContent = 'La captura con comida está desactivada en los duelos contra amigos.';
    return;
  }
  if (AppState.battle.isSecretEncounter) {
    document.getElementById('battle-log').textContent = 'El guardián protege a sus tres compañeros. Tendrás que vencerlos para obtener la recompensa.';
    hideSubMenu();
    return;
  }

  const enemy = AppState.battle.enemy;
  const species = CREATURE_DATABASE[enemy?.key];
  const food = Object.values(CREATURE_DATABASE).map(creature => creature.favoriteFood).find(item => item.id === itemType);
  if (!enemy || !species || !food) return;
  if ((AppState.inventory[itemType] || 0) <= 0) {
    document.getElementById('battle-log').textContent = `No te quedan ${food.name.toLowerCase()}.`;
    populateBackpackControls();
    return;
  }

  SFX.playQRScan();
  AppState.inventory[itemType] -= 1;
  hideSubMenu();
  const chance = getCaptureChance(enemy, itemType);
  if (Math.random() < chance) {
    const isNew = !AppState.unlockedCreatures.includes(species.id);
    if (isNew) {
      AppState.unlockedCreatures.push(species.id);
      AppState.creatureCopies[species.id] = 1;
      if (!AppState.recentlyUnlocked.includes(species.id)) AppState.recentlyUnlocked.push(species.id);
    } else {
      AppState.creatureCopies[species.id] = (AppState.creatureCopies[species.id] || 1) + 1;
    }
    try { localStorage.setItem('explorer_unlocked_creatures', JSON.stringify(AppState.unlockedCreatures)); } catch (error) {}
    try { localStorage.setItem('explorer_creature_copies', JSON.stringify(AppState.creatureCopies)); } catch (error) {}
    awardProfileXP(isNew ? 100 : 50);
    AppState.battle.finished = true;
    document.getElementById('battle-controls-main').classList.add('hidden');
    document.getElementById('battle-log').textContent = `¡${species.name} se acercó a ${food.name} y fue capturado!`;
    renderCollectionGrid();
    renderFloraFaunaInfo();
    renderExplorerProgress();
    if (reserveMap) renderReserveAnimalMarkers();
    alert(isNew
      ? `🎉 ¡Capturaste a ${species.name} ${species.icon}! Se sumó a tu colección y ganaste 100 EXP.`
      : `🎉 ¡Capturaste otro ${species.name} ${species.icon}! Ahora tienes ${AppState.creatureCopies[species.id]} y ganaste 50 EXP.`);
    navigateTo('coleccion');
    return;
  }

  document.getElementById('battle-log').textContent = `¡${enemy.name} rechazó ${food.name}! Probabilidad: ${Math.round(chance * 100)}%. La criatura contraataca.`;
  AppState.battle.isPlayerTurn = false;
  setTimeout(executeEnemyTurn, 1300);
}

async function confirmExitBattle() {
  SFX.playClick();
  if (await showAppPopup('¿Deseas rendirte y salir de la arena de batalla?', { variant: 'confirm', title: 'Salir de batalla' })) {
    AppState.battle.isSecretEncounter = false;
    AppState.battle.secretIntroFinished = true;
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


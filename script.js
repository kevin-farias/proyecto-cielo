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
      { name: 'Picotazo Veloz', dmg: 35, text: '¡Picotazo certero!' },
      { name: 'Viento Serrano', dmg: 45, text: '¡Ráfaga de viento!' },
      { name: 'Tormenta Hojas', dmg: 60, text: '¡CRÍTICO DE HOJAS!' }
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
      { name: 'Zarpazo Feroz', dmg: 45, text: '¡Impacto salvaje!' },
      { name: 'Mordisco Selvático', dmg: 55, text: '¡Mordisco devastador!' },
      { name: 'Garra Esmeralda', dmg: 70, text: '¡ATAQUE CRÍTICO FELINO!' }
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
      { name: 'Embestida Serrana', dmg: 35, text: '¡Embestida de monte!' },
      { name: 'Pisotón Cobre', dmg: 45, text: '¡Pisotón contundente!' },
      { name: 'Furia Terrestre', dmg: 60, text: '¡DEMOLICIÓN SERRANA!' }
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
      { name: 'Raíz Milenaria', dmg: 30, text: '¡Golpe de raíz ancestral!' },
      { name: 'Látigo de Ramas', dmg: 40, text: '¡Azote de vegetación!' },
      { name: 'Espina Serrana', dmg: 55, text: '¡DEFENSA ESPINOSA!' }
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
      { name: 'Ataque Silencioso', dmg: 40, text: '¡Sorpresa nocturna!' },
      { name: 'Garra Alada', dmg: 50, text: '¡Zarpazo aéreo!' },
      { name: 'Mirada Hipnótica', dmg: 65, text: '¡GOLPE DE SOMBRAS!' }
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
      { name: 'Astucia Serrana', dmg: 35, text: '¡Movimiento veloz!' },
      { name: 'Embestida Ágil', dmg: 45, text: '¡Ataque sorpresa!' },
      { name: 'Colmillo Gris', dmg: 60, text: '¡IMPACTO ASTUTO!' }
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
        <div class="card-img-placeholder">${data.icon}</div>
        <div class="card-info">
          <h4>${data.name}</h4>
          <p>Nivel ${data.lvl} • Serrano</p>
        </div>
      `;
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

const languages = ['español', 'english', 'português'];
function cycleLang(dir) {
  let idx = languages.indexOf(AppState.language);
  idx = (idx + dir + languages.length) % languages.length;
  AppState.language = languages[idx];
  document.getElementById('current-lang').textContent = AppState.language;
  SFX.playClick();
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
  document.getElementById('c-hp').textContent = `${data.hp} HP`;
  document.getElementById('c-spd').textContent = `${data.spd} SPD`;
  document.getElementById('c-atk').textContent = `${data.atk} ATK`;
  document.getElementById('c-habitat').textContent = data.habitat;
  document.getElementById('creature-modal-desc').textContent = data.desc;

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

  AppState.battle.mode = AppState.battle.pendingMode;
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

  // Build Enemy Team based on chosen Bot Difficulty (or local player)
  if (diff === 'facil') {
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

  // Set difficulty badge
  const diffBadge = document.getElementById('battle-diff-badge');
  if (diffBadge) {
    if (diff === 'facil') diffBadge.innerHTML = '🟢 Fácil (1 Rival)';
    else if (diff === 'normal') diffBadge.innerHTML = '🟡 Normal (2 Rivales)';
    else diffBadge.innerHTML = '🔴 Difícil (3 Rivales Alfa)';
  }

  const enemyRosterTitle = document.getElementById('enemy-roster-title');
  if (enemyRosterTitle) {
    enemyRosterTitle.textContent = `Rival (${AppState.battle.enemyTeam.length}):`;
  }

  populateAttackControls();
  populateSwitchControls();
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `¡Combate iniciado! Tu equipo de 3 criaturas vs BOT (${diff.toUpperCase()}). ¡Turno de ${AppState.battle.player.name}!`;

  navigateTo('battle_arena');
}

function populateAttackControls() {
  const p = AppState.battle.player;
  const attackControls = document.getElementById('battle-controls-attacks');
  if (!attackControls || !p) return;

  attackControls.innerHTML = '';
  p.moves.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'btn-battle btn-sub';
    btn.onclick = () => executePlayerAttack(m.name, m.dmg, m.text);
    btn.innerHTML = `⚡ ${m.name} (${m.dmg} DMG)`;
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
  AppState.battle.playerTeam.forEach((creature, idx) => {
    const isCurrent = idx === AppState.battle.activePlayerIndex;
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
  if (newIndex === AppState.battle.activePlayerIndex) return;
  const target = AppState.battle.playerTeam[newIndex];
  if (!target || target.hp <= 0) return;

  SFX.playClick();
  hideSubMenu();

  AppState.battle.activePlayerIndex = newIndex;
  AppState.battle.player = target;

  populateAttackControls();
  populateSwitchControls();
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `🔄 ¡Cambiaste a ${target.name}! Entra al combate listo para luchar.`;

  // Turn passes to enemy
  AppState.battle.isPlayerTurn = false;
  setTimeout(executeEnemyTurn, 1400);
}

function updateBattleUI() {
  const p = AppState.battle.player;
  const e = AppState.battle.enemy;
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

  document.getElementById('turn-indicator').textContent = `TURNO ${AppState.battle.turn}: ${AppState.battle.isPlayerTurn ? p.name : e.name}`;
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
  SFX.playAttack();

  hideSubMenu();
  const p = AppState.battle.player;
  const e = AppState.battle.enemy;

  // Animate sprite hit
  const eSprite = document.getElementById('enemy-sprite');
  eSprite.style.transform = 'scale(1.3) rotate(15deg)';
  setTimeout(() => eSprite.style.transform = 'scale(1) rotate(0deg)', 250);

  e.hp = Math.max(0, e.hp - damage);
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `¡${p.name} usó ${moveName}! ${msgText} (-${damage} HP)`;

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

  document.getElementById('battle-log').textContent = `¡${e.name} usó ${atk.name}! (-${atk.damage} HP a ${p.name})`;
  
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
  SFX.playHeal();

  const p = AppState.battle.player;
  const healAmount = 30;
  p.hp = Math.min(p.maxHp, p.hp + healAmount);
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `¡${p.name} usó Habilidad Refugio Natural! Regeneraste +${healAmount} HP.`;

  AppState.battle.isPlayerTurn = false;
  setTimeout(executeEnemyTurn, 1500);
}

function useItem(itemType) {
  if (!AppState.battle.isPlayerTurn) return;
  SFX.playHeal();

  const p = AppState.battle.player;
  const healAmount = 45;
  p.hp = Math.min(p.maxHp, p.hp + healAmount);
  updateBattleUI();
  updateBattleTeamsRosterUI();

  document.getElementById('battle-log').textContent = `¡Usaste Poción Ecológica de la Mochila en ${p.name}! Restauraste +${healAmount} HP.`;

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


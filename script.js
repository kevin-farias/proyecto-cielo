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
    turn: 1,
    isPlayerTurn: true,
    player: null,
    enemy: {
      name: 'Yaguareté (BOT)',
      hp: 150,
      maxHp: 150,
      icon: '🐆',
      lvl: 14
    }
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
// CREATURE SELECTION BEFORE BATTLE LOGIC
// ==========================================
function selectModeAndChooseCreature(mode) {
  SFX.playClick();
  AppState.battle.pendingMode = mode;
  
  // Render available unlocked creatures in selection screen
  const container = document.getElementById('creature-selection-container');
  if (!container) return;

  container.innerHTML = '';
  AppState.unlockedCreatures.forEach(key => {
    const data = CREATURE_DATABASE[key];
    const card = document.createElement('div');
    card.className = 'select-card';
    card.onclick = () => confirmCreatureAndLaunchBattle(key);

    card.innerHTML = `
      <div class="select-card-avatar">${data.icon}</div>
      <div class="select-card-info">
        <h4>${data.name}</h4>
        <div class="select-card-stats">Nivel ${data.lvl} • ${data.badge} • HP: ${data.hp} | ATK: ${data.atk}</div>
      </div>
      <button class="btn-select-creature">⚔️ USAR</button>
    `;
    container.appendChild(card);
  });

  navigateTo('seleccionar_criatura');
}

function confirmCreatureAndLaunchBattle(selectedKey) {
  SFX.playClick();
  const playerData = CREATURE_DATABASE[selectedKey];
  
  // Set Player Creature
  AppState.battle.mode = AppState.battle.pendingMode;
  AppState.battle.turn = 1;
  AppState.battle.isPlayerTurn = true;
  AppState.battle.player = {
    key: selectedKey,
    name: playerData.name,
    icon: playerData.icon,
    lvl: playerData.lvl,
    hp: playerData.hp,
    maxHp: playerData.maxHp,
    moves: playerData.moves
  };

  // Set Opponent Creature (Different from player)
  let enemyKey = 'yaguarete';
  if (selectedKey === 'yaguarete') enemyKey = 'pecari';
  const enemyData = CREATURE_DATABASE[enemyKey];

  AppState.battle.enemy = {
    key: enemyKey,
    name: AppState.battle.mode === 'bot' ? `${enemyData.name} (BOT)` : `${enemyData.name} (${AppState.battle.mode})`,
    icon: enemyData.icon,
    lvl: enemyData.lvl,
    hp: enemyData.hp,
    maxHp: enemyData.maxHp
  };

  // Populate dynamic attack buttons in battle sub-menu
  const attackControls = document.getElementById('battle-controls-attacks');
  if (attackControls) {
    attackControls.innerHTML = '';
    playerData.moves.forEach(m => {
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

  updateBattleUI();
  document.getElementById('battle-log').textContent = `¡A critical hit! ¡${playerData.name} entra al combate contra ${AppState.battle.enemy.name}!`;
  
  navigateTo('battle_arena');
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

function showSubMenu(menuId) {
  SFX.playClick();
  if (menuId === 'attacks') {
    document.getElementById('battle-controls-main').classList.add('hidden');
    document.getElementById('battle-controls-attacks').classList.remove('hidden');
  }
}

function hideSubMenu() {
  SFX.playClick();
  document.getElementById('battle-controls-attacks').classList.add('hidden');
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

  document.getElementById('battle-log').textContent = `¡${p.name} usó ${moveName}! ${msgText} (-${damage} HP)`;

  if (e.hp <= 0) {
    setTimeout(() => {
      alert(`🏆 ¡VICTORIA DE BATALLA!\n\nHas derrotado a ${e.name}.\n¡${p.name} ha ganado +250 EXP y protegido la reserva!`);
      navigateTo('pelea');
    }, 500);
    return;
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

  const attacks = [
    { name: 'Zarpazo Feroz', damage: 25 },
    { name: 'Mordisco Selvático', damage: 35 },
    { name: 'Rugido Serrano', damage: 20 }
  ];

  const atk = attacks[Math.floor(Math.random() * attacks.length)];

  // Animate player sprite hit
  const pSprite = document.getElementById('player-sprite');
  pSprite.style.transform = 'scale(1.3) rotate(-15deg)';
  setTimeout(() => pSprite.style.transform = 'scale(1) rotate(0deg)', 250);

  p.hp = Math.max(0, p.hp - atk.damage);

  document.getElementById('battle-log').textContent = `¡${e.name} usó ${atk.name}! (-${atk.damage} HP a tu equipo)`;
  
  if (p.hp <= 0) {
    updateBattleUI();
    setTimeout(() => {
      alert(`💔 Derrota en combate. ${p.name} se ha debilitado.\nInténtalo de nuevo entrenando en la reserva.`);
      navigateTo('pelea');
    }, 500);
    return;
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

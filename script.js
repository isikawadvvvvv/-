const MAX_PHASE = 8;
const POT_STATES = {
  NORMAL: "normal",
  COLD: "cold",
  SPICY: "spicy"
};

const GAME_STAGES = {
  PREGAME: "pregame",
  CHOOSING: "choosing",
  MIXING: "mixing",
  SERVING: "serving",
  FINISHED: "finished"
};

const TIMING = {
  darkMessage: 850,
  mixing: 1800,
  beforeFirstServing: 700,
  cpuBeforePick: 1100,
  cpuBeforeEat: 1500,
  afterEat: 1300,
  nextPhase: 1500
};

const foods = {
  chicken: {
    id: "chicken",
    name: "鶏肉",
    emoji: "🐔",
    category: "danger",
    description: "加熱が必要。鍋が冷えていると生肉になり3ダメージ",
    potEffect: "鍋状態: 変化なし",
    riskText: "要加熱 / 冷えると危険"
  },
  ice: {
    id: "ice",
    name: "氷",
    emoji: "🧊",
    category: "stateChange",
    description: "鍋を冷たい状態にする。食べると1ダメージ",
    potEffect: "鍋状態: 冷たくする",
    riskText: "冷却 / 1ダメージ"
  },
  water: {
    id: "water",
    name: "水",
    emoji: "💧",
    category: "stateChange",
    description: "鍋を冷たい状態にする。食べても0ダメージ",
    potEffect: "鍋状態: 冷たくする",
    riskText: "冷却 / 0ダメージ"
  },
  chineseCabbage: {
    id: "chineseCabbage",
    name: "白菜",
    emoji: "🥬",
    category: "normal",
    description: "鍋状態は変えない。食べると1ダメージ",
    potEffect: "鍋状態: 変化なし",
    riskText: "安全寄り / 1ダメージ"
  },
  tofu: {
    id: "tofu",
    name: "豆腐",
    emoji: "◻️",
    category: "normal",
    description: "鍋状態は変えない。食べると1ダメージ",
    potEffect: "鍋状態: 変化なし",
    riskText: "安全寄り / 1ダメージ"
  },
  mushroom: {
    id: "mushroom",
    name: "きのこ",
    emoji: "🍄",
    category: "normal",
    description: "鍋状態は変えない。食べると1ダメージ",
    potEffect: "鍋状態: 変化なし",
    riskText: "安全寄り / 1ダメージ"
  },
  fish: {
    id: "fish",
    name: "魚",
    emoji: "🐟",
    category: "medium",
    description: "鍋状態は変えない。単体で2ダメージ",
    potEffect: "鍋状態: 変化なし",
    riskText: "中危険 / 2ダメージ"
  },
  egg: {
    id: "egg",
    name: "卵",
    emoji: "🥚",
    category: "danger",
    description: "加熱が必要。鍋が冷えていると生っぽくなり2ダメージ",
    potEffect: "鍋状態: 変化なし",
    riskText: "要加熱 / 冷えると危険"
  },
  carrot: {
    id: "carrot",
    name: "にんじん",
    emoji: "🥕",
    category: "normal",
    description: "鍋状態は変えない。食べると1ダメージ",
    potEffect: "鍋状態: 変化なし",
    riskText: "安全寄り / 1ダメージ"
  },
  mysteryMeat: {
    id: "mysteryMeat",
    name: "謎肉",
    emoji: "❓",
    category: "danger",
    description: "正体不明。鍋が冷えていると危険度が上がり3ダメージ",
    potEffect: "鍋状態: 変化なし",
    riskText: "危険 / 冷えるとさらに危険"
  },
  poisonMushroom: {
    id: "poisonMushroom",
    name: "毒きのこ",
    emoji: "☠️",
    category: "status",
    description: "食べると1ダメージを受け、毒になる",
    potEffect: "鍋状態: 変化なし",
    riskText: "毒 / 1ダメージ"
  },
  dizzyHerb: {
    id: "dizzyHerb",
    name: "幻草",
    emoji: "🌿",
    category: "status",
    description: "食べると1ダメージを受け、混乱になる",
    potEffect: "鍋状態: 変化なし",
    riskText: "混乱 / 1ダメージ"
  },
  chiliOil: {
    id: "chiliOil",
    name: "激辛ラー油",
    emoji: "🌶️",
    category: "spice",
    description: "鍋を辛くする。以後この鍋の全食材に1ダメージ追加",
    potEffect: "鍋状態: 辛くする",
    riskText: "辛さ追加 / 1ダメージ"
  },
  clearBroth: {
    id: "clearBroth",
    name: "澄まし出汁",
    emoji: "🍵",
    category: "reset",
    description: "鍋の冷え・辛さをリセットする。食べても0ダメージ",
    potEffect: "鍋状態: リセット",
    riskText: "リセット / 0ダメージ"
  }
};

const foodPools = {
  danger: ["chicken", "egg", "mysteryMeat"],
  stateChange: ["ice", "water"],
  normal: ["chineseCabbage", "tofu", "mushroom", "carrot"],
  medium: ["fish"],
  status: ["poisonMushroom", "dizzyHerb"],
  spice: ["chiliOil"],
  reset: ["clearBroth"]
};

const FOOD_CATEGORY_LABELS = {
  danger: "危険",
  stateChange: "冷却",
  normal: "通常",
  medium: "中ダメージ",
  status: "状態異常",
  spice: "辛味",
  reset: "リセット"
};

const items = {
  nightVision: {
    id: "nightVision",
    name: "暗視ゴーグル",
    emoji: "🥽",
    timing: "②",
    description: "鍋の中身を見て、好きな食材を選んで食べられる"
  },
  string: {
    id: "string",
    name: "紐",
    emoji: "🧵",
    timing: "①",
    description: "次に入れる食材に付ける。残っていれば自分が食べられる"
  },
  antidote: {
    id: "antidote",
    name: "解毒薬",
    emoji: "💊",
    timing: "①/③",
    description: "毒を治す。毒でなければ毒を1回予防する"
  }
};

const FOOD_LIST = Object.values(foods);

const DARK_MESSAGES = [
  "鍋は不気味に沈黙している……",
  "何かが底で揺れている……",
  "匂いだけが強くなっていく……",
  "ぐつぐつ……いや、静かすぎる……",
  "箸先に何かが触れた気がする……",
  "誰かが息をのんだ……"
];

let players = [];
let phase = 1;
let potItems = [];
let gameStarted = false;
let awaitingNext = false;
let gameOver = false;
let pendingServing = null;
let servingQueue = [];
let currentChooserIndex = null;
let choiceQueue = [];
let gameMode = "com";
let gameStage = GAME_STAGES.PREGAME;
let currentPotState = POT_STATES.NORMAL;
let pendingStringUserIndex = null;
let nightVisionChoosing = false;

const elements = {
  phaseDisplay: document.getElementById("phaseDisplay"),
  handTitle: document.getElementById("handTitle"),
  hand: document.getElementById("hand"),
  handHint: document.getElementById("handHint"),
  itemTitle: document.getElementById("itemTitle"),
  items: document.getElementById("items"),
  itemHint: document.getElementById("itemHint"),
  pot: document.getElementById("pot"),
  potAction: document.getElementById("potAction"),
  potItems: document.getElementById("potItems"),
  plate: document.getElementById("plate"),
  plateFood: document.getElementById("plateFood"),
  plateState: document.getElementById("plateState"),
  plateDamage: document.getElementById("plateDamage"),
  eatButton: document.getElementById("eatButton"),
  log: document.getElementById("log"),
  darkOverlay: document.getElementById("darkOverlay"),
  darkMessage: document.getElementById("darkMessage"),
  startButton: document.getElementById("startButton"),
  startPanel: document.getElementById("startPanel"),
  versusModeButton: document.getElementById("versusModeButton"),
  comModeButton: document.getElementById("comModeButton"),
  nextButton: document.getElementById("nextButton"),
  restartButton: document.getElementById("restartButton"),
  resultModal: document.getElementById("resultModal"),
  resultTitle: document.getElementById("resultTitle"),
  resultText: document.getElementById("resultText"),
  modalRestartButton: document.getElementById("modalRestartButton")
};

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cloneFood(food) {
  return { ...food };
}

function createBalancedInventory(isHumanPlayer = false) {
  const inventory = [
    pickRandomFoodFromCategory("danger"),
    pickRandomFoodFromCategory("danger"),
    cloneFood(foods.ice),
    cloneFood(foods.water),
    pickRandomFoodFromCategory("normal"),
    pickRandomFoodFromCategory("status"),
    pickRandomFoodFromCategory("normal"),
    pickRandomFoodFromCategory(Math.random() < 0.5 ? "spice" : "reset")
  ];

  const balancedInventory = isHumanPlayer
    ? ensurePlayerOneHasKeyFoods(inventory)
    : inventory;

  return shuffleArray(balancedInventory);
}

function createRandomInventory() {
  return Array.from({ length: 8 }, () => cloneFood(randomItem(FOOD_LIST)));
}

function pickRandomFoodFromCategory(categoryName) {
  const pool = foodPools[categoryName];
  if (!pool) {
    throw new Error(`Unknown food category: ${categoryName}`);
  }

  return cloneFood(foods[randomItem(pool)]);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function ensurePlayerOneHasKeyFoods(inventory) {
  const adjusted = [...inventory];

  if (!adjusted.some((food) => food.id === "chicken")) {
    const dangerIndex = adjusted.findIndex((food) => food.category === "danger");
    adjusted[dangerIndex] = cloneFood(foods.chicken);
  }

  if (!adjusted.some((food) => food.id === "ice" || food.id === "water")) {
    const stateIndex = adjusted.findIndex((food) => food.category === "stateChange");
    adjusted[stateIndex] = cloneFood(foods.ice);
  }

  return adjusted;
}

function createAllPlayerInventories() {
  const inventories = [
    createBalancedInventory(true),
    createBalancedInventory(false),
    createBalancedInventory(false),
    createBalancedInventory(false)
  ];

  ensureGlobalFoodGuarantees(inventories);
  return inventories;
}

function ensureGlobalFoodGuarantees(inventories) {
  const allFoods = inventories.flat();

  if (!allFoods.some((food) => food.id === "chicken")) {
    replaceFirstCategoryFood(inventories[0], "danger", foods.chicken);
  }

  if (!allFoods.some((food) => food.id === "ice")) {
    replaceFirstCategoryFood(inventories[1], "stateChange", foods.ice);
  }

  if (!allFoods.some((food) => food.id === "water")) {
    replaceFirstCategoryFood(inventories[2], "stateChange", foods.water);
  }
}

function replaceFirstCategoryFood(inventory, category, replacementFood) {
  const index = inventory.findIndex((food) => food.category === category);
  if (index !== -1) {
    inventory[index] = cloneFood(replacementFood);
  }
}

function createPlayers() {
  const inventories = createAllPlayerInventories();
  const starterItems = [items.nightVision, items.string, items.antidote].map((item) => ({ ...item }));
  const names = gameMode === "com"
    ? ["Player 1", "CPU 1", "CPU 2", "CPU 3"]
    : ["Player 1", "Player 2", "Player 3", "Player 4"];

  return [
    createPlayer(names[0], inventories[0], true, starterItems),
    createPlayer(names[1], inventories[1], gameMode === "versus", starterItems),
    createPlayer(names[2], inventories[2], gameMode === "versus", starterItems),
    createPlayer(names[3], inventories[3], gameMode === "versus", starterItems)
  ];
}

function createPlayer(name, inventory, isHuman, itemSet) {
  return {
    name,
    hp: 10,
    inventory,
    items: itemSet.map((item) => ({ ...item })),
    statuses: {
      poison: false,
      confusion: false,
      poisonGuard: false
    },
    alive: true,
    isHuman
  };
}

function render() {
  elements.phaseDisplay.textContent = `Phase ${Math.min(phase, MAX_PHASE)} / ${MAX_PHASE} - ${getStageLabel()}`;
  renderPlayers();
  renderHand();
  renderPotItems();
}

function getStageLabel() {
  if (gameStage === GAME_STAGES.CHOOSING) return "①具材選び";
  if (gameStage === GAME_STAGES.MIXING) return "②シャッフル中";
  if (gameStage === GAME_STAGES.SERVING) return "③食べる";
  if (gameStage === GAME_STAGES.FINISHED) return "終了";
  return "準備";
}

function renderPlayers(eaterIndex = pendingServing ? pendingServing.eaterIndex : null) {
  players.forEach((player, index) => {
    const panel = document.getElementById(`player-${index}`);
    panel.className = `player-panel seat ${getPositionClass(index)} ${player.alive ? "alive" : "dead"} ${eaterIndex === index || currentChooserIndex === index ? "eater" : ""}`;
    panel.innerHTML = `
      <div class="player-name">${player.name}</div>
      <div class="player-stats">
        <div class="stat-row"><span>HP</span><strong>${Math.max(0, player.hp)}</strong></div>
        <div class="stat-row"><span>残り食材</span><strong>${player.inventory.length}</strong></div>
        <div class="stat-row"><span>アイテム</span><strong>${player.items.length}</strong></div>
      </div>
      <div class="status-list">${getStatusBadges(player)}</div>
      <span class="status">${player.alive ? "生存" : "脱落"}</span>
    `;
  });
}

function getStatusBadges(player) {
  const badges = [];
  if (player.statuses.poison) badges.push('<span class="effect poison">毒</span>');
  if (player.statuses.confusion) badges.push('<span class="effect confusion">混乱</span>');
  if (player.statuses.poisonGuard) badges.push('<span class="effect guard">毒予防</span>');
  return badges.length ? badges.join("") : '<span class="effect none">正常</span>';
}

function getPositionClass(index) {
  if (index === 0) return "bottom";
  if (index === 1) return "left";
  if (index === 2) return "top";
  return "right";
}

function renderHand() {
  elements.hand.innerHTML = "";
  elements.items.innerHTML = "";
  elements.itemTitle.textContent = "アイテム";
  elements.itemHint.textContent = gameStarted ? "使用できるタイミングで選択できます" : "ゲーム開始を押してください";

  if (nightVisionChoosing && pendingServing) {
    renderNightVisionChoices();
    return;
  }

  const playerIndex = currentChooserIndex ?? pendingServing?.eaterIndex ?? null;
  const player = playerIndex === null ? null : players[playerIndex];
  if (!player) {
    elements.handTitle.textContent = "手札";
    if (!gameStarted) {
      elements.handHint.textContent = "ゲーム開始を押してください";
    } else if (pendingServing) {
      elements.handHint.textContent = getHandHint(false);
    } else if (awaitingNext) {
      elements.handHint.textContent = "鍋の処理中です";
    } else {
      elements.handHint.textContent = "次の投入を待っています";
    }
    return;
  }

  if (!player.isHuman) {
    elements.handTitle.textContent = `${player.name} 手札`;
    elements.handHint.textContent = `${player.name}が自動で選んでいます`;
    elements.itemHint.textContent = `${player.name}のアイテムは自動で処理されます`;
    return;
  }

  const canChoose = gameStarted
    && !awaitingNext
    && !gameOver
    && player.alive
    && player.isHuman
    && !player.statuses.confusion
    && currentChooserIndex !== null;

  elements.handTitle.textContent = `${player.name} 手札`;
  elements.handHint.textContent = getHandHint(canChoose);

  player.inventory.forEach((food, index) => {
    const card = document.createElement("button");
    card.className = "food-card";
    card.type = "button";
    card.disabled = !canChoose;
    card.title = food.description;
    card.innerHTML = `
      <span class="food-icon">${food.emoji}</span>
      <span class="food-name">${food.name}</span>
      <span class="food-role ${food.category}">${FOOD_CATEGORY_LABELS[food.category]}</span>
      <span class="food-detail">
        <strong>${food.potEffect}</strong>
        <em>${food.riskText}</em>
        <small>${food.description}</small>
      </span>
    `;
    card.addEventListener("click", () => handlePlayerChoice(index));
    elements.hand.appendChild(card);
  });

  renderUsableItems(player);
}

function renderUsableItems(player) {
  if (!player.isHuman || gameOver) return;

  elements.itemTitle.textContent = `${player.name} アイテム`;
  elements.itemHint.textContent = "食材とは別枠です";
  player.items.forEach((item) => {
    const card = document.createElement("button");
    card.className = `food-card item-card ${item.id}`;
    card.type = "button";
    card.disabled = !canUseItem(player, item.id);
    card.title = item.description;
    card.innerHTML = `
      <span class="food-icon">${item.emoji}</span>
      <span class="food-name">${item.name}</span>
      <span class="food-role item">アイテム${item.timing}</span>
      <span class="food-detail">
        <strong>${item.description}</strong>
        <em>${getItemUseText(item.id)}</em>
      </span>
    `;
    card.addEventListener("click", () => handleUseItem(player, item.id));
    elements.items.appendChild(card);
  });
}

function getItemUseText(itemId) {
  if (itemId === "nightVision") return "鍋の中から選ぶ";
  if (itemId === "string") return "次の食材に付ける";
  if (itemId === "antidote") return "毒を治す/予防";
  return "";
}

function canUseItem(player, itemId) {
  if (!gameStarted || gameOver || !player.alive) return false;
  if (player.statuses.confusion && gameStage === GAME_STAGES.CHOOSING) return false;
  if (itemId === "string") {
    return gameStage === GAME_STAGES.CHOOSING
      && currentChooserIndex !== null
      && players[currentChooserIndex] === player
      && pendingStringUserIndex === null;
  }
  if (itemId === "nightVision") {
    return gameStage === GAME_STAGES.SERVING
      && pendingServing
      && players[pendingServing.eaterIndex] === player
      && !pendingServing.revealed
      && potItems.length > 0;
  }
  if (itemId === "antidote") {
    return gameStage === GAME_STAGES.CHOOSING || gameStage === GAME_STAGES.SERVING;
  }
  return false;
}

function renderNightVisionChoices() {
  const eater = players[pendingServing.eaterIndex];
  elements.handTitle.textContent = `${eater.name} 暗視ゴーグル`;
  elements.handHint.textContent = "鍋の中身を確認し、食べる食材を選んでください";
  potItems.forEach((entry, index) => {
    const food = entry.food;
    const card = document.createElement("button");
    card.className = "food-card revealed-pot-card";
    card.type = "button";
    card.title = food.description;
    card.innerHTML = `
      <span class="food-icon">${food.emoji}</span>
      <span class="food-name">${food.name}</span>
      <span class="food-role ${food.category}">${FOOD_CATEGORY_LABELS[food.category]}</span>
      <span class="food-detail">
        <strong>持ち主: ${players[entry.ownerIndex].name}</strong>
        <em>${food.riskText}</em>
      </span>
    `;
    card.addEventListener("click", () => chooseVisiblePotFood(index));
    elements.hand.appendChild(card);
  });
}

function getHandHint(canChoose) {
  if (!gameStarted) return "ゲーム開始を押してください";
  if (gameOver) return "ゲーム終了";
  if (pendingServing && !pendingServing.revealed) return `${players[pendingServing.eaterIndex].name}は鍋から具材を拾ってください`;
  if (pendingServing && pendingServing.revealed) return `${players[pendingServing.eaterIndex].name}は皿の食材を食べてください`;
  if (awaitingNext) return "次フェーズへ移行中です";
  if (canChoose) return `${players[currentChooserIndex].name}の番です。1枚選んで投入`;
  if (currentChooserIndex !== null && !players[currentChooserIndex].isHuman) return `${players[currentChooserIndex].name}が考えています`;
  return "処理中です";
}

function renderPotItems() {
  elements.potItems.innerHTML = "";
  potItems.forEach((entry) => {
    const chip = document.createElement("span");
    chip.className = "pot-chip";
    chip.textContent = "？？？";
    elements.potItems.appendChild(chip);
  });
}

function addLog(message) {
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.textContent = message;
  elements.log.prepend(entry);
}

function resetPlate() {
  elements.plate.classList.remove("reveal");
  elements.plateFood.textContent = "まだ何も出ていない";
  elements.plateState.textContent = "食材を選んでください";
  elements.plateDamage.textContent = "Damage -";
  elements.eatButton.disabled = true;
  elements.eatButton.hidden = true;
}

function hidePotAction() {
  elements.potAction.hidden = true;
  elements.potAction.disabled = true;
}

function showPotAction() {
  elements.potAction.hidden = false;
  elements.potAction.disabled = false;
}

function setGameMode(mode) {
  if (gameStarted && !gameOver) return;
  gameMode = mode;
  elements.versusModeButton.classList.toggle("active", gameMode === "versus");
  elements.comModeButton.classList.toggle("active", gameMode === "com");
}

function updateStartPanel() {
  elements.startPanel.classList.toggle("is-hidden", gameStarted);
  document.body.classList.toggle("is-pregame", !gameStarted);
}

function startGame() {
  players = createPlayers();
  phase = 1;
  potItems = [];
  pendingServing = null;
  servingQueue = [];
  choiceQueue = [];
  currentChooserIndex = null;
  gameStarted = true;
  gameStage = GAME_STAGES.CHOOSING;
  awaitingNext = false;
  gameOver = false;
  currentPotState = POT_STATES.NORMAL;
  pendingStringUserIndex = null;
  nightVisionChoosing = false;
  elements.log.innerHTML = "";
  elements.resultModal.classList.remove("show");
  elements.resultModal.setAttribute("aria-hidden", "true");
  elements.startButton.disabled = true;
  elements.nextButton.disabled = true;
  hidePotAction();
  resetPlate();
  updateStartPanel();
  addLog("8つの食材が配られた");
  addLog("Phase 1開始");
  startPhaseChoices();
  render();
}

function startPhaseChoices() {
  potItems = [];
  pendingServing = null;
  servingQueue = [];
  pendingStringUserIndex = null;
  nightVisionChoosing = false;
  currentPotState = POT_STATES.NORMAL;
  gameStage = GAME_STAGES.CHOOSING;
  choiceQueue = players
    .map((player, index) => ({ player, index }))
    .filter((entry) => entry.player.alive && entry.player.inventory.length > 0)
    .map((entry) => entry.index);
  startNextChoiceTurn();
}

function startNextChoiceTurn() {
  currentChooserIndex = choiceQueue.shift() ?? null;
  if (currentChooserIndex === null) return;

  const player = players[currentChooserIndex];
  if (!player || !player.alive || player.inventory.length === 0) {
    startNextChoiceTurn();
    return;
  }

  addLog(`${player.name}の投入番`);
  applyPoisonAtTurnStart(currentChooserIndex);
  if (gameOver) return;
  if (!player.alive) {
    startNextChoiceTurn();
    return;
  }

  if (player.statuses.confusion) {
    addLog(`${player.name}は混乱してランダムに動く`);
    render();
    setTimeout(autoChooseCurrentPlayerFood, TIMING.cpuBeforePick);
    return;
  }
  if (!player.isHuman) {
    render();
    setTimeout(autoChooseCurrentPlayerFood, TIMING.cpuBeforePick);
  }
}

function applyPoisonAtTurnStart(playerIndex) {
  const player = players[playerIndex];
  if (!player || !player.alive || !player.statuses.poison) return;

  player.hp -= 1;
  addLog(`${player.name}はターン開始時に毒で1ダメージ`);
  flashDamage(playerIndex, 1);
  if (player.hp <= 0) {
    player.alive = false;
    addLog(`${player.name}は毒で脱落した`);
  }

  const winner = checkWinner();
  if (winner) {
    finishGame(winner);
  }
}

function handleUseItem(player, itemId) {
  if (!canUseItem(player, itemId)) return;
  if (itemId === "string") {
    consumeItem(player, "string");
    pendingStringUserIndex = players.indexOf(player);
    addLog(`${player.name}は紐を構えた。次の食材に付ける`);
    render();
    return;
  }
  if (itemId === "nightVision") {
    consumeItem(player, "nightVision");
    nightVisionChoosing = true;
    hidePotAction();
    addLog(`${player.name}は暗視ゴーグルを使った`);
    render();
    return;
  }
  if (itemId === "antidote") {
    useAntidote(player);
    render();
  }
}

function hasItem(player, itemId) {
  return player.items.some((item) => item.id === itemId);
}

function consumeItem(player, itemId) {
  const index = player.items.findIndex((item) => item.id === itemId);
  if (index === -1) return null;
  const [item] = player.items.splice(index, 1);
  return item;
}

function useAntidote(player) {
  const consumed = consumeItem(player, "antidote");
  if (!consumed) return;
  if (player.statuses.poison) {
    player.statuses.poison = false;
    addLog(`${player.name}は解毒薬で毒を治した`);
  } else {
    player.statuses.poisonGuard = true;
    addLog(`${player.name}は解毒薬で毒を予防した`);
  }
}

function autoChooseCurrentPlayerFood() {
  if (!gameStarted || awaitingNext || gameOver || currentChooserIndex === null) return;
  const player = players[currentChooserIndex];
  if (!player || !player.alive || player.inventory.length === 0) return;
  if (player.isHuman && !player.statuses.confusion) return;

  maybeUseCpuItemBeforeChoice(player);
  const foodIndex = Math.floor(Math.random() * player.inventory.length);
  handlePlayerChoice(foodIndex);
}

function maybeUseCpuItemBeforeChoice(player) {
  if (player.statuses.poison && hasItem(player, "antidote")) {
    useAntidote(player);
    return;
  }
  if (hasItem(player, "string") && pendingStringUserIndex === null && Math.random() < 0.22) {
    consumeItem(player, "string");
    pendingStringUserIndex = currentChooserIndex;
    addLog(`${player.name}は紐を使った`);
  }
}

async function handlePlayerChoice(foodIndex) {
  if (!gameStarted || awaitingNext || gameOver || currentChooserIndex === null) return;

  const player = players[currentChooserIndex];
  if (!player || !player.alive) return;

  const chosenFood = player.inventory.splice(foodIndex, 1)[0];
  potItems.push({
    ownerIndex: currentChooserIndex,
    food: chosenFood,
    stringOwnerIndex: pendingStringUserIndex === currentChooserIndex ? currentChooserIndex : null
  });
  pendingStringUserIndex = null;
  addLog(`${player.name}は何かを鍋に入れた`);

  startNextChoiceTurn();
  if (currentChooserIndex !== null) return;

  render();
  await runPhaseResolution();
}

async function runPhaseResolution() {
  awaitingNext = true;
  gameStage = GAME_STAGES.MIXING;
  currentChooserIndex = null;
  pendingServing = null;
  servingQueue = [];
  hidePotAction();
  render();

  const potState = judgePotState(potItems);
  currentPotState = potState;
  await darkenRoom(potState);

  elements.pot.classList.add("mixing");
  addLog("鍋の中で食材が混ざっている");
  await sleep(TIMING.mixing);
  elements.pot.classList.remove("mixing");

  servingQueue = shuffleArray(
    players
      .map((player, index) => ({ player, index }))
      .filter((entry) => entry.player.alive)
      .map((entry) => entry.index)
  );
  gameStage = GAME_STAGES.SERVING;
  addLog("生存者が順番に鍋から具材を拾う");
  await sleep(TIMING.beforeFirstServing);
  startNextServing(potState);
}

function startNextServing(potState) {
  hidePotAction();
  elements.eatButton.disabled = true;
  elements.eatButton.hidden = true;

  if (gameOver) return;

  if (servingQueue.length === 0 || potItems.length === 0) {
    completePhaseAfterServings();
    return;
  }

  const eaterIndex = servingQueue.shift();
  const eater = players[eaterIndex];
  if (!eater || !eater.alive) {
    startNextServing(potState);
    return;
  }

  pendingServing = {
    potState,
    eaterIndex,
    food: null,
    damage: 0,
    revealed: false
  };

  renderPlayers(eaterIndex);
  elements.plateFood.textContent = "まだ何も出ていない";
  elements.plateState.textContent = `${eater.name}が鍋を探っている`;
  elements.plateDamage.textContent = "Damage -";
  addLog(`食べる役は${eater.name}`);

  addLog(`${eater.name}は鍋から具材を拾う`);
  render();

  if (eater.isHuman) {
    showPotAction();
    return;
  }

  setTimeout(() => {
    if (shouldCpuUseNightVision(eater)) {
      useCpuNightVision(eater);
    } else {
      pickIngredientFromPot();
    }
    setTimeout(eatServedFood, TIMING.cpuBeforeEat);
  }, TIMING.cpuBeforePick);
}

function completePhaseAfterServings() {
  addLog("Phase終了");
  potItems = [];
  pendingServing = null;
  servingQueue = [];
  nightVisionChoosing = false;
  hidePotAction();
  elements.eatButton.disabled = true;
  elements.eatButton.hidden = true;
  render();

  const winner = checkWinner();
  if (winner) {
    finishGame(winner);
    return;
  }

  setTimeout(nextPhase, TIMING.nextPhase);
}

function pickIngredientFromPot() {
  if (!pendingServing || pendingServing.revealed || gameOver) return;

  const food = selectFoodForEater(pendingServing.eaterIndex);
  revealPendingFood(food);
}

function revealPendingFood(food) {
  const { potState } = pendingServing;
  const damage = calculateDamage(food, potState);
  pendingServing.food = food;
  pendingServing.damage = damage;
  pendingServing.revealed = true;
  hidePotAction();
  revealPlate(food, potState);
  addLog(`皿に出されたのは${food.name}`);
  logFoodState(food, potState);

  if (players[pendingServing.eaterIndex].isHuman) {
    elements.eatButton.hidden = false;
    elements.eatButton.disabled = false;
    addLog("皿に具が乗った。食べるしかない");
  } else {
    elements.eatButton.hidden = true;
    elements.eatButton.disabled = true;
    addLog(`${players[pendingServing.eaterIndex].name}の皿に具が乗った`);
  }

  render();
}

function chooseVisiblePotFood(index) {
  if (!nightVisionChoosing || !pendingServing || pendingServing.revealed || gameOver) return;
  const [entry] = potItems.splice(index, 1);
  nightVisionChoosing = false;
  revealPendingFood(entry.food);
}

function eatServedFood() {
  if (!pendingServing || !pendingServing.revealed || gameOver) return;

  const { eaterIndex, damage, potState } = pendingServing;
  const eater = players[eaterIndex];
  elements.eatButton.disabled = true;
  elements.eatButton.hidden = true;

  eater.hp -= damage;
  addLog(`${eater.name}は${damage}ダメージ`);
  addLog(`${eater.name}のHPは${Math.max(0, eater.hp)}`);

  if (eater.hp <= 0) {
    eater.alive = false;
    addLog(`${eater.name}は脱落した`);
  }

  applyFoodStatusEffects(eater, pendingServing.food);

  pendingServing = null;
  render();
  if (damage > 0) {
    flashDamage(eaterIndex, damage);
  }

  const winner = checkWinner();
  if (winner) {
    finishGame(winner);
    return;
  }

  setTimeout(() => startNextServing(potState), TIMING.afterEat);
}

async function darkenRoom(potState) {
  elements.darkOverlay.classList.add("show");
  elements.darkOverlay.setAttribute("aria-hidden", "false");
  addLog("部屋が真っ暗になった");

  const firstMessage = "部屋が真っ暗になった……";
  const messages = [
    firstMessage,
    "鍋の中で何かが混ざっている……",
    randomItem(DARK_MESSAGES)
  ];

  for (const message of messages) {
    elements.darkMessage.textContent = message;
    await sleep(TIMING.darkMessage);
  }

  elements.darkOverlay.classList.remove("show");
  elements.darkOverlay.setAttribute("aria-hidden", "true");
}

function judgePotState(items) {
  return items.reduce((state, entry) => {
    if (entry.food.id === "clearBroth") return POT_STATES.NORMAL;
    if (entry.food.id === "chiliOil") return POT_STATES.SPICY;
    if (entry.food.id === "ice" || entry.food.id === "water") return POT_STATES.COLD;
    return state;
  }, POT_STATES.NORMAL);
}

function selectRandomFoodFromPot() {
  const index = Math.floor(Math.random() * potItems.length);
  const [entry] = potItems.splice(index, 1);
  return entry.food;
}

function selectFoodForEater(eaterIndex) {
  const tetheredIndex = potItems.findIndex((entry) => entry.stringOwnerIndex === eaterIndex);
  if (tetheredIndex !== -1) {
    const [entry] = potItems.splice(tetheredIndex, 1);
    addLog(`${players[eaterIndex].name}は紐付きの食材を引き寄せた`);
    return entry.food;
  }
  return selectRandomFoodFromPot();
}

function shouldCpuUseNightVision(player) {
  return hasItem(player, "nightVision") && potItems.length > 1 && Math.random() < 0.35;
}

function useCpuNightVision(player) {
  consumeItem(player, "nightVision");
  const bestIndex = potItems.reduce((best, entry, index) => {
    const currentDamage = estimateFoodRisk(entry.food, currentPotState);
    const bestDamage = estimateFoodRisk(potItems[best].food, currentPotState);
    return currentDamage < bestDamage ? index : best;
  }, 0);
  const [entry] = potItems.splice(bestIndex, 1);
  addLog(`${player.name}は暗視ゴーグルで食材を選んだ`);
  revealPendingFood(entry.food);
}

function estimateFoodRisk(food, potState) {
  let risk = calculateDamage(food, potState);
  if (food.id === "poisonMushroom" || food.id === "dizzyHerb") risk += 2;
  return risk;
}

function getFoodDisplayState(food, potState) {
  if (food.id === "chicken") {
    return potState === POT_STATES.COLD ? "生肉" : "火の通った鶏肉";
  }
  if (food.id === "egg") {
    return potState === POT_STATES.COLD ? "生っぽい卵" : "固まった卵";
  }
  if (food.id === "mysteryMeat") {
    return potState === POT_STATES.COLD ? "冷えた謎肉" : "謎肉";
  }
  if (food.id === "chiliOil") {
    return potState === POT_STATES.SPICY ? "激辛ラー油" : "ラー油";
  }
  return food.name;
}

function calculateDamage(food, potState) {
  const cold = potState === POT_STATES.COLD;
  const spicyBonus = potState === POT_STATES.SPICY && food.id !== "clearBroth" ? 1 : 0;
  if (food.id === "clearBroth") return 0;
  if (food.id === "poisonMushroom" || food.id === "dizzyHerb") return 1 + spicyBonus;
  if (food.id === "chiliOil") return 1 + spicyBonus;
  if (food.id === "chicken") return (cold ? 3 : 1) + spicyBonus;
  if (food.id === "ice") return 1 + spicyBonus;
  if (food.id === "water") return spicyBonus;
  if (food.id === "fish") return 2 + spicyBonus;
  if (food.id === "egg") return (cold ? 2 : 1) + spicyBonus;
  if (food.id === "mysteryMeat") return (cold ? 3 : 2) + spicyBonus;
  return 1 + spicyBonus;
}

function revealPlate(food, potState) {
  const displayName = getFoodDisplayState(food, potState);
  const damage = calculateDamage(food, potState);
  elements.plate.classList.remove("reveal");
  void elements.plate.offsetWidth;
  elements.plate.classList.add("reveal");
  elements.plateFood.textContent = `${food.emoji} ${displayName}`;
  elements.plateState.textContent = displayName === food.name ? "正体が明かされた" : "様子がおかしい";
  elements.plateDamage.textContent = `Damage ${damage}`;
  return damage;
}

function logFoodState(food, potState) {
  if (potState === POT_STATES.SPICY) {
    addLog("鍋は辛くなっている。全食材に1ダメージ追加");
  }
  if (food.id === "chicken" && potState === POT_STATES.COLD) {
    addLog("しかし、生肉のままだった！");
    return;
  }
  if (food.id === "egg" && potState === POT_STATES.COLD) {
    addLog("卵は生っぽいままだった！");
    return;
  }
  if (food.id === "mysteryMeat" && potState === POT_STATES.COLD) {
    addLog("謎肉は冷えきっていた！");
    return;
  }
  if (food.id === "clearBroth") {
    addLog("澄まし出汁で鍋の状態が整った");
    return;
  }
  if (food.id === "chiliOil") {
    addLog("ラー油で鍋が辛くなっていた！");
    return;
  }
  addLog(`${getFoodDisplayState(food, potState)}が現れた`);
}

function applyFoodStatusEffects(player, food) {
  if (!player.alive) return;
  if (food.id === "poisonMushroom") {
    if (player.statuses.poisonGuard) {
      player.statuses.poisonGuard = false;
      addLog(`${player.name}は毒予防で毒を防いだ`);
    } else {
      player.statuses.poison = true;
      addLog(`${player.name}は毒になった`);
    }
  }
  if (food.id === "dizzyHerb") {
    player.statuses.confusion = true;
    addLog(`${player.name}は混乱した`);
  }
}

function flashDamage(playerIndex, damage = 0) {
  const panel = document.getElementById(`player-${playerIndex}`);
  panel.classList.remove("damaged");
  void panel.offsetWidth;
  panel.classList.add("damaged");
  document.body.classList.add("hit-impact");

  if (damage > 0) {
    const badge = document.createElement("span");
    badge.className = "damage-pop";
    badge.textContent = `-${damage}`;
    panel.appendChild(badge);
    setTimeout(() => badge.remove(), 900);
  }

  setTimeout(() => {
    panel.classList.remove("damaged");
    document.body.classList.remove("hit-impact");
  }, 900);
}

function nextPhase() {
  if (!awaitingNext || gameOver) return;
  phase += 1;
  awaitingNext = false;
  gameStage = GAME_STAGES.CHOOSING;
  currentChooserIndex = null;
  elements.nextButton.disabled = true;
  resetPlate();

  if (phase > MAX_PHASE) {
    finishGame(checkWinner(true));
    return;
  }

  addLog(`Phase ${phase}開始`);
  startPhaseChoices();
  render();
}

function checkWinner(forcePhaseLimit = false) {
  const alivePlayers = players.filter((player) => player.alive);
  if (alivePlayers.length <= 1) {
    return { type: "winner", players: alivePlayers.length ? alivePlayers : getHighestHpPlayers() };
  }

  if (forcePhaseLimit || phase >= MAX_PHASE && awaitingNext) {
    const highest = getHighestHpPlayers(alivePlayers);
    return highest.length === 1
      ? { type: "winner", players: highest }
      : { type: "draw", players: highest };
  }

  return null;
}

function getHighestHpPlayers(targetPlayers = players) {
  const maxHp = Math.max(...targetPlayers.map((player) => player.hp));
  return targetPlayers.filter((player) => player.hp === maxHp);
}

function finishGame(result) {
  gameOver = true;
  awaitingNext = false;
  gameStage = GAME_STAGES.FINISHED;
  elements.nextButton.disabled = true;
  elements.startButton.disabled = true;
  render();

  if (result.type === "draw") {
    const names = result.players.map((player) => player.name).join("、");
    elements.resultTitle.textContent = "引き分け";
    elements.resultText.textContent = `同率トップ：${names}`;
    addLog(`引き分け：${names}`);
  } else {
    const winner = result.players[0];
    elements.resultTitle.textContent = `${winner.name}の勝利`;
    elements.resultText.textContent = `最終HP：${Math.max(0, winner.hp)}`;
    addLog(`${winner.name}の勝利`);
  }

  elements.resultModal.classList.add("show");
  elements.resultModal.setAttribute("aria-hidden", "false");
}

elements.startButton.addEventListener("click", startGame);
elements.restartButton.addEventListener("click", startGame);
elements.modalRestartButton.addEventListener("click", startGame);
elements.versusModeButton.addEventListener("click", () => setGameMode("versus"));
elements.comModeButton.addEventListener("click", () => setGameMode("com"));
elements.nextButton.addEventListener("click", nextPhase);
elements.potAction.addEventListener("click", pickIngredientFromPot);
elements.eatButton.addEventListener("click", eatServedFood);

updateStartPanel();
render();

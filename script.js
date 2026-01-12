const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameGrid = document.getElementById("gameGrid");
const message = document.getElementById("message");
const levelTitle = document.getElementById("levelTitle");

const tryOverlay = document.getElementById("tryOverlay");
const winOverlay = document.getElementById("winOverlay");

const tryAgainBtn = document.getElementById("tryAgainBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const backBtn = document.getElementById("backBtn");

const level1Btn = document.getElementById("level1Btn");
const level2Btn = document.getElementById("level2Btn");

const ITEMS = [
  { id: "rock", src: "./images/rock.png" },
  { id: "leaf", src: "./images/leaf.png" },
  { id: "cookie", src: "./images/cookie.png" },
  { id: "feather", src: "./images/feather.png" },
  { id: "sock", src: "./images/sock.png" },
  { id: "blanket", src: "./images/blanket.png", win: true }
];

const CARD_BACK = "./images/Raven Seal.png";

let currentLevel = 1;
let found = false;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function showGame() {
  startScreen.hidden = true;
  gameScreen.hidden = false;
}

function showStart() {
  gameScreen.hidden = true;
  startScreen.hidden = false;
  tryOverlay.hidden = true;
  winOverlay.hidden = true;
}

function startLevel1() {
  found = false;
  gameGrid.innerHTML = "";
  levelTitle.textContent = "Level 1: Tap & Find";
  message.textContent = "Where is Raven’s blanket?";

  shuffle(ITEMS).forEach(item => {
    const btn = document.createElement("button");
    const img = document.createElement("img");
    img.src = item.src;
    btn.appendChild(img);

    btn.onclick = () => {
      if (item.win) {
        winOverlay.hidden = false;
      } else {
        tryOverlay.hidden = false;
      }
    };

    gameGrid.appendChild(btn);
  });
}

function startLevel2() {
  found = false;
  gameGrid.innerHTML = "";
  levelTitle.textContent = "Level 2: Flip the Cards";
  message.textContent = "Flip a card. There’s no rush.";

  shuffle(ITEMS).forEach(item => {
    const card = document.createElement("button");
    card.className = "flip-card";

    const back = document.createElement("img");
    back.src = CARD_BACK;
    back.className = "card-back";

    const front = document.createElement("img");
    front.src = item.src;
    front.className = "card-front";

    card.append(back, front);

    card.onclick = () => {
      if (found || card.classList.contains("revealed")) return;
      card.classList.add("revealed");

      if (item.win) {
        found = true;
        winOverlay.hidden = false;
        message.textContent = "You found Raven’s blanket!";
      } else {
        message.textContent = "That’s a cozy find. Let’s keep looking.";
      }
    };

    gameGrid.appendChild(card);
  });
}

level1Btn.onclick = () => {
  currentLevel = 1;
  showGame();
  startLevel1();
};

level2Btn.onclick = () => {
  currentLevel = 2;
  showGame();
  startLevel2();
};

shuffleBtn.onclick = () => {
  currentLevel === 1 ? startLevel1() : startLevel2();
};

backBtn.onclick = showStart;

tryAgainBtn.onclick = () => {
  tryOverlay.hidden = true;
};

playAgainBtn.onclick = () => {
  winOverlay.hidden = true;
  currentLevel === 1 ? startLevel1() : startLevel2();
};

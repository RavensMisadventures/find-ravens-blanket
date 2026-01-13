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

/* Update filenames here if yours differ (GitHub is case-sensitive) */
const ITEMS = [
  { id: "rock",    src: "./images/rock.png",    alt: "A rock" },
  { id: "leaf",    src: "./images/leaf.png",    alt: "A leaf" },
  { id: "cookie",  src: "./images/cookie.png",  alt: "A cookie" },
  { id: "feather", src: "./images/feather.png", alt: "A feather" },
  { id: "sock",    src: "./images/sock.png",    alt: "A sock" },
  { id: "blanket", src: "./images/blanket.png", alt: "Raven's blanket", win: true },
];

/* IMPORTANT: match this to your actual file name exactly */
const CARD_BACK = "./images/Raven Seal.png";

let currentLevel = 1;
let found = false;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function hideOverlays() {
  tryOverlay.hidden = true;
  winOverlay.hidden = true;
}

function showGame() {
  startScreen.hidden = true;
  gameScreen.hidden = false;
}

function showStart() {
  gameScreen.hidden = true;
  startScreen.hidden = false;
  hideOverlays();
}

/* LEVEL 1 */
function startLevel1() {
  found = false;
  hideOverlays();
  gameGrid.innerHTML = "";

  levelTitle.textContent = "Level 1: Tap & Find";
  message.textContent = "Where is Raven’s blanket?";

  shuffle(ITEMS).forEach(item => {
    const btn = document.createElement("button");
    btn.type = "button";

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;

    btn.appendChild(img);

    btn.addEventListener("click", () => {
      if (item.win) {
        winOverlay.hidden = false;
      } else {
        tryOverlay.hidden = false;
      }
    });

    gameGrid.appendChild(btn);
  });
}

/* LEVEL 2 */
function startLevel2() {
  found = false;
  hideOverlays();
  gameGrid.innerHTML = "";

  levelTitle.textContent = "Level 2: Flip the Cards";
  message.textContent = "Flip a card. There’s no rush.";

  shuffle(ITEMS).forEach(item => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "flip-card";
    card.setAttribute("aria-label", "Flip card");

    const backWrap = document.createElement("div");
    backWrap.className = "card-back";
    const backImg = document.createElement("img");
    backImg.src = CARD_BACK;
    backImg.alt = "Raven logo";
    backWrap.appendChild(backImg);

    const frontWrap = document.createElement("div");
    frontWrap.className = "card-front";
    const frontImg = document.createElement("img");
    frontImg.src = item.src;
    frontImg.alt = item.alt;
    frontWrap.appendChild(frontImg);

    card.append(backWrap, frontWrap);

    card.addEventListener("click", () => {
      if (found) return;
      if (card.classList.contains("revealed")) return;

      card.classList.add("revealed");

      if (item.win) {
        found = true;
        message.textContent = "You found Raven’s blanket!";
        winOverlay.hidden = false;
      } else {
        message.textContent = "That’s a cozy find. Let’s keep looking.";
      }
    });

    gameGrid.appendChild(card);
  });
}

/* EVENTS */
level1Btn.addEventListener("click", () => {
  currentLevel = 1;
  showGame();
  startLevel1();
});

level2Btn.addEventListener("click", () => {
  currentLevel = 2;
  showGame();
  startLevel2();
});

shuffleBtn.addEventListener("click", () => {
  currentLevel === 1 ? startLevel1() : startLevel2();
});

backBtn.addEventListener("click", () => {
  showStart();
});

tryAgainBtn.addEventListener("click", () => {
  tryOverlay.hidden = true;
});

playAgainBtn.addEventListener("click", () => {
  winOverlay.hidden = true;
  currentLevel === 1 ? startLevel1() : startLevel2();
});

const items = [
  { name: "Feather", img: "./images/feather.png", isBlanket: false },
  { name: "Leaf",    img: "./images/leaf.png",    isBlanket: false },
  { name: "Blanket", img: "./images/blanket.png", isBlanket: true  },
  { name: "Rock",    img: "./images/rock.png",    isBlanket: false },
  { name: "Sock",    img: "./images/sock.png",    isBlanket: false },
  { name: "Cookie",  img: "./images/cookie.png",  isBlanket: false }
];

function $(id){ return document.getElementById(id); }

const startScreen  = $("startScreen");
const gameScreen   = $("gameScreen");
const gameGrid     = $("gameGrid");
const message      = $("message");

const winOverlay   = $("winOverlay");
const tryOverlay   = $("tryOverlay");

const backBtn      = $("backBtn");
const shuffleBtn   = $("shuffleBtn");
const playAgainBtn = $("playAgainBtn");
const closeWinBtn  = $("closeWinBtn");

const tryAgainBtn  = $("tryAgainBtn");
const closeTryBtn  = $("closeTryBtn");

const creditsBtn      = $("creditsBtn");
const creditsPanel    = $("creditsPanel");
const closeCreditsBtn = $("closeCreditsBtn");

function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function setMessage(text){
  if (message) message.textContent = text;
}

function renderGrid(){
  if (!gameGrid) return;

  gameGrid.innerHTML = "";
  items.forEach(item => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <span>${item.name}</span>
    `;
    btn.addEventListener("click", () => tryItem(item.isBlanket));
    gameGrid.appendChild(btn);
  });
}

function showStart(){
  startScreen.hidden = false;
  gameScreen.hidden = true;
  if (winOverlay) winOverlay.hidden = true;
  if (tryOverlay) tryOverlay.hidden = true;
}

function startGame(){
  startScreen.hidden = true;
  gameScreen.hidden = false;
  if (winOverlay) winOverlay.hidden = true;
  if (tryOverlay) tryOverlay.hidden = true;

  setMessage("Where is Raven’s blanket?");
  shuffle(items);
  renderGrid();
}

function goBack(){
  showStart();
}

function showTryOverlay(){
  if (tryOverlay) tryOverlay.hidden = false;
}

function hideTryOverlay(){
  if (tryOverlay) tryOverlay.hidden = true;
}

function showWinOverlay(){
  if (winOverlay) winOverlay.hidden = false;
}

function hideWinOverlay(){
  if (winOverlay) winOverlay.hidden = true;
}

function tryItem(isBlanket){
  if (isBlanket){
    showWinOverlay();
    return;
  }
  showTryOverlay();
}

function doTryAgain(){
  hideTryOverlay();
  setMessage("Where is Raven’s blanket?");
  shuffle(items);
  renderGrid();
}

function resetGame(){
  hideWinOverlay();
  setMessage("Where is Raven’s blanket?");
  shuffle(items);
  renderGrid();
}

function isClickOnInteractive(el){
  return !!el.closest("button, a, input, textarea, select, [role='button']");
}

window.addEventListener("DOMContentLoaded", () => {
  // Click anywhere on start screen to begin (but not on buttons)
  startScreen?.addEventListener("click", (e) => {
    if (isClickOnInteractive(e.target)) return;
    startGame();
  });

  backBtn?.addEventListener("click", goBack);

  shuffleBtn?.addEventListener("click", () => {
    shuffle(items);
    renderGrid();
  });

  playAgainBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetGame();
  });

  closeWinBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    hideWinOverlay();
  });

  tryAgainBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    doTryAgain();
  });

  closeTryBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    hideTryOverlay();
  });

  creditsBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (creditsPanel) creditsPanel.hidden = false;
  });

  closeCreditsBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (creditsPanel) creditsPanel.hidden = true;
  });

  // Start clean on load
  showStart();
});

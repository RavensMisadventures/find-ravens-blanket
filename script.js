const items = [
  { name: "Feather", img: "images/feather.png", isBlanket: false },
  { name: "Leaf",    img: "images/leaf.png",    isBlanket: false },
  { name: "Blanket", img: "images/blanket.png", isBlanket: true  },
  { name: "Rock",    img: "images/rock.png",    isBlanket: false },
  { name: "Sock",    img: "images/sock.png",    isBlanket: false },
  { name: "Cookie",  img: "images/cookie.png",  isBlanket: false }
];

function $(id){ return document.getElementById(id); }

const startScreen  = $("startScreen");
const gameScreen   = $("gameScreen");
const gameGrid     = $("gameGrid");
const message      = $("message");
const ravenMood    = $("ravenMood");
const winOverlay   = $("winOverlay");

const startBtn     = $("startBtn");
const backBtn      = $("backBtn");
const shuffleBtn   = $("shuffleBtn");
const playAgainBtn = $("playAgainBtn");
const closeWinBtn  = $("closeWinBtn");

const creditsBtn      = $("creditsBtn");
const creditsPanel    = $("creditsPanel");
const closeCreditsBtn = $("closeCreditsBtn");

function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function setMessage(text, kind){
  message.textContent = text;

  if (kind === "win"){
    message.style.background = "#d1fae5";
  } else {
    message.style.background = "#fff3cd";
    // show shrug Raven on try again (and also on start)
    if (ravenMood) ravenMood.src = "./images/raven-shrug.png";
  }
}

function renderGrid(){
  gameGrid.innerHTML = "";
  items.forEach(item => {
    const btn = document.createElement("button");
    btn.innerHTML = `
      <img src="./${item.img}" alt="${item.name}">
      <span>${item.name}</span>
    `;
    btn.addEventListener("click", () => tryItem(item.isBlanket));
    gameGrid.appendChild(btn);
  });
}

function tryItem(isBlanket){
  if (isBlanket){
    setMessage("🎉 You found Raven’s blanket! Great job!", "win");
    winOverlay.hidden = false;
    return; // stop shuffling on win
  }

  setMessage("That’s not the blanket. That’s okay! Try again 😊", "try");
  shuffle(items);
  renderGrid();
}

function startGame(){
  startScreen.hidden = true;
  gameScreen.hidden = false;
  winOverlay.hidden = true;

  setMessage("Where is Raven’s blanket?", "try");
  shuffle(items);
  renderGrid();
}

function goBack(){
  gameScreen.hidden = true;
  startScreen.hidden = false;
  winOverlay.hidden = true;
}

function resetGame(){
  winOverlay.hidden = true;
  setMessage("Where is Raven’s blanket?", "try");
  shuffle(items);
  renderGrid();
}

window.addEventListener("DOMContentLoaded", () => {
  startBtn?.addEventListener("click", startGame);
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
    winOverlay.hidden = true;
  });

  creditsBtn?.addEventListener("click", () => { creditsPanel.hidden = false; });
  closeCreditsBtn?.addEventListener("click", () => { creditsPanel.hidden = true; });
});

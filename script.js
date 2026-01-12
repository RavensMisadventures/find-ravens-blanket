const items = [
  { name:"Feather", img:"./images/feather.png", isBlanket:false },
  { name:"Leaf", img:"./images/leaf.png", isBlanket:false },
  { name:"Blanket", img:"./images/blanket.png", isBlanket:true },
  { name:"Rock", img:"./images/rock.png", isBlanket:false },
  { name:"Sock", img:"./images/sock.png", isBlanket:false },
  { name:"Cookie", img:"./images/cookie.png", isBlanket:false }
];

const $ = id => document.getElementById(id);

const startScreen = $("startScreen");
const gameScreen  = $("gameScreen");
const gameGrid    = $("gameGrid");
const message     = $("message");

const tryOverlay  = $("tryOverlay");
const winOverlay  = $("winOverlay");

const tryAgainBtn = $("tryAgainBtn");
const playAgainBtn = $("playAgainBtn");
const shuffleBtn  = $("shuffleBtn");
const backBtn     = $("backBtn");

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
}

function renderGrid(){
  gameGrid.innerHTML="";
  items.forEach(item=>{
    const btn=document.createElement("button");
    btn.innerHTML=`<img src="${item.img}" alt="${item.name}">`;
    btn.onclick=()=>pick(item.isBlanket);
    gameGrid.appendChild(btn);
  });
}

function startGame(){
  startScreen.hidden=true;
  gameScreen.hidden=false;
  shuffle(items);
  renderGrid();
}

function pick(correct){
  if(correct){
    winOverlay.hidden=false;
  }else{
    tryOverlay.hidden=false;
  }
}

tryAgainBtn.onclick=()=>{
  tryOverlay.hidden=true;
  shuffle(items);
  renderGrid();
};

playAgainBtn.onclick=()=>{
  winOverlay.hidden=true;
  shuffle(items);
  renderGrid();
};

shuffleBtn.onclick=()=>{
  shuffle(items);
  renderGrid();
};

backBtn.onclick=()=>{
  gameScreen.hidden=true;
  startScreen.hidden=false;
};

startScreen.onclick=(e)=>{
  if(e.target.closest("button")) return;
  startGame();
};

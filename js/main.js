// loading -------------------------------------------
let loading = document.querySelector('#loading__box');
let main = document.querySelector('#main');
main.style.display = 'none';
loading.style.display = 'block';

const loadingOut = function() {
  loading.setAttribute('data-state', 'close');
  main.style.display = 'block';
  loading.style.display = 'none';
  profile.style.display = 'none';
  making.style.display = 'none';
  blog.style.display = 'none';
  animation.style.display = 'none';
  contact.style.display = 'none';
}

const displayN = function() {
  loading.style.display = 'none';
}

document.body.onload = loadingOut;
// setTimeout(displayN, 4000);

// loading moving ------------------------------------
let loadingText = document.querySelector('.loading__text');
let loadingCircle = document.querySelector('.loading__circle');

const load__add = function(){
  loadingText.classList.add('active');
  loadingCircle.classList.add('active');
}

const load__remove = function(){
  loadingText.classList.remove('active');
  loadingCircle.classList.remove('active');
}

// 1回目の.activeをすぐ実行
load__add();
let s = 0; // lead__count()が実行される回数
const load__count = function(){
  s++;
  // 2回実行されたら.activeをつけない
  if(s > 2) {
    clearInterval();
    loadingText.classList.remove('active');
    loadingCircle.classList.remove('active');
  }else{
    setTimeout(load__remove, 10);
    setTimeout(load__add, 20);
  }
}
setInterval(load__count, 1490);


// main ---------------------------------------------
let close = document.querySelector('.close');
let gnav = document.querySelector('#g-nav ul');
let page = document.querySelector('.page');
let page__inner = document.querySelector('.page__inner');
let profile = document.querySelector('div.profile');
let making = document.querySelector('div.making');
let blog = document.querySelector('div.blog');
let animation = document.querySelector('div.animation');
let contact = document.querySelector('div.contact');

// ページインナーの切り替え
let nav = gnav.children
let navLen = gnav.children.length
for(let i = 0; i < navLen; i++){
  nav[i].addEventListener('click', function(){
    close.style.display = 'block';
    pageIn();
    wrap__show();
    if(this.getAttribute('class') === 'profile'){
      profile.style.display = 'block';
    }
    if(this.getAttribute('class') === 'making'){
      making.style.display = 'block';
    }
    if(this.getAttribute('class') === 'blog'){
      blog.style.display = 'block';
    }
    if(this.getAttribute('class') === 'animation'){
      animation.style.display = 'block';
    }
    if(this.getAttribute('class') === 'contact'){
      contact.style.display = 'block';
    }
  });
}

// ナビゲーションクローズ
close.addEventListener('click', function(){
  page.setAttribute('data-state', 'false');
  wrap__show();
  profile.style.display = 'none';
  making.style.display = 'none';
  blog.style.display = 'none';
  animation.style.display = 'none';
  contact.style.display = 'none';
  setTimeout(closedispN, 600);
});

//クローズボタンのdisplayをnoneにする
const closedispN = function(){
  close.style.display = 'none';
}

//  ナビゲーションオープン
const pageIn = function(){
  if(page.getAttribute('data-state') === "" || page.getAttribute('data-state') === "false"){
    page.style.display = 'block';
    page.removeAttribute('data-state', 'false');
    page.setAttribute('data-state', 'true');
  }
}

 // ページインナーオープンアニメーション
let wrap = document.querySelector('.wrap');
const wrap__show = function(){
  wrap.classList.toggle('active');
  close.classList.toggle('active');
}

// sp-menu------------------------------------- //
let navBox = document.getElementById('g-nav');
let spMenu = document.querySelector('.sp-menu');
let spMenu__inner = document.querySelector('.sp-menu__inner');
let spMenuAttr = spMenu__inner.getAttribute('data-state');
spMenu.addEventListener('click', function(){
  if(spMenuAttr === false || spMenuAttr === ''){
    spMenu__inner.setAttribute('data-state', 'true');
    spMenuAttr = true;
    navBox.setAttribute('data-state', 'true');
    navBox.style.display = 'block';
  }else if(spMenuAttr === true){
    page.setAttribute('data-state', 'false');
    spMenu__inner.setAttribute('data-state', 'false');
    spMenuAttr = false;
    navBox.setAttribute('data-state', 'false');
    wrap.classList.remove('active');
    close.classList.remove('active');
    profile.style.display = 'none';
    making.style.display = 'none';
    blog.style.display = 'none';
    animation.style.display = 'none';
    contact.style.display = 'none';
  }
});

// canvas------------------------------------- //
let canvas = document.getElementById('sakura');
let ctx = canvas.getContext('2d');
let imgCnt = 25;                // 描画する画像の数
let imgAry = [];                // 画像の情報を格納
let boxw = window.innerWidth;   // ウィンドウサイズの横幅
let boxh = window.innerHeight;  // ウィンドウサイズの縦幅
let cvsw = boxw;                // canvasタグに指定したwidth
let cvsh = boxh;                // canvasタグに指定したheight
let imgBaseSizeW = 15;          // 画像の基本サイズ横幅 (15)
let imgBaseSizeH = 18.5;        // 画像の基本サイズ立幅 (18.5)
let aspectMax = 1.5;            // アスペクト比計算時の最大値
let aspectMin = 0.5;            // アスペクト比計算時の最小値
let speedMax = 2;               // 落下速度の最大値
let speedMin = 0.5;             // 落下速度の最小値
let angleAdd = 4;               // 画像角度への加算値
canvas.setAttribute('width', boxw);
canvas.setAttribute('height', boxh);

// 画像の読み込み
let img = new Image();
img.src = "images/hanabira.png";
img.onload = fall_start;

// 画像のパラメーターを設定
function setImagas(){
  let aspect = 0;
  for(let i = 0;i < imgCnt;i++){
    // 画像サイズに掛けるアスペクト比を0.5~1.5倍でランダムで生成
    aspect = Math.random()*(aspectMax-aspectMin)+aspectMin;
    imgAry.push({
      'posx': Math.random()*cvsw,   // 初期表示位置x
      'posy': Math.random()*cvsh,   // 初期表示位置y
      'sizew': imgBaseSizeW*aspect, // 画像の横幅
      'sizeh': imgBaseSizeH*aspect, // 画像の縦幅
      'speedy': Math.random()*(speedMax-speedMin)+speedMin,　// 画像が落ちていく速度
      'angle': Math.random()*360,   // 角度
    });
  }
}

// 描画、パラメーターの更新
let idx = 0;
let cos = 0;
let sin = 0;
let rad = Math.PI / 180;
function fall(){
  ctx.clearRect(0,0,cvsw,cvsh);
  for(idx = 0;idx < imgCnt;idx++){
    imgAry[idx].posy += imgAry[idx].speedy;
    imgAry[idx].angle += Math.random()*angleAdd;
    cos = Math.cos(imgAry[idx].angle * rad);
    sin = Math.sin(imgAry[idx].angle * rad);
    ctx.setTransform(cos, sin, sin, cos, imgAry[idx].posx, imgAry[idx].posy);
    ctx.drawImage(img, 0, 0, imgAry[idx].sizew , imgAry[idx].sizeh);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // 範囲外に描画された画像を上に戻す
    if(imgAry[idx].posy >= cvsh){
      imgAry[idx].posy = -imgAry[idx].sizeh;
    }
  }
}

function fall_start(){
  setImagas();
  setInterval(fall,10);
}


// Variabler för olika vektorer mm som har med hastighet, placering etc att göra
const startHastighet = 0.55;
const skepp = [];
const oSkott = [];
const skott = [];
const keyNames = [];
const numberOfPlayers = 2;
const numberOfAmmo = 2;
const players = [];
const fireColor = ["#ffffaa", "#ffaaaa"];
keyNames[1] = ["d", "a", "w", "s"]; // Styrning player 1
keyNames[0] = ["6", "4", "8", "5"]; // Styrning player 2
keyNames[2] = " "; // Skjut player 1
keyNames[3] = "0"; // Skjut player 2
// Variabler för riktning av objekten
let bothComingFromRight = false;
let bothComingFromLeft = false;
let bothComingFromTop = false;
let bothComingFromBottom = false;
let zeroLeftOneRight = false;
let oneLeftZeroRight = false;
let zeroTopOneBottom = false;
let oneTopZeroBottom = false;
let krock = false;
let onHold = true;
// Räknevärden
let round = 1;
let endRound = 3;
let winner = 0;
//let fontFaceSet = document.fonts;
const ajust = 10;
// Input objekt för att visa poäng och runda
const numOfInputs = 6;
const inputs = [];

for (let i = 0; i < numOfInputs; i++) {
    inputs[i] = document.createElement("input");
    inputs[i].setAttribute("type", "text");
    document.body.append(inputs[i]);
  }
  inputs[0].classList.add("input-right");
  inputs[2].classList.add("input-right");
  inputs[4].classList.add("input-three");
  inputs[0].value = "P1 SCORE:";
  inputs[2].value = "P2 SCORE:";
  inputs[4].value = "ROUND:";
  // Inforuta
  const info = document.createElement("div");
  const main = document.createElement("main");
  /// bilder /////////////////
  let oImg = [];
  oImg[0] = document.createElement("IMG");
  oImg[0].src = "img/skepp0_east.gif";
  oImg[1] = document.createElement("IMG");
  oImg[1].src = "img/skepp1_east.gif";
  oImg[2] = document.createElement("IMG");
  oImg[2].src = "img/skepp0_west.gif";
  oImg[3] = document.createElement("IMG");
  oImg[3].src = "img/skepp1_west.gif";
  oImg[4] = document.createElement("IMG");
  oImg[4].src = "img/skepp0_explosion.gif";
  oImg[5] = document.createElement("IMG");
  oImg[5].src = "img/skepp1_explosion.gif";
  /////// Element för inforutan
  const h1 = document.createElement("h1");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("h1");
  document.body.append(main);
  main.append(info);
  info.setAttribute("id", "info");
  info.append(oImg[0]);
  oImg[0].classList.add("p-image");
  info.append(oImg[3]);
  oImg[3].classList.add("p-image");
  info.append(h1);
  info.append(p1);
  info.append(p2);
  info.append(p3);
  h1.textContent = `MORTAL SPACE COMBAT`;
  p1.textContent = `PLAYER 1: NAVIGATE WITH A W S D, FIRE WITH SPACE`;
  p2.textContent = `PLAYER 2: NAVIGATE WITH 4 8 5 6, FIRE WITH 0`;
  p3.textContent = `HIT ENTER TO START GAME!`;
  p3.classList.add("blink-me");
  info.style.visibility = "visible";
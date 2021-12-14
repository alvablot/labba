for (let i = 0; i < numberOfAmmo; i++) {
  // Skapar objekt med egenskaper för skott
  oSkott[i] = {
    posX: 0,
    posY: 0,
    width: 0,
    height: 0,
    speedX: 5,
    speedY: 0.5,
    accelaration: 10,
    active: false,
  };
}
//Loopen körs för varje spelar-objekt "numberOfPlayers"
for (let i = 0; i < numberOfPlayers; i++) {
  // Slumpar värde för startpossition innom tillgänglig bredd och höjd
  let randomX = Math.round(Math.random() * window.innerWidth + 50) - 50;
  let randomY = Math.round(Math.random() * window.innerHeight + 50) - 50;
  // Skapar objekt med egenskaper för players/skepp
  players[i] = {
    posX: randomX,
    posY: randomY,
    width: 50,
    height: 40,
    right: 0,
    bottom: 0,
    stegX: 0.5,
    stegY: 0.5,
    accelaration: 1.2,
    hit: false,
    lives: 3,
    score: 0,
    loaded: true,
  };
  //skapar och appendar html-element
  skepp[i] = document.createElement("IMG");
  skott[i] = document.createElement("div");
  document.body.append(skott[i]);
  document.body.append(skepp[i]);
  skepp[i].src = oImg[i].src;
  skepp[i].style.display = "none";
  skott[i].style.display = "none";
  skott[i].style.color = fireColor[i];
  skott[i].textContent = `.`;
  let down = false;
  // Lyssnar händelser från olika tangenter
  document.addEventListener(
    "keydown",
    (event) => {
      // Ökar/miskar hastigheten med accelerationsvärdet beroende på tangent som trycks ned
      if (onHold) return false;
      // Ser till att funktionen inte funkar om inforutan är uppe
      else {
        //Ökar/miskar värdet på stegX med accelaration
        if (event.key === keyNames[i][0]) {
          players[i].stegX += players[i].accelaration;
        }
        if (event.key === keyNames[i][1]) {
          players[i].stegX -= players[i].accelaration;
        }
        //Ökar/miskar värdet på stegY med accelaration
        if (event.key === keyNames[i][2]) {
          players[i].stegY -= players[i].accelaration;
        }
        if (event.key === keyNames[i][3]) {
          players[i].stegY += players[i].accelaration;
        }
        // Tangenter för avtryckare
        if (event.key === keyNames[3]) {
          oSkott[0].active = true;
          skott[0].style.display = "block";
          if (players[0].loaded) playSound(0);
        }
        if (event.key === keyNames[2]) {
          oSkott[1].active = true;
          skott[1].style.display = "block";
          if (players[1].loaded) playSound(1);
        }
      }
    },
    false
  );
}
function bytBild(obj, bild, w, h) {
  //Byter bild på objektet vid träff
  skepp[obj].src = `img/skepp${obj}_${bild}.gif`;
  skepp[obj].width = w;
  skepp[obj].height = h;
}
// Animerar med setInterval. Funktionen ger objekten position utifrån värderna från händelserna
const motor1 = setInterval(() => {
  // Dessa variabler kollar i vilken riktning objekten färdas. Om stegX < 0 färdas obj från höger till vänster
  // stegX > 0 färdas obj från vänster till höger
  // stegY < 0 från bottom till top, stegY > 0 top till bottom
  bothComingFromRight = players[0].stegX < 0 && players[1].stegX < 0;
  bothComingFromLeft = players[0].stegX > 0 && players[1].stegX > 0;
  bothComingFromTop = players[0].stegY > 0 && players[1].stegY > 0;
  bothComingFromBottom = players[0].stegY < 0 && players[1].stegY < 0;
  zeroLeftOneRight = players[0].stegX > 0 && players[1].stegX < 0;
  oneLeftZeroRight = players[0].stegX < 0 && players[1].stegX > 0;
  zeroTopOneBottom = players[0].stegY > 0 && players[1].stegY < 0;
  oneTopZeroBottom = players[0].stegY < 0 && players[1].stegY > 0;
  // Kollar om obj befinner sig på samma ställe, krock blir då true
  krock =
    players[1].right > players[0].posX &&
    players[1].bottom > players[0].posY &&
    players[1].posX < players[0].right &&
    players[1].posY < players[0].bottom;
  //Anropar "fysikmotorn" kollaVar()
  if (krock && !onHold) kollaVar();
  for (let i = 0; i < numberOfPlayers; i++) {
    inputs[1].value = players[1].score;
    inputs[3].value = players[0].score;
    inputs[5].value = round;
    players[i].right = players[i].posX + players[i].width;
    players[i].bottom = players[i].posY + players[i].height;
    // posX ökar för varje anrop med hastighetsvärdet
    // Om objektet kommer utanför tillgänglig höjd/bredd byter det riktning
    if (players[i].right > window.innerWidth) {
      players[i].stegX = -startHastighet;
    } else if (players[i].posX < 1) {
      players[i].stegX = startHastighet;
    }
    if (players[i].bottom > window.innerHeight) {
      players[i].stegY = -startHastighet;
    } else if (players[i].posY < 1) {
      players[i].stegY = startHastighet;
    }
    // Här får objekten sina XY-värden vilket skapar själva animeringen
    players[i].posX += players[i].stegX;
    players[i].posY += players[i].stegY;

    // style-objektet får ny possition
    skepp[i].style.left = players[i].posX + "px";
    skepp[i].style.top = players[i].posY + "px";
    skott[i].style.left = oSkott[i].posX + "px";
    skott[i].style.top = oSkott[i].posY + "px";

    //Anropar funktionen som kollar om skottet träffar
    if (oSkott[i].active) kollaTraff();
    /////////////
    //Styr och positionerar skotten
    if (
      // Om hamnar utanför bild "laddas" det om
      oSkott[i].posX > window.innerWidth ||
      oSkott[i].posX < 0 ||
      oSkott[i].posY > window.innerHeight ||
      oSkott[i].posY < 0
    ) {
      oSkott[i].active = false;
    }
    // FIRE! Skickas iväg med nya värden
    if (oSkott[i].active) {
      players[i].loaded = false;
      if (oSkott[i].speedX > 0) {
        oSkott[i].posX += oSkott[i].speedX + oSkott[i].accelaration;
      } else if (oSkott[i].speedX < 0) {
        oSkott[i].posX += oSkott[i].speedX - oSkott[i].accelaration;
      }
      oSkott[i].posY += oSkott[i].speedY;
    } else {
      // Ursprungvärden, precis i mitten av skeppet
      oSkott[i].posX = players[i].posX + players[i].width / 2;
      oSkott[i].posY = players[i].posY + players[i].height / 2;
      oSkott[i].speedY = players[i].stegY;
      oSkott[i].speedX = players[i].stegX;
      players[i].loaded = true;
    }
  }
}, 10);

//"Fysikmotor" som kollar när objekten på olika sätt kolliderar och byter därefter riktning
function kollaVar(obj) {
  playSound(6);
  if (
    ///////////////////////////////////// X-led
    bothComingFromRight &&
    players[0].posX < players[1].right &&
    players[0].posX > players[1].right - ajust
  ) {
    players[0].stegX = startHastighet / 2;
    players[1].stegX -= startHastighet;
  } else if (
    bothComingFromRight &&
    players[1].posX < players[0].right &&
    players[1].posX > players[0].right - ajust
  ) {
    players[1].stegX = startHastighet / 2;
    players[0].stegX -= startHastighet;
  } else if (
    bothComingFromLeft &&
    players[1].right > players[0].posX &&
    players[1].right < players[0].posX + ajust
  ) {
    players[1].stegX = -startHastighet / 2;
    players[0].stegX += startHastighet;
  } else if (
    bothComingFromLeft &&
    players[0].right > players[1].posX &&
    players[0].right < players[1].posX + ajust
  ) {
    players[0].stegX = -startHastighet / 2;
    players[1].stegX += startHastighet;
  } else if (
    zeroLeftOneRight &&
    players[0].right > players[1].posX &&
    players[0].right < players[1].posX + ajust
  ) {
    players[0].stegX = -startHastighet;
    players[1].stegX = startHastighet;
  } else if (
    oneLeftZeroRight &&
    players[1].right > players[0].posX &&
    players[1].right < players[0].posX + ajust
  ) {
    players[0].stegX = startHastighet;
    players[1].stegX = -startHastighet;
  } ///////////////////////////////////// Y-led
  if (
    bothComingFromBottom &&
    players[0].posY < players[1].bottom &&
    players[0].posY > players[1].bottom - ajust
  ) {
    players[0].stegY = startHastighet / 2;
    players[1].stegY -= startHastighet;
  } else if (
    bothComingFromBottom &&
    players[1].posY < players[0].bottom &&
    players[1].posY > players[0].bottom - ajust
  ) {
    players[1].stegY = startHastighet / 2;
    players[0].stegY -= startHastighet;
  } else if (
    bothComingFromTop &&
    players[1].bottom > players[0].posY &&
    players[1].bottom < players[0].posY + ajust
  ) {
    players[1].stegY = -startHastighet / 2;
    players[0].stegY += startHastighet;
  } else if (
    bothComingFromTop &&
    players[0].bottom > players[1].posY &&
    players[0].bottom < players[1].posY + ajust
  ) {
    players[0].stegY = -startHastighet / 2;
    players[1].stegY += startHastighet;
  } else if (
    zeroTopOneBottom &&
    players[0].bottom > players[1].posY &&
    players[0].bottom < players[1].posY + ajust
  ) {
    players[0].stegY = -startHastighet;
    players[1].stegY = startHastighet;
  } else if (
    oneTopZeroBottom &&
    players[1].bottom > players[0].posY &&
    players[1].bottom < players[0].posY + ajust
  ) {
    players[0].stegY = startHastighet;
    players[1].stegY = -startHastighet;
  }
}
// Funktionen kollar om skott-objekten träffar skeppen
function kollaTraff() {
  function hit(a, b) {
    players[a].hit =
      oSkott[b].posX > players[a].posX &&
      oSkott[b].posX < players[a].right &&
      oSkott[b].posY < players[a].bottom &&
      oSkott[b].posY > players[a].posY - 5;
    if (players[a].hit) {
      skott[a].style.display = "none";
      skott[b].style.display = "none";
      oSkott[b].active = false;
      players[a].lives--;
      bytBild(a, "explosion", 100, 100);
      playSound(3);
      playSound(4);
      players[a].hit = false;
      onHold = true;
      players[b].score++;
      setTimeout(() => {
        continueGame(a, b);
      }, 1000);
    }
  }
  hit(0, 1);
  hit(1, 0);
}

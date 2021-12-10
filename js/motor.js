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
      players[i].direction = "west";
      bytBild(i, players[i].direction);
      players[i].stegX = -startHastighet;
    } else if (players[i].posX < 1) {
      players[i].direction = "east";
      bytBild(i, players[i].direction);
      players[i].stegX = startHastighet;
    }
    if (players[i].bottom > window.innerHeight) {
      players[i].stegY = -startHastighet;
    } else if (players[i].posY < 1) {
      players[i].stegY = startHastighet;
    }
    // Här får bilderna sina CSS-värden vilket skapar själva animeringen
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
    }
  }
}, 10);
//"Fysikmotor" som kollar när objekten på olika sätt kolliderar och byter därefter riktning
function kollaVar(obj) {
  if (
    ///////////////////////////////////// X-led
    bothComingFromRight &&
    players[0].posX < players[1].right &&
    players[0].posX > players[1].right - ajust
  ) {
    players[0].stegX = startHastighet / 2;
    players[1].stegX -= startHastighet;
    bytBild(0, "east");
    bytBild(1, "west");
  } else if (
    bothComingFromRight &&
    players[1].posX < players[0].right &&
    players[1].posX > players[0].right - ajust
  ) {
    players[1].stegX = startHastighet / 2;
    players[0].stegX -= startHastighet;
    bytBild(0, "west");
    bytBild(1, "east");
  } else if (
    bothComingFromLeft &&
    players[1].right > players[0].posX &&
    players[1].right < players[0].posX + ajust
  ) {
    players[1].stegX = -startHastighet / 2;
    players[0].stegX += startHastighet;
    bytBild(0, "east");
    bytBild(1, "west");
  } else if (
    bothComingFromLeft &&
    players[0].right > players[1].posX &&
    players[0].right < players[1].posX + ajust
  ) {
    players[0].stegX = -startHastighet / 2;
    players[1].stegX += startHastighet;
    bytBild(0, "west");
    bytBild(1, "east");
  } else if (
    zeroLeftOneRight &&
    players[0].right > players[1].posX &&
    players[0].right < players[1].posX + ajust
  ) {
    players[0].stegX = -startHastighet;
    players[1].stegX = startHastighet;
    bytBild(0, "west");
    bytBild(1, "east");
  } else if (
    oneLeftZeroRight &&
    players[1].right > players[0].posX &&
    players[1].right < players[0].posX + ajust
  ) {
    players[0].stegX = startHastighet;
    players[1].stegX = -startHastighet;
    bytBild(0, "east");
    bytBild(1, "west");
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
      bytBild(a, "explosion", "explosion");
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

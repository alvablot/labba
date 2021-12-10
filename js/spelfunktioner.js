/// Lyssnare efter enter för att starta spelet
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let i = 3;
      h1.textContent = `GET READY TO RUMBLE`;
      p1.textContent = i;
      p2.style.display = "none";
      p3.textContent = `BEST OF ${endRound} ROUNDS`;
      // Räknar ner innan spelet startar
      let starter = setInterval(() => {
        i--;
        if (i < 1) {
          p1.textContent = "GO!";
          clearInterval(starter);
          startGame();
        } else p1.textContent = i;
        p2.style.display = "none";
      }, 1000);
    }
  });
  function startGame() {
    for (let i = 0; i < numberOfPlayers; i++) {
      skepp[i].style.display = "block";
      skott[i].style.display = "block";
      onHold = false;
      if (players[i].stegX > 0) players[i].direction = "east";
      bytBild(i, players[i].direction);
      if (players[i].stegX < 0) players[i].direction = "west";
      bytBild(i, players[i].direction);
    }
    info.style.visibility = "hidden";
  }
  /// Resettar skeppens positioner och gömmer när inforutan visas
  function continueGame(a, b) {
    skepp[a].style.display = "none";
    skepp[b].style.display = "none";
    if (players[0].score === endRound - 1 || players[1].score === endRound - 1) {
      if (players[0].score > players[1].score) winner = "2";
      else if (players[1].score > players[0].score) winner = "1";
      info.style.visibility = "visible";
      p1.style.display = "block";
      h1.textContent = `PLAYER ${winner} IS VICTORIOUS`;
      p1.textContent = `RELOAD PAGE TO PLAY AGAIN`;
    } else {
      for (let i = 0; i < numberOfPlayers; i++) {
        skott[i].style.display = "none";
        let randomX2 = Math.round(Math.random() * window.innerWidth) - 50;
        let randomY2 = Math.round(Math.random() * window.innerHeight) - 50;
        players[i].posX = randomX2;
        players[i].posY = randomY2;
      }
      // Inforutan visas och meddelande om score och round visas
      info.style.visibility = "visible";
      h1.textContent = `SCORE FOR PLAYER ${a + 1}`;
      setTimeout(() => {
        if (round < endRound) h1.textContent = `GET READY FOR ROUND ${round}`;
        else h1.textContent = `GET READY FOR THE FINALE ROUND`;
      }, 2000);
      setTimeout(() => {
        startGame();
      }, 4000);
      p1.style.display = "none";
      p2.style.display = "none";
      p3.style.display = "none";
      round++;
    }
  }
  console.log(fontFaceSet);
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
      direction: "west",
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
      direction: "west",
      hit: false,
      lives: 3,
      score: 0,
    };
    //skapar och appendar html-element
    skepp[i] = document.createElement("IMG");
    skott[i] = document.createElement("div");
    document.body.append(skott[i]);
    document.body.append(skepp[i]);
    skepp[i].src = oImg[i].src;
    //Bredd och höjd css
    skepp[i].style.display = "none";
    skott[i].style.display = "none";
    skepp[i].style.width = players[i].width + "px";
    skepp[i].style.height = players[i].height + "px";
    skott[i].textContent = `*`;
    let down = false;
    // Lyssnar händelser från olika tangenter
    document.addEventListener(
      "keydown",
      (event) => {
        if (down) return;
        down = true;
        // Ökar/miskar hastigheten med accelerationsvärdet beroende på tangent som trycks ned
        if (onHold) return false;
        else {
          if (event.key === keyNames[i][0]) {
            players[i].stegX += players[i].accelaration;
            //Funktion anropas och byter bild på objktet om riktningen är =>
            if (players[i].stegX > 0) players[i].direction = "east";
            bytBild(i, players[i].direction);
          }
          if (event.key === keyNames[i][1]) {
            players[i].stegX -= players[i].accelaration;
            //Funktion anropas och byter bild på objktet om riktningen är <=
            if (players[i].stegX < 0) players[i].direction = "west";
            bytBild(i, players[i].direction);
          }
          //Ökar/miskar värdet på "stegY" med accelaration
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
          }
          if (event.key === keyNames[2]) {
            oSkott[1].active = true;
            skott[1].style.display = "block";
          }
        }
      },
      false
    );
    //För att förhindra automatisk repetition
    document.addEventListener(
      "keyup",
      function () {
        down = false;
      },
      false
    );
  }
  function bytBild(obj, bild) {
    //Byter bild på objektet vid riktningsbyte och träff
    skepp[obj].src = `img/skepp${obj}_${bild}.gif`;
  }

  
  
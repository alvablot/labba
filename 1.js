<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      img,
      div {
        position: absolute;
        padding: 0px;
        margin: 0px;
        display: none;
      }
      body {
        height: 100%;
        overflow-y: hidden;
        overflow-x: hidden;
        background-color: black;
        color: white;
        background-image: url("img/background.gif");
      }
    </style>
    <script type="module">
      // Input objekt för att kontrollera värden
      let inputs = document.querySelectorAll("input");
      const startHastighet = 0.55;
      const skepp = [];
      const oSkott = [];
      const skott = [];
      const keyNames = [];
      const numberOfPlayers = 2;
      const numberOfAmmo = 6;
      const players = [];
      const direction = ["east", "west"];
      const playerImgs = [
        "img/skepp0_east.gif",
        "img/skepp1_east.gif",
        "img/skepp0_west.gif",
        "img/skepp1_west.gif",
      ];
      keyNames[1] = ["d", "a", "w", "s"];
      keyNames[0] = ["6", "4", "8", "5"];
      let down = false;
      let bothComingFromRight = false;
      let bothComingFromLeft = false;
      let bothComingFromTop = false;
      let bothComingFromBottom = false;
      let zeroLeftOneRight = false;
      let oneLeftZeroRight = false;
      let zeroTopOneBottom = false;
      let oneTopZeroBottom = false;
      let krock = false;
      const ajust = 10;
      for (let i = 0; i < numberOfAmmo; i++) {
        // Skapar ett objekt i JS för skott
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
        // Skapar ett objekt i JS för players
        players[i] = {
          posX: randomX,
          posY: randomY,
          width: 40,
          height: 30,
          right: 0,
          bottom: 0,
          stegX: 0.5,
          stegY: 0.5,
          accelaration: 1.2,
          direction: "west",
          hit: false,
        };
        //skapar och appendar html-element
        skepp[i] = document.createElement("IMG");
        skott[i] = document.createElement("div");
        document.body.append(skepp[i]);
        document.body.append(skott[i]);
        skepp[i].src = playerImgs[i];
        //Bredd och höjd css
        skepp[i].style.width = players[i].width + "px";
        skepp[i].style.height = players[i].height + "px";
        skott[i].textContent = `*`;
        // Lyssnar händelser från olika tangenter
        document.addEventListener("keydown",(event) => {
            if (down) return;
            down = true;
            skepp[i].style.display = "block";
            // Ökar/miskar hastigheten med accelerationsvärdet beroende på tangent som trycks ned
            if (event.key === keyNames[i][0]) {
              inputs[0].value += "=>";
              players[i].stegX += players[i].accelaration;
              //Funktion anropas och byter bild på objktet om riktningen är =>
              if (players[i].stegX > 0) players[i].direction = "east";
              bytBild(i, players[i].direction);
            }
            if (event.key === keyNames[i][1]) {
              inputs[0].value += "<=";
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
            if (event.key === "0") {
              oSkott[0].active = true;
              skott[0].style.display = "block";
            }
            if (event.key === " ") {
              oSkott[1].active = true;
              skott[1].style.display = "block";
            }
          }, false);
          //För att förhindra automatisk repetition
        document.addEventListener("keyup", function () {
            down = false;
          }, false);
      }
      function bytBild(obj, bild1, bild2, obj2) {
        //Byter bild på objektet vid riktningsbyte och träff
        skepp[obj].src = `img/skepp${obj}_${bild1}.gif`;
        if (obj2) skepp[obj2].src = `img/skepp${obj2}_${bild1}.gif`;
      }
      //"Fysikmotor" som kollar när objekten på olika sätt kolliderar och byter därefter riktning
      function kollaVar(obj) {
        if (krock) {
          if (
            ///////////////////////////////////// X-led
            bothComingFromRight &&
            players[0].posX < players[1].right &&
            players[0].posX > players[1].right - ajust
          ) {
            players[0].stegX = startHastighet / 2;
            players[1].stegX -= startHastighet;
            bytBild(1, "west", "east", 0);
          } else if (
            bothComingFromRight &&
            players[1].posX < players[0].right &&
            players[1].posX > players[0].right - ajust
          ) {
            players[1].stegX = startHastighet / 2;
            players[0].stegX -= startHastighet;
            bytBild(0, "west", "east", 1);
          } else if (
            bothComingFromLeft &&
            players[1].right > players[0].posX &&
            players[1].right < players[0].posX + ajust
          ) {
            players[1].stegX = -startHastighet / 2;
            players[0].stegX += startHastighet;
            bytBild(1, "west", "east", 0);
          } else if (
            bothComingFromLeft &&
            players[0].right > players[1].posX &&
            players[0].right < players[1].posX + ajust
          ) {
            players[0].stegX = -startHastighet / 2;
            players[1].stegX += startHastighet;
            bytBild(0, "west", "east", 1);
          } else if (
            zeroLeftOneRight &&
            players[0].right > players[1].posX &&
            players[0].right < players[1].posX + ajust
          ) {
            players[0].stegX = -startHastighet;
            players[1].stegX = startHastighet;
            bytBild(0, "west", "east", 1);
          } else if (
            oneLeftZeroRight &&
            players[1].right > players[0].posX &&
            players[1].right < players[0].posX + ajust
          ) {
            players[0].stegX = startHastighet;
            players[1].stegX = -startHastighet;
            bytBild(1, "west", "east", 0);
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
      }
      // Funktionen kollar om skott-objekten träffar skeppen
      function kollaTraff() {
        function hit(a, b) {
          players[a].hit =
            oSkott[b].posX > players[a].posX &&
            oSkott[b].posX < players[a].right &&
            oSkott[b].posY < players[a].bottom &&
            oSkott[b].posY > players[a].posY;
          if (players[a].hit) {
            oSkott[b].active = false;
            bytBild(a, "explosion", "explosion");
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        }
        hit(0, 1);
        hit(1, 0);
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
        kollaVar();
        for (let i = 0; i < numberOfPlayers; i++) {
          players[i].right = players[i].posX + players[i].width;
          players[i].bottom = players[i].posY + players[i].height;
          // posX ökar för varje anrop med hastighetsvärdet
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

          players[i].posX = players[i].posX + players[i].stegX;
          players[i].posY = players[i].posY + players[i].stegY;

          // style-objektet får ny possition
          skepp[i].style.left = players[i].posX + "px";
          skepp[i].style.top = players[i].posY + "px";
          skott[i].style.left = oSkott[i].posX + "px";
          skott[i].style.top = oSkott[i].posY + "px";

          /////////////
          //Styr skotten
          kollaTraff();
          if (
            oSkott[i].posX > window.innerWidth ||
            oSkott[i].posX < 0 ||
            oSkott[i].posY > window.innerHeight ||
            oSkott[i].posY < 0
          ) {
            oSkott[i].active = false;
          }
          if (oSkott[i].active) {
            if (oSkott[i].speedX > 0) {
              oSkott[i].posX += oSkott[i].speedX + oSkott[i].accelaration;
            } else if (oSkott[i].speedX < 0) {
              oSkott[i].posX += oSkott[i].speedX - oSkott[i].accelaration;
            }
            oSkott[i].posY += oSkott[i].speedY;
          } else {
            oSkott[i].posX = players[i].posX + 10;
            oSkott[i].posY = players[i].posY + 10;
            oSkott[i].speedY = players[i].stegY;
            oSkott[i].speedX = players[i].stegX;
          }

          // Kontrollvärden
          /*
                    inputs[0].value = oSkott[0].active;
                    inputs[1].value = oSkott[i].speedX;
                    inputs[2].value = oSkott[1].posX;
                    inputs[3].value = window.innerWidth;
                    inputs[4].value = window.innerHeight;
                    */
        }
      }, 10);
    </script>
  </head>
  <body>
    <!--div id="skepp1">skepp 1</div>
    <div id="skepp2">skepp 2</div-->
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <br />
    Player 1 Styr med awsd skjut med space<br />
    Player 2 Styr med 4856 skjut med 0<br />
  </body>
</html>

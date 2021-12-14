/// Lyssnare efter enter för att starta spelet
document.addEventListener("keydown", (event) => {
  // "Dödar" funktion efter första rundan
  if (round !== 1) return false;
  else {
    if (event.key === "Enter") {
      playSound(2);
      let i = 3;
      h1.textContent = `GET READY TO RUMBLE`;
      p1.textContent = i;
      p2.style.display = "none";
      p3.classList.remove("blink-me");
      p3.textContent = `BEST OF ${endRound} ROUNDS`;
      // Räknar ner innan spelet startar
      let starter = setInterval(() => {
        i--;
        if (i === 0) {
          clearInterval(starter);
          startGame();
        } else p1.textContent = i;
        p2.style.display = "none";
      }, 1000);
    }
  }
});
// Ser till at spelet börjar och rätt saker visas/göms
function startGame() {
  for (let i = 0; i < numberOfPlayers; i++) {
    skepp[i].style.display = "block";
    skott[i].style.display = "block";
    onHold = false;
    bytBild(i, "east", players[i].width, players[i].height);
    bytBild(i, "east", players[i].width, players[i].height);
  }
  info.style.visibility = "hidden";
}
/// Reset:ar skeppens positioner och gömmer dem när inforutan visas
function continueGame(a, b) {
  skepp[a].style.display = "none";
  skepp[b].style.display = "none";
  // Om det är sista rundan pga av ena spelaren har två poäng
  if (players[0].score === endRound - 1 || players[1].score === endRound - 1) {
    playSound(5);
    // Avgör vem som har vunnit
    if (players[0].score > players[1].score) winner = "2";
    else if (players[1].score > players[0].score) winner = "1";
    // Stänger av animationen
    clearInterval(motor1);
    // Göm objekt visa inforuta
    skepp[a].style.display = "none";
    skepp[b].style.display = "none";
    info.style.visibility = "visible";
    p1.style.display = "block";
    h1.textContent = `PLAYER ${winner} IS VICTORIOUS`;
    p1.classList.add("blink-me");
    p1.textContent = `RELOAD PAGE TO PLAY AGAIN`;
  } else {
    for (let i = 0; i < numberOfPlayers; i++) {
      // Placerar om objekten vid ny runda
      skott[i].style.display = "none";
      let randomX2 = Math.round(Math.random() * window.innerWidth) - 50;
      let randomY2 = Math.round(Math.random() * window.innerHeight) - 50;
      players[i].posX = randomX2;
      players[i].posY = randomY2;
    }
    // Inforutan visas och meddelande om score och round visas
    info.style.visibility = "visible";
    h1.textContent = `SCORE FOR PLAYER ${a + 1}`;
    // Inforuta efter 2 sek
    setTimeout(() => {
      if (round < endRound) h1.textContent = `GET READY FOR ROUND ${round}`;
      else h1.textContent = `GET READY FOR THE FINALE ROUND`;
    }, 2000);
    // Startar nästa runda efter 4 sek
    setTimeout(() => {
      startGame();
    }, 4000);
    p1.style.display = "none";
    p2.style.display = "none";
    p3.style.display = "none";
    round++;
  }
}

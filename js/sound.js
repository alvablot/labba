const sounds = [];
sounds[0] = document.createElement("audio");
sounds[0].src = "sounds/hyprbf1a.wav";
sounds[1] = document.createElement("audio");
sounds[1].src = "sounds/railgf1a.wav";
sounds[2] = document.createElement("audio");
sounds[2].src = "sounds/spacecombat.mp3";
sounds[3] = document.createElement("audio");
sounds[3].src = "sounds/explosion3.mp3";
sounds[4] = document.createElement("audio");
sounds[4].src = "sounds/scream2.mp3";
sounds[5] = document.createElement("audio");
sounds[5].src = "sounds/applause.mp3";
sounds[6] = document.createElement("audio");
sounds[6].src = "sounds/mm.mp3";
sounds.forEach((sound) => {
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(sound);
});
function playSound(obj) {
  if (sounds[obj].paused) {
    sounds[obj].play();
  } else {
    sounds[obj].currentTime = 0;
  }
}

const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const canvas = document.getElementById("canvas");
  canvas.width = 700;
  canvas.height = 650;
  const game = new Game(canvas);

  intro.addEventListener("click", (e) => {
    canvas.classList.remove("hidden");
    intro.classList.add("hidden");
    game.play();
  });

});

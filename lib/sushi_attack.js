const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = 700;
  canvas.height = 700;
  const game = new Game(canvas);
  game.play();
});

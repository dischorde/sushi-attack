import Game from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const header = document.getElementById("intro-header");
  const main = document.getElementById("main");
  const canvas = document.getElementById("canvas");
  canvas.width = 700;
  canvas.height = 700;
  const game = new Game(canvas);

  intro.addEventListener("click", (e) => {
    main.classList.remove("hidden");
    main.classList.add("game-wrapper");
    intro.classList.add("hidden");
    header.classList.add("hidden");
    game.play();
  });

});

import Game from "./game.js";

const openInfoBar = () => {
  const infoBar = document.getElementById("info");
  infoBar.style.right = "0px";

  // infoBar.addEventListener("mouseout", () => {
  //   console.log("mouseout");
  //   closeInfoBar();
  // });
};

const closeInfoBar = () => {
  const infoBar = document.getElementById("info");
  infoBar.style.right = "-500px";
};

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const header = document.getElementById("intro-header");
  const main = document.getElementById("main");
  const canvas = document.getElementById("canvas");
  canvas.width = 700;
  canvas.height = 700;
  const game = new Game(canvas);

  const restartButton = document.getElementById("restart");
  const pausePlayButton = document.getElementById("pause-play");
  const infoButtons = document.getElementsByClassName("hamburger-bars");

  for (let i = 0; i < infoButtons.length; i++) {
    let button = infoButtons[i];
    button.addEventListener("click", () => {
      console.log("click");
      openInfoBar();
    });
  }

  restartButton.addEventListener("click", () => game.restart());
  pausePlayButton.addEventListener("click", () => game.togglePause(pausePlayButton));

  intro.addEventListener("click", (e) => {
    main.classList.remove("hidden");
    main.classList.add("game-wrapper");
    intro.classList.add("hidden");
    header.classList.add("hidden");
    game.play();
  });

});

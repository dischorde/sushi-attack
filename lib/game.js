const Character = require("./character.js");

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(canvas);

    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;

  }

  play() {
    let girl = new Character(this.centerX, this.centerY);
    this.stage.addChild(girl.sprite);

    createjs.Ticker.addEventListener("tick", () => {
      girl.sprite.x = this.stage.mouseX;
      girl.sprite.y = this.stage.mouseY;
      this.stage.update();
    });
  }
}

module.exports = Game;

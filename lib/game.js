const Character = require("./character.js");
const Sushi = require("./sushi.js");

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(canvas);

    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.speed = 6;
    this.sushi = [];
    this.level = 1;
    this.numTicks = 0;
  }

  moveSushi() {
    this.sushi.forEach((sushi) =>
      sushi.move(this.speed)
    );
  }

  makeSushi() {
    if (this.sushi.length < (25 * this.level) && this.numTicks === 5) {
      let newSushi = new Sushi(this.canvas.width, this.canvas.height);
      this.stage.addChild(newSushi.sprite);
      this.sushi.push(newSushi);
      this.numTicks = 0;
    }
    else {
      this.numTicks++;
    }
  }

  play() {
    const girl = new Character(this.centerX, this.centerY);
    // const sushi = new Sushi(this.canvas.width, this.canvas.height);
    this.stage.addChild(girl.sprite);
    // this.stage.addChild(sushi.sprite);

    createjs.Ticker.addEventListener("tick", () => {
      girl.sprite.x = this.stage.mouseX;
      girl.sprite.y = this.stage.mouseY;

      // sushi.move(this.speed);
      this.makeSushi();
      this.moveSushi();
      this.stage.update();
    });
  }
}

module.exports = Game;

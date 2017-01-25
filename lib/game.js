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
    this.clearedCount = 0;
    this.level = 1;
    this.score = 0;
    this.numTicks = 0;
  }

  moveSushi() {
    this.sushi.forEach((sushi) =>
      sushi.move(this.speed)
    );
  }

  makeSushi() {
    if (this.clearedCount < (25 * this.level)
        && this.numTicks === 5) {
      let newSushi = new Sushi(this.canvas.width, this.canvas.height);
      this.stage.addChild(newSushi.sprite);
      this.sushi.push(newSushi);
      this.numTicks = 0;
    }
    else {
      this.numTicks++;
    }
  }

  // updateStatus() {
  //   this.sushi.forEach((sushi) => {
  //     if
  //   })
  // }


    // for(let i = 0; i < this.asteroids.length - 1; i++) {
    //   let current = this.asteroids[i];
    //   for(let j = i + 1; j < this.asteroids.length; j++ ) {
    //     let comparison = this.asteroids[j];
    //     if (current.isCollidedWith(comparison)) {
    //       this.remove(current);
    //       this.remove(comparison);
    //     }
    //   }
    // }



  play() {
    const girl = new Character(this.centerX, this.centerY);
    this.stage.addChild(girl.sprite);

    createjs.Ticker.addEventListener("tick", () => {
      girl.sprite.x = this.stage.mouseX;
      girl.sprite.y = this.stage.mouseY;
      window.girl = girl;

      this.makeSushi();
      this.moveSushi();
      this.stage.update();
    });
  }
}

module.exports = Game;

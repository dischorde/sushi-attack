const Character = require("./character.js");
const Sushi = require("./sushi.js");
const Scoreboard = require("./scoreboard.js");

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(canvas);
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;

    this.speed = 10;
    this.sushi = [];
    this.scoreboard = new Scoreboard(canvas.width, canvas.height);
    this.stage.addChild(this.scoreboard.displayText);
    // this.scoreboard.clearedCount = 0;
    // this.scoreboard.score = 0;
    // this.scoreboard.lives = 3;
    this.level = 1;
    this.paused = false;
    this.numTicks = 0;

    this.chara = new Character(this.centerX, this.centerY);
    this.stage.addChild(this.chara.sprite);
  }

  moveSushi() {
    this.sushi.forEach((sushi) =>
      sushi.move(this.speed)
    );
  }

  makeSushi() {
    if (this.scoreboard.clearedCount < (25 * this.level)
        && this.numTicks === (9 - Math.floor(this.level / 2))){
      let newSushi = new Sushi(this.canvas.width, this.canvas.height);
      this.stage.addChild(newSushi.sprite);
      this.sushi.push(newSushi);
      this.numTicks = 0;
    }
    else if (this.scoreboard.clearedCount >= (25 * this.level)
      && this.sushi.length === 0) {
      this.level++;
      console.log(`LEVEl ${this.level}`);
      console.log(this.score);
      this.numTicks = 0;
      this.reset();
    }
    else {
      this.numTicks++;
    }
  }

  updateStatus() {
    this.chara.updateCoords();
    for (let i = this.sushi.length - 1; i >= 0; i--) {
      let sushi = this.sushi[i];
      if (this.chara.isCollidedWith(sushi)) {
        this.scoreboard.lives--;
        this.stage.removeChild(sushi.sprite);
        this.sushi.splice(i, 1);
      }
      else if (sushi.bottom() <= 0) {
        this.scoreboard.score += sushi.points;
        this.scoreboard.clearedCount++;
        this.stage.removeChild(sushi.sprite);
        this.sushi.splice(i, 1);
      }
    }
  }

  play() {
    window.scoreboard = this.scoreboard;
    createjs.Ticker.addEventListener("tick", () => {
      this.canvas.width = this.canvas.height;
      this.scoreboard.updateScore(this.level);
      this.playCycle();
      this.stage.update();
    });
  }

  playCycle() {
    let girl = this.chara.sprite;
    this.stage.setChildIndex( girl, this.stage.getNumChildren()-1);
    girl.x = this.stage.mouseX;
    girl.y = this.stage.mouseY;


    if (this.scoreboard.lives <= 0 && !this.paused) {
      alert("GAME OVER");
      this.paused = true;
      // this.startOver();
    }
    else if (!this.paused) {
      this.updateStatus();
      this.makeSushi();
      this.moveSushi();
    }
  }

  startOver() {
    this.level = 1;
    this.sushi.forEach((sushi) =>
      this.stage.removeChild(sushi.sprite)
    );

    this.scoreboard.score = 0;
    this.scoreboard.lives = 3;
    this.reset();
  }

  reset() {
    this.speed = 10 + (5 * (this.level - 1));
    this.sushi = [];
    this.scoreboard.clearedCount = 0;
    this.numTicks = 0;
  }
}


module.exports = Game;

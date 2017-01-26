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
    this.tickSpeed = 9;
    this.sushi = [];
    this.level = 1;
    this.paused = false;
    this.numTicks = 0;

    this.scoreboard = new Scoreboard(canvas.width, canvas.height);
    this.stage.addChild(this.scoreboard.displayText);
    this.chara = new Character(this.centerX, this.centerY);
    this.stage.addChild(this.chara.sprite);
  }

  numToLevelUp() {
    return 25 * this.level;
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
    // set index to bring girl in front of sushi
    this.stage.setChildIndex( girl, this.stage.getNumChildren()-2);
    girl.x = this.stage.mouseX;
    girl.y = this.stage.mouseY;


    if (this.scoreboard.lives <= 0 && !this.paused) {
      this.gameOver();
      this.paused = true;
    }
    else if (!this.paused) {
      this.numTicks++;
      this.checkCollisions();
      this.makeSushi();
      this.checkLevelUp();
      this.moveSushi();
    }
  }

  checkCollisions() {
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

  makeSushi() {
    if ((this.scoreboard.clearedCount + this.sushi.length) < this.numToLevelUp()
    && this.numTicks === this.tickSpeed) {
      let newSushi = new Sushi(this.canvas.width, this.canvas.height, `sushi${this.level % 6}`);
      this.stage.addChild(newSushi.sprite);
      this.sushi.push(newSushi);
      this.numTicks = 0;
    }
  }

  checkLevelUp() {
    if (this.scoreboard.clearedCount >= this.numToLevelUp()) {
        this.level++;

        // throw up new level text
        let text = `LEVEl ${this.level}!`;
        let style = "40px Vampiro One";
        let popup = this.popUpText(text, style, "#494541", 2);
        popup.y += 20;

        this.numTicks = 0;
        this.reset();
    }
  }

  reset() {
    this.speed = 10 + (5 * (this.level - 1));
    this.tickSpeed = 10 - this.level;
    this.sushi = [];
    this.scoreboard.clearedCount = 0;
    this.numTicks = 0;
  }

  moveSushi() {
    this.sushi.forEach((sushi) =>
      sushi.move(this.speed)
    );
  }

  popUpText(text, style, color = "white") {
    let popup = new createjs.Text(text, style, color);
    popup.font = style;
    popup.color = color;
    popup.x = this.centerX;
    popup.y = this.centerY;
    this.stage.addChild(popup);
    popup.textAlign = "center";
    setTimeout(() => {
      this.stage.removeChild(popup);
    }, 3000);
    return popup;
  }

  gameOver() {
    let popup = this.popUpText("GAME OVER!!", "180px Vampiro One", "#c7f330");
    popup.y = this.centerY - (popup.getBounds().height * 2.25) / 2;
    popup.textBaseline = "top";
    popup.lineWidth = .9 * this.canvas.width;
  }

  extraPoints() {

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
}


module.exports = Game;

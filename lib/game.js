import Character from "./character.js";
import Sushi from "./sushi.js";
import Scoreboard from "./scoreboard.js";
import { randomBetween } from "./util.js";
import SpecialSushi from "./special_sushi.js";
import {  Speeder,
          Slower,
          Grower,
          Shrinker,
          ExtraLife,
          Bomb,
          Shield,
          Bonus
        } from "./powerups.js";


class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(canvas);
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;

    this.speed = 10;
    this.tickSpeed = 9;
    this.sushi = [];
    this.powerups =[];
    this.level = 1;
    this.paused = false;
    this.numTicks = 0;

    this.scoreboard = new Scoreboard(canvas.width, canvas.height);
    this.stage.addChild(this.scoreboard.displayText);
    this.chara = new Character(this.centerX, this.centerY);
    this.stage.addChild(this.chara.sprite);

    this.clearSushis = this.clearSushis.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.displayInMiddle = this.displayInMiddle.bind(this);
  }

  togglePause(button) {
    if (this.paused) {
      this.paused = false;
      button.src = "assets/images/pause.svg";
    }
    else {
      this.paused = true;
      button.src = "assets/images/play.svg";
    }
  }

  numToLevelUp() {
    return 25 * this.level;
  }

  changeSpeed(amount) {
    this.speed += amount;
  }

  clearSushis() {
    this.sushi.forEach((sushi) =>
      this.stage.removeChild(sushi.sprite)
    );
    this.powerups.forEach((powerup) =>
      this.stage.removeChild(powerup.sprite)
    );
    this.powerups = [];
    this.sushi = [];
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
      this.makeMoreSushi();
      this.checkLevelUp();
      this.moveSushi();
    }
  }

  checkCollisions() {
    this.chara.updateCoords();
    this.checkSushi();
    this.checkPowerUps();
  }

  checkSushi() {
    for (let i = this.sushi.length - 1; i >= 0; i--) {
      let sushi = this.sushi[i];
      if (this.chara.isCollidedWith(sushi)) {
        this.scoreboard.lives--;
        this.stage.removeChild(sushi.sprite);
        this.sushi.splice(i, 1);
      }
      else if (sushi.bottom() <= 0) {
        if (sushi.constructor.name !== "Sushi") {
          let style = "40px Vampiro One";
          this.popUpText(`${sushi.name} x2`, style, "white", 500);
        }
        this.scoreboard.score += sushi.points;
        this.scoreboard.clearedCount++;
        this.stage.removeChild(sushi.sprite);
        this.sushi.splice(i, 1);
      }
    }
  }

  checkPowerUps() {
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      let powerup = this.powerups[i];
      if (this.chara.isCollidedWith(powerup)) {
        powerup.go();
        this.stage.removeChild(powerup.sprite);
        this.powerups.splice(i, 1);
      }
      else if (powerup.bottom() <= 0) {
        this.stage.removeChild(powerup.sprite);
        this.powerups.splice(i, 1);
      }
    }
  }

  checkLevelUp() {
    if (this.scoreboard.clearedCount >= this.numToLevelUp()) {
        this.level++;

        this.displayInMiddle(`LEVEL ${this.level}!`, "#494541");

        this.numTicks = 0;
        this.reset();
    }
  }

  reset() {
    this.chara.setScale(1);
    this.speed = 10 + (5 * (this.level - 1));
    this.tickSpeed = 10 - this.level;
    this.clearSushis();
    this.scoreboard.clearedCount = 0;
    this.numTicks = 0;
    console.log("RESET!!");
    window.girl = this.chara;
  }

  moveSushi() {
    this.sushi.forEach((sushi) =>
      sushi.move(this.speed)
    );
    this.powerups.forEach((sushi) =>
      sushi.move(this.speed)
    );
  }

  makeMoreSushi() {
    if (this.numTicks === this.tickSpeed) {
      this.numTicks = 0;
      const rand = randomBetween(1, 50);
      if ([3, 48, 14, 21, 24, 30].includes(rand))
      {
        this.makeSingleSushi(true);
      }
      else {
        let newSushi;
        switch(true) {
          case (rand === 35): // make + speed
            newSushi = new Speeder(this.canvas.width,
                                   this.canvas.height,
                                   this.changeSpeed);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 16): // make - speed
            newSushi = new Slower(this.canvas.width,
                                  this.canvas.height,
                                  this.changeSpeed);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 27): // make bigger
            newSushi = new Grower(this.canvas.width,
                                  this.canvas.height,
                                  this.chara);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 7): // make smaller
            newSushi = new Shrinker(this.canvas.width,
                                    this.canvas.height,
                                    this.chara);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 19): // + life
            newSushi = new ExtraLife(this.canvas.width,
                                     this.canvas.height,
                                     this.scoreboard);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 29): // + bomb
            newSushi = new Bomb(this.canvas.width,
                                this.canvas.height,
                                this.clearSushis);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 42): // shield
            newSushi = new Shield(this.canvas.width,
                                  this.canvas.height,
                                  this.chara);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 11): // big extra points (two things?)
            newSushi = new Bonus(this.canvas.width,
                                 this.canvas.height,
                                 this.scoreboard,
                                 this.displayInMiddle);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          default:
            this.makeSingleSushi(false);
        }
      }
    }
  }

  makeSingleSushi(special) {
    if ((this.scoreboard.clearedCount + this.sushi.length) < this.numToLevelUp()) {
      let newSushi;
      if (special) {
        newSushi = new SpecialSushi(this.canvas.width, this.canvas.height);
      }
      else {
        newSushi = new Sushi(this.canvas.width, this.canvas.height, `sushi${this.level % 6}`);
      }
      this.stage.addChild(newSushi.sprite);
      this.sushi.push(newSushi);
    }
  }

  displayInMiddle(text, color) {
    let style = "40px Vampiro One";
    let popup = this.popUpText(text, style, color, 500);
    popup.y += 20;
  }

  popUpText(text, style, color = "white", time = 3000) {
    let popup = new createjs.Text(text, style, color);
    popup.font = style;
    popup.color = color;
    popup.x = this.centerX;
    popup.y = this.centerY;
    this.stage.addChild(popup);
    popup.textAlign = "center";
    setTimeout(() => {
      this.stage.removeChild(popup);
    }, time);
    return popup;
  }

  gameOver() {
    let popup = this.popUpText("GAME OVER!!", "180px Vampiro One", "#c7f330");
    popup.y = this.centerY - (popup.getBounds().height * 2.25) / 2;
    popup.textBaseline = "top";
    popup.lineWidth = .9 * this.canvas.width;
  }

  restart() {
    this.level = 1;
    this.scoreboard.score = 0;
    this.scoreboard.lives = 3;
    this.reset();
  }
}

export default Game;

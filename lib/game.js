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
      this.makeMoreSushi();
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

  checkLevelUp() {
    if (this.scoreboard.clearedCount >= this.numToLevelUp()) {
        this.level++;

        // throw up new level text
        let text = `LEVEL ${this.level}!`;
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
    this.powerups = [];
    this.scoreboard.clearedCount = 0;
    this.numTicks = 0;
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
    console.log(this.numTicks);
    if (this.numTicks === this.tickSpeed) {
      this.numTicks = 0;
      const rand = randomBetween(1, 50);
      // console.log(rand);
      if ([3, 8, 14, 21, 24, 30].includes(rand))
      {
        this.makeSingleSushi(true);
      }
      else {
        let newSushi;
        switch(true) {
          case (rand === 5): // make + speed
            console.log(`5 is === to ${rand}`);
            newSushi = new Speeder(this.canvas.width, this.canvas.height);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 16): // make - speed
            console.log(`16 is === to ${rand}`);
            newSushi = new Slower(this.canvas.width, this.canvas.height);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 27): // make bigger
            console.log(`27 is === to ${rand}`);
            newSushi = new Grower(this.canvas.width, this.canvas.height);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 7): // make smaller
            console.log(`7 is === to ${rand}`);
            newSushi = new Shrinker(this.canvas.width, this.canvas.height);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 19): // + life
            console.log(`19 is === to ${rand}`);
            newSushi = new ExtraLife(this.canvas.width, this.canvas.height);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 29): // + bomb
            console.log(`29 is === to ${rand}`);
            newSushi = new Bomb(this.canvas.width, this.canvas.height);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 2): // shield
            console.log(`2 is === to ${rand}`);
            newSushi = new Shield(this.canvas.width, this.canvas.height);
            this.stage.addChild(newSushi.sprite);
            this.powerups.push(newSushi);
            break;
          case (rand === 11): // big extra points (two things?)
            console.log(`11 is === to ${rand}`);
            newSushi = new Bonus(this.canvas.width, this.canvas.height);
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

export default Game;

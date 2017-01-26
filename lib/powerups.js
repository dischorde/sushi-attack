import Sushi from "./sushi.js";
import { randomBetween } from "./util.js";

const BONUS_SUSHI = ["miso", "sushi-spirit"];

// case 5: // make + speed
export class Speeder extends Sushi {
  constructor(xBound, yBound, changeSpeed) {
    super(xBound, yBound, "speeder", 0);
    this.changeSpeed = changeSpeed;
  }

  go() {
    this.changeSpeed(3);
  }
}

//
// case 16: // make - speed
export class Slower extends Sushi {
  constructor(xBound, yBound, changeSpeed) {
    super(xBound, yBound, "slower", 0);
    this.changeSpeed = changeSpeed;
  }

  go() {
    this.changeSpeed(-3);
  }
}
//
// case 27: // make bigger
export class Grower extends Sushi {
  constructor(xBound, yBound, chara) {
    super(xBound, yBound, "grower", 0);
    this.chara = chara;
  }

  go() {
    this.chara.changeScale(1.25);
  }
}
//
// case 7: // make smaller
export class Shrinker extends Sushi {
  constructor(xBound, yBound, chara) {
    super(xBound, yBound, "shrinker", 0);
    this.chara = chara;
  }

  go() {
    this.chara.changeScale(.75);
  }
}
//
// case 19: // + life
export class ExtraLife extends Sushi  {
  constructor(xBound, yBound, scoreboard) {
    super(xBound, yBound, "extra-life", 0);
    this.scoreboard = scoreboard;
  }

  go() {
    this.scoreboard.lives += 1;
  }
}
//
// case 29: // + bomb
export class Bomb extends Sushi {
  constructor(xBound, yBound, clearSushis) {
    super(xBound, yBound, "bomb", 0);
    this.clearSushis = clearSushis;
  }

  go() {
    this.clearSushis();
  }
}
//
// case 2: // shield
export class Shield extends Sushi {
  constructor(xBound, yBound, chara) {
    super(xBound, yBound, "shield", 0);
    this.chara = chara;
  }

  go() {
    this.chara.activateShield();
  }
}

// case 11: // big extra points (two things?)
export class Bonus extends Sushi {
  constructor(xBound, yBound, scoreboard, popUpText) {
    const sushiKind = BONUS_SUSHI[randomBetween(0, 1)];
    super(xBound, yBound, sushiKind, 100);
    this.name = (sushiKind === "miso" ? "Miso Soup" : "Sushi Spirit");
    this.scoreboard = scoreboard;
    this.popUpText = popUpText;
  }

  go() {
    this.scoreboard.score += this.points;
    //this.popUpText
  }
}

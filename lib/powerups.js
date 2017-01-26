import Sushi from "./sushi.js";
import { randomBetween } from "./util.js";

const BONUS_SUSHI = ["miso", "sushi-spirit"];

// case 5: // make + speed
export class Speeder extends Sushi {
  constructor(xBound, yBound) {
    super(xBound, yBound, "speeder", 0);
  }
}

//
// case 16: // make - speed
export class Slower extends Sushi {
  constructor(xBound, yBound) {
    super(xBound, yBound, "slower", 0);
  }
}
//
// case 27: // make bigger
export class Grower extends Sushi {
  constructor(xBound, yBound) {
    super(xBound, yBound, "grower", 0);
  }
}
//
// case 7: // make smaller
export class Shrinker extends Sushi {
  constructor(xBound, yBound) {
    super(xBound, yBound, "shrinker", 0);
  }
}
//
// case 19: // + life
export class ExtraLife extends Sushi  {
  constructor(xBound, yBound) {
    super(xBound, yBound, "extra-life", 0);
  }
}
//
// case 29: // + bomb
export class Bomb extends Sushi {
  constructor(xBound, yBound) {
    super(xBound, yBound, "bomb", 0);
  }
}
//
// case 2: // shield
export class Shield extends Sushi {
  constructor(xBound, yBound) {
    super(xBound, yBound, "shield", 0);
  }
}

// case 11: // big extra points (two things?)
export class Bonus extends Sushi {
  constructor(xBound, yBound) {
    const sushiKind = BONUS_SUSHI[randomBetween(0, 1)];
    super(xBound, yBound, sushiKind, 100);
    this.name = (sushiKind === "miso" ? "Miso Soup" : "Sushi Spirit");
  }
}

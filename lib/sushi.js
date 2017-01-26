import { randomBetween } from "./util.js";

class Sushi {
  constructor(xBound, yBound, sushiKind = 'sushi1', points = 5) {
    const sprite = new createjs.Bitmap(`./assets/images/${sushiKind}.svg`);
    this.points = points;
    sprite.x = this.generateRandomX(xBound - 55);
    sprite.y = yBound - 41;
    this.sprite = sprite;
    this.isSpecial = false;
  }

  width() {
    let bounds = this.sprite.getBounds();
    return (bounds ? bounds.width - 6 : 50);
  }

  height() {
    let bounds = this.sprite.getBounds();
    return (bounds ? bounds.height - 3 : 35);
  }

  bottom() {
    return this.sprite.y + 5 + this.height();
  }

  generateRandomX(xBound) {
    return randomBetween(10, xBound);
  }

  move(speed) {
    let topSpeed = speed + 12;
    this.sprite.y = this.sprite.y - randomBetween(speed, topSpeed);
  }
}

export default Sushi;

class Sushi {
  constructor(xBound, yBound, sushiKind = 'base') {
    const sprite = new createjs.Bitmap(`./assets/images/${sushiKind}.svg`);
    this.width = 55;
    this.height = 41;
    sprite.regX = this.width / 2;
    sprite.regY = this.height / 2;
    sprite.x = this.generateRandomX(xBound - sprite.regX);
    sprite.y = yBound - sprite.regY;
    this.sprite = sprite;
  }

  generateRandomX(xBound) {
    return Math.floor(Math.random() * (xBound - 10 + 1)) + 10;
  }

  move(speed) {
    let topSpeed = speed + 2;
    this.sprite.y = this.sprite.y - (Math.floor(Math.random() * (topSpeed - speed + 1)) + speed);
  }
}

module.exports = Sushi;

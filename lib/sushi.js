class Sushi {
  constructor(xBound, yBound, points = 5, sushiKind = 'base') {
    const sprite = new createjs.Bitmap(`./assets/images/${sushiKind}.svg`);
    this.points = points;
    // this.width = 55;
    // this.height = 41;
    sprite.x = this.generateRandomX(xBound - sprite.regX);
    sprite.y = yBound - sprite.regY;
    this.sprite = sprite;
  }

  width() {
    let bounds = this.sprite.getBounds();
    return (bounds ? bounds.width : 55);
  }

  height() {
    let bounds = this.sprite.getBounds();
    return (bounds ? bounds.height : 41);
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

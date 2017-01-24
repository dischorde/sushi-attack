class Character {
  constructor(startX, startY) {
    const sprite = new createjs.Bitmap("./assets/images/chara.svg");
    sprite.x = startX;
    sprite.y = startY;
    sprite.regX = 33;
    sprite.regY = 65;

    this.sprite = sprite;
    this.scale = 1;
    this.baseWidth = 58;
    this.baseHeight = 113;
  }

  width() {
    return this.baseWidth * this.scale;
  }

  height() {
    return this.baseHeight * this.scale;
  }

  changeScale(multiplier) {
    this.scale = this.scale * multiplier;
    this.sprite.scaleX = this.scale;
    this.sprite.scaleY = this.scale;
  }
}

module.exports = Character;

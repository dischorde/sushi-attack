class Character {
  constructor(startX, startY) {
    const sprite = new createjs.Bitmap("./assets/images/chara.svg");
    sprite.x = startX;
    sprite.y = startY;
    sprite.regX = 33;
    sprite.regY = 65;

    this.sprite = sprite;
    this.scale = 1;
  }

  width() {
    return this.sprite.getBounds().width;
  }

  height() {
    return this.sprite.getBounds().height;
  }

  changeScale(multiplier) {
    this.scale = this.scale * multiplier;
    this.sprite.scaleX = this.scale;
    this.sprite.scaleY = this.scale;
    this.regX = Math.floor(this.width() * .57);
    this.regY = Math.floor(this.height() * .58);
  }
}

module.exports = Character;

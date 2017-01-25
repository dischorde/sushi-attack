class Character {
  constructor(startX, startY) {
    const sprite = new createjs.Bitmap("./assets/images/chara.svg");
    sprite.x = startX;
    sprite.y = startY;
    sprite.regX = 29;
    sprite.regY = 65;

    this.sprite = sprite;
    this.scale = 1;
    this.coords = null;
  }

  width() {
    let bounds = this.sprite.getBounds();
    return (bounds ? bounds.width : 58);
  }

  height() {
    let bounds = this.sprite.getBounds();
    return (bounds ? bounds.height : 113);
  }

  middleX() {
    return Math.floor(this.width() * .5);
  }

  middleY() {
    return Math.floor(this.height() * .58);
  }

  bodyCoords(curX, curY) {
    let adjXPony = Math.floor(this.width() * .5);
    let adjXFace = Math.floor(this.width() * .35);
    let adjXBody = Math.floor(this.width() * .26);
    let adjXFeet = Math.floor(this.width() * .16);

    let adjYPony = Math.floor(this.height() * .58);
    let adjYFace = Math.floor(this.height() * .45);
    let adjYBody = Math.floor(this.height() * .24);
    let adjYFeet = Math.floor(this.height() * .19);

    return {
      ponytail: {
        x: curX - adjXPony,
        y: curY - adjYPony,
        width: this.width(),
        height: Math.floor(this.height() * .13)
      },
      face: {
        x: curX - adjXFace,
        y:  curY - adjYFace,
        width: Math.floor(this.width() * .69),
        height: Math.floor(this.height() * .20)
      },
      body: {
        x: curX - adjXBody,
        y: curY - adjYBody,
        width: Math.floor(this.width() * .52),
        height: Math.floor(this.height() * .29)
      },
      feet: {
        x: curX - adjXFeet,
        y: curY + adjYFeet,
        width: Math.floor(this.width() * .33),
        height: Math.floor(this.height() * .24)
      }
    };
  }

  touchingPonytail(sushi) {
    const { ponytail } = this.coords;
    debugger;
        if ( ponytail.x >= sushi.sprite.x + sushi.width() ||
          ponytail.x + ponytail.width <= sushi.sprite.x ||
          ponytail.y >= sushi.sprite.y + sushi.height() ||
          ponytail.y + ponytail.height <= sushi.sprite.y ) {
            return false;
        }
        return true;
  }

  touchingFace(sushi) {
    const { face } = this.coords;
    if ( face.x >= sushi.sprite.x + sushi.width() ||
      face.x + face.width <= sushi.sprite.x ||
      face.y >= sushi.sprite.y + sushi.height() ||
      face.y + face.height <= sushi.sprite.y ) {
        return false;
    }
    return true;
  }

  touchingBody(sushi) {
    const { body } = this.coords;
    if ( body.x >= sushi.sprite.x + sushi.width() ||
      body.x + body.width <= sushi.sprite.x ||
      body.y >= sushi.sprite.y + sushi.height() ||
      body.y + body.height <= sushi.sprite.y ) {
        return false;
    }
    return true;
  }

  touchingFeet(sushi) {
    const { feet } = this.coords;
    if ( feet.x >= sushi.sprite.x + sushi.width() ||
      feet.x + feet.width <= sushi.sprite.x ||
      feet.y >= sushi.sprite.y + sushi.height() ||
      feet.y + feet.height <= sushi.sprite.y ) {
        return false;
    }
    return true;
  }

  changeScale(multiplier) {
    this.scale = this.scale * multiplier;
    this.sprite.scaleX = this.scale;
    this.sprite.scaleY = this.scale;
    this.regX = this.middleX();
    this.regY = this.middleY();
    this.bodyCoords = this.bodyCoords();
  }

  updateCoords() {
    this.coords = this.bodyCoords(this.sprite.x, this.sprite.y);
  }

  isCollidedWith(sushi) {
    if ( this.touchingPonytail(sushi) ||
      this.touchingFace(sushi) ||
      this.touchingBody(sushi) ||
      this.touchingFeet(sushi) ){
      return true;
    }
    else {
      return false;
    }
  }
}

module.exports = Character;

class Character {
  constructor(startX, startY) {
    const sprite = new createjs.Bitmap("./assets/images/chara.svg");
    sprite.x = startX;
    sprite.y = startY;
    sprite.regX = 29;
    sprite.regY = 65;

    this.sprite = sprite;
    this.scale = 1;
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

    let adjYTop = Math.floor(this.height() * .58);
    let adjYPony = Math.floor(this.height() * .45);
    let adjYFace = Math.floor(this.height() * .24);
    let adjYBody = Math.floor(this.height() * .19);
    let adjYFeet = Math.floor(this.height() * .43);

    return {
      ponytail: {
        top: [curX - adjXPony, curY - adjYTop],
        bottom: [curX + adjXPony, curY - adjYPony]
      },
      face: {
        top: [curX - adjXFace, curY - adjYPony],
        bottom: [curX + adjXFace, curY - adjYFace]
      },
      body: {
        top: [curX - adjXBody, curY - adjYFace],
        bottom: [curX + adjXBody, curY + adjYBody]
      },
      feet: {
        top:[curX - adjXFeet, curY + adjYBody],
        bottom:[curX + adjXFeet, curY + adjYFeet]
      }
    };
  }
  //
  // touchingPonytail() {
  //
  // }
  //
  // touchingHead() {
  //
  // }
  //
  // touchingBody() {
  //
  // }

  changeScale(multiplier) {
    this.scale = this.scale * multiplier;
    this.sprite.scaleX = this.scale;
    this.sprite.scaleY = this.scale;
    this.regX = this.middleX();
    this.regY = this.middleY();
    this.bodyCoords = this.bodyCoords();
  }

  isCollidedWith(sushi) {
  //   let [x1, y1] = this.pos;
  //   let [x2, y2] = otherObject.pos;
  //   let sum = this.radius + otherObject.radius;
  //   let distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  //   if (distance < sum) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  }
}

module.exports = Character;

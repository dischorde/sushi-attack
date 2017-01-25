class Scoreboard {
  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.clearedCount = 0;
    this.score = 0;
    this.lives = 3;
    this.displayText = new createjs.Text();
    this.displayText.font = "30px Assistant";
    this.displayText.color = "white";
    this.orientText();
  }

  width() {
    let bounds = this.displayText.getBounds();
    return (bounds ? bounds.width : 0);
  }

  height() {
    let bounds = this.displayText.getBounds();
    return (bounds ? bounds.height : 32);
  }

  orientText() {
    this.displayText.x = ((.97 * this.canvasW) - this.width()) / 2;
    this.displayText.y =  this.canvasH - (3.2 * this.height());
  }

  updateScore(level) {
    let text = `Lives: ${this.lives}\xa0\xa0\xa0Sushi: ${this.clearedCount}/${25 * level}\xa0\xa0\xa0Score: ${this.score}`;
    this.displayText.text = text;
    this.orientText();
  }

}

module.exports = Scoreboard;

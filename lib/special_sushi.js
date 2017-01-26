import Sushi from "./sushi.js";
import { randomBetween } from "./util.js";

const SPECIAL_KINDS = ["cali-roll", "tuna-roll", "salmon-roe"];
const SUSHI_NAME = {
  "cali-roll": "California Roll",
  "tuna-roll": "Tuna Roll",
  "salmon-roe": "Salmon Roe Roll"
};

class SpecialSushi extends Sushi {
  constructor(xBound, yBound) {
    const sushiKind = SPECIAL_KINDS[randomBetween(0, 2)];
    super(xBound, yBound, sushiKind, 10);
    this.name = SUSHI_NAME[sushiKind];
  }
}

export default SpecialSushi;

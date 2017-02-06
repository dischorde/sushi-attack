/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var openInfoBar = function openInfoBar() {
	  var infoBar = document.getElementById("info");
	  infoBar.style.right = "0px";
	
	  infoBar.addEventListener("mouseleave", function () {
	    setTimeout(function () {
	      closeInfoBar();
	    }, 1000);
	  });
	};
	
	var closeInfoBar = function closeInfoBar() {
	  var infoBar = document.getElementById("info");
	  infoBar.style.right = "-25%";
	};
	
	document.addEventListener("DOMContentLoaded", function () {
	  var intro = document.getElementById("intro");
	  var header = document.getElementById("intro-header");
	  var main = document.getElementById("main");
	  var canvas = document.getElementById("canvas");
	  canvas.width = 700;
	  canvas.height = 700;
	  var game = new _game2.default(canvas);
	
	  var restartButton = document.getElementById("restart");
	  var pausePlayButton = document.getElementById("pause-play");
	  var infoButtons = document.getElementsByClassName("hamburger-bars");
	  var bubble = document.getElementById("bubble");
	
	  setTimeout(function () {
	    bubble.classList.remove("hide-bubble");
	  }, 1000);
	
	  for (var i = 0; i < infoButtons.length; i++) {
	    var button = infoButtons[i];
	    button.addEventListener("click", function () {
	      openInfoBar();
	    });
	  }
	
	  restartButton.addEventListener("click", function () {
	    return game.restart();
	  });
	  pausePlayButton.addEventListener("click", function () {
	    return game.togglePause(pausePlayButton);
	  });
	
	  intro.addEventListener("click", function (e) {
	    main.classList.remove("hidden");
	    bubble.classList.add("hide-bubble");
	    main.classList.add("game-wrapper");
	    intro.classList.add("hidden");
	    header.classList.add("hidden");
	    game.play();
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _character = __webpack_require__(2);
	
	var _character2 = _interopRequireDefault(_character);
	
	var _sushi = __webpack_require__(3);
	
	var _sushi2 = _interopRequireDefault(_sushi);
	
	var _scoreboard = __webpack_require__(5);
	
	var _scoreboard2 = _interopRequireDefault(_scoreboard);
	
	var _util = __webpack_require__(4);
	
	var _special_sushi = __webpack_require__(6);
	
	var _special_sushi2 = _interopRequireDefault(_special_sushi);
	
	var _powerups = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(canvas) {
	    _classCallCheck(this, Game);
	
	    this.canvas = canvas;
	    this.stage = new createjs.Stage(canvas);
	    this.centerX = canvas.width / 2;
	    this.centerY = canvas.height / 2;
	
	    this.speed = 10;
	    this.tickSpeed = 9;
	    this.sushi = [];
	    this.powerups = [];
	    this.level = 1;
	    this.paused = false;
	    this.numTicks = 0;
	
	    this.scoreboard = new _scoreboard2.default(canvas.width, canvas.height);
	    this.stage.addChild(this.scoreboard.displayText);
	    this.chara = new _character2.default(this.centerX, this.centerY);
	    this.stage.addChild(this.chara.sprite);
	
	    this.clearSushis = this.clearSushis.bind(this);
	    this.changeSpeed = this.changeSpeed.bind(this);
	    this.displayInMiddle = this.displayInMiddle.bind(this);
	  }
	
	  _createClass(Game, [{
	    key: "togglePause",
	    value: function togglePause(button) {
	      if (this.paused) {
	        this.paused = false;
	        button.src = "assets/images/pause.svg";
	      } else {
	        this.paused = true;
	        button.src = "assets/images/play.svg";
	      }
	    }
	  }, {
	    key: "numToLevelUp",
	    value: function numToLevelUp() {
	      return 25 * this.level;
	    }
	  }, {
	    key: "changeSpeed",
	    value: function changeSpeed(amount) {
	      this.speed += amount;
	    }
	  }, {
	    key: "clearSushis",
	    value: function clearSushis() {
	      var _this = this;
	
	      this.sushi.forEach(function (sushi) {
	        return _this.stage.removeChild(sushi.sprite);
	      });
	      this.powerups.forEach(function (powerup) {
	        return _this.stage.removeChild(powerup.sprite);
	      });
	      this.powerups = [];
	      this.sushi = [];
	    }
	  }, {
	    key: "play",
	    value: function play() {
	      var _this2 = this;
	
	      window.scoreboard = this.scoreboard;
	      createjs.Ticker.addEventListener("tick", function () {
	        _this2.canvas.width = _this2.canvas.height;
	        _this2.scoreboard.updateScore(_this2.level);
	        _this2.playCycle();
	        _this2.stage.update();
	      });
	    }
	  }, {
	    key: "playCycle",
	    value: function playCycle() {
	      var girl = this.chara.sprite;
	      // set index to bring girl in front of sushi
	      this.stage.setChildIndex(girl, this.stage.getNumChildren() - 2);
	      girl.x = this.stage.mouseX;
	      girl.y = this.stage.mouseY;
	
	      if (this.scoreboard.lives <= 0 && !this.paused) {
	        this.gameOver();
	        this.paused = true;
	      } else if (!this.paused) {
	        this.numTicks++;
	        this.checkCollisions();
	        this.makeMoreSushi();
	        this.checkLevelUp();
	        this.moveSushi();
	      }
	    }
	  }, {
	    key: "checkCollisions",
	    value: function checkCollisions() {
	      this.chara.updateCoords();
	      this.checkSushi();
	      this.checkPowerUps();
	    }
	  }, {
	    key: "checkSushi",
	    value: function checkSushi() {
	      for (var i = this.sushi.length - 1; i >= 0; i--) {
	        var sushi = this.sushi[i];
	        if (this.chara.isCollidedWith(sushi)) {
	          (0, _util.playBloop)();
	          this.scoreboard.lives--;
	          this.stage.removeChild(sushi.sprite);
	          this.sushi.splice(i, 1);
	        } else if (sushi.bottom() <= 0) {
	          if (sushi.constructor.name !== "Sushi") {
	            var style = "40px Vampiro One";
	            this.popUpText(sushi.name + " x2", style, "white", 350);
	          }
	          this.scoreboard.score += sushi.points;
	          this.scoreboard.clearedCount++;
	          this.stage.removeChild(sushi.sprite);
	          this.sushi.splice(i, 1);
	        }
	      }
	    }
	  }, {
	    key: "checkPowerUps",
	    value: function checkPowerUps() {
	      for (var i = this.powerups.length - 1; i >= 0; i--) {
	        var powerup = this.powerups[i];
	        if (this.chara.isCollidedWith(powerup)) {
	          (0, _util.playBlip)();
	          powerup.go();
	          this.stage.removeChild(powerup.sprite);
	          this.powerups.splice(i, 1);
	        } else if (powerup.bottom() <= 0) {
	          this.stage.removeChild(powerup.sprite);
	          this.powerups.splice(i, 1);
	        }
	      }
	    }
	  }, {
	    key: "checkLevelUp",
	    value: function checkLevelUp() {
	      if (this.scoreboard.clearedCount >= this.numToLevelUp()) {
	        this.level++;
	
	        this.displayInMiddle("LEVEL " + this.level + "!", "#494541");
	
	        this.numTicks = 0;
	        this.reset();
	      }
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this.chara.setScale(1);
	      this.speed = 10 + 5 * (this.level - 1);
	      this.tickSpeed = 10 - this.level;
	      this.clearSushis();
	      this.scoreboard.clearedCount = 0;
	      this.numTicks = 0;
	      window.girl = this.chara;
	    }
	  }, {
	    key: "moveSushi",
	    value: function moveSushi() {
	      var _this3 = this;
	
	      this.sushi.forEach(function (sushi) {
	        return sushi.move(_this3.speed);
	      });
	      this.powerups.forEach(function (sushi) {
	        return sushi.move(_this3.speed);
	      });
	    }
	  }, {
	    key: "makeMoreSushi",
	    value: function makeMoreSushi() {
	      if (this.numTicks === this.tickSpeed) {
	        this.numTicks = 0;
	        var rand = (0, _util.randomBetween)(1, 50);
	        if ([3, 48, 14, 21, 24, 30].includes(rand)) {
	          this.makeSingleSushi(true);
	        } else {
	          var newSushi = void 0;
	          switch (true) {
	            case rand === 35:
	              // make + speed
	              newSushi = new _powerups.Speeder(this.canvas.width, this.canvas.height, this.changeSpeed);
	              this.stage.addChild(newSushi.sprite);
	              this.powerups.push(newSushi);
	              break;
	            case rand === 16:
	              // make - speed
	              newSushi = new _powerups.Slower(this.canvas.width, this.canvas.height, this.changeSpeed);
	              this.stage.addChild(newSushi.sprite);
	              this.powerups.push(newSushi);
	              break;
	            case rand === 27:
	              // make bigger
	              newSushi = new _powerups.Grower(this.canvas.width, this.canvas.height, this.chara);
	              this.stage.addChild(newSushi.sprite);
	              this.powerups.push(newSushi);
	              break;
	            case rand === 7:
	              // make smaller
	              newSushi = new _powerups.Shrinker(this.canvas.width, this.canvas.height, this.chara);
	              this.stage.addChild(newSushi.sprite);
	              this.powerups.push(newSushi);
	              break;
	            case rand === 19:
	              // + life
	              newSushi = new _powerups.ExtraLife(this.canvas.width, this.canvas.height, this.scoreboard);
	              this.stage.addChild(newSushi.sprite);
	              this.powerups.push(newSushi);
	              break;
	            case rand === 29:
	              // + bomb
	              newSushi = new _powerups.Bomb(this.canvas.width, this.canvas.height, this.clearSushis);
	              this.stage.addChild(newSushi.sprite);
	              this.powerups.push(newSushi);
	              break;
	            case rand === 42:
	              // shield
	              newSushi = new _powerups.Shield(this.canvas.width, this.canvas.height, this.chara);
	              this.stage.addChild(newSushi.sprite);
	              this.powerups.push(newSushi);
	              break;
	            case rand === 11:
	              // big extra points (two things?)
	              newSushi = new _powerups.Bonus(this.canvas.width, this.canvas.height, this.scoreboard, this.displayInMiddle);
	              this.stage.addChild(newSushi.sprite);
	              this.powerups.push(newSushi);
	              break;
	            default:
	              this.makeSingleSushi(false);
	          }
	        }
	      }
	    }
	  }, {
	    key: "makeSingleSushi",
	    value: function makeSingleSushi(special) {
	      if (this.scoreboard.clearedCount + this.sushi.length < this.numToLevelUp()) {
	        var newSushi = void 0;
	        if (special) {
	          newSushi = new _special_sushi2.default(this.canvas.width, this.canvas.height);
	        } else {
	          newSushi = new _sushi2.default(this.canvas.width, this.canvas.height, "sushi" + this.level % 6);
	        }
	        this.stage.addChild(newSushi.sprite);
	        this.sushi.push(newSushi);
	      }
	    }
	  }, {
	    key: "displayInMiddle",
	    value: function displayInMiddle(text, color) {
	      var style = "40px Vampiro One";
	      var popup = this.popUpText(text, style, color, 300);
	      popup.y += 20;
	    }
	  }, {
	    key: "popUpText",
	    value: function popUpText(text, style) {
	      var _this4 = this;
	
	      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "white";
	      var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3000;
	
	      var popup = new createjs.Text(text, style, color);
	      popup.font = style;
	      popup.color = color;
	      popup.x = this.centerX;
	      popup.y = this.centerY;
	      this.stage.addChild(popup);
	      popup.textAlign = "center";
	      setTimeout(function () {
	        _this4.stage.removeChild(popup);
	      }, time);
	      return popup;
	    }
	  }, {
	    key: "gameOver",
	    value: function gameOver() {
	      var _this5 = this;
	
	      var popup = this.popUpText("GAME OVER!!", "180px Vampiro One", "#c7f330");
	      popup.y = this.centerY - popup.getBounds().height * 2.25 / 2;
	      popup.textBaseline = "top";
	      popup.lineWidth = .9 * this.canvas.width;
	      setTimeout(function () {
	        _this5.askToPlay();
	      }, 3000);
	    }
	  }, {
	    key: "askToPlay",
	    value: function askToPlay() {
	      var popup = new createjs.Text("Play Again?", "180px Vampiro One", "#c7f330");
	      popup.x = this.centerX;
	      popup.y = this.centerY - popup.getBounds().height * 2.25 / 2;
	      popup.textBaseline = "top";
	      popup.lineWidth = .9 * this.canvas.width;
	      this.stage.addChild(popup);
	      popup.textAlign = "center";
	      popup.addEventListener("click", this.playAgain(popup));
	    }
	  }, {
	    key: "playAgain",
	    value: function playAgain(popup) {
	      var _this6 = this;
	
	      return function () {
	        _this6.stage.removeChild(popup);
	        _this6.restart();
	      };
	    }
	  }, {
	    key: "restart",
	    value: function restart() {
	      this.level = 1;
	      this.scoreboard.score = 0;
	      this.scoreboard.lives = 3;
	      this.reset();
	      this.paused = false;
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Character = function () {
	  function Character(startX, startY) {
	    _classCallCheck(this, Character);
	
	    var sprite = new createjs.Bitmap("./assets/images/chara.svg");
	    sprite.x = startX;
	    sprite.y = startY;
	    sprite.regX = 29;
	    sprite.regY = 65;
	
	    this.sprite = sprite;
	    this.scale = 1;
	    this.coords = null;
	    this.shielded = false;
	  }
	
	  _createClass(Character, [{
	    key: "width",
	    value: function width() {
	      var bounds = this.sprite.getBounds();
	      return bounds ? bounds.width * this.scale : 10;
	    }
	  }, {
	    key: "height",
	    value: function height() {
	      var bounds = this.sprite.getBounds();
	      return bounds ? bounds.height * this.scale : 10;
	    }
	  }, {
	    key: "middleX",
	    value: function middleX() {
	      return Math.floor(this.width() * .5);
	    }
	  }, {
	    key: "middleY",
	    value: function middleY() {
	      return Math.floor(this.height() * .58);
	    }
	  }, {
	    key: "bodyCoords",
	    value: function bodyCoords(curX, curY) {
	      return {
	        ponytail: {
	          x: curX - Math.floor(this.width() * .35),
	          y: curY - Math.floor(this.height() * .45) + 3,
	          width: Math.floor(this.width() * .69),
	          height: Math.floor(this.height() * .13)
	        },
	        face: {
	          x: curX - Math.floor(this.width() * .35),
	          y: curY - Math.floor(this.height() * .45),
	          width: Math.floor(this.width() * .69),
	          height: Math.floor(this.height() * .20)
	        },
	        body: {
	          x: curX - Math.floor(this.width() * .26),
	          y: curY - Math.floor(this.height() * .24),
	          width: Math.floor(this.width() * .52),
	          height: Math.floor(this.height() * .29)
	        },
	        feet: {
	          x: curX - Math.floor(this.width() * .16),
	          y: curY + Math.floor(this.height() * .19),
	          width: Math.floor(this.width() * .33),
	          height: Math.floor(this.height() * .24)
	        }
	      };
	    }
	  }, {
	    key: "touchingPonytail",
	    value: function touchingPonytail(sushi) {
	      var ponytail = this.coords.ponytail;
	
	      if (ponytail.x >= sushi.sprite.x + sushi.width() || ponytail.x + ponytail.width <= sushi.sprite.x || ponytail.y >= sushi.sprite.y + sushi.height() || ponytail.y + ponytail.height <= sushi.sprite.y) {
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: "touchingFace",
	    value: function touchingFace(sushi) {
	      var face = this.coords.face;
	
	      if (face.x >= sushi.sprite.x + sushi.width() || face.x + face.width <= sushi.sprite.x || face.y >= sushi.sprite.y + sushi.height() || face.y + face.height <= sushi.sprite.y) {
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: "touchingBody",
	    value: function touchingBody(sushi) {
	      var body = this.coords.body;
	
	      if (body.x >= sushi.sprite.x + sushi.width() || body.x + body.width <= sushi.sprite.x || body.y >= sushi.sprite.y + sushi.height() || body.y + body.height <= sushi.sprite.y) {
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: "touchingFeet",
	    value: function touchingFeet(sushi) {
	      var feet = this.coords.feet;
	
	      if (feet.x >= sushi.sprite.x + sushi.width() || feet.x + feet.width <= sushi.sprite.x || feet.y >= sushi.sprite.y + sushi.height() || feet.y + feet.height <= sushi.sprite.y) {
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: "changeScale",
	    value: function changeScale(multiplier) {
	      this.scale = this.scale * multiplier;
	      this.sprite.scaleX = this.scale;
	      this.sprite.scaleY = this.scale;
	      this.regX = this.middleX();
	      this.regY = this.middleY();
	    }
	  }, {
	    key: "setScale",
	    value: function setScale(scale) {
	      this.scale = scale;
	      this.sprite.scaleX = this.scale;
	      this.sprite.scaleY = this.scale;
	      this.regX = this.middleX();
	      this.regY = this.middleY();
	    }
	  }, {
	    key: "updateCoords",
	    value: function updateCoords() {
	      this.coords = this.bodyCoords(this.sprite.x, this.sprite.y);
	    }
	  }, {
	    key: "activateShield",
	    value: function activateShield() {
	      var _this = this;
	
	      this.shielded = true;
	      this.sprite.shadow = new createjs.Shadow("#07d39f", 0, 0, 25);
	      setTimeout(function () {
	        _this.shielded = false;
	        _this.sprite.shadow = null;
	      }, 4000);
	    }
	  }, {
	    key: "isCollidedWith",
	    value: function isCollidedWith(sushi) {
	      if (this.shielded && (sushi.constructor.name === "Sushi" || sushi.constructor.name === "SpecialSushi")) {
	        return false;
	      } else if (this.touchingPonytail(sushi) || this.touchingFace(sushi) || this.touchingBody(sushi) || this.touchingFeet(sushi)) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }]);
	
	  return Character;
	}();
	
	exports.default = Character;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sushi = function () {
	  function Sushi(xBound, yBound) {
	    var sushiKind = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sushi1';
	    var points = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
	
	    _classCallCheck(this, Sushi);
	
	    var sprite = new createjs.Bitmap("./assets/images/" + sushiKind + ".svg");
	    this.points = points;
	    sprite.x = this.generateRandomX(xBound - 55);
	    sprite.y = yBound - 41;
	    this.sprite = sprite;
	    this.isSpecial = false;
	  }
	
	  _createClass(Sushi, [{
	    key: "width",
	    value: function width() {
	      var bounds = this.sprite.getBounds();
	      return bounds ? bounds.width - 6 : 50;
	    }
	  }, {
	    key: "height",
	    value: function height() {
	      var bounds = this.sprite.getBounds();
	      return bounds ? bounds.height - 3 : 35;
	    }
	  }, {
	    key: "bottom",
	    value: function bottom() {
	      return this.sprite.y + 5 + this.height();
	    }
	  }, {
	    key: "generateRandomX",
	    value: function generateRandomX(xBound) {
	      return (0, _util.randomBetween)(10, xBound);
	    }
	  }, {
	    key: "move",
	    value: function move(speed) {
	      var topSpeed = speed + 12;
	      this.sprite.y = this.sprite.y - (0, _util.randomBetween)(speed, topSpeed);
	    }
	  }]);
	
	  return Sushi;
	}();
	
	exports.default = Sushi;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var randomBetween = exports.randomBetween = function randomBetween(min, max) {
	  return Math.floor(Math.random() * (max - min + 1) + min);
	};
	
	var blip = new Audio("assets/sounds/bleep.wav");
	var bloop = new Audio("assets/sounds/negative-beep.wav");
	
	var playBlip = exports.playBlip = function playBlip() {
	  blip.play();
	};
	
	var playBloop = exports.playBloop = function playBloop() {
	  bloop.play();
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Scoreboard = function () {
	  function Scoreboard(canvasW, canvasH) {
	    _classCallCheck(this, Scoreboard);
	
	    this.canvasW = canvasW;
	    this.canvasH = canvasH;
	    this.clearedCount = 0;
	    this.score = 0;
	    this.lives = 3;
	    this.displayText = new createjs.Text();
	    this.displayText.font = "26px Vampiro One";
	    this.displayText.color = "white";
	    this.orientText();
	  }
	
	  _createClass(Scoreboard, [{
	    key: "width",
	    value: function width() {
	      var bounds = this.displayText.getBounds();
	      return bounds ? bounds.width : 0;
	    }
	  }, {
	    key: "height",
	    value: function height() {
	      var bounds = this.displayText.getBounds();
	      return bounds ? bounds.height : 32;
	    }
	  }, {
	    key: "orientText",
	    value: function orientText() {
	      this.displayText.x = (.97 * this.canvasW - this.width()) / 2;
	      this.displayText.y = this.canvasH - 2.3 * this.height(); // 3.2 for Assistant instead of Vampiro One
	    }
	  }, {
	    key: "updateScore",
	    value: function updateScore(level) {
	      var text = "Lives: " + this.lives + "\xA0\xA0\xA0Sushi: " + this.clearedCount + "/" + 25 * level + "\xA0\xA0\xA0Score: " + this.score;
	      this.displayText.text = text;
	      this.orientText();
	    }
	  }]);
	
	  return Scoreboard;
	}();
	
	exports.default = Scoreboard;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _sushi = __webpack_require__(3);
	
	var _sushi2 = _interopRequireDefault(_sushi);
	
	var _util = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SPECIAL_KINDS = ["cali-roll", "tuna-roll", "salmon-roe"];
	var SUSHI_NAME = {
	  "cali-roll": "California Roll",
	  "tuna-roll": "Tuna Roll",
	  "salmon-roe": "Salmon Roe Roll"
	};
	
	var SpecialSushi = function (_Sushi) {
	  _inherits(SpecialSushi, _Sushi);
	
	  function SpecialSushi(xBound, yBound) {
	    _classCallCheck(this, SpecialSushi);
	
	    var sushiKind = SPECIAL_KINDS[(0, _util.randomBetween)(0, 2)];
	
	    var _this = _possibleConstructorReturn(this, (SpecialSushi.__proto__ || Object.getPrototypeOf(SpecialSushi)).call(this, xBound, yBound, sushiKind, 10));
	
	    _this.name = SUSHI_NAME[sushiKind];
	    return _this;
	  }
	
	  return SpecialSushi;
	}(_sushi2.default);
	
	exports.default = SpecialSushi;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Bonus = exports.Shield = exports.Bomb = exports.ExtraLife = exports.Shrinker = exports.Grower = exports.Slower = exports.Speeder = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sushi = __webpack_require__(3);
	
	var _sushi2 = _interopRequireDefault(_sushi);
	
	var _util = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BONUS_SUSHI = ["miso", "sushi-spirit"];
	
	// case 5: // make + speed
	
	var Speeder = exports.Speeder = function (_Sushi) {
	  _inherits(Speeder, _Sushi);
	
	  function Speeder(xBound, yBound, changeSpeed) {
	    _classCallCheck(this, Speeder);
	
	    var _this = _possibleConstructorReturn(this, (Speeder.__proto__ || Object.getPrototypeOf(Speeder)).call(this, xBound, yBound, "speeder", 0));
	
	    _this.changeSpeed = changeSpeed;
	    _this.sprite.shadow = new createjs.Shadow("#F48CA5", 0, 0, 22);
	    return _this;
	  }
	
	  _createClass(Speeder, [{
	    key: "go",
	    value: function go() {
	      this.changeSpeed(3);
	    }
	  }]);
	
	  return Speeder;
	}(_sushi2.default);
	
	//
	// case 16: // make - speed
	
	
	var Slower = exports.Slower = function (_Sushi2) {
	  _inherits(Slower, _Sushi2);
	
	  function Slower(xBound, yBound, changeSpeed) {
	    _classCallCheck(this, Slower);
	
	    var _this2 = _possibleConstructorReturn(this, (Slower.__proto__ || Object.getPrototypeOf(Slower)).call(this, xBound, yBound, "slower", 0));
	
	    _this2.changeSpeed = changeSpeed;
	    _this2.sprite.shadow = new createjs.Shadow("#F054AC", 0, 0, 22);
	
	    return _this2;
	  }
	
	  _createClass(Slower, [{
	    key: "go",
	    value: function go() {
	      this.changeSpeed(-3);
	    }
	  }]);
	
	  return Slower;
	}(_sushi2.default);
	//
	// case 27: // make bigger
	
	
	var Grower = exports.Grower = function (_Sushi3) {
	  _inherits(Grower, _Sushi3);
	
	  function Grower(xBound, yBound, chara) {
	    _classCallCheck(this, Grower);
	
	    var _this3 = _possibleConstructorReturn(this, (Grower.__proto__ || Object.getPrototypeOf(Grower)).call(this, xBound, yBound, "grower", 0));
	
	    _this3.chara = chara;
	    _this3.sprite.shadow = new createjs.Shadow("#8B42CC", 0, 0, 22);
	
	    return _this3;
	  }
	
	  _createClass(Grower, [{
	    key: "go",
	    value: function go() {
	      this.chara.changeScale(1.25);
	    }
	  }]);
	
	  return Grower;
	}(_sushi2.default);
	//
	// case 7: // make smaller
	
	
	var Shrinker = exports.Shrinker = function (_Sushi4) {
	  _inherits(Shrinker, _Sushi4);
	
	  function Shrinker(xBound, yBound, chara) {
	    _classCallCheck(this, Shrinker);
	
	    var _this4 = _possibleConstructorReturn(this, (Shrinker.__proto__ || Object.getPrototypeOf(Shrinker)).call(this, xBound, yBound, "shrinker", 0));
	
	    _this4.chara = chara;
	    _this4.sprite.shadow = new createjs.Shadow("#1581D1", 0, 0, 22);
	    return _this4;
	  }
	
	  _createClass(Shrinker, [{
	    key: "go",
	    value: function go() {
	      this.chara.changeScale(.75);
	    }
	  }]);
	
	  return Shrinker;
	}(_sushi2.default);
	//
	// case 19: // + life
	
	
	var ExtraLife = exports.ExtraLife = function (_Sushi5) {
	  _inherits(ExtraLife, _Sushi5);
	
	  function ExtraLife(xBound, yBound, scoreboard) {
	    _classCallCheck(this, ExtraLife);
	
	    var _this5 = _possibleConstructorReturn(this, (ExtraLife.__proto__ || Object.getPrototypeOf(ExtraLife)).call(this, xBound, yBound, "extra-life", 0));
	
	    _this5.scoreboard = scoreboard;
	    _this5.sprite.shadow = new createjs.Shadow("#F0687D", 0, 0, 22);
	    return _this5;
	  }
	
	  _createClass(ExtraLife, [{
	    key: "go",
	    value: function go() {
	      this.scoreboard.lives += 1;
	    }
	  }]);
	
	  return ExtraLife;
	}(_sushi2.default);
	//
	// case 29: // + bomb
	
	
	var Bomb = exports.Bomb = function (_Sushi6) {
	  _inherits(Bomb, _Sushi6);
	
	  function Bomb(xBound, yBound, clearSushis) {
	    _classCallCheck(this, Bomb);
	
	    var _this6 = _possibleConstructorReturn(this, (Bomb.__proto__ || Object.getPrototypeOf(Bomb)).call(this, xBound, yBound, "bomb", 0));
	
	    _this6.clearSushis = clearSushis;
	    _this6.sprite.shadow = new createjs.Shadow("#DD0B3E", 0, 0, 22);
	
	    return _this6;
	  }
	
	  _createClass(Bomb, [{
	    key: "go",
	    value: function go() {
	      this.clearSushis();
	    }
	  }]);
	
	  return Bomb;
	}(_sushi2.default);
	//
	// case 2: // shield
	
	
	var Shield = exports.Shield = function (_Sushi7) {
	  _inherits(Shield, _Sushi7);
	
	  function Shield(xBound, yBound, chara) {
	    _classCallCheck(this, Shield);
	
	    var _this7 = _possibleConstructorReturn(this, (Shield.__proto__ || Object.getPrototypeOf(Shield)).call(this, xBound, yBound, "shield", 0));
	
	    _this7.chara = chara;
	    _this7.sprite.shadow = new createjs.Shadow("#82D827", 0, 0, 22);
	    return _this7;
	  }
	
	  _createClass(Shield, [{
	    key: "go",
	    value: function go() {
	      this.chara.activateShield();
	    }
	  }]);
	
	  return Shield;
	}(_sushi2.default);
	
	// case 11: // big extra points (two things?)
	
	
	var Bonus = exports.Bonus = function (_Sushi8) {
	  _inherits(Bonus, _Sushi8);
	
	  function Bonus(xBound, yBound, scoreboard, displayInMiddle) {
	    _classCallCheck(this, Bonus);
	
	    var sushiKind = BONUS_SUSHI[(0, _util.randomBetween)(0, 1)];
	
	    var _this8 = _possibleConstructorReturn(this, (Bonus.__proto__ || Object.getPrototypeOf(Bonus)).call(this, xBound, yBound, sushiKind, 100));
	
	    _this8.name = sushiKind === "miso" ? "Miso Soup" : "Sushi Spirit";
	    _this8.scoreboard = scoreboard;
	    _this8.displayInMiddle = displayInMiddle;
	    _this8.sprite.shadow = new createjs.Shadow("#A4DD4A", 0, 0, 22);
	    return _this8;
	  }
	
	  _createClass(Bonus, [{
	    key: "go",
	    value: function go() {
	      this.scoreboard.score += this.points;
	      this.displayInMiddle(this.name + " + 100", "white");
	    }
	  }]);

	  return Bonus;
	}(_sushi2.default);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
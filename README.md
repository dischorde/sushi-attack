
# Sushi Attack!

## Background

[Sushi Attack!](https://dischorde.github.io/sushi-attack/) is a game based off of [Ice Cream Machine](http://www.neopets.com/games/icecream2.phtml) from Neopets.com. The sushi on the conveyor belt have come alive, your goal is to escape ...err, earn points by dodging the flying sushi with your mouse! You earn points each time a sushi reaches the top of the screen untouched, including double points for some special sushi. There are also various power ups (that give you points, increase/decrease the speed of the sushi, and make you bigger/smaller) and other special items like bombs, extra lives, and sushi-shields that you actually want to grab. Each level has a set amount of sushi to clear before moving on to a new kind of faster sushi.

## Architecture and Technologies

Sushi Attack! was implemented with the following technologies:

 - `Vanilla JavaScript` for structure, game logic, and DOM manipulation
 - `HTML5 Canvas` & `Easel.js` for rendering
 - `Webpack`  to bundle and serve up the various scripts.

## Features and Implementation

![](/docs/sushi-screengrab.png)

The code is organized in an object-oriented fashion and relies on the Easel.js library. The game class pulls in logic from the scoreboard, character, sushi classes, generating a new sushi or powerup object based on the frame refresh rate (using the Easel.js Ticker). As as all sushi/powerups inherit from the Sushi class, they share the logic for width and height, movement, and generating a random position along the x-axis. The powerup classes are duck typed, so the game does not have to be concerned with the powerup type in order to activate it.

The text and sprites on the canvas are Easel.js objects, which conveniently allows for glowing effects (for powerups and the character when shielded) and allows the main character to be easily scaled. To handle this scaling and the main characters unusual shape, collision detection relies on four bounding boxes calculated based on percentages of the characters width/height and the x and y position of the registration point on the canvas.

    bodyCoords(curX, curY) {
	  return {
        ponytail: {
          x: curX - Math.floor(this.width() * .35),
          y: curY - Math.floor(this.height() * .45) + 3,
          width: Math.floor(this.width() * .69),
          height: Math.floor(this.height() * .13)
        },
      ...
      };
    }

    touchingPonytail(sushi) {
      const { ponytail } = this.coords;
      if ( ponytail.x >= sushi.sprite.x + sushi.width() ||
          ponytail.x + ponytail.width <= sushi.sprite.x ||
          ponytail.y >= sushi.sprite.y + sushi.height() ||
          ponytail.y + ponytail.height <= sushi.sprite.y ) {
        return false;
      }
        return true;
      }

    isCollidedWith(sushi) {
      if (this.shielded &&
         (sushi.constructor.name === "Sushi" ||
              sushi.constructor.name === "SpecialSushi")) {
          return false;
       }
       else if ( this.touchingPonytail(sushi) ||
         this.touchingFace(sushi) ||
         this.touchingBody(sushi) ||
         this.touchingFeet(sushi) ){
         return true;
       }
       else {
         return false;
       }
    }

## Future Features

Possible future additions to add to Sushi Attack! include:

- Allow users to pause/unpause game with the space bar
- Animations for main character
- High Scores
- Game music ( with mute/unmute)

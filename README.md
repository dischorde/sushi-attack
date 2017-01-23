# Sushi Attack!

## Background

Sushi Attack! is a game based off of [Ice Cream Machine](http://www.addictinggames.com/funny-games/icecreammachine.jsp) from Neopets.com. The sushi on the conveyor belt have come alive, your goal is to escape ...err, earn points by avoiding the sushi! When each piece of sushi you dodge reaches the other side of the screen you gain points, but if they touch you you die. You can also earn extra points by dodging special sushi, and pick up power ups (that give you points, increase/decrease the speed of the sushi, and make you bigger/smaller) or other special items like bombs, extra lives, and sushi-shields. 

## Functionality & MVPs

 - Game board designed using Canvas
 - Sushi flies from the bottom to the top of the screen randomly from the conveyor belt
 - Random special sushi, power ups, and extra items.
 - Player can move the main character around with the mouse
 - Toggle sidebar with instructions and links 
 - View points / lives that update in real time (if you run out of lives, the game is over).
 - **Bonus:** Levels with more and ever faster sushi

## Wireframes

This app will consist of a single screen. On opening, there will be an entry/splash page that simply has the title, click to play and a hamburger icon on the top right. The hamburger will pull out a sidebar That has a description of how to play the game, what different sushis mean generally, and links to my github and linked in. Clicking play will reveal the canvas and start the game. At the bottom will be the "conveyor belt", from whence sushi will start floating upward from random positions along the x-axis. The goal is to dodge these sushi with the mouse, while grabbing powerups and special sushi you want. The main character sticks to the cursor. 

![](/docs/wireframes/Entry.png)

![](/docs/wireframes/Main-Game.png)

![](/docs/wireframes/Sidebar.png)

## Architecture and Technologies

This project will be implemented with the following technologies:

 - `Vanilla JavaScript` for structure and game logic
 - `HTML5 Canvas` (and possibly `Easel.js`) for DOM manipulation and rendering
 - `Webpack`  to bundle and serve up the various scripts.

In addition to the webpack entry file, other estimated script files include:

`game_view.js:` this script will handle the logic for creating and updating the necessary elements and rendering them to the DOM.

`game.js:` this script will handle the logic for how the pieces work together, as well as keeping track of the number of lives, sushis, points, and levels. 

`sushi.js:` this is the base class for sushi, special sushi, and power ups and handles basic movement and points values. 

`chara.js:` this script will handle the logic behind moving the main character with the mouse, collision detection, and size increase and decrease

`special.js:` this file will hold classes that inherit from sushi.js and and handle powerups and special sushi 

## Implementation Timeline

**Day 1**: Setup all necessary Node modules and webpack. Create `webpack.config.js` as well as `package.json`. Write a basic entry file and render a sized canvas. Look into `Easel.js` vs regular canvas to determine ease of use and which would be easier with svg files. Goals for the day:

- Get a green bundle with webpack
- Learn enough Easel.js to determine if its worthwhile. If so, set it up.
- Render a sized canvas with main character that moves with the mouse

**Day 2**: Implement basic sushi logic and base functionality of game. Goals for the day:

- Sushi movement / Number of Total Sushi Count
- Random generation of location along x-axis for new sushi until count has been reached.
- Collision Detection (decrease number of lives for main character until game over)
- Basic Score Counting

**Day 3**: Flesh out the game through the logic in  `special.js`. Goals for the day:

- Special Sushi and Powerups
- Sushi that give you extra points to dodge
- Sushi (wasabi? something not sushi?) that gives you extra points to grab
- Size increase/ decrease for main character sushi
- Extra lives sushi
- Sushi-bomb sushi
- Playable game by EOD

**Day 4**: Set up user controls and style the frontend, making it polished and professional.Goals for the day:

- Set up entry page with logo and start button that hides canvas until you click to play.
- Create controls for stop game and reset.
- Set up About/How-To pull-out menu with Github / LinkedIn links.
- Have a nice styled Canvas.

### Bonus features

 1. Multiple levels with different sushi. Each level has more sushi (faster) sushi to dodge

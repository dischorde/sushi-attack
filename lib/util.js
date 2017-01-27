export const randomBetween = (min, max) => {
  return Math.floor(Math.random()*( max - min + 1) + min);
};


const blip = new Audio("assets/sounds/bleep.wav");
const bloop = new Audio("assets/sounds/negative-beep.wav");

export const playBlip = () => {
  blip.play();
};

export const playBloop = () => {
  bloop.play();
};

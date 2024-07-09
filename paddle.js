class Paddle {
  constructor (xpos, ypos, score) {
    this.xpos = xpos    // horizontal position of paddle
    this.ypos = ypos;   // vertical position of paddle
    this.score = score; // player's current score
  }

  moveUp(){
    this.ypos = y.pos - 10;
    console.log(`Player 1 ypos: " + ${this.ypos}`)
  }
  moveDown(){
    this.ypos = y.pos + 10;
    console.log(`Player 1 ypos: " + ${this.ypos}`)
  }
}

class Ball {
  constructor (xpos, ypos, speed){
    this.xpos = xpos;
    this.ypos = ypos;
    this.speed = speed;
    // Consider if I need an angle variable
  }

  // Called when colliding with a paddle or border
  bounce(){
    // Determine if colliding with a paddle or border, and determine ball's next y position
  }

  // Called when ball hits past player paddle
  goal(){
    // Scored on player 1
    if (this.xpos < 0) {
      p2.score++;
      this.speed = 5; // go towards player 1
    }
    // Scored on player 2
    else if (this.xpos > 20) {
      p1.score++;
      this.speed = -5; // go towards player 2
    }

    this.xpos = 25; // start at center again
  }
}

// Player 1 and 2 start across from each other, at the same y position
const p1 = new Paddle(0, 20, 0);
const p2 = new Paddle(50, 20, 0);
const ball = new Ball(10, 25, 0);

// Wait for enter or spacebar key to be pressed. Set players at starting position.
function gameStart(){
  document.getElementById("p1-score").innerText = 0;
  document.getElementById("p2-score").innerText = 0;
  p1.xpos = 0;
  p1.ypos = 20;
  p1.score = 0;
  p2.xpos = 20;
  p2.ypos = 20;
  p2.score = 0;

  // Wait until enter or spacebar pressed.
  
}

// Declare winner and reset game
function gameEnd() {
  if (p1.score >= 10){
    console.log('Player 1 Wins!');
  }
  else {
    console.log('Player 2 Wins!');
  }

  // Wait 5 seconds then reset game
  setTimeout(5000);
  gameStart();
}

// Style elements and place everything in the correct position
function initialize(){

  gameStart();

}

document.getElementById("p1-score").innerText = 0;
document.getElementById("p2-score").innerText = 0;

// Main game loop
let paddle1 = document.getElementById("p1-paddle");
let paddle2 = document.getElementById("p2-paddle");

paddle1.style.background = 'red';
paddle2.style.background = 'blue';

document.addEventListener("keydown", function(e) {
  let key = e.which;
  e.preventDefault();

  switch(key){
    case 87: // W key
      paddle1.style.background = 'red';
      paddle1.style.marginLeft = 50;
      break;
    case 83: // S key
      paddle1.style.background = 'yellow';
      paddle1.style.right = 50;
      break;
    case 38: // Up arrow
      paddle2.style.background = 'blue';
      paddle2.style.right = 50;
      break;
    case 40: // Down arrow
      paddle2.style.background = 'green';
      paddle2.style.right = 50;
      break;
  }
})





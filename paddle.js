class Paddle {
  constructor (xPos, yPos, score, playernumber) {
    this.length = length; // paddle length/height
    this.xPos = xPos    // horizontal position of paddle
    this.yPos = yPos;   // vertical position of paddle
    this.score = score; // player's current score
    this.playernumber = playernumber; // player number

    //this.style.background = 'orange';
  }

  moveUp(yPos){
    this.yPos = yPos - 10;
    console.log(`Player ${this.playernumber} yPos: ${this.yPos}`)
  }
  moveDown(yPos){
    this.yPos = yPos + 10;
    console.log(`Player ${this.playernumber} yPos: ${this.yPos}`)
  }
}

class Ball {
  constructor (xPos, yPos, speed){
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
    // Consider if I need an angle variable
  }

  // Called when colliding with a paddle or border
  paddleBounce(paddleYpos){
    // On paddle collision, reverse direction
    if (this.speed > 0){
      this.speed *= -1; 
      this.speed -= 0.5;
    }
    else if (this.speed < 0){
      this.speed*= -1;
      this.speed += 0.5;
    }
  }

  // On wall collision, bounce and follow an appropriate angle
  wallBounce(yPos, speed){

  }

  // Called when ball hits past player paddle
  goal(){
    // Scored on player 1
    if (this.xPos < 0) {
      p2.score++;
      setTimeout(1300); // Wait before playing again
      this.speed = 5; // go towards player 1
    }
    // Scored on player 2
    else if (this.xPos > 20) {
      p1.score++;
      this.speed = -5; // go towards player 2
    }

    this.xPos = 25; // start at center again
  }
}

// Wait for enter or spacebar key to be pressed. Set players at starting position.
function gameStart(){
  p1score.innerText = 0;
  p2score.innerText = 0;
  p1.xPos = 0;
  p1.yPos = 20;
  p1.score = 0;
  p2.xPos = 300;
  p2.yPos = 20;
  p2.score = 0;
}

// Declare winner and reset game
function gameEnd() {
  if (p1.score >= 9){
    console.log('Player 1 Wins!');
  }
  else if (p1.score >= 9) {
    console.log('Player 2 Wins!');
  }

  // Wait 5 seconds then reset game
  setTimeout(5000);
  gameStart();
}

// Main game loop
let paddle1 = document.getElementById("p1-paddle");
let paddle2 = document.getElementById("p2-paddle");

paddle1.style.background = 'red';
paddle2.style.background = 'blue';

// Declare paddle positions
let paddle1TopPos = paddle1.offsetTop;
let paddle1BottomPos = paddle1TopPos + paddle1.offsetWidth;
let paddle2LeftPos = paddle2.offsetLeft;
let paddle2RightPos = paddle2LeftPos + paddle2.offsetWidth;
let speed = 5;
let direction = 1;

// Player 1 and 2 start across from each other, at the same y position
let p1 = new Paddle(80, 0, 20, 0, 1);
let p2 = new Paddle(80, 300, 20, 0, 2);
let ball = new Ball(10, 25, 0);

// Initialize variables
let p1score = document.getElementById("p1-score");
let p2score = document.getElementById("p2-score");
p1score.innerText = 0;
p2score.innerText = 0;

// Keyboard listener
document.addEventListener("keydown", function(e) {
  let key = e.which;
  e.preventDefault();

  paddle1TopPos = paddle1.offsetTop;
  paddle1BottomPos = paddle1TopPos + paddle1.offsetHeight;
  paddle2TopPos = paddle2.offsetTop;
  paddle2BottomPos = paddle2TopPos + paddle2.offsetHeight;

  switch(key){
    case 87: // W key
      p1.moveUp(paddle1TopPos);
      paddle1.style.bottom = (paddle1TopPos + speed * direction) + 'px';
      break;
    case 83: // S key
      p1.moveDown(paddle1BottomPos);
      paddle1.style.top = (paddle1TopPos + speed * direction) + 'px';
      break;
    case 38: // Up arrow
      p2.moveUp(paddle2TopPos);
      paddle2.style.bottom = (paddle2TopPos + speed * direction) + 'px';
      break;
    case 40: // Down arrow
      p2.moveDown(paddle2BottomPos);
      paddle2.style.top = (paddle2TopPos + speed * direction) + 'px';
      break;
    case 32: // Spacebar
      //gameStart();
      p1score.innerText = parseInt(p1score.innerText) + 1;
      p2score.innerText = parseInt(p2score.innerText) + 1;
  }
})

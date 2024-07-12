class Paddle {
  constructor (xPos, yPos, score, playernumber, distance) {
    this.yPos = yPos;   // vertical position of paddle
    this.score = score; // player's current score
    this.playernumber = playernumber; // player number
    this.distance // number of pixels paddle travels on key press
  }

  moveUp(yPos, paddle){
    console.log(this.yPos);
    this.yPos = yPos - this.distance;
    paddle.style.top = ((yPos) * ball.direction) + 'px';
    console.log(`Player ${this.playernumber} yPos: ${yPos}`);
  }
  moveDown(yPos, paddle){
    console.log(this.yPos);
    this.yPos = yPos + this.distance;
    paddle.style.top = ((yPos) * ball.direction) + 'px';
    console.log(`Player ${this.playernumber} yPos: ${yPos}`)
  }
}

class Ball {
  constructor (xPos, yPos, speed, direction, angle){
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed; // determines how many pixels the ball's xPos changes per tick
    this.direction = direction;
    this.angle; // determines how many pixels the ball's yPos changes per tick
  }

  // Called when colliding with a paddle
  paddleBounce(paddleYpos){
    // On paddle collision, reverse direction; angle depends on section of paddle hit (top, middle, bottom)
    // Top
    if (ball.yPos < paddleYpos*0.4) {
      this.angle = -20;
    }
    // Middle
    else if (ball.yPos >= (paddleYPos *0.4) && ball.yPos <= (paddleYPos*0.6) ) {
      this.angle = 0;
    }
    // Bottom
    else if (ball.yPos > paddleYPos * 0.6){
      this.angle = 20;
    }

    // Bounce back to player 2
    if (this.direction === 1){
      this.direction = -1;
    }
    // Bounce back to player 1
    else if (this.direction === -1){
      this.direction = 1;
    }
    this.speed+=0.5;
  }

  // On wall collision, bounce and follow the appropriate angle
  wallBounce(yPos, speed){

  }

  // Called when ball hits past player paddle
  goal(ballPos){
    this.speed = 0;
    this.xPos = 150;
    // Scored on player 1
    if (ballPos < 0) {
      p2.score++;
      this.direction = 1; // go towards player 1
    }
    // Scored on player 2
    else if (ballPos > 300) {
      p1.score++;
      this.direction = -1; // go towards player 2
    }
    setTimeout(1300); // Wait before playing again (consider removing)
    this.speed = 5;
  }

  // Called when ball moves
  ballMove(paddleBall, i){
    this.xPos = (i*20);
    if (this.xPos > 200){
      this.xPos = this.xPos - 100;
    }
    //this.yPos = (i*2*-1);
    paddleBall.style.left = this.xPos + 'px';
    //paddleBall.style.top = this.yPos + 'px';
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
function gameEnd(ball) {
  if (p1.score >= 9){
    console.log('Player 1 Wins!');
    ball.direction = -1;
  }
  else if (p2.score >= 9) {
    console.log('Player 2 Wins!');
    ball.direction = 1;
  }

  // Wait 5 seconds then reset game
  setTimeout(5000);
  gameStart();
}

// Main game loop
let paddle1 = document.getElementById("p1-paddle");
let paddle2 = document.getElementById("p2-paddle");
let paddleball = document.getElementById("ball");

paddle1.style.background = 'red';
paddle2.style.background = 'blue';

// Player 1 and 2 start across from each other, at the same y position
let p1 = new Paddle(0, 0, 20, 1, 300);
let p2 = new Paddle(500, 400, 20, 2, 20);
let ball = new Ball(10, 25, 5);
// Declare paddle and ball variables
let distance = 20;
let speed = 5;
ball.direction = 1;
let p1Ypos = paddle1.top = 0;
let p2Ypos = paddle2.top = 0;

// Initialize score variables
let p1score = document.getElementById("p1-score");
let p2score = document.getElementById("p2-score");
p1score.innerText = 0;
p2score.innerText = 0;

// Keyboard listener
document.addEventListener("keydown", function(e) {
  let key = e.which;
  e.preventDefault();

  switch(key){
    case 87: // W key
      p1Ypos = p1Ypos - distance;
      p1.moveUp(p1Ypos, paddle1);
      break;
    case 83: // S key
      p1Ypos = p1Ypos + distance;
      p1.moveDown(p1Ypos, paddle1);
      break;
    case 38: // Up arrow
      p2Ypos = p2Ypos - distance;
      p2.moveUp(p2Ypos, paddle2);
      break;
    case 40: // Down arrow
      p2Ypos = p2Ypos + distance;
      p2.moveDown(p2Ypos, paddle2);
      break;
    case 32: // Spacebar
      gameStart();
      p1score.innerText = parseInt(p1score.innerText) + 1;
      p2score.innerText = parseInt(p2score.innerText) + 1;
  }
})

  let time = ball.speed*100; // Change formula as necessary
  let i = 0;

  setInterval(function() {
    if (ball.xPos >= p1.xPos){
      ball.paddleBounce(p1.yPos);
    }
    else if (ball.xPos <= p2.xPos) {
      ball.paddleBounce(p2.yPos);
    }
    i++;
    ball.ballMove(paddleball, i);
  }, time);
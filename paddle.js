class Paddle {
  constructor (xPos, yPos, score, playerNumber, distance) {
    this.xPos = xPos;   // horizontal position of paddle
    this.yPos = yPos;   // top vertical position of paddle
    this.score = score; // player's current score
    this.playerNumber = playerNumber; // player number
    this.distance  = distance // number of pixels paddle travels on key press
    this.height;
  }

  moveUp(yPos, paddle){
    this.yPos = yPos - this.distance;
    this.height = this.yPos + 80;
    paddle.style.top = this.yPos + 'px';
    console.log(`Player ${this.playerNumber} yPos: ${yPos}`);
  }
  moveDown(yPos, paddle){
    this.yPos = yPos + this.distance;
    this.height = this.yPos + 80;
    paddle.style.top = this.yPos + 'px';
    console.log(`Player ${this.playerNumber} yPos: ${yPos}`)
  }
}

class Ball {
  constructor (xPos, yPos, speed, distance, direction, angle){
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed; // determines how often the ball's xPos changes
    this.distance = distance; 
    this.direction = direction;
    this.angle = 0; // determines how often the ball's yPos changes
  }

  checkPosition(p1Xpos, p1Ypos, p1Height, p2Xpos, p2Ypos, p2Height){
    // Check for floor and ceiling collision
    if (ball.yPos < -150){
      this.wallBounce("top");
    }
    if (ball.yPos > 150){
      this.wallBounce("bottom");
    }

    // Check paddle collision
    if (this.xPos <= p1Xpos && (this.yPos + 40)
      >= p1Ypos && (this.yPos + 40) < p1Height){
      console.log("Player 1 bounce!");
      ball.paddleBounce(p1Ypos);
    }
    else if (this.xPos >= p2Xpos && (this.yPos + 40)
            >= p2Ypos && (this.yPos + 40) < p2Height) {
      console.log("Player 2 bounce!")
      ball.paddleBounce(p2Ypos);
    }
    // Check if ball moved past either paddle
    else if (this.xPos < p1Xpos || ball.xPos > p2Xpos) {
      this.goal(this.xPos, p1.xPos, p2.xPos);
    }
  }

  // Called when colliding with a paddle
  paddleBounce(paddleYpos){
    // On paddle collision, reverse direction; angle depends on section of paddle hit (top, middle, bottom)
    // Top

    const ballYPos = ball.yPos - 40;
    if (ballYPos < paddleYpos*0.45) {
      this.angle = -10;
    }
    // Middle
    else if (ballYPos >= (paddleYpos*0.45) && ballYPos <= (paddleYpos*0.55) ) {
      this.angle = 0;
    }
    // Bottom
    else if (ballYPos > (paddleYpos*0.55)){
      this.angle = 10;
    }

    this.direction = this.direction*-1;
  }

  // On wall collision, bounce and follow the appropriate angle
  wallBounce(position){
    if (position === "top") {
      this.angle = -10;
    }
    else if (position === "bottom"){
      this.angle = 10;
    }
  }

  // Called when ball moves past player paddle
  goal(ballPos, paddle1X, paddle2X){
    // Scored on player 1
    if (ballPos < paddle1X) {
      p2.score++;
      p2score.innerText = parseInt(p2score.innerText) + 1;
      this.direction = 1; // go towards player 1
    }
    // Scored on player 2
    else if (ballPos > paddle2X) {
      p1.score++;
      p1score.innerText = parseInt(p1score.innerText) + 1;
      this.direction = -1; // go towards player 2
    }
    this.xPos = -20;
    this.yPos = 0;
    this.angle = 0;
    this.direction = this.direction * -1;
  }

  // Called when ball moves
  ballMove(ball){
    this.xPos = this.xPos + (this.distance * this.direction);
    this.yPos = this.yPos + (this.angle * this.direction);
    ball.style.left = this.xPos + 'px';
    ball.style.top = this.yPos + 'px';
  }
}

// Wait for enter or spacebar key to be pressed. Set players at starting position.
function gameStart(){
  p1score.innerText = 0;
  p2score.innerText = 0;
  p1.yPos = 40;
  p1.score = 0;
  p2.yPos = 40;
  p2.score = 0;
  p1.height = p1.yPos + 80;
  p2.height = p2.yPos + 80;
  paddle1.style.top = p1.yPos + 'px';
  paddle2.style.top = p2.yPos + 'px';
  ball.yPos = 0;
  ball.xPos = 10;
  paddleBall.style.top = ball.yPos + 'px';
  paddleBall.style.left = -20 + 'px';
}

// Declare winner and reset game
function gameEnd() {
  if (p1.score >= winScore){
    showWinner(p1.playerNumber);
  }
  else if (p2.score >= winScore) {
    showWinner(p2.playerNumber);
  }
  gameStart();
}

function showWinner(winnerNumber){
  if (winnerNumber === 1){
    winner.innerHTML = "PLAYER 1 WINS!";
    winner.style.color = 'red';
    winner.style.marginLeft = 0 + 'px';
  }
  else if (winnerNumber === 2) {
    winner.innerHTML = "PLAYER 2 WINS!";
    winner.style.color = 'blue';
    winner.style.marginLeft = 500 + 'px';
  }
}

// Paddle and Ball variables
let paddle1 = document.getElementById("p1-paddle");
let paddle2 = document.getElementById("p2-paddle");
let paddleBall = document.getElementById("ball");
paddle1.style.background = 'red';
paddle2.style.background = 'blue';
let ballDistance = 10;
let paddleDistance = 20;
let speed = 5;

// Player 1 and 2 start across from each other, at the same y position
let p1 = new Paddle(-300, 0, 0, 1, paddleDistance);
let p2 = new Paddle(200, 0, 0, 2, paddleDistance);
let ball = new Ball(10, 0, speed, ballDistance, 1, 0);

// Declare paddle and ball variables
let p1Ypos = paddle1.top = 40;
let p2Ypos = paddle2.top = 40;

// Initialize score variables
let p1score = document.getElementById("p1-score");
let p2score = document.getElementById("p2-score");

// Game variables
let time = ball.speed*8; // Change as necessary - determines ball speed
let winner = document.getElementById("winner");
let winnerNumber = 0;
let winScore = 5;

// Player Controls
document.addEventListener("keydown", function(e) {
  let key = e.which;
  e.preventDefault();

  switch(key){
    case 87: // W key
      if (p1Ypos != -60){
        p1Ypos = p1Ypos - p1.distance;
        p1.moveUp(p1Ypos, paddle1);
      }
      break;
    case 83: // S key
    if (p1Ypos != 180){
      p1Ypos = p1Ypos + p1.distance;
      p1.moveDown(p1Ypos, paddle1);
    }
      break;
    case 38: // Up arrow
    if (p2Ypos != -60){
      p2Ypos = p2Ypos - p2.distance;
      p2.moveUp(p2Ypos, paddle2);
    }
      break;
    case 40: // Down arrow
    if (p2Ypos != 180){
      p2Ypos = p2Ypos + p2.distance;
      p2.moveDown(p2Ypos, paddle2);
    }
      break;
    case 32: // Spacebar
      gameStart();
  }
})
  
  // Begin game 
  gameStart();  
  
  // Main gameplay loop
  setInterval(function() {
    if (p1.score >= winScore || p2.score >= winScore){
      gameEnd();
    }
    // Decide ball's next position based on current position
    ball.checkPosition(p1.xPos, p1.yPos, p1.height, p2.xPos, p2.yPos, p2.height);
    ball.ballMove(paddleBall);
    console.log("Ball y pos: " + ball.yPos);
  }, time);
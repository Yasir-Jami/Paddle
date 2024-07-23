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
    console.log(this.yPos);
    this.yPos = yPos - this.distance;
    this.height = this.yPos + 80;
    paddle.style.top = yPos + 'px';
    console.log(`Player ${this.playerNumber} yPos: ${yPos}`);
  }
  moveDown(yPos, paddle){
    console.log(this.yPos);
    this.yPos = yPos + this.distance;
    this.height = this.yPos + 80;
    paddle.style.top = yPos + 'px';
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

  // Called when colliding with a paddle
  paddleBounce(paddleYpos){
    // On paddle collision, reverse direction; angle depends on section of paddle hit (top, middle, bottom)
    // Top
    if (ball.yPos < paddleYpos*0.45) {
      this.angle = -20;
    }
    // Middle
    else if (ball.yPos >= (paddleYPos*0.45) && ball.yPos <= (paddleYPos*0.55) ) {
      this.angle = 0;
    }
    // Bottom
    else if (ball.yPos > (paddleYPos*0.55)){
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
  wallBounce(){
    if (this.yPos > 200) {
      this.angle = -20;
    }
    else if (this.yPos < 200){
      this.angle = -20;
    }
  }

  // Called when ball moves past player paddle
  goal(ballPos, paddle1X, paddle2X){
    this.direction = this.direction * -1;
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
let p1Ypos = paddle1.top = 20;
let p2Ypos = paddle2.top = 20;

// Initialize score variables
let p1score = document.getElementById("p1-score");
let p2score = document.getElementById("p2-score");

let time = ball.speed*8; // Change as necessary - determines ball speed
let winner = document.getElementById("winner");
let winnerNumber = 0;
let winScore = 1;

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

  gameStart();
  
  // Main gameplay loop
  setInterval(function() {
    if (p1.score >= winScore || p2.score >= winScore){
      gameEnd();
    }

    console.log("Ball x position: " + ball.xPos);
    console.log("Ball y position: " + ball.yPos);
    console.log("P1 x position: " + p1.xPos);
    console.log("P1 y position: " + p1.yPos);
    console.log("P1 height: " + p1.height);
    
    if (ball.xPos == p1.xPos && ball.yPos 
        >= p1.yPos && ball.yPos < p1.height){
      console.log("Player 1 bounce!");
      ball.paddleBounce(p1.yPos);
    }
    else if (ball.xPos == p2.xPos && ball.yPos 
              >= p2.yPos && ball.yPos < p2.height) {
      console.log("Player 2 bounce!")
      ball.paddleBounce(p2.yPos);
    }
    else if (ball.xPos < p1.xPos || ball.xPos > p2.xPos) {
      ball.goal(ball.xPos, p1.xPos, p2.xPos);
    }
    ball.ballMove(paddleBall);
    //console.log("Ball x position: " + ball.xPos);
  }, time);
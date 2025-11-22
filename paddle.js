// paddle.js
// Defines the Paddle class (for player and simple AI)

export class Paddle {
  constructor(x, y, width, height, speed, canvasHeight, isPlayer = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.canvasHeight = canvasHeight;
    this.isPlayer = isPlayer;
    this.dy = 0; // vertical movement
  }

  // For player paddle, we set dy based on input
  handleInput(inputState) {
    if (!this.isPlayer) return;

    if (inputState.up) {
      this.dy = -this.speed;
    } else if (inputState.down) {
      this.dy = this.speed;
    } else {
      this.dy = 0;
    }
  }

  // For simple AI paddle, follow the ball a bit
  followBall(ball) {
    if (this.isPlayer) return;

    const paddleCenter = this.y + this.height / 2;
    const tolerance = 10; // how "lazy" the AI is

    if (ball.y < paddleCenter - tolerance) {
      this.dy = -this.speed * 0.8;
    } else if (ball.y > paddleCenter + tolerance) {
      this.dy = this.speed * 0.8;
    } else {
      this.dy = 0;
    }
  }

  update() {
    this.y += this.dy;

    // Prevent paddle from leaving the screen
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

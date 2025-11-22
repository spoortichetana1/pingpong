// ball.js
// Defines the Ball class with movement and collision

export class Ball {
  constructor(x, y, radius, speed, canvasWidth, canvasHeight) {
    this.initialX = x;
    this.initialY = y;
    this.radius = radius;
    this.speed = speed;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.reset();
  }

  reset(direction = 1) {
    // Put ball back to center
    this.x = this.initialX;
    this.y = this.initialY;

    // Random vertical direction
    const angle = (Math.random() * Math.PI) / 3 - Math.PI / 6; // between -30° and +30°
    this.dx = this.speed * direction * Math.cos(angle);
    this.dy = this.speed * Math.sin(angle);
  }

  update(leftPaddle, rightPaddle, onScore) {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce on top and bottom
    if (this.y - this.radius <= 0 || this.y + this.radius >= this.canvasHeight) {
      this.dy = -this.dy;
    }

    // Check collision with left paddle
    if (this.collidesWithPaddle(leftPaddle)) {
      this.dx = Math.abs(this.dx); // ensure ball goes to the right
      this.addBounceAngle(leftPaddle);
    }

    // Check collision with right paddle
    if (this.collidesWithPaddle(rightPaddle)) {
      this.dx = -Math.abs(this.dx); // ensure ball goes to the left
      this.addBounceAngle(rightPaddle);
    }

    // Check if someone scored
    if (this.x + this.radius < 0) {
      // Right player scores
      onScore("right");
      this.reset(1); // send to the right
    } else if (this.x - this.radius > this.canvasWidth) {
      // Left player scores
      onScore("left");
      this.reset(-1); // send to the left
    }
  }

  collidesWithPaddle(paddle) {
    const withinX =
      this.x - this.radius < paddle.x + paddle.width &&
      this.x + this.radius > paddle.x;
    const withinY =
      this.y + this.radius > paddle.y &&
      this.y - this.radius < paddle.y + paddle.height;

    return withinX && withinY;
  }

  // Change angle based on where ball hits the paddle
  addBounceAngle(paddle) {
    const paddleCenter = paddle.y + paddle.height / 2;
    const distanceFromCenter = this.y - paddleCenter;
    const maxBounceAngle = (Math.PI / 3) * 0.9; // around 54 degrees

    const normalized = distanceFromCenter / (paddle.height / 2);
    const bounceAngle = normalized * maxBounceAngle;

    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    const direction = this.dx > 0 ? 1 : -1;

    this.dx = speed * direction * Math.cos(bounceAngle);
    this.dy = speed * Math.sin(bounceAngle);
  }

  draw(ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

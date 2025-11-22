// main.js
// Connects everything: canvas, paddles, ball, game loop

import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { inputState } from "./input.js";

// ===== Setup canvas =====
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// ===== Game objects =====

// Paddle size and speed
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 80;
const PADDLE_SPEED = 6;

// Player paddle (left)
const playerPaddle = new Paddle(
  30, // x
  HEIGHT / 2 - PADDLE_HEIGHT / 2, // y
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_SPEED,
  HEIGHT,
  true // isPlayer
);

// AI paddle (right)
const aiPaddle = new Paddle(
  WIDTH - 30 - PADDLE_WIDTH,
  HEIGHT / 2 - PADDLE_HEIGHT / 2,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_SPEED * 0.9,
  HEIGHT,
  false // isPlayer
);

// Ball
const BALL_RADIUS = 10;
const BALL_SPEED = 6;

const ball = new Ball(
  WIDTH / 2,
  HEIGHT / 2,
  BALL_RADIUS,
  BALL_SPEED,
  WIDTH,
  HEIGHT
);

// Scores
let playerScore = 0;
let aiScore = 0;
const WINNING_SCORE = 5;
let isGameOver = false;

// ===== Scoring callback for the ball =====
function handleScore(side) {
  if (side === "left") {
    playerScore++;
  } else if (side === "right") {
    aiScore++;
  }

  if (playerScore >= WINNING_SCORE || aiScore >= WINNING_SCORE) {
    isGameOver = true;
  }
}

// ===== Draw center line =====
function drawCenterLine() {
  ctx.strokeStyle = "#444";
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]); // reset
}

// ===== Draw scores =====
function drawScores() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "32px Arial";
  ctx.textAlign = "center";

  ctx.fillText(playerScore, WIDTH / 4, 40);
  ctx.fillText(aiScore, (3 * WIDTH) / 4, 40);
}

// ===== Draw game over message =====
function drawGameOver() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  const message =
    playerScore > aiScore ? "You Win! 🎉" : "AI Wins! 🤖";
  ctx.fillText(message, WIDTH / 2, HEIGHT / 2 - 20);

  ctx.font = "20px Arial";
  ctx.fillText("Press Space to Restart", WIDTH / 2, HEIGHT / 2 + 20);
}

// Restart game when space is pressed
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && isGameOver) {
    playerScore = 0;
    aiScore = 0;
    isGameOver = false;
    ball.reset();
  }
});

// ===== Main game loop =====
function gameLoop() {
  // Clear screen
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw center line and scores
  drawCenterLine();
  drawScores();

  if (!isGameOver) {
    // Handle player input
    playerPaddle.handleInput(inputState);

    // Simple AI follows ball
    aiPaddle.followBall(ball);

    // Update paddles and ball
    playerPaddle.update();
    aiPaddle.update();
    ball.update(playerPaddle, aiPaddle, handleScore);
  }

  // Draw paddles and ball
  playerPaddle.draw(ctx);
  aiPaddle.draw(ctx);
  ball.draw(ctx);

  // If game over, show message
  if (isGameOver) {
    drawGameOver();
  }

  // Loop
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

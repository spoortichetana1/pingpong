// input.js
// Tracks which keys are pressed (for the player paddle)

export const inputState = {
  up: false,
  down: false,
};

// Set up keyboard listeners as soon as this file is imported
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
    inputState.up = true;
  }
  if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
    inputState.down = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
    inputState.up = false;
  }
  if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
    inputState.down = false;
  }
});

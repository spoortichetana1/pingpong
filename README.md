# Ping Pong Game 🏓

TRY GAME HERE --> https://spoortichetana1.github.io/pingpong/

A simple browser-based Ping Pong (Pong) clone built with plain JavaScript using ES modules. The player controls the left paddle while a simple AI controls the right paddle. The aim is to reach the winning score before the opponent.

---

## Demo
- Open `index.html` with a local web server or using the VS Code Live Server extension.

---

## Features ✅
- Player paddle (left) controlled by keyboard input (W/S or Up/Down arrows)
- Simple AI paddle (right) that follows the ball with mild "lazy" behavior
- Ball physics with bounce angle changing based on where the ball hits the paddle
- Score tracking and game-over state with a restart option
- Clean minimalist UI with dashed center line and scores

---

## Files
- `index.html` — Main HTML file; attaches `main.js` as an ES module
- `style.css` — Minimal styling for a centered canvas and page background
- `main.js` — Entry-point that sets up the game objects, game loop, drawing, and game state
- `input.js` — Tracks keyboard input and exposes `inputState` for the player paddle
- `paddle.js` — Defines the `Paddle` class (player and AI behavior)
- `ball.js` — Defines the `Ball` class (movement, collisions, bounce angle, scoring)

---

## Controls 🎮
- Move paddle up: `ArrowUp` or `W`
- Move paddle down: `ArrowDown` or `S`
- Restart (after game over): `Space`

Note: Make sure the browser window has focus so keyboard events are captured.

---

## How to Run 🛠️
The game uses ES modules, so opening the HTML file directly via the `file://` protocol may not work in all browsers. Use a simple HTTP server instead.

Quick options (Windows PowerShell):

- With Python 3's built-in HTTP server:

```powershell
python -m http.server 8000
# Then open http://localhost:8000/ in your browser
```

- With Node.js and `http-server`:

```powershell
npx http-server -p 8000
# Then open http://localhost:8000/ in your browser
```

- With VS Code: install and use Live Server extension and "Open with Live Server" on `index.html`.

---

## Design Notes & Tweakables 🔧
You can easily modify game balance and behavior by changing constants in `main.js`:
- `PADDLE_WIDTH`, `PADDLE_HEIGHT` — Paddle size
- `PADDLE_SPEED` — Player speed
- AI speed and behavior (in `main.js` / `paddle.js`) — To make AI easier or harder
- `BALL_RADIUS`, `BALL_SPEED` — The ball size and speed
- `WINNING_SCORE` — Adjust the number of points to win

Ball bounce physics is implemented so that the bounce angle depends on how far from the paddle center the ball hits (so skilled players can aim).

---

## Implementation Details 💡
- The `Ball` class (`ball.js`) handles resetting from center, velocity, collisions with paddles and borders, and scoring via the `onScore` callback.
- The `Paddle` class (`paddle.js`) supports both player input (via `handleInput(inputState)`) and a simple AI (via `followBall(ball)`).
- `input.js` sets up keyboard listeners and exports `inputState` for the player paddle to read.
- Rendering and the game loop are in `main.js`, which uses `requestAnimationFrame`.

---

## Potential Improvements / Next Steps ✨
- Add sound effects for paddle hits and scoring
- Add a start-screen and pause functionality
- Make the AI more advanced (e.g., prediction, reaction delays, difficulty levels)
- Add two-player local mode (one on each side) or online multiplayer
- Add game options for changing speeds and paddle size via UI

---

## Known Issues / Tips ⚠️
- If controls don't respond, click the canvas or the webpage to ensure it has keyboard focus.
- Serving via a local server is recommended to avoid ES module import errors.

---

## Contributing 🤝
Contributions are welcome! If you want to add features or fixes:
1. Fork the repository
2. Create a feature branch
3. Open a PR with a summary of your changes

---

## License
This repo doesn't include a license file by default. Consider adding an open-source license (e.g., MIT) if you plan to share publicly.

---

Enjoy the game! 🏓

Made with ❤️ by the repository author

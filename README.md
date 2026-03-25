
# Meme Match

A fast-paced memory matching game built with [PixiJS](https://pixijs.com/), featuring animated UI, meme-themed cards, sound effects, and multiple board sizes.

## Overview

Meme Match is a browser game where players flip cards to find matching pairs before the timer runs out. The game is designed as a hands-on PixiJS learning project, but it is structured like a complete mini-game with:

- A loading screen with progress feedback
- Click-to-start splash interaction
- Main menu and settings menu
- Difficulty/board-size selection
- In-game timer and win/lose outcomes
- Audio feedback for card flips, button clicks, and matches

## Gameplay

1. Launch the game and wait for assets to load.
2. Click anywhere on the splash screen to open the main menu.
3. Select Start and choose a board size:
	- 3x4
	- 4x4
	- 4x5
4. Click cards to reveal meme images.
5. Match two identical cards to keep them face up.
6. Match all pairs before time reaches zero to win.

## Core Features

- Dynamic card generation based on selected board dimensions
- Automatic pair creation and shuffle logic
- Countdown timer tied to game-over state
- Animated win/lose popup with restart flow
- Background music control in settings with draggable volume slider
- Signal-driven scene flow for clean menu/game communication

## Tech Stack

- [PixiJS](https://pixijs.com/) for rendering and interactions
- [@pixi/sound](https://github.com/pixijs/sound) for music and SFX
- [signals](https://www.npmjs.com/package/signals) for lightweight event dispatching
- Webpack for development and production bundling

## Project Structure

- `src/index.js` - App initialization, asset loading, loading bar, and bootstrap flow
- `src/Common.js` - Click-to-start overlay behavior
- `src/Menu/` - Main menu, game select, and settings screens
- `src/Board/Board.js` - Timer, board placement, and game outcome handling
- `src/Card/Card.js` - Card creation, flip logic, matching checks, and win dispatch
- `src/Signals/GameSignals.js` - Shared game events/signals
- `src/Manifest/AssetsManifest.js` - All image/audio bundles and aliases
- `public/Assets/` - Game art, meme images, and audio files

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Modern browser (Chrome, Edge, Firefox)

### Installation

```bash
npm install
```

### Run in Development

```bash
npm start
```

### Build for Production

```bash
npm run build
```

## Notes

- The board uses fixed card size and spacing, then computes rows/columns based on selected dimensions.
- Match SFX temporarily pauses background music, then resumes after playback.
- The restart button appears on both win and lose screens and returns the player to game selection.

## Resources

- [PixiJS Docs](https://pixijs.download/release/docs/index.html)
- [PixiJS GitHub](https://github.com/pixijs/pixijs)
- [Live Host](https://johnas-bautista-pixi.vercel.app/)

## License

MIT

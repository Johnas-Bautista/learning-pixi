import { Graphics, Texture, Assets, Text, Sprite } from "pixi.js";
import { style } from "../index.js";
import Signals from "../Signals/GameSignals";
import { sound } from "@pixi/sound";

export default class Board {
  constructor(outline, board, app, time, ...dimension) {
    Signals.gameOver.add(this.gameState, this);
    this.timerText = new Text({ text: "30", style: style });
    this.timeLeft = 1000;
    this.isGameOver = false;
    this.time = time;
    this.board = board;
    this.outline = outline;
    this.width = dimension[0];
    this.height = dimension[1];
    this.app = app;
    this._init();
  }

  _init() {
    this.timerText.x = this.app.screen.width / 2 - 27;
    this.timerText.y = this.app.screen.height / 2 - this.app.screen.height / 2;
    this.scaleBoard(this.app);
    this.app.stage.addChild(this.getBoard());
    this.app.stage.addChild(this.timerText);
    this.app.ticker.add((ticker) => this.gameTimer(ticker));
    
  }

  getBoard() {
    return this.board;
  }

  scaleBoard(app) {
    this.board.scale.set(1);
    this.board.position.set(
      (this.app.screen.width - this.width) / 2,
      (this.app.screen.height - this.height) / 2,
    );
    // this.outlineBoard()
  }

  outlineBoard() {
    this.outline
      .rect(0, 0, this.width, this.height)
      .stroke({ width: 2, color: "#00000061" });
    this.board.addChild(this.outline);
  }

  gameTimer(ticker) {
    if(this.isGameOver) return 
    // Add the time passed since the last tick to the total elapsed time
    this.timeLeft -= ticker.elapsedMS; // Use elapsedMS for raw time in milliseconds
    this.timerText.text = `${Math.ceil(this.timeLeft / 1000)}`;
    // Check if the duration has been reached
    if (this.timeLeft <= 0) {
      this.isGameOver = true
      this.timerText.text = "0";
      this.app.ticker.remove(this.gameTimer);
      Signals.gameOver.dispatch({result: "lose"})
    }
  }

  gameState(outcome) {
    const gameOver = new Sprite(Assets.get("youLose"));
    const retry = new Sprite(Assets.get("restartGame"));
    this.app.stage.removeChild(this.board, this.timerText);
    switch (outcome.result) {
      case "win":
        break;
      case "lose":
        sound.stop('mainBgm')
        gameOver.anchor.set(0.5)
        gameOver.scale.set(0.7)
        gameOver.position.set(this.app.screen.width / 2, this.app.screen.height / 2)
        retry.anchor.set(-5,-1.8)
        retry.scale.set(0.3)
        retry.position.set(this.app.screen.width / 2, this.app.screen.height / 2)

        
        this.app.stage.addChild(gameOver, retry)
        sound.play('gameOver1Sfx', {
          complete: () => sound.play('gameOver3Sfx', {
            complete: () => sound.play('mainBgm')
          })
        })
        break;
    }
  }
}

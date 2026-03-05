import { Graphics, Texture, Assets, Text, Sprite } from "pixi.js";
import { style } from "../index.js";
import Signals from "../Signals/GameSignals";
import { sound } from "@pixi/sound";

export default class Board {
  constructor(outline, board, app, time, ...dimension) {
    Signals.gameOver.removeAll();
    this.timerText = new Text({ text: "30", style: style });
    this.isPlayingSound = false;
    this.timeLeft = 300000; // milliseconds
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
    Signals.gameOver.add(this.gameState, this);
    this.timerText.x = this.app.screen.width / 2 - 27;
    this.timerText.y = this.app.screen.height / 2 - this.app.screen.height / 2;
    this.scaleBoard(this.app);
    this.app.stage.addChild(this.getBoard());
    this.app.stage.addChild(this.timerText);
    this.app.ticker.add(this.tickerCallback);
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
  tickerCallback = (ticker) => this.gameTimer(ticker);

  // Game Timer
  gameTimer(ticker) {
    if (this.isGameOver || this.isPlayingSound) return;
    // Add the time passed since the last tick to the total elapsed time
    this.timeLeft -= ticker.elapsedMS; // Use elapsedMS for raw time in milliseconds
    this.timerText.text = `${Math.ceil(this.timeLeft / 1000)}`;
    // Check if the duration has been reached
    if (this.timeLeft <= 0) {
      this.isGameOver = true;
      this.timerText.text = "0";
      this.app.ticker.remove(this.tickerCallback);
      Signals.gameOver.dispatch({ result: "lose" });
    }
  }

  // Game Outcomes
  gameState(outcome) {
    const loseGame = new Sprite(Assets.get("youLose"));
    const winGame = new Sprite(Assets.get("youWin"));
    const retryButton = new Sprite(Assets.get("restartGame"));
    this.app.stage.removeChild(this.board, this.timerText);
    switch (outcome.result) {
      case "win":
        this.winGameDoThis(winGame, retryButton);
        break;
      case "lose":
        this.loseGameDoThis(loseGame, retryButton);
        break;
    }
  }

  loseGameDoThis(lose, retryButton) {
    lose.State = false
    this.showOutcomeState(lose, retryButton)
  }
  winGameDoThis(win, retryButton) {
    win.State = true
    this.showOutcomeState(win, retryButton)
  }

  showOutcomeState(outcome, retryButton) {
    // sound.stop("mainBgm");
    outcome.anchor.set(0.5);
    outcome.scale.set(0.7);
    outcome.position.set(this.app.screen.width / 2, this.app.screen.height / 2);

    retryButton.anchor.set(1, 1);
    retryButton.scale.set(0.3);
    retryButton.position.set(
      this.app.screen.width - 20,
      this.app.screen.height - 20,
    );
    
    this.animatePopUp(outcome, 0.7);
    this.animatePopUp(retryButton, 0.3);
    this.app.stage.addChild(outcome, retryButton);

    sound.play(outcome.State ? " ":"gameOver1Sfx", {
      complete: () =>
        sound.play("gameOver3Sfx", {
          complete: () => {
            retryButton.eventMode = "static";
            retryButton.cursor = "pointer";
            retryButton.on("pointerover", () => {
              retryButton.tint = 0xdddddd;
            });
            retryButton.on("pointerout", () => {
              retryButton.tint = 0xffffff;
            });
            retryButton.on("pointerdown", () => {
              this.app.stage.removeChild(outcome, retryButton);
              // sound.play('mainBgm', { loop: true })
              Signals.retryBtn.dispatch();
            });
          },
        }),
    });
  }
  animatePopUp(sprite, targetScale) {
    sprite.scale.set(0);

    let isGrowing = true;
    const growSpeed = 0.05;
    const bounceScale = targetScale + 0.15;

    const animate = () => {
      if (isGrowing) {
        sprite.scale.x += growSpeed;
        sprite.scale.y += growSpeed;
        if (sprite.scale.x >= bounceScale) {
          isGrowing = false;
        }
      } else {
        sprite.scale.x -= growSpeed * 0.5;
        sprite.scale.y -= growSpeed * 0.5;
        if (sprite.scale.x <= targetScale) {
          sprite.scale.set(targetScale);
          this.app.ticker.remove(animate);
        }
      }
    };
    this.app.ticker.add(animate);
  }
}

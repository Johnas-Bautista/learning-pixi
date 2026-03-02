import { Text } from "pixi.js";
import { style } from "../index.js";
export default class Board {
  constructor(outline, board, app, time, ...dimension) {
    Signals.gameOver.add(this.gameOver, this);
    this.timerText = new Text({ text: "30", style: style });
    this.timeLeft = 30000;
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
    // Add the time passed since the last tick to the total elapsed time
    this.timeLeft -= ticker.elapsedMS; // Use elapsedMS for raw time in milliseconds
    this.timerText.text = `${Math.ceil(this.timeLeft / 1000)}`;
    // Check if the duration has been reached
    if (this.timeLeft <= 0) {
      this.timerText.text = "0";
      this.app.ticker.remove(this.gameTimer);
      Signals.gameOver.dispatch({ result: "lose" });
    }
  }

  gameOver(outcome) {
    const gameOver = Assets.get("gameOver");
    this.app.stage.removeChild(this.board);
    switch (outcome.result) {
      case "win":
        break;
      case "lose":
        break;
    }
  }
}

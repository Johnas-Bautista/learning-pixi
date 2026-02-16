import Board from "../Board/Board";
import { Graphics } from "pixi.js";

export default class Card extends Board {
  constructor(outline, board, app) {
    super(outline, board, app);
    this.shapes = [];
    this.createCard();
    // this.animateCard(app);
  }

  createCard() {
    const cardSize = 100;
    const padding = 10;
    const step = cardSize + padding; // 110px per card

    const cols = Math.floor(this.width / step);   // how many fit horizontally
    const rows = Math.floor(this.height / step);   // how many fit vertically

    // center the grid within the board
    const offsetX = (this.width - cols * step + padding) / 2 + cardSize / 2;
    const offsetY = (this.height - rows * step + padding) / 2 + cardSize / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const square = new Graphics()
          .roundRect(-cardSize / 2, -cardSize / 2, cardSize, cardSize)
          .stroke({width: 4, color: 0x0000ff})
          .fill(0xe74c3c);
        square.x = offsetX + col * step;
        square.y = offsetY + row * step;
        this.shapes.push(square);
        this.board.addChild(square);
      }
    }
  }
  animateCard(app) {
    let time = 0;
    app.ticker.add((ticker) => {
    time += ticker.deltaTime * 0.02;
      for (let i = 0; i < this.shapes.length; i++) {
        this.shapes[i].rotation += .02 * ticker.deltaTime;
      }
    });
  }
}

import Board from "../Board/Board";
import { Graphics, Texture, Assets, Text, TextStyle } from "pixi.js";
import { sound } from "@pixi/sound";
import { bundleAssets } from "../index.js";
import manifest from "../Manifest/AssetsManifest.js";
import { style } from "../index.js"

export default class Card extends Board {
  constructor(outline, board, app, ...dimension) {
    super(outline, board, app, ...dimension);
    this.duration = new Text({ text: "0", style});
    this.totalScore = 0;
    this.cardSize = 100;
    this.padding = 10;
    this.shapes = [];
    this.activeCards = [];
    this.createCard();
    // this.animateCard(app);
  }

  createCard() {
    const step = this.cardSize + this.padding; // 110px per card

    const cols = Math.floor(this.width / step); // how many fit horizontally
    const rows = Math.floor(this.height / step); // how many fit vertically
    const totalCards = cols * rows;
    this.totalScore = totalCards;
    const ingameBundle = manifest.bundles.find(
      (b) => b.name === "ingame-assets",
    );
    const sfxBundle = manifest.bundles.find((b) => b.name === "ingame-sfx");

    const pairedAliases = ingameBundle.assets.map((asset, index) => {
      return [asset.alias, sfxBundle.assets[index].alias];
    });
    pairedAliases.sort(() => Math.random() - 0.5);

    let cardPairs = [];
    for (let i = 0; i < totalCards / 2; i++) {
      const images = pairedAliases[i % pairedAliases.length];
      cardPairs.push(images, images);
    }

    // console.log(cardPairs[0])
    cardPairs.sort(() => Math.random() - 0.5);
    console.log(cardPairs);
    // center the grid within the board
    const offsetX =
      (this.width - cols * step + this.padding) / 2 + this.cardSize / 2;
    const offsetY =
      (this.height - rows * step + this.padding) / 2 + this.cardSize / 2;

    let cardIndex = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const square = new Graphics();
        this.faceCardDown(square, this.cardSize);

        square.x = offsetX + col * step;
        square.y = offsetY + row * step;
        square.cardValue = cardPairs[cardIndex][0];
        square.isFlipped = false;
        square.cardSfx = cardPairs[cardIndex][1];
        square.eventMode = "static";
        square.cursor = "pointer";
        square.on("pointerover", () => (square.tint = 0xdddddd));
        square.on("pointerout", () => (square.tint = "white"));

        square.on("pointerdown", () => {
          this.handleClick(square);
        });
        this.shapes.push(square);
        this.board.addChild(square);

        cardIndex++;
      }
    }
  }

  faceCardDown(card) {
    card.clear();
    card
      .roundRect(
        -this.cardSize / 2,
        -this.cardSize / 2,
        this.cardSize,
        this.cardSize,
      )
      .stroke({ width: 4, color: 0x0000ff })
      .fill({ color: "white", alpha: 0.5 });
  }

  faceCardUp(card, color) {
    card.clear();
    const texture = Assets.get(color);
    card
      .roundRect(
        -this.cardSize / 2,
        -this.cardSize / 2,
        this.cardSize,
        this.cardSize,
      )
      .stroke({ width: 4, color: 0x0000ff })
      .fill({ texture: texture });
  }

  handleClick(cardClick) {
    if (cardClick.isFlipped === true || this.activeCards.length >= 2) {
      return;
    }
    this.faceCardUp(cardClick, cardClick.cardValue);
    cardClick.isFlipped = true;
    this.activeCards.push(cardClick);
    if (this.activeCards.length === 2) {
      this.checkMatch(cardClick);
    }
  }

  checkMatch() {
    setTimeout(() => {
      var score = 0;
      const square1 = this.activeCards[0];
      const square2 = this.activeCards[1];
      if (square1.cardValue === square2.cardValue) {
        if (score === this.totalScore) {
          this.createCard();
          return console.log("You win");
        }
        this.activeCards.length = 0;
        sound.play(square1.cardSfx);
        score++;
        console.log("They are Matched!");
        return;
      } else {
        this.faceCardDown(square1);
        this.faceCardDown(square2);
        square1.isFlipped = false;
        square2.isFlipped = false;
        this.activeCards.length = 0;
        return;
        // this.faceCardDown(cardPair[1]);
      }
    }, 1000);
  }

  gameTimer(ticker) {
    // Add the time passed since the last tick to the total elapsed time
    elapsed += ticker.elapsedMS; // Use elapsedMS for raw time in milliseconds

    // Check if the duration has been reached
    if (elapsed >= duration) {
      console.log("Timer finished!");

      // Stop the timer by removing the callback from the ticker
      this.app.ticker.remove(gameTimer);
    }
  }
  // animateCard(app) {
  //   let time = 0;
  //   app.ticker.add((ticker) => {
  //   time += ticker.deltaTime * 0.02;
  //     for (let i = 0; i < this.shapes.length; i++) {
  //       this.shapes[i].rotation += .02 * ticker.deltaTime;
  //     }
  //   });
  // }
}

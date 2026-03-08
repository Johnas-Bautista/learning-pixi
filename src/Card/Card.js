import Board from "../Board/Board";
import { Graphics, Assets } from "pixi.js";
import { sound } from "@pixi/sound";
import { bundleAssets } from "../index.js";
import manifest from "../Manifest/AssetsManifest.js";
import Signals from  "../Signals/GameSignals.js"
export default class Card extends Board {
  constructor(outline, board, app, time, ...dimension) {
    super(outline, board, app, time, ...dimension);
    this.bgMusic = sound.find('mainBgm');
    this.cardSize = 100;
    this.padding = 10;
    this.cardTotal = 0
    this.isMatched = []
    this.shapes = [];
    this.activeCards = [];
    this.createCard();
    // this.animateCard(app);
  }

  createCard() {
    const step = this.cardSize + this.padding; // 110px per card

    const cols = Math.floor(this.width / step); // how many fit horizontally
    const rows = Math.floor(this.height / step); // how many fit vertically
    this.timerText.anchor.set(1)
    this.cardTotal = cols * rows;
    const ingameBundle = manifest.bundles.find(
      (b) => b.name === "ingame-assets",
    );
    const sfxBundle = manifest.bundles.find((b) => b.name === "ingame-sfx");

    const pairedAliases = ingameBundle.assets.map((asset, index) => {
      return [asset.alias, sfxBundle.assets[index].alias];
    });
    pairedAliases.sort(() => Math.random() - 0.5);

    let cardPairs = [];
    for (let i = 0; i < this.cardTotal / 2; i++) {
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
        square.isMatched = false;
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
    sound.play("flipCard")
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
    if (cardClick.isFlipped === true || this.activeCards.length >= 2 || this.isPlayingSound === true) {
      return;
    }
    this.faceCardUp(cardClick, cardClick.cardValue);
    cardClick.isFlipped = true;
    this.activeCards.push(cardClick);
    if (this.activeCards.length === 2) {
      this.checkMatch(cardClick);
    }
  }

  checkMatch(cardClick) {
    setTimeout(() => {
      const square1 = this.activeCards[0];
      const square2 = this.activeCards[1];
      if (square1.cardValue === square2.cardValue) {
        square1.isMatched = true;
        square2.isMatched = true;
        this.activeCards.length = 0;  // Set the activeCards array into empty array
        this.isPlayingSound = true  // set to True
        this.bgMusic.pause()
        sound.play(square1.cardSfx, {
          complete: () => {
            this.isPlayingSound = false 
            this.bgMusic.resume()
            if (square1.isMatched == true && square2.isMatched == true)
              this.isMatched.push(square1, square2);
              console.log(this.isMatched)
              console.log(this.isMatched.length, this.cardTotal)
            if (this.isMatched.length >= this.cardTotal) {
              Signals.gameOver.dispatch({result : "win"});
              return
            }
          }
        }); // play sound
        console.log("They are Matched!");
        return;
      } else {
        this.faceCardDown(square1);
        this.faceCardDown(square2);
        square1.isFlipped = false;
        square2.isFlipped = false;
        this.activeCards.length = 0;
        return;
      }
    }, 1000);
  }
}

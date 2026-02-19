import {
  Application,
  Assets,
  Sprite,
  Container,
  Graphics,
  Text,
} from "pixi.js";
import Board from "./Board/Board";
import Card from "./Card/Card";
import MainMenu from "./Menu/MainMenu";
import Manifest from "./Manifest/AssetsManifest";
import { initDevtools } from "@pixi/devtools";

(async () => {
  const GAME_WIDTH = window.innerWidth;
  const GAME_HEIGHT = window.innerHeight;
  const app = new Application();
  await Assets.init({ manifest: Manifest });
  await app.init({
    background: 0x1099bb,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    resizeTo: window,
  });

  initDevtools({ app });
  document.body.appendChild(app.canvas);
  loadingBarMenu(app);
})();

const loadingBarMenu = async (app) => {
  await Assets.loadBundle("loading-screen");
  const emptyBarTexture = Assets.get("preLoadEmptyBar");
  const filledBarTexture = Assets.get("preLoadFilledBar");
  const texture = await Assets.get("preLoadBackground");

  const emptyBar = new Sprite(emptyBarTexture);
  const filledBar = new Sprite(filledBarTexture);
  const background = new Sprite(texture);
  background.width = app.screen.width;
  background.height = app.screen.height;
  filledBar.position.set(765,535)
  filledBar.anchor.set(0.5)
  emptyBar.position.set(765,527)
  emptyBar.anchor.set(0.5)
  app.stage.addChild(background);
  app.stage.addChild(emptyBar);
  app.stage.addChild(filledBar);

  // loadAsset(app);
};
async function loadAsset(app, texture) {
  // const board = new Container();
  // const outline = new Graphics();
  // const menu = await new MainMenu(app);
  //     try {
  //     if(menu) {
  //         new Board(outline, board, app, 50  0, 500);
  //     } else {
  //         console.log("Failed to load menu")
  //     }
  //     } catch (error) {
  //         console.log(error)
  //     }
}

const onProgress = (progress) => {
  const loadingText = new Text({
    text: "Loading... 0%",
    style: { fill: "white", fontSize: 36 },
  });

  loadingText.text = `Loading... ${Math.round(progress * 100)}%`;
  // You could also update a loading bar's width here
};

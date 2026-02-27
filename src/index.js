import {
  Application,
  Assets,
  Sprite,
  Graphics,
  Text,
  TextStyle,
} from "pixi.js";
import Board from "./Board/Board";
import Card from "./Card/Card";
import MainMenu from "./Menu/MainMenu";
import Manifest from "./Manifest/AssetsManifest";
import { initDevtools } from "@pixi/devtools";
import Signals from "./Signals/GameSignals";
import NewGame from "./common";


const app = new Application();

(async () => {
  try {
    const GAME_WIDTH = window.innerWidth;
    const GAME_HEIGHT = window.innerHeight;

    await Assets.init({ manifest: Manifest });
    await app.init({
      background: 0x1099bb,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      resizeTo: window,
    });

    Signals.clickToStart.add(() => new MainMenu(app));

    initDevtools({ app });
    document.body.appendChild(app.canvas);
    loadingBarMenu(app);
  } catch (error) {
    app.stage.addChild(
      new Text("Error loading assets", {
        fill: "red",
        fontSize: 36,
      }),
    );
    console.error("Error loading assets:", error);
  }
})();

const loadingBarMenu = async (app) => {
  const loadingAsset = await Assets.loadBundle("loading-screen-assets");

  const background = Sprite.from("preLoadBackground");
  const emptyBar = Sprite.from("preLoadEmptyBar");
  const filledBar = Sprite.from("preLoadFilledBar");

  const style = new TextStyle({
    fill: "#ffffff",
    fontSize: 48,
    fontWeight: 'bold',
    stroke: '#2c3e50',
    strokeThickness: 6,
    dropShadow: true,
    dropShadowDistance: 4,
  });

  const loadingText = new Text({ text: "Loading... 0%", style });
  setProperties(app, emptyBar, filledBar, background, loadingText);
};

function setProperties(app, emptyBar, filledBar, background, loadingText) {
  background.width = app.screen.width;
  background.height = app.screen.height;

  // Center the text
  loadingText.anchor.set(0.5);
  loadingText.x = app.screen.width / 2;
  loadingText.y = app.screen.height / 2 + 100;

  emptyBar.anchor.set(0, 0.5);
  filledBar.anchor.set(0, 0.5);

  const barX = app.screen.width / 2 - emptyBar.width / 2;
  const barY = app.screen.height / 2;

  emptyBar.position.set(barX, barY);
  filledBar.position.set(barX + 3, barY + 8);

  filledBar.scale.x = 0;

  app.stage.addChild(background, emptyBar, filledBar, loadingText);
  onProgress(app, filledBar, loadingText, emptyBar);
}

const onProgress = async (app, filledBar, textLoad, emptyBar) => {
  let targetProgress = 0;

  const updateLoadingBar = () => {
    // Faster increment so the user isn't waiting for an animation
    // after the download is already done
    if (filledBar.scale.x < targetProgress) {
      filledBar.scale.x += targetProgress;
      if (filledBar.scale.x > targetProgress)
        filledBar.scale.x = targetProgress;
    }

    // Only move to the next screen IF the animation has caught up to 100%
    if (targetProgress >= 1 && filledBar.scale.x >= 1) {
      app.ticker.remove(updateLoadingBar);
      NewGame(app, filledBar, textLoad, emptyBar);
    }
  };

  app.ticker.add(updateLoadingBar);
  
  await Assets.loadBundle(["menu-assets", "ingame-assets"], (progress) => {
    targetProgress = progress;
    textLoad.text = `Loading... ${Math.round(progress * 100)}%`;
  });

};

import {Application, Assets, Sprite, Container, Graphics, Text} from "pixi.js";
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
    app.stage.addChild(new Text("Error loading assets", {
      fill: "red",
      fontSize: 36,
    }));
    console.error("Error loading assets:", error);
  }
})();

const loadingBarMenu = async (app) => {
  const loadingAsset = await Assets.loadBundle("loading-screen");
  const emptyBar = Sprite.from("preLoadEmptyBar");
  const filledBar = Sprite.from("preLoadFilledBar");
  const background = Sprite.from("preLoadBackground");
  const loadingText = new Text({
    text: "Loading... 0%",
    style: { fill: "white", fontSize: 36 },
  });

  setProperties(app, emptyBar, filledBar, background, loadingText);
};

function setProperties(app, emptyBar, filledBar, background, loadingText) {
  background.width = app.screen.width;
  background.height = app.screen.height;
  loadingText.anchor.set(0.5);
  loadingText.position.set(app.screen.width / 2, app.screen.height / 2 + 100);
  filledBar.position.set(
    app.screen.width / 2 - filledBar.width / 2,
    app.screen.height / 2 + emptyBar.width / 4 + 20,
  );
  emptyBar.position.set(
    app.screen.width / 2 - emptyBar.width / 2,
    app.screen.height / 2 + emptyBar.width / 4,
  );
  app.stage.addChild(background, emptyBar, filledBar, loadingText);
  onProgress(app, filledBar, loadingText);
}

const onProgress = async (app, loadingBar, textLoad) => {
  let targetProgress = 0;

  // 1. Add the ticker FIRST so it can listen for targetProgress changes
  const updateLoadingBar = () => {
    if (loadingBar.scale.x < targetProgress) {
      loadingBar.scale.x += 0.001;

      // Prevent overshooting if the jump is small
      if (loadingBar.scale.x > targetProgress) {
        loadingBar.scale.x = targetProgress;
      }
    }
  };
  app.ticker.add(updateLoadingBar);

  // 2. Start the load (the await happens while the ticker is running)
  await Assets.loadBundle("menu-assets", (progress) => {
    targetProgress = progress; // The ticker will now see this new value
    let percent = Math.round(progress * 100);
    textLoad.text = `Loading... ${percent}%`;
    
    // NewGame(app, loadingBar, textLoad);
  });
  // loadingBar.scale.x = 1;
  app.ticker.remove(updateLoadingBar);
  
};

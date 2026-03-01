import { Assets, Sprite, textStyleToCSS, Rectangle, Container } from "pixi.js";
import Signals from "../Signals/GameSignals";
import GameSelect from "./GameSelect";
import GameSettings from "./GameSettings";
import { sound } from '@pixi/sound';

export default class MainMenu {
  constructor(app) {
    sound.play('mainBgm', { loop: true })
    this.app = app;
    this.menu = Sprite.from("preLoadMainMenu");
    this.menu_btns = new Container();
    this.startBtn = " ";
    this.settingsBtn = " ";
    this.exitBtn = " ";
    Signals.startButton.add(this.clickStartButton, this);
    Signals.settingsButton.add(this.clickSettingsButton, this);
    Signals.exitButton.add(this.clickExitButton, this);
    this.init();
  }

  async init() {
    const screen = [this.app.screen.width / 2, this.app.screen.height / 2];

    this.menu.anchor.set(0.5, 0.85);
    this.menu.position.set(screen[0], screen[1]);

    this.startBtn = Sprite.from("preLoadStartButton");
    this.settingsBtn = Sprite.from("preLoadSettingsButton");
    this.exitBtn = Sprite.from("preLoadExitButton");

    this.startBtn.position.set(0, 0);
    this.settingsBtn.position.set(0, 125);
    this.exitBtn.position.set(0, 250);

    this.menu_btns.addChild(this.startBtn, this.settingsBtn, this.exitBtn);
    this.menu_btns.pivot.set(this.menu_btns.width / 2, -30);
    this.menu_btns.scale = 0.75;
    this.menu_btns.position.set(screen[0], screen[1]);

    this.app.stage.addChild(this.menu, this.menu_btns);

    this.startBtn.eventMode = "static";
    this.startBtn.cursor = "pointer";
    this.startBtn.on("pointerover", () => (this.startBtn.tint = 0xdddddd));
    this.startBtn.on("pointerout", () => (this.startBtn.tint = 0xffffff));
    this.startBtn.on("pointerdown", () => {
      sound.play('buttonClicked')
      Signals.startButton.dispatch(console.log("dispatched"));
    });

    this.settingsBtn.eventMode = "static";
    this.settingsBtn.cursor = "pointer";
    this.settingsBtn.on("pointerover",() => (this.settingsBtn.tint = 0xdddddd),);
    this.settingsBtn.on("pointerout", () => (this.settingsBtn.tint = 0xffffff));
    this.settingsBtn.on("pointerdown", () => (sound.play('buttonClicked')));

    this.exitBtn.eventMode = "static";
    this.exitBtn.cursor = "pointer";
    this.exitBtn.on("pointerover", () => (this.exitBtn.tint = 0xdddddd));
    this.exitBtn.on("pointerout", () => (this.exitBtn.tint = 0xffffff));
    this.exitBtn.on("pointerdown", () => (sound.play('buttonClicked')));
  }

  clickStartButton() {
    const select = new GameSelect(this.app, this);
    // Fix 1: Remove them from the stage instead of destroying them
    this.app.stage.removeChild(this.menu, this.menu_btns);
    
    // Fix 2: Prevent a memory leak by clearing old listeners before adding a new one
    Signals.goBackBtn.removeAll();
    Signals.goBackBtn.add(() => select.goBackButton());
  }

  clickSettingsButton() {
    const settings = new GameSettings()
    Signals.goBackBtn.removeAll();
    Signals.goBackBtn.add(() => settings.goBackButton());
  }

  clickExitButton() {}
}

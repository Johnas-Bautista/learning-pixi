import MainMenu from "./MainMenu";
import Signals from "../Signals/GameSignals";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { sound } from "@pixi/sound";
import { style } from "../index.js";

export default class GameSettings {
  constructor(app, menu) {
    this.app = app;
    this.menu = menu;
    
    // Configuration
    this.sliderWidth = 400;
    this.sliderY = -100;
    this.panelWidth = 800;
    this.panelHeight = 500;

    this.label = new Text({ text: "Volume: 100%", style: style });
    this.goBack = Sprite.from("preLoadGoBackButton");
    this.thumbSlider = Sprite.from("sliderButton");
    this.fillSlider = Sprite.from("preLoadFilledBar");
    this.trackSlider = new Graphics();
    this.settingsPanel = new Graphics();
    this.settingsMenu = new Container();
    
    this.isDragging = false;
    this.init();
  }

  init() {
    const currentVolume = sound.find('mainBgm') ? sound.find('mainBgm').volume : 1;
    const initialX = (currentVolume * this.sliderWidth) - (this.sliderWidth / 2);
    this.app.stage.addChild(this.settingsMenu);
    this.settingsMenu.addChild(this.settingsPanel, this.trackSlider, this.fillSlider, this.thumbSlider, this.goBack, this.label);

    this.settingsMenu.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2
    );

    // Panel
    this.settingsPanel
      .roundRect(-this.panelWidth / 2, -this.panelHeight / 2, this.panelWidth, this.panelHeight, 15)
      .stroke({ width: 2, color: 0x0000ff })
      .fill({ color: "white", alpha: 0.5 });

    // Track
    this.trackSlider
      .roundRect(-this.sliderWidth / 2, this.sliderY, this.sliderWidth, 10, 5)
      .fill({ color: 0x333333 });

    // Fill
    this.fillSlider.anchor.set(0, 0.5);
    this.fillSlider.position.set(-this.sliderWidth / 2, this.sliderY + 5);
    this.fillSlider.width = currentVolume * this.sliderWidth;

    // Thumb
    this.thumbSlider.anchor.set(0.5);
    this.thumbSlider.scale.set(0.08);
    this.thumbSlider.position.set(initialX, this.sliderY + 5);
    
    // Interactions
    this.thumbSlider.eventMode = "static";
    this.thumbSlider.cursor = "pointer";
    this.thumbSlider.on("pointerdown", () => { this.isDragging = true; });

    // Listen to stage for move and up so dragging is smooth
    this.app.stage.eventMode = "static";
    this.app.stage.on("pointermove", (e) => this.updateVolume(e));
    this.app.stage.on('pointerup', () => { this.isDragging = false; });
    this.app.stage.on('pointerupoutside', () => { this.isDragging = false; });

    // Go Back
    this.goBack.y = (this.panelHeight / 2) - 60;
    this.goBack.anchor.set(0.5);
    this.goBack.scale.set(0.5);
    this.goBack.eventMode = "static";
    this.goBack.cursor = "pointer";
    this.goBack.on("pointerover", () => (this.goBack.tint = 0xdddddd));
    this.goBack.on("pointerout", () => (this.goBack.tint = 0xffffff));
    this.goBack.on("pointerdown", () => {
      sound.play("buttonClicked");
      Signals.goBackBtn.dispatch();
    });

    // Volume Text
    this.label.anchor.set(0.5);
    this.label.y = this.sliderY - 70;
    this.label.text = `Volume: ${Math.round(currentVolume * 100)}%`;
  }

  updateVolume(event) {
    if (this.isDragging) {
      const localPos = event.getLocalPosition(this.settingsMenu);
      const halfWidth = this.sliderWidth / 2;
      let newX = Math.max(-halfWidth, Math.min(halfWidth, localPos.x));
      this.thumbSlider.x = newX;
      this.fillSlider.width = newX + halfWidth;
      const volume = (newX + halfWidth) / this.sliderWidth;
      const bgMusic = sound.find('mainBgm'); 
        if (bgMusic) {
            bgMusic.volume = volume;
        }
      this.label.text = `Volume: ${Math.round(volume * 100)}%`;
    }
  }

  goBackButton() {
    this.app.stage.addChild(this.menu.menu, this.menu.menu_btns);
    this.app.stage.removeChild(this.settingsMenu);
  }
}

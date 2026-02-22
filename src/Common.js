import { Container, Rectangle } from "pixi.js";
import Signals from "./Signals/GameSignals";

export default (app, filledBar, text, emptyBar) => {
  const overlay = new Container();
  app.stage.addChild(overlay);

  text.text = "CLICK TO START";
  text.anchor.set(0.5);
  // Position it in the center of the screen
  text.x = app.screen.width / 2;
  text.y = app.screen.height / 2 + 100;

  overlay.addChild(text);

  // --- PULSE ANIMATION ---
  let elapsed = 0;
  const pulse = (ticker) => {
    elapsed += ticker.deltaTime;
    // Math.sin creates a smooth wave between -1 and 1
    // We scale it down so the text only grows by 10% (1.0 to 1.1)
    const scale = 1 + Math.sin(elapsed * 0.1) * 0.05;
    text.scale.set(scale);
  };

  app.ticker.add(pulse);

  overlay.eventMode = "static";
  overlay.hitArea = new Rectangle(0, 0, app.screen.width, app.screen.height);
  overlay.cursor = "pointer";

  overlay.once("pointerdown", () => {
    // Clean up the animation ticker before destroying
    app.ticker.remove(pulse);
    app.stage.removeChild(filledBar, emptyBar, overlay);

    Signals.clickToStart.dispatch();
  });
};
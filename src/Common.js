import { Container, Rectangle, Text, TextStyle } from "pixi.js";
import Signals from "./Signals/GameSignals";

export default (app, loading, text) => {
   loading.destroy();
   text.destroy();
  const overlay = new Container();
  const style = new TextStyle({ fill: "#ffffff", fontSize: 36 });
  const text = new Text("Click to continue", style);

  text.anchor.set(0.5);
  text.x = app.screen.width / 2;
  text.y = app.screen.height / 2;

  overlay.addChild(text);
  overlay.eventMode = 'static';
  overlay.hitArea = new Rectangle(0, 0, app.screen.width, app.screen.height);
  overlay.on("pointerdown", () => {
    overlay.destroy();
    Signals.clickToStart.dispatch(); 
  });
  app.stage.addChild(overlay);
}

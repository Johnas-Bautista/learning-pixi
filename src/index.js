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

(async () => {
  const app = new Application();
  const texture = await Assets.load("/Assets/background.png");
  const background = new Sprite(texture);
  await app.init({
    background: 0x1099bb,
    resizeTo: window,
  });

  document.body.appendChild(app.canvas);
  background.width = app.screen.width;
  background.height = app.screen.height;
  app.stage.addChild(background);

  const board = new Container();
  const outline = new Graphics();

  const menu = await new MainMenu(app);
  try {
    if(menu) {
      new Board(outline, board, app, 500, 500);
    } else {
      console.log("Failed to load menu")
    }
  } catch (error) {
    console.log(error)
  }

  new Card(outline, board, app);
  //   const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
  //   const bunny = new Sprite(texture);
  //   bunny.anchor.set(0.5);
  //   bunny.x = app.screen.width / 2;
  //   bunny.y = app.screen.height / 2;
  //   app.stage.addChild(bunny);

  //   app.ticker.add((time) => {
  //     bunny.rotation += 0.1 * time.deltaTime;
  //   });

  // const scene = new Container();
  // const bunny = new Container();
  // scene.position.set(app.screen.width / 2, app.screen.height / 2);
  // app.stage.addChild(scene);

  // bunny.position.set(app.screen.width / 2, app.screen.height / 2)
  // const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
  // const spr = new Sprite(texture)
  // spr.anchor.set(0.5)
  // spr.x = -300
  // bunny.addChild(spr)
  // app.stage.addChild(bunny);

  // // Draw some shapes to show the canvas renderer in action
  // const colors = [0xe74c3c, 0x3498db, 0x2ecc71, 0xf39c12, 0x9b59b6];
  // const shapes = [];
  // for (let i = 0; i < 5; i++) {
  //   const shape = new Graphics()
  //     .roundRect(-40, -40, 80, 80, 12)
  //     .fill(colors[i]);

  //   shape.x = (i - 2) * 100;
  //   shape.y = 0;
  //   scene.addChild(shape);
  //   shapes.push(shape);
  // }

  // const label = new Text({
  //   text: "Canvas Renderer",
  //   style: {
  //     fontFamily: "Arial",
  //     fontSize: 32,
  //     fontWeight: "bold",
  //     fill: "white",
  //   },
  // });
  // label.anchor.set(0.5);
  // label.y = -100;
  // scene.addChild(label);

  // const sublabel = new Text({
  //   text: `Renderer: ${app.renderer.name}`,
  //   style: {
  //     fontFamily: "Arial",
  //     fontSize: 18,
  //     fill: "#bdc3c7",
  //   },
  // });
  // sublabel.anchor.set(0.5);
  // sublabel.y = 100;
  // scene.addChild(sublabel);

  // // Animate shapes
  // let time = 0;
  // app.ticker.add((ticker) => {
  //   time += ticker.deltaTime * 0.02;

  //   for (let i = 0; i < shapes.length; i++) {
  //     shapes[i].y = Math.sin(time + i * 0.8) * 40;
  //     shapes[i].rotation += 0.01 * ticker.deltaTime;
  //   }

  // spr.rotation += 0.1 * ticker.deltaTime
  // });
})();

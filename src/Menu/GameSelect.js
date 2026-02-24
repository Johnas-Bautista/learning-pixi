import { Container, Graphics, Sprite} from "pixi.js";
import MainMenu from "./MainMenu";
import Signals from "../Signals/GameSignals";

export default class GameSelect {
    constructor(app, menu){
        this.app = app;
        this.menu = menu
        this.goBack = Sprite.from('preLoadGoBackButton')
        this.select = new Graphics()
        this.container = new Container()
        this._init();
    }

    _init(){
        console.log("Game Select")
        
        // this.select.roundRect(50, 50, 500, 500, 15).fill('blue')
        this.container.addChild(this.goBack, this.select)
        this.app.stage.addChild(this.container)
        this.goBack.position.set(this.app.stage.width / 2 , this.app.stage.height / 2)
        this.container.width = this.app.stage.width
        this.container.height = this.app.stage.height
        this.goBack.scale.set(0.1)
        this.goBack.eventMode = 'static'
        this.goBack.cursor = 'pointer'
        this.goBack.on('pointerdown', ()=>{
            Signals.goBackBtn.dispatch(console.log("went back"))
        })
        // this.goBack.anchor.set(1)
    }

    goBackButton(){
        this.app.stage.removeChild(this.container);
        this.app.stage.addChild(this.menu.menu, this.menu.menu_btns);
        console.log("went back 2");
    }

    chooseLevel(){

    }
}
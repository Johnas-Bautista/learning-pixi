import { Container, Graphics, Sprite} from "pixi.js";
import MainMenu from "./MainMenu";
import Signals from "../Signals/GameSignals";

export default class GameSelect {
    constructor(app, menu){
        this.app = app;
        this.menu = menu
        this.goBack = Sprite.from('preLoadGoBackButton')
        this.square = new Graphics()
        this.container = new Container()
        this._init();
    }

    _init(){
        console.log("Game Select")
        const optionSize = 300
        const screen = [this.app.screen.width / 2 , this.app.screen.height / 2]

        const option1 = this.square.roundRect(-optionSize / 2 -optionSize, -optionSize, optionSize, optionSize, 15).fill('blue')
        const option2 = this.square.roundRect(-optionSize / 2 + (optionSize * 2) / 2, -optionSize, optionSize, optionSize, 15).fill('blue')
        
        this.container.addChild(this.goBack, option1, option2)
        this.app.stage.addChild(this.container)
        // this.container.width = this.app.stage.width
        // this.container.height = this.app.stage.height
        option1.position.set(screen[0], screen[1])
        
        option2.position.set(screen[0], screen[1])
        this.goBack.anchor.set(0.5, -2)
        this.goBack.scale.set(.5)
        this.goBack.position.set(screen[0], screen[1])
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
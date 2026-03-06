import MainMenu from "./MainMenu";
import Signals from "../Signals/GameSignals";
import { Container, Graphics, Sprite } from "pixi.js";

export default class GameSettings{
    constructor(app, menu) {
        console.log("Settings")
        this.app = app
        this.menu = menu
        this.settingsMenu = new Container()
        this.settingsPanel = new Graphics()
        this.settingsSlider = new Graphics()
        this.goBack = Sprite.from('preLoadGoBackButton')
    }
    init(){
        this.settingsMenu.addChild(this.goBack)

        console.log("initialize")
    }
    goBackButton(){
        this.app.stage.addChild(this.menu.menu, this.menu.menu_btns);
    }
}
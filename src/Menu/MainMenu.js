import { Assets, Sprite, textStyleToCSS } from "pixi.js"
import Signals from "../Signals/GameSignals"

export default class MainMenu {
    constructor(app){
        this.app = app
        this.init()
    }

    async init(){
        const menu = Sprite.from("preLoadMainMenu");
        const menu_btns = Sprite.from("preLoadMenuButtons");

        const screen = [this.app.screen.width / 2, this.app.screen.height / 2]
        menu_btns.scale = .80
        menu_btns.anchor.set(.50, .15)
        menu.anchor.set(.50, .85)
        menu_btns.position.set(screen[0], screen[1])
        menu.position.set(screen[0], screen[1])
        this.app.stage.addChild(menu, menu_btns)
    }
}
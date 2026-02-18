import { Assets, Sprite, textStyleToCSS } from "pixi.js"
import Signals from "../Signals/GameSignals"

export default class MainMenu {
    constructor(app){
        this.app = app
        this.init()
    }

    async init(){
        const texture = await Assets.load("/Assets/main.png")
        const btns = await Assets.load("/Assets/menu_btn.png")
        console.log(texture)
        console.log(btns)
        
        const menu = new Sprite(texture);
        const menu_btns = new Sprite(btns);
        const screen = [this.app.screen.width / 2, this.app.screen.height / 2]
        menu_btns.scale = .80
        menu_btns.anchor.set(.50, .15)
        menu.anchor.set(.50, .85)
        menu_btns.position.set(screen[0], screen[1])
        menu.position.set(screen[0], screen[1])
        this.app.stage.addChild(menu, menu_btns)
    }
}
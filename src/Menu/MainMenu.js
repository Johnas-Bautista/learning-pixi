import { Assets, Sprite, textStyleToCSS } from "pixi.js"
import Signals from "../Signals/GameSignals"

export default class MainMenu {
    constructor(app){
        this.app = app
        this.menu_btns = " "
        this.init()
    }

    async init(){
        const menu = Sprite.from("preLoadMainMenu");
        this.menu_btns = Sprite.from("preLoadMenuButtons");
        Signals.startButton.add(this.clickStartButton, this)
        Signals.settingsButton.add(this.clickSettingsButton, this)
        Signals.exitButton.add(this.clickExitButton, this)
        const screen = [this.app.screen.width / 2, this.app.screen.height / 2]
        this.menu_btns.scale = .80
        this.menu_btns.anchor.set(.50, .15)
        menu.anchor.set(.50, .85)
        this.menu_btns.position.set(screen[0], screen[1])
        menu.position.set(screen[0], screen[1])
        this.app.stage.addChild(menu, this.menu_btns)
    }

    clickStartButton(){
        this.menu_btns.eventMode = 'static'
    }

    clickSettingsButton(){

    }

    clickExitButton(){

    }


}
import { Container, Graphics, Sprite} from "pixi.js";
import MainMenu from "./MainMenu";
import Signals from "../Signals/GameSignals";
import Card from "../Card/Card";
import { sound } from "@pixi/sound";

export default class GameSelect {
    constructor(app, menu){
        Signals.optionBtn.removeAll()
        Signals.optionBtn.add(this.chooseLevel, this)
        this.app = app;
        this.menu = menu
        this.goBack = Sprite.from('preLoadGoBackButton')
        this.option1 = Sprite.from('select3x4')
        this.option2 = Sprite.from('select4x4')
        this.option3 = Sprite.from('select4x5')
        this.container = new Container()
        this._init();
    }

    _init(){
        console.log("Game Select")
        const optionSize = 300
        const spacing = optionSize / 1.1;
        const screenX = this.app.screen.width / 2;
        const screenY = this.app.screen.height / 2;
        const marginBetweenButton = screenY - spacing / 3
        
        this.option1.anchor.set(0.5);
        this.option2.anchor.set(0.5);
        this.option3.anchor.set(0.5);

        this.option1.eventMode = this.option2.eventMode = this.option3.eventMode = 'static'
        this.option1.cursor = this.option2.cursor = this.option3.cursor = 'pointer'

        this.option1.scale.set(0.3);
        this.option2.scale.set(0.3);
        this.option3.scale.set(0.3);
        
        this.pulsingAnimation(this.option1)
        this.pulsingAnimation(this.option2)
        this.pulsingAnimation(this.option3)

        this.option1.on("pointerdown", () =>{
            Signals.optionBtn.dispatch({ action: '3x4'})
        })        
        this.option2.on("pointerdown", () =>{
            Signals.optionBtn.dispatch({ action: '4x4'})
        })        
        this.option3.on("pointerdown", () =>{
            Signals.optionBtn.dispatch({ action: '4x5'})
        })
        
        this.container.addChild(this.goBack, this.option1, this.option2, this.option3)
        this.app.stage.addChild(this.container)
        
        // Position options symmetrically: evenly spaced in a row
        this.option1.position.set(screenX - spacing, marginBetweenButton);
        this.option2.position.set(screenX, marginBetweenButton);
        this.option3.position.set(screenX + spacing, marginBetweenButton);
        
        this.goBack.anchor.set(0.5, 2.5); 
        this.goBack.scale.set(.5);
        this.goBack.position.set(screenX, screenY + optionSize); 
        this.goBack.eventMode = 'static';
        this.goBack.cursor = 'pointer';
        this.goBack.on("pointerover", () => (this.goBack.tint = 0xdddddd))
        this.goBack.on("pointerout", () => (this.goBack.tint = 0xffffff))
        this.goBack.on('pointerdown', ()=>{
            sound.play('buttonClicked')
            Signals.goBackBtn.dispatch();
        });
    }

    goBackButton(){
        this.app.stage.removeChild(this.container);
        this.app.stage.addChild(this.menu.menu, this.menu.menu_btns);
    }

    
    pulsingAnimation(options){
        let elapsed = 0
        const pulseTicker = (ticker) => {
            elapsed += ticker.deltaTime;
            // Math.sin creates a smooth wave between -1 and 1
            // We scale it down so the text only grows by 10% (1.0 to 1.1)
            const scale = 0.3 + Math.sin(elapsed * 0.1) * 0.01;
            options.scale.set(scale);
        }

        options.on("pointerover", ()=>{
            this.app.ticker.add(pulseTicker)
        });
        options.on("pointerout", ()=>{
            this.app.ticker.remove(pulseTicker)
            options.scale.set(0.3)
            elapsed = 0;
        });
    }
    
    chooseLevel(options){
        console.log("Level Selected")
        const board = new Container()
        const outline = new Graphics()
        try {
            switch(options.action) {
                case '3x4':
                    new Card(outline, board, this.app, 30, undefined, 500, 400)
                    this.app.stage.removeChild(this.container)
                    break;
                case '4x4':
                    new Card(outline, board, this.app, 30, undefined, 500, 500)
                    this.app.stage.removeChild(this.container)
                    break;
                case '4x5':
                    new Card(outline, board, this.app, 30, 60, 500, 600)
                    this.app.stage.removeChild(this.container)
                    break;
            }
            console.log("Board successfully created and added to stage!");
        } catch(error){
            console.error("The code crashed while making the board:", error);
        }
    }
    
}
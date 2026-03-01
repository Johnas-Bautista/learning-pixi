import { Container, Graphics, Sprite} from "pixi.js";
import MainMenu from "./MainMenu";
import Signals from "../Signals/GameSignals";
import Card from "../Card/Card";

export default class GameSelect {
    constructor(app, menu){
        this.app = app;
        this.menu = menu
        this.goBack = Sprite.from('preLoadGoBackButton')
        Signals.optionBtn.add(this.chooseLevel, this)
        this.option1 = new Graphics()
        this.option2 = new Graphics()
        this.container = new Container()
        this._init();
    }

    _init(){
        console.log("Game Select")
        const optionSize = 300
        const screenX = this.app.screen.width / 2;
        const screenY = this.app.screen.height / 2;

        // 1. DRAW CENTERED: We draw the box perfectly around 0,0 
        // (-150, -150, 300, 300)
        this.option1.roundRect(-optionSize / 2, -optionSize / 2, optionSize, optionSize, 15).fill({ color: 'white', alpha: 0.5 });
        this.option2.roundRect(-optionSize / 2, -optionSize / 2, optionSize, optionSize, 15).fill({ color: 'white', alpha: 0.5 });
        
        
        this.option1.eventMode = this.option2.eventMode = 'static'
        this.option1.cursor = this.option2.cursor = 'pointer'
        
        this.pulsingAnimation(this.option1)
        this.pulsingAnimation(this.option2)

        this.option1.on("pointerdown", () =>{
            Signals.optionBtn.dispatch({ action: '3x4'})
        })        
        this.option2.on("pointerdown", () =>{
            Signals.optionBtn.dispatch({ action: '4x4'})
        })
        
        this.container.addChild(this.goBack, this.option1, this.option2)
        this.app.stage.addChild(this.container)
        
        // 2. POSITION OFFSETS: Now we apply your original layout math directly to the positions!
        // We take the center of the screen, and add/subtract the layout offsets.
        const layoutOffsetY = -optionSize / 1.3 + (optionSize / 2); // Your original Y offset adjusted for the new center

        this.option1.position.set(screenX - (optionSize / 1.3), screenY + layoutOffsetY);
        this.option2.position.set(screenX + (optionSize / 1.3), screenY + layoutOffsetY);
        
        this.goBack.anchor.set(0.5, 2.5); 
        this.goBack.scale.set(.5);
        this.goBack.position.set(screenX, screenY + optionSize); 
        this.goBack.eventMode = 'static';
        this.goBack.cursor = 'pointer';
        
        this.goBack.on('pointerdown', ()=>{
            Signals.goBackBtn.dispatch();
        });
    }

    goBackButton(){
        this.app.stage.removeChild(this.container);
        this.app.stage.addChild(this.menu.menu, this.menu.menu_btns);
        console.log("went back 2");
    }

    
    pulsingAnimation(options){
        let elapsed = 0
        const pulseTicker = (ticker) => {
            elapsed += ticker.deltaTime;
            // Math.sin creates a smooth wave between -1 and 1
            // We scale it down so the text only grows by 10% (1.0 to 1.1)
            const scale = 1 + Math.sin(elapsed * 0.1) * 0.05;
            options.scale.set(scale);
        }

        options.on("pointerover", ()=>{
            this.app.ticker.add(pulseTicker)
        });
        options.on("pointerout", ()=>{
            this.app.ticker.remove(pulseTicker)
            options.scale.set(1)
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
                    new Card(outline, board, this.app, 500, 400)
                    this.app.stage.removeChild(this.container)
                    break;
                case '4x4':
                    new Card(outline, board, this.app, 500, 500)
                    this.app.stage.removeChild(this.container)
                    break;
            }
            console.log("Board successfully created and added to stage!");
        } catch(error){
            console.error("The code crashed while making the board:", error);
        }
    }
    
}
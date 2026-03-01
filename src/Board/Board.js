
export default class Board {
    constructor(outline, board, app, ...dimension){
        this.board = board;
        this.outline = outline
        this.width = dimension[0];
        this.height = dimension[1];
        this.app = app
        this._init();
    }
    
    _init(){
        this.scaleBoard(this.app);
        this.app.stage.addChild(this.getBoard());
    }

    getBoard(){
        return this.board;
    }

    scaleBoard(app){
        this.board.scale.set(1);
        this.board.position.set(
            (this.app.screen.width - this.width) / 2,
            (this.app.screen.height - this.height) / 2
        );
        // this.outlineBoard()
    }

    outlineBoard(){
        this.outline.rect(0, 0, this.width, this.height).stroke({ width: 2, color: '#00000061' });
        this.board.addChild(this.outline)
    }

}
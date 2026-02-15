
export default class Board {
    constructor(outline, board, app){
        this.board = board;
        this.outline = outline
        this.width = 800;
        this.height = 500;
        this._init(app);
    }
    
    _init(app){
        this.scaleBoard(app);
        app.stage.addChild(this.getBoard());
    }

    getBoard(){
        return this.board;
    }

    scaleBoard(app){
        this.board.scale.set(1);
        this.board.position.set(
            (app.screen.width - this.width) / 2,
            (app.screen.height - this.height) / 2
        );
        this.outlineBoard()
    }

    outlineBoard(){
        this.outline.rect(0, 0, this.width, this.height).stroke({ width: 2, color: '#00000061' });
        this.board.addChild(this.outline)
    }

}
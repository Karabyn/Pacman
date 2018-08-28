class Ghost extends MovingAgent{

    constructor(map) {
        super(map);

        const startCoords = map.getTileCoordinates(map.blinkyStartingTile.row, map.blinkyStartingTile.col);
        this.x = startCoords.x + this.fullRadius;
        this.y = startCoords.y + this.fullRadius;

    }

    move() {
        this.nextDir = MovingAgent.initialDir();
        if (Ghost.hasNoDir(this.currentDir) || !this.canMove(this.currentDir) ) {
            this.setNextRandomDir();
        }
        super.move();
    }

    static hasNoDir(dir) {
        return !dir.UP && !dir.RIGHT && !dir.DOWN && !dir.LEFT;
    }

    setNextRandomDir() {
        this.nextDir = Ghost.initialDir();
        const nextDir = Math.floor((Math.random() * 4) + 1);
        switch (nextDir) {
            case 1:
                this.nextDir.UP = true;
                break;
            case 2:
                this.nextDir.RIGHT = true;
                break;
            case 3:
                this.nextDir.DOWN = true;
                break;
            case 4:
                this.nextDir.LEFT = true;
        }
    }

}


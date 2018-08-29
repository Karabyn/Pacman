class Ghost extends MovingAgent {

    constructor(map, name) {
        super(map);

        this.name = name;
        this.color = Ghost.getColor(name);
        const startingTile = Ghost.getStartingTile(name);
        const startCoords = map.getTileCenter(startingTile.row, startingTile.col);

        this.x = startCoords.x;
        this.y = startCoords.y;

    }

    move() {
        this.nextDir = MovingAgent.initialDir();
        if (Ghost.hasNoDir(this.currentDir) || !this.canMove(this.currentDir) ) {
            this.setNextRandomDir();
        }
        super.move();
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

    reset() {
        const startingTile = Ghost.getStartingTile(this.name);
        const startCoords = map.getTileCenter(startingTile.row, startingTile.col);

        this.x = startCoords.x;
        this.y = startCoords.y;
        this.resetDirs();
    }

    static getColor(name) {
        switch (name) {
            case "blinky" : return "red";
            case "pinky" : return "pink";
            case "inky" : return "cyan";
            case "clyde" : return "orange";
        }
    }

    static getStartingTile(name) {
        switch (name) {
            case "blinky" : return  {row: 9, col: 12};
            case "pinky" : return {row: 12, col: 10};
            case "inky" : return {row: 12, col: 12};
            case "clyde" : return {row: 12, col: 14}
        }
    }

    static hasNoDir(dir) {
        return !dir.UP && !dir.RIGHT && !dir.DOWN && !dir.LEFT;
    }

}


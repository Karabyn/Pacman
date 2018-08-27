class Pacman {

    constructor(map) {

        this.fullRadius = 10;

        this.radius = 9;

        this.map = map;

        // pacman starting coordinates
        const startingTile = map.getTileCoordinates(19, 12);
        this.x = startingTile.x + this.fullRadius; //250 + this.fullRadius;
        this.y = startingTile.y + this.fullRadius; //390 + this.fullRadius; //+ 1.5;
        // values for pacman movement on x and y axis
        this.dx = 2;
        this.dy = 2;

        this.currentDir = Pacman.initialDir();
        this.nextDir = Pacman.initialDir();

        this.color = "yellow";
    }

    move() {
        if ((this.directionChanged() && this.canMove(this.nextDir)) ||
            !this.canMove(this.currentDir) && this.canMove(this.nextDir)) {
            this.currentDir = this.nextDir;
            this.nextDir = Pacman.initialDir();
        }

        if (this.currentDir.RIGHT && this.canMoveRight())        this.moveRight();
        else if (this.currentDir.LEFT && this.canMoveLeft())     this.moveLeft();
        else if (this.currentDir.UP && this.canMoveUp())         this.moveUp();
        else if (this.currentDir.DOWN && this.canMoveDown())     this.moveDown();
    }

    canMoveRight() {
        const tile = this.map.getTileRowColumn(this.x + this.fullRadius - 1 + this.dx, this.y);
        if (this.map.canTileBeVisited(tile.row, tile.col)) {
            const tileCoors = this.map.getTileCoordinates(tile.row, tile.col);
            return (tileCoors.y + this.fullRadius) === this.y;
        }
        return false;
    }

    canMoveLeft() {
        const tile = this.map.getTileRowColumn(this.x - this.fullRadius + 1 - this.dx, this.y);
        if (this.map.canTileBeVisited(tile.row, tile.col)) {
            const tileCoors = this.map.getTileCoordinates(tile.row, tile.col);
            return (tileCoors.y + this.fullRadius) === this.y;
        }
        return false;
    }

    canMoveUp() {
        const tile = this.map.getTileRowColumn(this.x, this.y - this.fullRadius + 1 - this.dy);
        if (this.map.canTileBeVisited(tile.row, tile.col)) {
            const tileCoors = this.map.getTileCoordinates(tile.row, tile.col);
            return (tileCoors.x + this.fullRadius) === this.x;
        }
        return false;
    }

    canMoveDown() {
        const tile = this.map.getTileRowColumn(this.x, this.y + this.fullRadius - 1 + this.dy);
        if (this.map.canTileBeVisited(tile.row, tile.col)) {
            const tileCoors = this.map.getTileCoordinates(tile.row, tile.col);
            return (tileCoors.x + this.fullRadius) === this.x;
        }
        return false;
    }

    canMove(dir) {
        if (dir.RIGHT) return this.canMoveRight();
        else if (dir.LEFT) return this.canMoveLeft();
        else if (dir.UP) return this.canMoveUp();
        else if (dir.DOWN) return this.canMoveDown();
    }

    moveRight() {
        //this.resetDirs();
        this.currentDir = Pacman.initialDir();
        this.currentDir.RIGHT = true;
        this.x += this.dx;
    }

    moveLeft() {
        //this.resetDirs();
        this.currentDir = Pacman.initialDir();
        this.currentDir.LEFT = true;
        this.x -= this.dx;
    }

    moveUp() {
        //this.resetDirs();
        this.currentDir = Pacman.initialDir();
        this.currentDir.UP = true;
        this.y -= this.dy;
    }

    moveDown() {
        //this.resetDirs();
        this.currentDir = Pacman.initialDir();
        this.currentDir.DOWN = true;
        this.y += this.dy;
    }

    directionChanged() {
        return this.hasNextDir() ? !this.isNextDirSameAsCurrent() : false;
    }

    hasNextDir() {
        return this.nextDir.UP || this.nextDir.RIGHT || this.nextDir.DOWN || this.nextDir.LEFT;
    }

    isNextDirSameAsCurrent() {
        return this.currentDir.UP === this.nextDir.UP &&
            this.currentDir.RIGHT === this.nextDir.RIGHT &&
            this.currentDir.DOWN === this.nextDir.DOWN &&
            this.currentDir.LEFT === this.nextDir.LEFT;
    }

    resetDirs() {
        this.currentDir = Pacman.initialDir();
        this.nextDir = Pacman.initialDir();
    }

    static initialDir() {
        return {
            UP: false,
            RIGHT: false,
            DOWN: false,
            LEFT: false
        };
    }

}
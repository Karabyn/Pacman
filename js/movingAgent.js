class MovingAgent {

    constructor(map) {
        this.map = map;

        this.fullRadius = 10;
        this.radius = 11;

        // values for movement on x and y axis
        this.dx = 2;
        this.dy = 2;

        this.currentDir = MovingAgent.initialDir();
        this.nextDir = MovingAgent.initialDir();
    }

    move() {
        // update direction
        if ((this.directionChanged() && this.canMove(this.nextDir)) ||
            !this.canMove(this.currentDir) && this.canMove(this.nextDir)) {
            this.currentDir = this.nextDir;
            this.nextDir = MovingAgent.initialDir();
        }

        // update location
        if (this.currentDir.RIGHT && this.canMoveRight())        this.moveRight();
        else if (this.currentDir.LEFT && this.canMoveLeft())     this.moveLeft();
        else if (this.currentDir.UP && this.canMoveUp())         this.moveUp();
        else if (this.currentDir.DOWN && this.canMoveDown())     this.moveDown();
        //handle teleport
        else if (this.currentDir.RIGHT && this.canTeleportRightToLeft())    this.teleportRightToLeft();
        else if (this.currentDir.LEFT && this.canTeleportLeftToRight())     this.teleportLeftToRight();
    }

    canMove(dir) {
        if (dir.RIGHT) return this.canMoveRight();
        else if (dir.LEFT) return this.canMoveLeft();
        else if (dir.UP) return this.canMoveUp();
        else if (dir.DOWN) return this.canMoveDown();
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

    canTeleportRightToLeft() {
        const tile = this.map.getTileRowColumn(this.x + this.fullRadius - 1 + this.dx, this.y);
        return tile.row === -1 && tile.col === -1;
    }

    canTeleportLeftToRight() {
        const tile = this.map.getTileRowColumn(this.x - this.fullRadius + 1 - this.dx, this.y);
        return tile.row === -1 && tile.col === -1;
    }

    moveRight() {
        this.currentDir = MovingAgent.initialDir();
        this.currentDir.RIGHT = true;
        this.x += this.dx;
    }

    moveLeft() {
        this.currentDir = MovingAgent.initialDir();
        this.currentDir.LEFT = true;
        this.x -= this.dx;
    }

    moveUp() {
        this.currentDir = MovingAgent.initialDir();
        this.currentDir.UP = true;
        this.y -= this.dy;
    }

    moveDown() {
        this.currentDir = MovingAgent.initialDir();
        this.currentDir.DOWN = true;
        this.y += this.dy;
    }

    teleportRightToLeft() {
        this.currentDir = MovingAgent.initialDir();
        this.currentDir.RIGHT = true;
        const destinationTile = this.map.getTileCoordinates(this.map.leftTeleportTile.row,
                                                            this.map.leftTeleportTile.col);
        this.x = destinationTile.x - this.fullRadius;
    }

    teleportLeftToRight() {
        this.currentDir = MovingAgent.initialDir();
        this.currentDir.LEFT = true;
        const destinationTile = this.map.getTileCoordinates(this.map.rightTeleportTile.row,
                                                            this.map.rightTeleportTile.col);
        this.x = destinationTile.x + this.fullRadius;
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
        this.currentDir = MovingAgent.initialDir();
        this.nextDir = MovingAgent.initialDir();
    }

    static initialDir() {
        return {
            UP: false,
            RIGHT: false,
            DOWN: false,
            LEFT: false
        };
    }

    static getDirUp() {
        return {
            UP: true,
            RIGHT: false,
            DOWN: false,
            LEFT: false
        };
    }

    static getDirRight() {
        return {
            UP: false,
            RIGHT: true,
            DOWN: false,
            LEFT: false
        };
    }

    static getDirDown() {
        return {
            UP: false,
            RIGHT: false,
            DOWN: true,
            LEFT: false
        };
    }

    static getDirLeft() {
        return {
            UP: false,
            RIGHT: false,
            DOWN: false,
            LEFT: true
        };
    }

}
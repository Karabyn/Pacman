class Pacman {

    constructor() {
        this.radius = 9;

        // pacman starting coordinates
        this.x = 250 + this.radius;
        this.y = 390 + this.radius + 1.5;
        // values for pacman movement on x and y axis
        this.dx = 1.5;
        this.dy = 1.5;

        this.currentDir = Pacman.initialDir();
        this.nextDir = Pacman.initialDir();

        this.color = "yellow";
    }

    move() {
        if (this.directionChanged()) {
            this.currentDir = this.nextDir;
        }
        if (this.currentDir.RIGHT) this.moveRight();
        else if (this.currentDir.LEFT) this.moveLeft();
        else if (this.currentDir.UP) this.moveUp();
        else if (this.currentDir.DOWN) this.moveDown();
    }

    moveRight() {
        this.resetDirs();
        this.currentDir.RIGHT = true;
        this.x += this.dx;
    }

    moveLeft() {
        this.resetDirs();
        this.currentDir.LEFT = true;
        this.x -= this.dx;
    }

    moveUp() {
        this.resetDirs();
        this.currentDir.UP = true;
        this.y -= this.dy;
    }

    moveDown() {
        this.resetDirs();
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
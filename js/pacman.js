class Pacman {
    constructor() {
        this.radius = 9;

        const map = new GameMap();
        // pacman starting coordinates
        this.x = 250 + this.radius;
        this.y = 390 + this.radius + 1.5;
        // values for pacman movement on x and y axis
        this.dx = 1.5;
        this.dy = 1.5;

        this.color = "yellow";
    }

    moveRight() {
        this.x += this.dx;
    }

    moveLeft() {
        this.x -= this.dx;
    }

    moveUp() {
        this.y -= this.dy;
    }

    moveDown() {
        this.y += this.dy;
    }

}
class Collider {

    constructor() {
    }

    static pacmanGhostCollision(pacman, ghostsArray) {
        for (let ghost of ghostsArray) {
            if (Collider.circlesCollide(pacman, ghost)) {
                return true;
            }
        }
        return false;
    }

    static circlesCollide(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const dist = circle1.radius + circle2.radius;

        return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(dist, 2);
    }
}
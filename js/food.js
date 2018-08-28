class Food {
    constructor() {
        this.radius = 4;
        this.color = "orange";

    }

    createFoodElements() {
        let elements = [];
        for(let c = 0; c < this.columnCount; c++) {
            elements[c] = [];
            for(let r = 0; r < this.rowCount; r++) {
                elements[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        return elements;
    }

}
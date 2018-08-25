class Food {
    constructor() {
        // food definitions
        this.rowCount = 14;
        this.columnCount = 14;
        this.radius = 4;
        this.padding = 35;
        this.offsetTop = 50;
        this.offsetLeft = 50;
        this.color = "orange";

        this.elements = this.createFoodElements();
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
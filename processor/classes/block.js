const { generateId } = require("../generate_id");
const { Token } = require("./items");

const Block = class {

    constructor () {
        this.id = generateId();
        this.items = [];
    }

    addItem(i) {
        this.items.push(i);
    }

    plainText() {
        return this.items.filter(i => i instanceof Token).map(i => i.chars).join('');
    }

}

module.exports = { Block };
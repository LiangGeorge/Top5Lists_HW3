import jsTPS_Transaction from "../common/jsTPS.js"
export default class ChangeItemName_Transaction extends jsTPS_Transaction {
    constructor(initStore, itemIndex, oldName, newName) {
        super();
        this.store = initStore;
        this.itemIndex = itemIndex;
        this.oldName = oldName;
        this.newName = newName;
    }

    doTransaction() {
        this.store.changeItem(this.itemIndex, this.newName);
    }
    
    undoTransaction() {
        this.store.changeItem(this.itemIndex, this.oldName);
    }
}
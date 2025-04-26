const { randomUUID } = require('crypto')

class TodoId {
    constructor(value) {
        this.value = value || randomUUID();
    }
}
class Todo {
    constructor({id, description, completedAt = null, createdAt = new Date()}) {
        this.id = id;
        this.description = description;
        this.completedAt = completedAt;
        this.createdAt = createdAt;
    }

    complete() {
        this.completedAt = new Date();
    }

    isComplete() {
        return this.completedAt != null;
    }
}

module.exports = Todo;
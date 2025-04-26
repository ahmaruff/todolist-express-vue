class TodoInMemoryRepository {
    constructor() {
        this.todos = [];  // In-memory storage (untuk simulasi)
    }

    async save(todo) {
        this.todos.push(todo);
        return todo;
    }

    async findAll() {
        return this.todos;
    }

    async findById(id) {
        return this.todos.find(todo => todo.id === id);
    }

    async update(updatedTodo) {
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index === -1) throw new Error('Todo not found');
        this.todos[index] = updatedTodo;
        return updatedTodo;
    }

    async delete(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) throw new Error('Todo not found');
        const [deletedTodo] = this.todos.splice(index, 1);
        return deletedTodo;
    }
}

module.exports = TodoInMemoryRepository;

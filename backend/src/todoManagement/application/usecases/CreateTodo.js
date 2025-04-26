const Todo = require('../../domain/entities/Todo')
const TodoId = require('../../domain/valueObjects/TodoId')

class CreateTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    async execute({ description }) {
        const todo = new Todo({
            id: new TodoId().value,
            description: description
        })

        await this.todoRepository.save(todo);

        return todo;
    }
}

module.exports = CreateTodo;
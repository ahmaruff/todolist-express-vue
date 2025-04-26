class CompleteTodo {
    constructor(todoRepository) {
      this.todoRepository = todoRepository;
    }
  
    async execute({ id }) {
      const todo = await this.todoRepository.findById(id);
      if (!todo) {
        throw new Error('Todo not found');
      }
  
      todo.complete();
  
      await this.todoRepository.update(todo);
  
      return todo;
    }
  }
  
  module.exports = CompleteTodo;
  
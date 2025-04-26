class DeleteTodo {
    constructor(todoRepository) {
      this.todoRepository = todoRepository;
    }
  
    async execute({ id }) {
      const todo = await this.todoRepository.findById(id);
      if (!todo) {
        throw new Error('Todo not found');
      }
  
      await this.todoRepository.delete(id);
  
      return { message: 'Todo deleted successfully' };
    }
  }
  
  module.exports = DeleteTodo;
  
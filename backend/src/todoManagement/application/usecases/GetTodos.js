class GetTodos {
    constructor(todoRepository) {
      this.todoRepository = todoRepository;
    }
  
    async execute() {
      const todos = await this.todoRepository.findAll();
      return todos;
    }
  }
  
  module.exports = GetTodos;
  
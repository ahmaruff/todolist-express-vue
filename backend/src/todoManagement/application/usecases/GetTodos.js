class GetTodos {
    constructor(todoRepository) {
      this.todoRepository = todoRepository;
    }
  
    async execute(filters = {}) {
      const todos = await this.todoRepository.findAll();

      let filteredTodos = todos;

      if (filters.search) {
        filteredTodos = filteredTodos.filter(todo => 
          todo.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      

      if (filters.completed !== undefined) {
        const isCompleted = filters.completed === 'true';
        filteredTodos = filteredTodos.filter(todo => {
            if (isCompleted) {
                return todo.completedAt !== null;
            } else {
                return todo.completedAt === null;
            }
        });
      }

      if (filters.start_date || filters.end_date) {
        filteredTodos = filteredTodos.filter(todo => {
            const createdAt = new Date(todo.createdAt);

            let isAfterStart = true;
            let isBeforeEnd = true;

            if (filters.start_date) {
                const startDate = new Date(filters.start_date);
                startDate.setHours(0, 0, 0, 0);
                isAfterStart = createdAt >= startDate;
            }

            if (filters.end_date) {
                const endDate = new Date(filters.end_date);
                endDate.setHours(23, 59, 59, 999);
                isBeforeEnd = createdAt <= endDate;
            }

            return isAfterStart && isBeforeEnd;
        });
      }

      return filteredTodos;
    }
  }
  
  module.exports = GetTodos;
  
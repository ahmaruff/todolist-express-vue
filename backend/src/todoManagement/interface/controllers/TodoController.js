// import usecase
const CreateTodo = require('../../application/usecases/CreateTodo');
const GetTodos = require('../../application/usecases/GetTodos');
const GetSingleTodo = require('../../application/usecases/GetSingleTodo');
const CompleteTodo = require('../../application/usecases/CompleteTodo');
const DeleteTodo = require('../../application/usecases/DeleteTodo');

const responseFormatter = require('../../../shared/utils/responseFormatter');
const STATUS = require('../../../shared/constants/statusCodes');

class TodoController {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
        this.createTodo = new CreateTodo(todoRepository);
        this.getTodos = new GetTodos(todoRepository);
        this.getSingleTodo = new GetSingleTodo(todoRepository);
        this.completeTodo = new CompleteTodo(todoRepository);
        this.deleteTodo = new DeleteTodo(todoRepository);
    }

    async create(req, res) {
        try {
            const todo = await this.createTodo.execute(req.body);
            res.status(201).json(responseFormatter(STATUS.SUCCESS, 201, 'Todo created successfully', {todo : todo}));
        } catch(error) {
            res.status(400).json(responseFormatter(STATUS.FAIL, 400, error.message, null));
        }
    }

    async getAll(req, res) {
        try {
            const filters = {
                search: req.query.search,
                completed: req.query.completed,
                start_date: req.query.start_date,
                end_date: req.query.end_date
            };

            const todos = await this.getTodos.execute(filters);
            res.status(200).json(responseFormatter(STATUS.SUCCESS, 200, 'Todos fetched successfully', {todos : todos}));
        } catch (error) {
            res.status(500).json(responseFormatter(STATUS.ERROR, 500, error.message, null));
        }
    }

    async getSingle(req, res) {
        try {
            const todo = await this.getSingleTodo.execute({id: req.params.id});
            res.status(200).json(responseFormatter(STATUS.SUCCESS, 200, 'Todo fetched successfully', {todo : todo}));
        } catch (error) {
            res.status(404).json(responseFormatter(STATUS.FAIL, 404, 'Todo not found', null));
        }
    }

    async complete(req, res) {
        try {
            const todo = await this.completeTodo.execute({id: req.params.id});
            res.status(200).json(responseFormatter(STATUS.SUCCESS, 200, 'Todo marked as completed', {todo : todo}));
        } catch (error) {
            res.status(404).json(responseFormatter(STATUS.FAIL, 404, 'Todo not found', null));
        }
    }

    async delete(req, res) {
        try {
            const todo = await this.deleteTodo.execute({id : req.params.id});
            res.status(200).json(responseFormatter(STATUS.SUCCESS, 200, 'Todo deleted successfully', null));
        } catch (error) {
            res.status(404).json(responseFormatter(STATUS.FAIL, 404, 'Todo not found', null));
        }
    }
}

module.exports = TodoController;
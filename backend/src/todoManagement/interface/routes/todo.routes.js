const express = require('express');
const router = express.Router();

const TodoInMemoryRepository = require('../../infrastructure/TodoInMemoryRepository');
const TodoController = require('../controllers/TodoController');

// Instantiate the TodoRepository
const todoInMemoryRepository = new TodoInMemoryRepository();
const todoController = new TodoController(todoInMemoryRepository);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - Todos
 *     description: Retrieve all todos, with optional filters
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in todo description
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by completion status (true/false)
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter todos created after this date (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter todos created before this date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: A list of todos
 */
router.get('/', (req, res) => todoController.getAll(req, res));

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Learn Domain-Driven Design"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Bad Request
 */
router.post('/', (req, res) => todoController.create(req, res));

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo found
 *       404:
 *         description: Todo not found
 */
router.get('/:id', (req, res) => todoController.getSingle(req, res));

/**
 * @swagger
 * /todos/{id}/complete:
 *   patch:
 *     summary: Mark a todo as complete
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to complete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo completed
 *       404:
 *         description: Todo not found
 */
router.patch('/:id/complete', (req, res) => todoController.complete(req, res));

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', (req, res) => todoController.delete(req, res));

module.exports = router;

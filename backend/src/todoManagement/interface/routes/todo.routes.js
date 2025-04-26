const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/TodoController');
const todoController = new TodoController();

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: List of all todos
 */
router.get('/todos', (req, res) => todoController.getAll(req, res));

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
router.post('/todos', (req, res) => todoController.create(req, res));

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
router.get('/todos/:id', (req, res) => todoController.getSingle(req, res));

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
router.patch('/todos/:id/complete', (req, res) => todoController.complete(req, res));

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
router.delete('/todos/:id', (req, res) => todoController.delete(req, res));

module.exports = router;

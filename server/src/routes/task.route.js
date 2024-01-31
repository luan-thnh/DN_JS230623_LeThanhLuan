const express = require('express');
const taskController = require('../controllers/task.controller');
const taskRouter = express.Router();

taskRouter.get('/', taskController.getAllTask);
taskRouter.post('/', taskController.createNewTask);
taskRouter.put('/:taskId', taskController.updateTaskById);
taskRouter.delete('/:taskId', taskController.deleteTaskById);

module.exports = taskRouter;

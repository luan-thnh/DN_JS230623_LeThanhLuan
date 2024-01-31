const executeQuery = require('../utils/executeQuery.util');
const { HttpError } = require('../middleware/errorHandler.middleware');
const { MESSAGES } = require('../constants/validate.constant');
const TaskRepository = require('../repositories/task.repositories');
const { TaskRequest } = require('../data/request/task.request');

const taskController = {
  getAllTask: async (req, res, next) => {
    try {
      const tasks = await TaskRepository.findAllTask();

      res.status(200).json({
        message: 'success',
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  },
  createNewTask: async (req, res, next) => {
    try {
      const { title } = req.body;

      const taskReq = new TaskRequest({ title });

      if (!title.trim()) {
        const error = new HttpError(MESSAGES.FIELD_REQUIRED, 400);
        return next(error);
      }

      const newTask = await TaskRepository.createOneTask(taskReq);

      res.status(200).json({
        message: 'success',
        data: newTask,
      });
    } catch (error) {
      next(error);
    }
  },
  updateTaskById: async (req, res, next) => {
    try {
      const { taskId } = req.params;

      if (!taskId) return next(new HttpError(MESSAGES.WRONG_ID, 404));

      const updatedTask = await TaskRepository.findUpdateTaskById({ ...req.body }, taskId);

      if (!updatedTask) return next(new HttpError('Không tìm thấy task cần update', 404));

      res.status(200).json({
        message: 'success',
        data: updatedTask,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteTaskById: async (req, res, next) => {
    try {
      const { taskId } = req.params;

      if (!taskId) return next(new HttpError(MESSAGES.WRONG_ID, 404));

      const task = await TaskRepository.findTaskById(taskId);

      if (!task) return next(new HttpError(MESSAGES.ACCOUNT_DOES_NOT_EXIST, 404));

      await TaskRepository.findRemoveTaskById(taskId);

      res.status(200).json({
        message: `Task (${task.title.toLocaleUpperCase()}) has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = taskController;

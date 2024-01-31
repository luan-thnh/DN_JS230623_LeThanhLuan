const { HttpError } = require('../middleware/errorHandler.middleware');
const tasksRoute = require('./task.route');

const appRouter = (app) => {
  app.use('/api/v1/tasks', tasksRoute);
  app.use('*', (req, res, next) => {
    const error = new HttpError('The route can not be found!', 404);
    next(error);
  });
};

module.exports = appRouter;

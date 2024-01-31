const executeQuery = require('../utils/executeQuery.util');

const TaskRepository = {
  // GET: Get All Task
  findAllTask: async () => {
    const query = `SELECT * FROM tasks`;

    return await executeQuery(query);
  },

  // GET: Get All Task
  findTaskById: async (taskId) => {
    const query = `SELECT * FROM tasks WHERE uid = '${taskId}'`;

    const res = await executeQuery(query);

    return res[0];
  },

  // POST: Create New Task
  createOneTask: async (task) => {
    const query = `INSERT INTO tasks (uid, title) VALUES ('${task.uid}', '${task.title}')`;
    await executeQuery(query);

    return TaskRepository.findTaskById(task.uid);
  },

  // PUT: Update Task By ID
  findUpdateTaskById: async (task, taskId) => {
    const query = `UPDATE tasks SET status = '${task.status}' WHERE uid = '${taskId}'`;
    await executeQuery(query);
    return TaskRepository.findTaskById(taskId);
  },

  // DELETE: Remove Task by ID
  findRemoveTaskById: async (taskId) => {
    const query = `DELETE FROM tasks WHERE uid = '${taskId}'`;

    await executeQuery(query);
  },
};

module.exports = TaskRepository;

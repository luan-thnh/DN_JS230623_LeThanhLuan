const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

class TaskRequest {
  constructor({ title }) {
    this.uid = uuidv4();
    this.title = title;
  }
}

module.exports = { TaskRequest };

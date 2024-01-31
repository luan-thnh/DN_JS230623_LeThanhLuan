import moment from 'moment';
import { ITodo, ITodoResponse } from '../../types/Todo';

export class TodoResponse implements ITodo {
  uid: string;
  title: string;
  status: boolean;
  createdAt: string;

  constructor(todo: ITodoResponse) {
    this.uid = todo.uid;
    this.title = todo.title;
    this.status = todo.status;
    this.createdAt = moment(todo.created_at).format('DD/MM/YYYY');
  }

  getTodo() {
    return {
      uid: this.uid,
      title: this.title,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}

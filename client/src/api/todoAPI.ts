import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from './axiosClient';
import { ITodo, ITodoResponse } from '../types/Todo';
import { TodoResponse } from '../models/response/todoResponse';

const todoAPI = {
  findAll: createAsyncThunk('todo/findAll', async () => {
    const res = await axiosClient.get<ITodoResponse[]>('/tasks');

    const todoRes: ITodo[] = res.data.map((todo: ITodoResponse) => new TodoResponse(todo).getTodo());
    return todoRes;
  }),

  createOneTodo: createAsyncThunk('todo/createOneTodo', async (todo: ITodo) => {
    const res = await axiosClient.post<ITodoResponse>('/tasks', todo);

    return new TodoResponse(res.data).getTodo();
  }),

  findUpdateById: createAsyncThunk('todo/findUpdateById', async (todo: ITodo) => {
    const res = await axiosClient.put(`/tasks/${todo.uid}`, { ...todo, status: todo.status ? 1 : 0 });

    return new TodoResponse(res.data).getTodo();
  }),

  findRemoveById: createAsyncThunk('todo/findRemoveById', async (todoId: string) => {
    await axiosClient.delete(`/tasks/${todoId}`);

    return todoId;
  }),
};

export default todoAPI;

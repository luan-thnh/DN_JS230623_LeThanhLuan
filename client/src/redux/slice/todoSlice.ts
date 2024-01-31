import { createSlice } from '@reduxjs/toolkit';
import todoAPI from '../../api/todoAPI';
import { ITodo, ITodoState } from '../../types/Todo';

const initialState: ITodoState = {
  data: [],
  isLoading: false,
  message: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todoAPI.findAll.fulfilled, (state: ITodoState, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(todoAPI.createOneTodo.fulfilled, (state: ITodoState, { payload }) => {
        state.isLoading = false;

        state.data.push(payload);
      })
      .addCase(todoAPI.findUpdateById.fulfilled, (state: ITodoState, { payload }) => {
        state.isLoading = false;

        const index = state.data.findIndex((todo) => todo.uid === payload.uid);

        state.data.splice(index, 1, payload);
      })
      .addCase(todoAPI.findRemoveById.fulfilled, (state: ITodoState, { payload }) => {
        state.isLoading = false;

        const index = state.data.findIndex((todo) => todo.uid === payload);

        state.data.splice(index, 1);
      });
  },
});

const { actions, reducer } = todoSlice;
export default reducer;

import React, { ChangeEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import { ITodo } from '../../../types/Todo';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import todoAPI from '../../../api/todoAPI';

const AddTodo = () => {
  const dispatch: AppDispatch = useDispatch();
  const [todo, setTodo] = useState<ITodo>({
    uid: uuidv4(),
    title: '',
    status: false,
    createdAt: moment().toISOString(),
  });

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.target.value;
    setTodo((prevTodo) => ({
      ...prevTodo,
      title: value,
    }));
  }, []);

  const handleSubmit = () => {
    dispatch(todoAPI.createOneTodo(todo));

    setTodo({
      uid: uuidv4(),
      title: '',
      status: false,
      createdAt: moment().toISOString(),
    });
  };

  return (
    <StyledAddTodo>
      <h4>Add to the todo list</h4>
      <StyledAddTodoForm>
        <input type="text" onChange={handleChange} value={todo.title} />
        <button onClick={handleSubmit}>Add Item</button>
      </StyledAddTodoForm>
    </StyledAddTodo>
  );
};

const StyledAddTodo = styled.div`
  padding: 32px;

  h4 {
    text-align: start;
    font-weight: 400;
    font-size: 18px;
  }
`;

const StyledAddTodoForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 38px;

  input {
    flex-grow: 1;
    border: none;
    background: #f7f1f1;
    padding: 0 1.5em;
    font-size: initial;
    outline: none;
  }

  button {
    padding: 0 16px;
    border: none;
    background: #ff6666;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin-left: 5px;
    cursor: pointer;
    transition: background 0.2s ease-out;

    &:hover {
      background: #ff5e5e;
    }
  }
`;

export default AddTodo;

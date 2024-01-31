import React, { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { ITodoState } from '../../types/Todo';
import todoAPI from '../../api/todoAPI';

const TodoPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector<RootState, ITodoState>((state) => state.todo);

  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    dispatch(todoAPI.findAll());
  }, []);

  const handleSortTodoDone = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const checked = e.target.checked;

    setIsDone(checked);
  }, []);

  return (
    <StyledTodoContainer>
      <StyledTodoHeader>
        <h4>Todo List</h4>
        <p>Get things done, one item at a time.</p>
      </StyledTodoHeader>
      <TodoList todos={isDone ? [...data].sort((a, b) => a.status - b.status) : data} />
      <StyledSwitch>
        <p>Move done items at the end?</p>
        <Form.Check type="switch" id="custom-switch" onChange={handleSortTodoDone} />
      </StyledSwitch>
      <AddTodo />
    </StyledTodoContainer>
  );
};

const StyledTodoContainer = styled.div`
  background: #ff6666;
  color: #fff;
  box-shadow: -20px -20px 0px 0px rgba(100, 100, 100, 0.1);

  .form-check-input:checked {
    background-color: rgba(255, 255, 255, 0.4);
    border-color: transparent;
  }
`;

const StyledTodoHeader = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  text-align: start;

  h4 {
    font-size: 28px;
    font-weight: 400;
  }

  p {
    color: #edecec;
    padding-bottom: 8px;
    border-bottom: 1px solid #fff;
    font-size: 14px;
  }
`;

const StyledSwitch = styled.div`
  display: flex;
  gap: 8px;
  justify-content: end;
  padding: 32px;
  padding-bottom: 0;
`;

export default TodoPage;

import { FC } from 'react';
import { ITodo } from '../../../types/Todo';
import styled from 'styled-components';
import TodoItem from '../TodoItem';

interface TodoListProps {
  todos: ITodo[];
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <StyledTodoList>
      {todos?.map((todo: ITodo) => (
        <TodoItem key={todo.uid} todo={todo} />
      ))}
    </StyledTodoList>
  );
};

const StyledTodoList = styled.div``;

export default TodoList;

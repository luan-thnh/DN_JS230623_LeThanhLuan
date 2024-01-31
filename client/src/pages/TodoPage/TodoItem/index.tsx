import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { ITodo } from '../../../types/Todo';
import { FaTrash } from 'react-icons/fa';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import todoAPI from '../../../api/todoAPI';

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const dispatch: AppDispatch = useDispatch();
  const [statusTodo, setStatusTodo] = useState<boolean>(todo.status);

  const handleToggleStatusTodo = useCallback(() => {
    setStatusTodo(!statusTodo);

    dispatch(todoAPI.findUpdateById({ ...todo, status: !statusTodo }));
  }, []);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const checked = e.target.checked;
    setStatusTodo(checked);

    dispatch(todoAPI.findUpdateById({ ...todo, status: !statusTodo }));
  }, []);

  const handleRemoveTodo = () => {
    dispatch(todoAPI.findRemoveById(todo.uid));
  };

  return (
    <StyledTodoItem>
      <button onClick={handleToggleStatusTodo} className={`${statusTodo ? 'active' : ''}`}>
        {todo?.title}
      </button>
      <StyledTodoAction>
        <input type="checkbox" checked={statusTodo} onChange={handleChange} />
        <button onClick={handleRemoveTodo} className="trash">
          <FaTrash />
        </button>
      </StyledTodoAction>
    </StyledTodoItem>
  );
};

const StyledTodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.1);
  text-align: start;

  .active {
    text-decoration: line-through;
  }

  input {
    width: 16px;
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
  }

  .trash {
  }
`;

const StyledTodoAction = styled.div`
  display: flex;
  gap: 12px;
`;

export default TodoItem;

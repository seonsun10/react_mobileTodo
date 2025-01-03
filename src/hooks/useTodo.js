import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const useTodo = () => {
  const { today, tomorrow, dispatch } = useContext(TodoContext);

  const addTodo = (text, date) => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        text,
        date,
        id: Date.now(),
        completed: false
      }
    });
  };

  const toggleTodo = (id) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: { id }
    });
  };

  const deleteTodo = (id) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: { id }
    });
  };

  return {
    today,
    tomorrow,
    addTodo,
    toggleTodo,
    deleteTodo
  };
}; 
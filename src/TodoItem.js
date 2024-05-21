import React from 'react';

function TodoItem({ todo, removeTodo, markTodoComplete }) {
  const handleCompleteToggle = () => {
    markTodoComplete(todo.id);
  };

  const handleDelete = () => {
    removeTodo(todo.id);
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCompleteToggle}
      />
      <span>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TodoItem;

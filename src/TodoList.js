import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, removeTodo, markTodoComplete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          markTodoComplete={markTodoComplete}
        />
      ))}
    </ul>
  );
}

export default TodoList;

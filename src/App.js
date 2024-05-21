import React, { useState } from 'react';
import TodoList from './TodoList';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        text: text,
        completed: false,
        id: Math.random(),
      },
    ]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markTodoComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const text = e.target.elements.newTodo.value;
        if (text) {
          addTodo(text);
          e.target.elements.newTodo.value = '';
        }
      }}>
        <input type="text" name="newTodo" placeholder="Add a new todo" />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} removeTodo={removeTodo} markTodoComplete={markTodoComplete} />
    </div>
  );
}

export default App;

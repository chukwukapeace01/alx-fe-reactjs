import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write Tests with Jest', completed: false },
    { id: 3, text: 'Build a Todo App', completed: true },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (text) => {
    if (text.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
          data-testid="todo-input"
        />
        <button type="submit" data-testid="add-todo-btn">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid="todo-item"
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              data-testid={`todo-text-${todo.id}`}
              data-completed={String(todo.completed)}
              style={{ cursor: 'pointer' }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-btn-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
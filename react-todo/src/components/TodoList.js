import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

const initialTodos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Write Tests with Jest', completed: false },
  { id: 3, text: 'Build a Todo App', completed: true },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div data-testid="todo-list-container">
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul data-testid="todo-list">
        {todos.length === 0 ? (
          <p data-testid="empty-message">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </ul>
      <p data-testid="todo-count">
        {todos.filter((t) => !t.completed).length} remaining / {todos.length} total
      </p>
    </div>
  );
};

export default TodoList;
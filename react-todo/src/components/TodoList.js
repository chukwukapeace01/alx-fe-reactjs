import React, { useState } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

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
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div data-testid="todo-list-container" style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul data-testid="todo-list" style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
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
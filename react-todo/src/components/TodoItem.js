import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  return (
    <li data-testid="todo-item">
      <span
        onClick={handleToggle}
        data-testid={`todo-text-${todo.id}`}
        data-completed={String(todo.completed)}
        style={{
          cursor: 'pointer',
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={handleDelete}
        data-testid={`delete-btn-${todo.id}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li
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
  );
}

export default TodoItem;
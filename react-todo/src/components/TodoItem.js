import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      data-testid="todo-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 0',
      }}
    >
      <span
        onClick={() => onToggle(todo.id)}
        style={{ cursor: 'pointer', flexGrow: 1,
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#888' : '#000',
        }}
        data-testid={`todo-text-${todo.id}`}
        data-completed={todo.completed}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        data-testid={`delete-btn-${todo.id}`}
        style={{
          background: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 10px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
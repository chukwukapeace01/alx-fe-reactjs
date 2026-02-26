import React, { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onAdd(inputValue.trim());
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add-todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        data-testid="todo-input"
        style={{
          padding: '8px',
          fontSize: '16px',
          width: '300px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="submit"
        data-testid="add-todo-btn"
        style={{
          marginLeft: '8px',
          padding: '8px 16px',
          fontSize: '16px',
          background: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
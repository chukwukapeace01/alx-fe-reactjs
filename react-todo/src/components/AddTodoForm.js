import React, { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        data-testid="todo-input"
      />
      <button type="submit" data-testid="add-todo-btn">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
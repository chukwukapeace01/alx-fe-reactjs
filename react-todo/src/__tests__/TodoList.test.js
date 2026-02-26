import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders the TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  test('renders initial todo items', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write Tests with Jest')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  });

  test('allows users to add new todo items', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-todo-btn');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('allows users to toggle todo items', () => {
    render(<TodoList />);
    const todoItem = screen.getByTestId('todo-text-1');
    expect(todoItem).toHaveAttribute('data-completed', 'false');
    fireEvent.click(todoItem);
    expect(todoItem).toHaveAttribute('data-completed', 'true');
  });

  test('allows users to delete todo items', () => {
    render(<TodoList />);
    const deleteButton = screen.getByTestId('delete-btn-1');
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
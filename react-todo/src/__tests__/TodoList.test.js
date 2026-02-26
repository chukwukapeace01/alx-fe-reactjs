import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  test('renders initial todo items', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write Tests with Jest')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  });

  test('adds a new todo item', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId('todo-input'), {
      target: { value: 'New Todo Item' },
    });
    fireEvent.click(screen.getByTestId('add-todo-btn'));
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  test('toggles a todo item', () => {
    render(<TodoList />);
    const todoText = screen.getByTestId('todo-text-1');
    expect(todoText).toHaveAttribute('data-completed', 'false');
    fireEvent.click(todoText);
    expect(todoText).toHaveAttribute('data-completed', 'true');
  });

  test('deletes a todo item', () => {
    render(<TodoList />);
    fireEvent.click(screen.getByTestId('delete-btn-1'));
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
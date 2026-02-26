import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {

  // ─── Initial Render Tests ───────────────────────────────────────────────────
  describe('Initial Render', () => {
    test('renders the TodoList heading', () => {
      render(<TodoList />);
      expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('renders the initial 3 demo todos', () => {
      render(<TodoList />);
      const items = screen.getAllByTestId('todo-item');
      expect(items).toHaveLength(3);
    });

    test('renders initial todo texts correctly', () => {
      render(<TodoList />);
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Write Tests with Jest')).toBeInTheDocument();
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    });

    test('renders the add todo form', () => {
      render(<TodoList />);
      expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
      expect(screen.getByTestId('todo-input')).toBeInTheDocument();
      expect(screen.getByTestId('add-todo-btn')).toBeInTheDocument();
    });

    test('shows correct todo count on initial render', () => {
      render(<TodoList />);
      expect(screen.getByTestId('todo-count')).toHaveTextContent('2 remaining / 3 total');
    });
  });

  // ─── Add Todo Tests ──────────────────────────────────────────────────────────
  describe('Adding Todos', () => {
    test('adds a new todo when form is submitted', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      const button = screen.getByTestId('add-todo-btn');

      fireEvent.change(input, { target: { value: 'New Test Todo' } });
      fireEvent.click(button);

      expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    });

    test('clears the input field after adding a todo', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');

      fireEvent.change(input, { target: { value: 'Another Todo' } });
      fireEvent.click(screen.getByTestId('add-todo-btn'));

      expect(input.value).toBe('');
    });

    test('increases the todo count after adding', () => {
      render(<TodoList />);
      fireEvent.change(screen.getByTestId('todo-input'), { target: { value: 'Extra Todo' } });
      fireEvent.click(screen.getByTestId('add-todo-btn'));

      expect(screen.getAllByTestId('todo-item')).toHaveLength(4);
    });

    test('does not add a todo when input is empty', () => {
      render(<TodoList />);
      fireEvent.click(screen.getByTestId('add-todo-btn'));
      expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
    });

    test('does not add a todo when input is only whitespace', () => {
      render(<TodoList />);
      fireEvent.change(screen.getByTestId('todo-input'), { target: { value: '   ' } });
      fireEvent.click(screen.getByTestId('add-todo-btn'));
      expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
    });

    test('adds todo via Enter key (form submit)', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      fireEvent.change(input, { target: { value: 'Keyboard Todo' } });
      fireEvent.submit(screen.getByTestId('add-todo-form'));
      expect(screen.getByText('Keyboard Todo')).toBeInTheDocument();
    });
  });

  // ─── Toggle Todo Tests ───────────────────────────────────────────────────────
  describe('Toggling Todos', () => {
    test('toggles a todo to completed when clicked', () => {
      render(<TodoList />);
      const todoText = screen.getByText('Learn React');
      fireEvent.click(todoText);
      expect(todoText).toHaveStyle('text-decoration: line-through');
    });

    test('toggles a completed todo back to not completed', () => {
      render(<TodoList />);
      // "Build a Todo App" starts as completed
      const todoText = screen.getByText('Build a Todo App');
      expect(todoText).toHaveStyle('text-decoration: line-through');

      fireEvent.click(todoText);
      expect(todoText).toHaveStyle('text-decoration: none');
    });

    test('updates the remaining count after toggling', () => {
      render(<TodoList />);
      fireEvent.click(screen.getByText('Learn React'));
      // Was 2 remaining, now 1
      expect(screen.getByTestId('todo-count')).toHaveTextContent('1 remaining / 3 total');
    });
  });

  // ─── Delete Todo Tests ───────────────────────────────────────────────────────
  describe('Deleting Todos', () => {
    test('removes a todo when delete button is clicked', () => {
      render(<TodoList />);
      const deleteBtn = screen.getByTestId('delete-btn-1');
      fireEvent.click(deleteBtn);
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });

    test('decreases the todo count after deletion', () => {
      render(<TodoList />);
      fireEvent.click(screen.getByTestId('delete-btn-1'));
      expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
    });

    test('shows empty message when all todos are deleted', () => {
      render(<TodoList />);
      fireEvent.click(screen.getByTestId('delete-btn-1'));
      fireEvent.click(screen.getByTestId('delete-btn-2'));
      fireEvent.click(screen.getByTestId('delete-btn-3'));
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    });

    test('only removes the targeted todo, not others', () => {
      render(<TodoList />);
      fireEvent.click(screen.getByTestId('delete-btn-1'));
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      expect(screen.getByText('Write Tests with Jest')).toBeInTheDocument();
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    });
  });
});
import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);

const mockFetchTodoList = jest.fn();

const todo = {
  _id: '1',
  status: false,
  desc: 'Test Task'
};

describe('Item Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockFetchTodoList.mockClear();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Item todos={todo} fetchTodoList={mockFetchTodoList} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('handles delete and update actions', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Item todos={todo} fetchTodoList={mockFetchTodoList} />, div);

    const deleteButton = div.querySelector('button[class="material-symbols-outlined"]');
    deleteButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockFetchTodoList).toHaveBeenCalledTimes(1);

    const todoButton = div.querySelector('button');
    todoButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockFetchTodoList).toHaveBeenCalledTimes(2);

    ReactDOM.unmountComponentAtNode(div);
  });
});

// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Item from './Item';

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(),
//   })
// );

// const mockFetchTodoList = jest.fn();

// const todo = {
//   _id: '1',
//   status: false,
//   desc: 'Test Task'
// };

// describe('Item Component', () => {
//   beforeEach(() => {
//     fetch.mockClear();
//     mockFetchTodoList.mockClear();
//   });

//   test('renders Item component', () => {
//     render(<Item todos={todo} fetchTodoList={mockFetchTodoList} />);
//     const descElement = screen.getByText(/Test Task/i);
//     const buttonElement = screen.getByText(/TODO/i);
//     const deleteButton = screen.getByText(/Delete/i);
//     expect(descElement).toBeInTheDocument();
//     expect(buttonElement).toBeInTheDocument();
//     expect(deleteButton).toBeInTheDocument();
//   });

//   test('handles delete and update actions', async () => {
//     render(<Item todos={todo} fetchTodoList={mockFetchTodoList} />);
    
//     const deleteButton = screen.getByText(/Delete/i);
//     fireEvent.click(deleteButton);
//     await waitFor(() => expect(mockFetchTodoList).toHaveBeenCalledTimes(1));
    
//     const todoButton = screen.getByText(/TODO/i);
//     fireEvent.click(todoButton);
//     await waitFor(() => expect(mockFetchTodoList).toHaveBeenCalledTimes(2));
//   });
// });

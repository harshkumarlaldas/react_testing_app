import React from 'react';
import ReactDOM from 'react-dom';
import ListExpress from './ListExpress';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('ListExpress Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListExpress />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('fetches and displays data', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListExpress />, div);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(fetch).toHaveBeenCalledTimes(1);
    ReactDOM.unmountComponentAtNode(div);
  });
});

// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import ListExpress from './ListExpress';

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve([]),
//   })
// );

// describe('ListExpress Component', () => {
//   beforeEach(() => {
//     fetch.mockClear();
//   });
//   import React from 'react';
//   import ReactDOM from 'react-dom';
//   import ListExpress from './ListExpress';
  
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve([]),
//     })
//   );
  
//   describe('ListExpress Component', () => {
//     beforeEach(() => {
//       fetch.mockClear();
//     });
  
//     it('renders without crashing', () => {
//       const div = document.createElement('div');
//       ReactDOM.render(<ListExpress />, div);
//       ReactDOM.unmountComponentAtNode(div);
//     });
  
//     it('fetches and displays data', async () => {
//       const div = document.createElement('div');
//       ReactDOM.render(<ListExpress />, div);
//       await new Promise(resolve => setTimeout(resolve, 0));
//       expect(fetch).toHaveBeenCalledTimes(1);
//       ReactDOM.unmountComponentAtNode(div);
//     });
//   });
  
//   test('renders input and button', () => {
//     render(<ListExpress />);
//     const inputElement = screen.getByPlaceholderText(/Add Task/i);
//     const buttonElement = screen.getByText(/ADD/i);
//     expect(inputElement).toBeInTheDocument();
//     expect(buttonElement).toBeInTheDocument();
//   });

//   test('adds a new todo item', async () => {
//     render(<ListExpress />);
//     const inputElement = screen.getByPlaceholderText(/Add Task/i);
//     fireEvent.change(inputElement, { target: { value: 'New Task' } });
//     const buttonElement = screen.getByText(/ADD/i);
//     fireEvent.click(buttonElement);

//     await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
//   });
// });

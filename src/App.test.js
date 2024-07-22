// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import App from './App';

// jest.mock('./App', () => ({
//   __esModule: true,
//   default: jest.fn(() => 'MockedComponent')
// }));

// describe('App Component', () => {
//   test('renders ListExpress component', () => {
//     render(<App />);
//     expect(screen.getByText('MockedComponent')).toBeInTheDocument();
//   });
// });
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

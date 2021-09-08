import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome to FE interview', () => {
  render(<App />);
  const welcome = screen.getByText(
    /Welcome to the Alteryx Frontend Interview/i
  );
  expect(welcome).toBeInTheDocument();
});

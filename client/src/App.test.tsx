import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './context/ThemeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const renderApp = (initialPath = '/login') =>
  render(
    <GoogleOAuthProvider clientId="">
      <ThemeProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[initialPath]}>
            <App />
          </MemoryRouter>
        </Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );

beforeEach(() => {
  localStorage.clear();
});

test('renders login page for unauthenticated user at /login', () => {
  renderApp('/login');
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test('renders register page for unauthenticated user at /register', () => {
  renderApp('/register');
  expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
});

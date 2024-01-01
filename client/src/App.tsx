import React from 'react';
import { useTheme } from './context/ThemeProvider';
import { Routes, Route, useLocation } from 'react-router-dom';
import Admin from './pages/AdminPage';
import Home from './pages/HomePage';
import ProductId from './components/Products/productById';
import Login from './pages/Login';
import ProductForm from './components/Admin/ProductForm';
import NotUserFound from './pages/NotUserFound';
import Payment from './components/Products/Payment';
import UsersHistory from './components/Admin/UsersHistory';
import LoginPage from './pages/LoginPage';
import './styles/App.scss';

export default function App() {
  const { theme } = useTheme();
  const userToken = localStorage.getItem('token');
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin');

  type RouteType = {
    path: string;
    element: JSX.Element;
  };

  const loginRoutes: RouteType[] = [
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <Login /> },
  ];

  const notLoggedUserRoutes: RouteType[] = [
    { path: '/', element: <Home /> },
    { path: '/', element: <Home /> },
    { path: '*', element: <Home /> },
    { path: '/product/:id', element: <ProductId /> },
    { path: '/notUserFound', element: <NotUserFound /> },
  ];

  const loggedUserRoutes: RouteType[] = [
    { path: '/', element: <Home /> },
    { path: '/product/:id', element: <ProductId /> },
    { path: '/payment', element: <Payment /> },
    { path: '/history', element: <UsersHistory /> },
    { path: '/payment', element: <Payment /> },
  ];

  const adminRoutes: RouteType[] = [
    { path: '/admin', element: <Admin /> },
    { path: '/admin/:id/editing', element: <ProductForm /> },
    { path: '/admin/users', element: <UsersHistory /> },
  ];

  return (
    <div className={theme === 'light' ? 'Principal' : 'Principal-Dark'}>
      {userToken ? (
        isAdmin ? (
          <Routes>
            {adminRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        ) : (
          <Routes>
            {loggedUserRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        )
      ) : (
        <Routes>
          {location.pathname === '/login' || location.pathname === '/register'
            ? loginRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))
            : notLoggedUserRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
        </Routes>
      )}
    </div>
  );
}

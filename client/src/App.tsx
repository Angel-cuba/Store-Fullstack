import React from 'react';
import { useTheme } from './context/ThemeProvider';
import { Routes, Route, useLocation } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import ProductId from './components/Products/productById';
import Login from './pages/Login';
import ProductForm from './components/Admin/ProductForm';
import NotUserFound from './pages/NotUserFound';
import Payment from './components/Products/Payment';
import UsersHistory from './components/Admin/UsersHistory';
import './styles/App.scss';

export default function App() {
  const { theme } = useTheme();
  const userToken = localStorage.getItem('token');
  const location = useLocation();

  return (
    <div className={theme === 'light' ? 'Principal' : 'Principal-Dark'}>
      <Routes>
        <Route path="/" element={!userToken ? <Login /> : <Home />} />

        <Route path="/admin" element={<Admin />} />
        {/* <Route path="newproduct" element={<ProductForm />} /> */}
        <Route path="admin/:id/editing" element={<ProductForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/#/login" element={<Login />} />

        <Route path="/product/:productId" element={<ProductId />} />
        <Route path="/history" element={<UsersHistory />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/notfound" element={<NotUserFound />} />
        <Route
          path={location.pathname === '/home' && !userToken ? '/home' : '/login'}
          element={<Login />}
        />

        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

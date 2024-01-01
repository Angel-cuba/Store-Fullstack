import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ProductsView from '../components/Products/productsView';
import { fetchAllProducts } from '../redux/actions/products.action';
import '../styles/pages/Home.scss';
import Navbar from '../components/Navbar';
import { useLocation, useNavigate } from 'react-router';

const Home = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const userToken = localStorage.getItem('token');
  const navigate = useNavigate();

const hashCondition = location.hash === '#login' || location.hash === '#register' || location.hash === '#' || location.hash === '/login' || location.hash === '/register' || location.hash === '/';

  useEffect(() => {
    document.title = 'Home';
    if (userToken) {
      if (hashCondition) {
        navigate('/');
      }
    }
    // verifyTokenExpiration(userToken, navigate);
    dispatch(fetchAllProducts());
  }, [dispatch, navigate, userToken, hashCondition]);

  return (
    <div className="home">
      <Navbar />
      <ProductsView />
    </div>
  );
};

export default Home;

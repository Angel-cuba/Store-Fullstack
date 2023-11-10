import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/Loading.scss';
import { AppState } from '../types/ProductType';
import { handleToast } from '../util/helpers';

const Loading = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //Cart history
  const { inCart }: any = useSelector((state: AppState) => state.cart);
  React.useEffect(() => {
    const token = localStorage.getItem('token') as string;
    const goBack = () => {
      navigate('/login');
    };
    setTimeout(() => {
      if (!token) {
        handleToast('Redirect');
        goBack();
      }
    }, 1000);
  }, [navigate, location]);

  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        {location.pathname === '/history' ? (
          <h1>
            Waiting for users details, <br /> this might take a few seconds...
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
        {location.pathname === '/history' && inCart?.length > 0 ? (
          <h1>Waiting for user purchase</h1>
        ) : null}
      </div>
      <div className="loading-spinner-circle"></div>
      <div className="loading-spinner-line"></div>
      <Toaster />
    </div>
  );
};

export default Loading;

export const styles = {
  loading: {
    height: '100vh',
    color: '#dd0e0e',
  },
};

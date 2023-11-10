import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/actions/user.actions';
import '../styles/components/Navbar.scss';
import { AppState } from '../types/ProductType';
import Loading from './Loading';
import Cart from './Products/Cart';
import { ToggleTheme } from './ToggleTheme';
import UserHistory from './User/History';

const Navbar = () => {
  const { user }: any = useSelector((state: AppState) => state.user);
  const userToken = localStorage.getItem('token');
  const dispatch = useDispatch<any>();

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    navigate('/login');
  };

  React.useEffect(() => {
    dispatch(signInSuccess());
  }, [dispatch]);

  if (!user) {
    return <Loading />;
  }
  if (!userToken) {
    navigate('/login');
  }
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Logo</h1>
        </div>
        <div className="navbar-menu">
          <ToggleTheme />
          <ul>
            {!userToken && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            <li>
              <Link to="/">Home</Link>
            </li>
            {user && user.role === 'ADMIN' && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li onClick={logoutUser}>
              <Link to="/login">Logout</Link>
            </li>

            <li></li>
          </ul>
          <Cart />
        </div>
      </div>
      <UserHistory />
    </div>
  );
};

export default Navbar;

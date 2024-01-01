import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/actions/user.actions';
import '../styles/components/Navbar.scss';
import Cart from './Products/Cart';
import { ToggleTheme } from './ToggleTheme';
import UserHistory from './User/History';
import { useSelector } from 'react-redux';
import { AppState } from '../types/ProductType';

const Navbar = () => {
  //:TODO: Fix this user data request
  const { user }: any = useSelector((state: AppState) => state.user);
  console.log("🚀 ~ file: Navbar.tsx:15 ~ Navbar ~ user:", user)
  const userToken: string | null = localStorage.getItem('token');
  const userRole: string | null = localStorage.getItem('userRole');
  const dispatch = useDispatch<any>();

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    navigate('/login');
  };

  React.useEffect(() => {
    dispatch(signInSuccess());
  }, [dispatch]);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Logo</h1>
        </div>
        <div className="navbar-menu">
          <ToggleTheme />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {userToken && userRole?.includes('ADMIN') ? (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            ) : null}
            {!userToken ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <li onClick={logoutUser}>
                <Link to="/">Logout</Link>
              </li>
            )}

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

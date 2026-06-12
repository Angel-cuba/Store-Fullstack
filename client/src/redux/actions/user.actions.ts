import { Dispatch } from 'redux';
import { verifyToken } from '../../api/token';
import { LOGIN_USER, LOGOUT_USER } from '../../types/UserActions';
import { CLEAR_CART } from '../../types/CartActions';

export const signInSuccess = () => async (dispatch: Dispatch) => {
  try {
    const data = await verifyToken();
    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
  } catch {
    // token absent or invalid — stay logged out
  }
};

export const logOut = () => async (dispatch: Dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('store_cart');
  dispatch({ type: LOGOUT_USER });
  dispatch({ type: CLEAR_CART });
};

import { Dispatch } from 'redux';
import { verifyToken } from '../../api/token';
import { LOGIN_USER, LOGOUT_USER } from '../../types/UserActions';

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
  dispatch({ type: LOGOUT_USER });
};

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
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => async (dispatch: Dispatch) => {
  try {
    localStorage.removeItem('token');
    dispatch({
      type: LOGOUT_USER,
    });
  } catch (error) {
    console.log(error);
  }
};

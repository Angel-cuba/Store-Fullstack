import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { handleToast, BASE_URL } from '../util/helpers';

export const loginRequest = async (
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/signin`, { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userRole', JSON.stringify(res.data.role));
    localStorage.setItem('userName', JSON.stringify(res.data.name));
    navigate('/');
  } catch (error: unknown) {
    const code = (error as { code?: string }).code;
    if (code === 'ERR_NETWORK') {
      handleToast('Network error');
    } else {
      handleToast('Error');
    }
  }
};

export const registerRequest = async (
  data: { name: string; lastname: string; email: string; password: string },
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/signup`, data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userRole', JSON.stringify(res.data.user.role));
    localStorage.setItem('userName', JSON.stringify(res.data.user.name));
    navigate('/');
  } catch (error: unknown) {
    const code = (error as { code?: string }).code;
    if (code === 'ERR_NETWORK') {
      handleToast('Network error');
    } else {
      handleToast('Error');
    }
  }
};

export const googleSignInRequest = async (
  credential: string,
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/google-signin`, { id_token: credential });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userRole', JSON.stringify(res.data.role));
    localStorage.setItem('userName', JSON.stringify(res.data.name));
    navigate('/');
  } catch (error: unknown) {
    handleToast('Error');
  }
};

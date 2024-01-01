import axios from 'axios';
// import { signInSuccess } from '../redux/actions/user.actions';
import { handleToast, BASE_URL } from '../util/helpers';

export const loginRequest = async (
  email: string,
  password: string,
  navigate: any
) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/signin`, {
      email,
      password,
    });
    localStorage.setItem('token', res.data.token); //save token to local storage
    localStorage.setItem('userRole', JSON.stringify(res.data.role)); //save user to local storage
    localStorage.setItem('userName', JSON.stringify(res.data.name)); //save user to local storage
    navigate('/home');
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      handleToast('Network error');
    } else {
      handleToast('Error');
    }
    console.log('error: ', error.code);
  }
};

import axios from 'axios';
import { signInSuccess } from '../redux/actions/user.actions';
import { handleToast } from '../util/helpers';

//Login with google
export const handleGoogleResponse = async (response: any, dispatch: any, navigate: any) => {
  console.log('response from google: ', response);
  const idToken = response.credential;

  try {
    const res = await axios.post(
      'http://localhost:3001/users/signin-google',
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    localStorage.setItem('token', res.data.token); //save token to local storage
    navigate('/home');
    dispatch(signInSuccess());
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      handleToast('Network error');
    } else {
      handleToast('Error');
    }

    console.log('error: ', error.code);
  }
};

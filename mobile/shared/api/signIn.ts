import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';
import { decodeJwtPayload } from '../utils/tokenExpired';
import { BASE_URL } from './config';
import { LOGIN_USER } from '../types/UserActions';
import type { DataOfUser } from '../types/types';
import type { AppDispatch } from '../redux/store';

type MobileRouter = { replace: (path: string) => void };

function userFromToken(token: string, fallback: Partial<DataOfUser> = {}): DataOfUser {
  const payload = decodeJwtPayload(token) ?? {};
  return {
    id: (payload.id as string) ?? fallback.id ?? '',
    email: (payload.email as string) ?? fallback.email ?? '',
    role: (payload.role as string) ?? fallback.role ?? 'USER',
    picture: (payload.picture as string) ?? fallback.picture ?? '',
  };
}

export const loginRequest = async (
  email: string,
  password: string,
  router: MobileRouter,
  dispatch: AppDispatch
) => {
  const res = await axios.post(`${BASE_URL}/users/signin`, { email, password });
  await tokenStorage.setToken(res.data.token);
  await tokenStorage.setUserRole(res.data.role);
  await tokenStorage.setUserName(res.data.name);
  dispatch({ type: LOGIN_USER, payload: userFromToken(res.data.token) });
  router.replace('/(tabs)');
};

export const registerRequest = async (
  data: { name: string; lastname: string; email: string; password: string },
  router: MobileRouter,
  dispatch: AppDispatch
) => {
  const res = await axios.post(`${BASE_URL}/users/signup`, data);
  await tokenStorage.setToken(res.data.token);
  await tokenStorage.setUserRole(res.data.user.role);
  await tokenStorage.setUserName(res.data.user.name);
  dispatch({
    type: LOGIN_USER,
    payload: userFromToken(res.data.token, { email: data.email, role: res.data.user.role }),
  });
  router.replace('/(tabs)');
};

// Sends a Google ID token to the backend (passport-google-id-token verifies it)
export const googleSignInRequest = async (
  idToken: string,
  router: MobileRouter,
  dispatch: AppDispatch
) => {
  // passport-google-id-token reads from req.body.access_token
  const res = await axios.post(`${BASE_URL}/users/google-signin`, { access_token: idToken });
  await tokenStorage.setToken(res.data.token);
  await tokenStorage.setUserRole(res.data.role);
  await tokenStorage.setUserName(res.data.name);
  dispatch({ type: LOGIN_USER, payload: userFromToken(res.data.token) });
  router.replace('/(tabs)');
};

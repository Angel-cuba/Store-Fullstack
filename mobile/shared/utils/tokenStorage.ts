import * as SecureStore from 'expo-secure-store';
import { verifyTokenExpiration } from './tokenExpired';

export const tokenStorage = {
  setToken: (token: string) => SecureStore.setItemAsync('token', token),
  getToken: () => SecureStore.getItemAsync('token'),
  removeToken: () => SecureStore.deleteItemAsync('token'),
  setUserRole: (role: string) => SecureStore.setItemAsync('userRole', role),
  getUserRole: () => SecureStore.getItemAsync('userRole'),
  setUserName: (name: string) => SecureStore.setItemAsync('userName', name),
  getUserName: () => SecureStore.getItemAsync('userName'),
  clearSession: () =>
    Promise.all([
      SecureStore.deleteItemAsync('token'),
      SecureStore.deleteItemAsync('userRole'),
      SecureStore.deleteItemAsync('userName'),
    ]),
};

export class SessionExpiredError extends Error {
  constructor() {
    super('Session expired');
    this.name = 'SessionExpiredError';
  }
}

export async function getVerifiedToken(): Promise<string> {
  const token = await tokenStorage.getToken();
  if (!token) throw new SessionExpiredError();
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) throw new SessionExpiredError();
  return token;
}

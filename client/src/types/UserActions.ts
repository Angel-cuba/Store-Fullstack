import { DataOfUser } from './types';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export type LoginUser = {
  type: typeof LOGIN_USER;
  payload: DataOfUser;
};

export type LogoutUser = {
  type: typeof LOGOUT_USER;
  payload: null;
};

export type UserActions = LoginUser | LogoutUser;

//Initial state for user
export type UserState = {
  user: DataOfUser | null;
};

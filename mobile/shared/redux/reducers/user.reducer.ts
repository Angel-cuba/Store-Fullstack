import type { UnknownAction } from 'redux';
import { LOGIN_USER, LOGOUT_USER, UserState } from '../../types/UserActions';
import type { DataOfUser } from '../../types/types';

export const userInitialState: UserState = { user: null };

export default function userReducer(state = userInitialState, action: UnknownAction): UserState {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload as DataOfUser };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

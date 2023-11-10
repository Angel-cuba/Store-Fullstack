import { LOGIN_USER, LOGOUT_USER, UserActions } from '../../types/UserActions';
import { UserState } from '../../types/UserActions';

export const userInitialState: UserState = {
  user: null,
};

export default function authReducer(state = userInitialState, action: UserActions) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

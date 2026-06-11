import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { tokenStorage } from '../shared/utils/tokenStorage';
import { LOGOUT_USER } from '../shared/types/UserActions';
import type { AppState, AppDispatch } from '../shared/redux/store';

export function useAuth() {
  const user = useSelector((s: AppState) => s.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const logout = async () => {
    await tokenStorage.clearSession();
    dispatch({ type: LOGOUT_USER, payload: null });
    router.replace('/(auth)/login');
  };

  return { user, isAuthenticated: user !== null, logout };
}

import jwtDecode, { JwtPayload } from 'jwt-decode';
import { handleToast } from './helpers';

function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
}

export const verifyTokenExpiration = (token: string) => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const isExpired = (decoded.exp as number) * 1000 < Date.now();
    if (isExpired) {
      clearSession();
      handleToast('Redirect');
      window.location.replace('/login');
      return { isVerified: false, decodedUser: null };
    }
    return { isVerified: true, decodedUser: decoded };
  } catch {
    clearSession();
    return { isVerified: false, decodedUser: null };
  }
};

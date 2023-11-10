import jwtDecode, { JwtPayload } from 'jwt-decode';
import history from './history';

export const verifyTokenExpiration = async (token: string) => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const isExpired = (decoded.exp as any) * 1000 < new Date().getTime();
    if (isExpired) {
      localStorage.removeItem('token');
      //  if(history.location.pathname === '/login'){
      // }
      history.push('/login');
      return { isVerified: false, decodedUser: null };
    }
    return { isVerified: true, decodedUser: decoded };
  } catch (error) {
    return { isVerified: false, decodedUser: null };
  }
};

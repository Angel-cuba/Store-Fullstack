import { tokenStorage } from './tokenStorage';

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '=='.slice(0, (4 - (base64.length % 4)) % 4);
    const decoded = Buffer.from(padded, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export const verifyTokenExpiration = async (token: string) => {
  const decoded = decodeJwtPayload(token);
  if (!decoded) {
    await tokenStorage.clearSession();
    return { isVerified: false, decodedUser: null };
  }
  const isExpired = (decoded.exp as number) * 1000 < Date.now();
  if (isExpired) {
    await tokenStorage.clearSession();
    return { isVerified: false, decodedUser: null };
  }
  return { isVerified: true, decodedUser: decoded };
};

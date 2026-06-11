import axios from 'axios';
import { BASE_URL } from '../util/helpers';
import { verifyTokenExpiration } from '../util/tokenExpired';

type OrderPayload = { products: string[]; shippingAddress?: string };

function getVerifiedToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const { isVerified } = verifyTokenExpiration(token);
  return isVerified ? token : null;
}

export const createPaymentIntent = async (amount: number): Promise<{ clientSecret: string } | undefined> => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.post(
    `${BASE_URL}/orders/payment-intent`,
    { amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const sendOrder = async (order: OrderPayload) => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.post(`${BASE_URL}/orders/create`, order, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const orderHistory = async () => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.get(`${BASE_URL}/orders/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

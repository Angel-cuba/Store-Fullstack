import axios from 'axios';
import { getVerifiedToken } from '../utils/tokenStorage';
import { BASE_URL } from './config';

type OrderPayload = { products: string[]; shippingAddress?: string };

export const createPaymentIntent = async (amount: number): Promise<{ clientSecret: string }> => {
  const token = await getVerifiedToken();
  const response = await axios.post(
    `${BASE_URL}/orders/payment-intent`,
    { amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const sendOrder = async (order: OrderPayload) => {
  const token = await getVerifiedToken();
  const response = await axios.post(`${BASE_URL}/orders/create`, order, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const orderHistory = async () => {
  const token = await getVerifiedToken();
  const response = await axios.get(`${BASE_URL}/orders/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

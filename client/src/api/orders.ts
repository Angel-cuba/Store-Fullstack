import { BASE_URL } from '../util/helpers';
import axios from 'axios';
import { verifyTokenExpiration } from '../util/tokenExpired';

export const sendOrder = async (order: any) => {
  let token = localStorage.getItem('token') as any;
  //Check if token is valid
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;

  //Otherwise continue with this request
  const response = await axios.post(`${BASE_URL}/orders/create`, order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const orderHistory = async () => {
  let token = localStorage.getItem('token') as any;
  //Check if token is valid
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;

  //Otherwise continue with this request
  const response = await axios.get(`${BASE_URL}/orders/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('response', response.data);
  return response.data;
};

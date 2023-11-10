import axios from 'axios';
import { BASE_URL } from '../util/helpers';
import { verifyTokenExpiration } from '../util/tokenExpired';

export const getAllUsers = async (email: any) => {
  const token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  return await axios.get(`${BASE_URL}/admin/allusers`, {
    headers: {
      user: `${email}`,
    },
  });
};

export const getAllHistory = async (email: any) => {
  const token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  const response = await axios.get(`${BASE_URL}/admin/allhistories`, {
    headers: {
      user: `${email}`,
    },
  });
  return response.data;
};

export const getAnUser = async (id: string) => {
  const token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  const response = await axios.get(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export const updateAnUser = async (id: string, data: any) => {
  const token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  const response = await axios.put(`${BASE_URL}/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

import axios from 'axios';
import { IUser } from '../types/types';
import { BASE_URL } from '../util/helpers';
import { verifyTokenExpiration } from '../util/tokenExpired';

function getVerifiedToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const { isVerified } = verifyTokenExpiration(token);
  return isVerified ? token : null;
}

export const getAllUsers = async () => {
  const token = getVerifiedToken();
  if (!token) return;
  return await axios.get(`${BASE_URL}/admin/allusers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllHistory = async () => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.get(`${BASE_URL}/admin/allhistories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAnUser = async (id: string) => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.get(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateAnUser = async (id: string, data: Partial<IUser>) => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.put(`${BASE_URL}/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

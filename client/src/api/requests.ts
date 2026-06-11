import axios from 'axios';
import { IProducts } from '../types/types';
import { BASE_URL } from '../util/helpers';
import { verifyTokenExpiration } from '../util/tokenExpired';

function getVerifiedToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const { isVerified } = verifyTokenExpiration(token);
  return isVerified ? token : null;
}

export const AllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products/all`);
  return response.data;
};

export const ProductById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const NewProduct = async (product: IProducts) => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.post(`${BASE_URL}/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const EditingProduct = async (id: string, product: IProducts) => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.put(`${BASE_URL}/products/${id}`, product, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const DeletingProduct = async (id: string) => {
  const token = getVerifiedToken();
  if (!token) return;
  const response = await axios.delete(`${BASE_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

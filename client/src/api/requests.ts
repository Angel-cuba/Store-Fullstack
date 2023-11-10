import axios from 'axios';

import { IProducts } from '../types/types';
import { BASE_URL } from '../util/helpers';
import { verifyTokenExpiration } from '../util/tokenExpired';

export const AllProducts = async () => {
  const token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  const response = await axios.get(`${BASE_URL}/products/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const ProductById = async (id: string) => {
  let token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  const response = await axios.get(`${BASE_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const NewProduct = async (product: IProducts, email: any) => {
  let token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  const response = await axios.post(`${BASE_URL}/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
      user: `${email}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export const EditingProduct = async (id: string, product: IProducts, email: any) => {
  const token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  console.log(id, product);
  const response = await axios.put(`${BASE_URL}/products/${id}`, product, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      user: `${email}`,
    },
  });

  console.log(response.data);
  return response.data;
};

export const DeletingProduct = async (id: string, email: any) => {
  const token = localStorage.getItem('token') as any;
  const { isVerified } = await verifyTokenExpiration(token);
  if (!isVerified) return;
  //Continue here if token is verified
  const response = await axios.delete(`${BASE_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      user: `${email}`,
    },
  });
  console.log(response.data);
  return response.data;
};

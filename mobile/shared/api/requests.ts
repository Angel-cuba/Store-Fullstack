import axios from 'axios';
import { IProducts } from '../types/types';
import { getVerifiedToken } from '../utils/tokenStorage';
import { BASE_URL } from './config';

export type PaginatedProducts = {
  data: IProducts[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const AllProducts = async (page = 1, limit = 10): Promise<PaginatedProducts> => {
  const response = await axios.get(`${BASE_URL}/products/all`, { params: { page, limit } });
  return response.data;
};

export const SearchProducts = async (name: string): Promise<IProducts[]> => {
  const response = await axios.get(`${BASE_URL}/products/search`, { params: { name } });
  return response.data;
};

export const ProductById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const NewProduct = async (product: IProducts) => {
  const token = await getVerifiedToken();
  const response = await axios.post(`${BASE_URL}/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const EditingProduct = async (id: string, product: IProducts) => {
  const token = await getVerifiedToken();
  const response = await axios.put(`${BASE_URL}/products/${id}`, product, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const DeletingProduct = async (id: string) => {
  const token = await getVerifiedToken();
  const response = await axios.delete(`${BASE_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

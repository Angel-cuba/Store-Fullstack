import { Dispatch } from 'redux';
import {
  AllProducts,
  DeletingProduct,
  EditingProduct,
  NewProduct,
  ProductById,
} from '../../api/requests';
import {
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  NEW_PRODUCT,
  PRODUCTS,
  PRODUCT_BY_ID,
  START_LOADING,
  STOP_LOADING,
} from '../../types/ProductType';
import { IProducts } from '../../types/types';

export const fetchAllProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await AllProducts();
    dispatch({ type: PRODUCTS, payload: response });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductById = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await ProductById(id);
    dispatch({ type: PRODUCT_BY_ID, payload: response });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewProduct = (product: IProducts) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await NewProduct(product);
    dispatch({ type: NEW_PRODUCT, payload: response });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const fetchEditProduct =
  (id: string, product: IProducts) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const response = await EditingProduct(id, product);
      dispatch({ type: EDIT_PRODUCT, payload: response });
      dispatch({ type: STOP_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const fetchDeleteProduct = (id: string) => async (dispatch: Dispatch) => {
  try {
    await DeletingProduct(id);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (error) {
    console.log(error);
  }
};

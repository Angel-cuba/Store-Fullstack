import type { UnknownAction } from 'redux';
import {
  PRODUCTS,
  PRODUCT_BY_ID,
  NEW_PRODUCT,
  ProductsState,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  START_LOADING,
  STOP_LOADING,
} from '../../types/ProductType';
import type { IProducts } from '../../types/types';

export const productsInitialState: ProductsState = {
  loading: true,
  allProducts: [],
  product: null,
};

export default function productsReducer(
  state = productsInitialState,
  action: UnknownAction
): ProductsState {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case PRODUCTS:
      return { ...state, allProducts: action.payload as IProducts[] };
    case PRODUCT_BY_ID:
      return { ...state, product: action.payload as IProducts };
    case NEW_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, action.payload as IProducts] };
    case EDIT_PRODUCT: {
      const updated = action.payload as IProducts;
      return {
        ...state,
        allProducts: state.allProducts.map((p) => (p._id === updated._id ? updated : p)),
      };
    }
    case DELETE_PRODUCT: {
      const deleted = action.payload as IProducts;
      return {
        ...state,
        allProducts: state.allProducts.filter((p) => p._id !== deleted._id),
      };
    }
    default:
      return state;
  }
}

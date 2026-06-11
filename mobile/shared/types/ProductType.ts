import { CartState } from './CartActions';
import { IProducts } from './types';
import { UserState } from './UserActions';

export const PRODUCTS = 'FETCH_PRODUCTS';
export const PRODUCT_BY_ID = 'FETCH_PRODUCT_BY_ID';
export const NEW_PRODUCT = 'FETCH_NEW_PRODUCT';
export const EDIT_PRODUCT = 'FETCH_EDIT_PRODUCT';
export const DELETE_PRODUCT = 'FETCH_DELETE_PRODUCT';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export type StartLoadingAction = { type: typeof START_LOADING };
export type StopLoadingAction = { type: typeof STOP_LOADING };
export type ProductsAction = { type: typeof PRODUCTS; payload: IProducts[] };
export type ProductByIdAction = { type: typeof PRODUCT_BY_ID; payload: IProducts };
export type NewProductAction = { type: typeof NEW_PRODUCT; payload: IProducts };
export type EditProductAction = { type: typeof EDIT_PRODUCT; payload: IProducts };
export type DeleteProductAction = { type: typeof DELETE_PRODUCT; payload: IProducts };

export type ProductsActions =
  | ProductsAction
  | ProductByIdAction
  | NewProductAction
  | EditProductAction
  | DeleteProductAction
  | StartLoadingAction
  | StopLoadingAction;

export type ProductsState = {
  loading: boolean;
  allProducts: IProducts[];
  product: IProducts | null;
};

export type AppState = {
  products: ProductsState;
  cart: CartState;
  user: UserState;
};

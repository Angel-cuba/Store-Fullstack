import { ICartItem } from './types';

export const ADD_CART = 'ADD_CART';
export const REMOVE_FROM_CART = 'REMOVE_CART';

export type AddToCartAction = {
  type: typeof ADD_CART;
  payload: ICartItem;
};
export type RemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  payload: ICartItem;
};

export type CartActions = AddToCartAction | RemoveFromCartAction;

export type CartState = {
  inCart: ICartItem[];
};

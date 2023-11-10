import { Dispatch } from 'redux';
import { ADD_CART, REMOVE_FROM_CART } from '../../types/CartActions';
import { ICartItem } from '../../types/types';

export const addingToCart = (product: ICartItem) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: ADD_CART,
      payload: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (product: ICartItem) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });
  } catch (error) {
    console.log(error);
  }
};

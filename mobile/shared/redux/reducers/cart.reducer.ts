import type { UnknownAction } from 'redux';
import { ADD_CART, CartState, CLEAR_CART, REMOVE_FROM_CART } from '../../types/CartActions';
import type { ICartItem } from '../../types/types';

export const cartInitialState: CartState = { inCart: [] };

export default function cartReducer(state = cartInitialState, action: UnknownAction): CartState {
  switch (action.type) {
    case ADD_CART: {
      const item = action.payload as ICartItem;
      const duplicate = state.inCart.find((i) => i._id === item._id);
      if (duplicate) {
        return {
          ...state,
          inCart: state.inCart.map((i) =>
            i._id === item._id ? { ...i, amount: i.amount + 1 } : i
          ),
        };
      }
      return { ...state, inCart: [...state.inCart, { ...item, amount: 1 }] };
    }
    case REMOVE_FROM_CART: {
      const item = action.payload as ICartItem;
      const found = state.inCart.find((i) => i._id === item._id);
      if (found && found.amount > 1) {
        return {
          ...state,
          inCart: state.inCart.map((i) =>
            i._id === item._id ? { ...i, amount: i.amount - 1 } : i
          ),
        };
      }
      return { ...state, inCart: state.inCart.filter((i) => i._id !== item._id) };
    }
    case CLEAR_CART:
      return cartInitialState;
    default:
      return state;
  }
}

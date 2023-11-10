import { ADD_CART, CartActions, CartState, REMOVE_FROM_CART } from '../../types/CartActions';

export const cartInitialState: CartState = {
  inCart: null,
};
export default function cart(state = cartInitialState, action: CartActions) {
  switch (action.type) {
    case ADD_CART: {
      if (!state.inCart) {
        return { ...state, inCart: [{ ...action.payload, amount: 1 }] };
      }
      const duplicate = state.inCart.find((item) => item._id === action.payload._id);
      if (duplicate) {
        return {
          ...state,
          inCart: state.inCart.map((item) => {
            if (item._id === action.payload._id) {
              return {
                ...item,
                amount: item.amount + 1,
              };
            }
            return item;
          }),
        };
      }
      const newProductInCart = [...state.inCart, { ...action.payload, amount: 1 }];
      return { ...state, inCart: newProductInCart };
    }
    case REMOVE_FROM_CART: {
      //Checking if  cart is empty
      if (!state.inCart) {
        return { ...state, inCart: [action.payload] };
      }
      const singleProductInCart = state.inCart.filter((item) => item._id === action.payload._id);
      if (singleProductInCart[0].amount > 1) {
        return {
          ...state,
          inCart: state.inCart.map((item) => {
            if (item._id === action.payload._id) {
              return {
                ...item,
                amount: item.amount - 1,
              };
            }
            return item;
          }),
        };
      }
      const removedFromCart = state.inCart?.filter((item) => item._id !== action.payload._id);
      return { ...state, inCart: removedFromCart };
    }

    default:
      return state;
  }
}

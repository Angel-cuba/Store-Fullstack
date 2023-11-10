import {
  ProductsActions,
  PRODUCTS,
  PRODUCT_BY_ID,
  NEW_PRODUCT,
  ProductsState,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  START_LOADING,
  STOP_LOADING,
} from '../../types/ProductType';

export const productsInitialState: ProductsState = {
  loading: true,
  allProducts: [],
  product: null,
};

export default function countries(state = productsInitialState, action: ProductsActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    case PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    case NEW_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts?.map((product) => {
          if (product._id === action.payload._id) {
            return action.payload;
          }
          return product;
        }),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter((product) => product._id !== action.payload._id),
      };

    default:
      return state;
  }
}

import {
  PRODUCT_ERROR,
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  SINGLE_PRODUCT_ERROR,
  SINGLE_PRODUCT_LOADING,
  SINGLE_PRODUCT_SUCCESS,
} from "./actionType";

const init = {
  loading: false,
  error: true,
  products: [],
  singleProduct: {},
};

export const productReducer = (state = init, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return { ...state, loading: true };

    case PRODUCT_ERROR:
      return { ...state, loading: false, error: true };

    case PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };

    case SINGLE_PRODUCT_LOADING:
      return { ...state, loading: true };

    case SINGLE_PRODUCT_ERROR:
      return { ...state, loading: false, error: true };

    case SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        singleProduct: action.payload,
      };
    default:
      return state;
  }
};

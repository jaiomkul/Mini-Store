import {
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  SINGLE_PRODUCT_LOADING,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_ERROR,
} from "./actionType";

// Product Page

const handelLoading = () => ({
  type: PRODUCT_LOADING,
});

const handelSuccess = (payload) => ({
  type: PRODUCT_SUCCESS,
  payload,
});

const handelError = () => ({
  type: PRODUCT_ERROR,
});

export const getData = () => (dispatch) => {
  dispatch(handelLoading());
  fetch("http://localhost:4040/products")
    .then((res) => res.json())
    .then((res) => dispatch(handelSuccess(res)))
    .catch(() => dispatch(handelError()));
};

// Product Details page

const handelSingleProductLoading = () => ({
  type: SINGLE_PRODUCT_LOADING,
});

const handelSingleProductSuccess = (payload) => ({
  type: SINGLE_PRODUCT_SUCCESS,
  payload,
});

const handelSingleProductError = () => ({
  type: SINGLE_PRODUCT_ERROR,
});

export const getSingleProductData = (id) => (dispatch) => {
  dispatch(handelSingleProductLoading());
  fetch(`http://localhost:4040/products/${id}`)
    .then((res) => res.json())
    .then((res) => dispatch(handelSingleProductSuccess(res)))
    .catch(() => dispatch(handelSingleProductError()));
};

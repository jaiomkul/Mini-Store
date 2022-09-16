import {
  ADD_TO_CART,
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_FROM_CART,
} from "./actionType";

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const increaseQty = (payload) => ({
  type: INCREASE_QTY,
  payload,
});

export const decreaseQty = (payload) => ({
  type: DECREASE_QTY,
  payload,
});

export const removeFromCart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});
//cart action

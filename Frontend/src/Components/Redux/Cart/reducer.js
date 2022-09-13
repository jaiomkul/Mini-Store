import {
  ADD_TO_CART,
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_FROM_CART,
} from "./actionType";

const initState = {
  cart: [],
};

export const cartReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      //let's check in the cart if the same product is present
      const isPresent = state.cart.find((prod) => {
        return prod.id === payload.id && prod.size === payload.size;
      });

      // if present - we'll increase the quentity
      let newCart;
      if (isPresent) {
        newCart = state.cart.map((prod) => {
          if (prod.id === payload.id && prod.size === payload.size) {
            return { ...prod, qty: prod.qty + 1 };
          } else {
            return prod;
          }
        });
      } else {
        let newPayload = {
          ...payload,
          qty: 1,
        };
        newCart = [...state.cart, newPayload];
      }

      return { ...state, cart: newCart };

    case INCREASE_QTY:
      let modifiedCart = state.cart.map((prod) => {
        if (prod.id === payload.id && prod.size === payload.size) {
          return { ...prod, qty: prod.qty + 1 };
        } else {
          return prod;
        }
      });
      return { ...state, cart: modifiedCart };

    case DECREASE_QTY:
      let resultantCart = state.cart.map((prod) => {
        if (prod.id === payload.id && prod.size === payload.size) {
          return { ...prod, qty: prod.qty - 1 };
        } else {
          return prod;
        }
      });
      return { ...state, cart: resultantCart };

    case REMOVE_FROM_CART:
      let updatedCart = state.cart.filter((prod) => {
        return !(prod.size === payload.size && prod.id === payload.id);
      });
      return { ...state, cart: updatedCart };

    default:
      return state;
  }
};

import { ActionTypes } from "../constants/action-types";

const initialState = {
  products: []
};


export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CART_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

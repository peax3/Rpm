import { ActionTypes } from "../constants/action-types";

const initialState = {
  feeds: [],
  trending: null,
  quickView: null,
  quickBid: null,
  swaps: null,
};

export const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_HOME_FEED:
      return { ...state, feeds: payload };
    case ActionTypes.SET_HOME_TRENDING:
      return { ...state, trending: payload };
    case ActionTypes.SET_QUICK_VIEW:
      return { ...state, quickView: payload, quickBid:null };
    case ActionTypes.SET_SWAP_PRODUCTS:
      return { ...state, swaps: payload };
    case ActionTypes.SET_QUICK_BID:
      return { ...state, quickBid: payload, quickView:null };
    default:
      return state;
  }
};

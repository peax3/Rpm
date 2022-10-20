import { ActionTypes } from "../constants/action-types";

const initialState = {
  feeds: []
};


export const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_HOME_FEED:
      return { ...state, feeds: payload };
    default:
      return state;
  }
};

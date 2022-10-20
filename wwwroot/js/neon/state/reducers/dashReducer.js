import { ActionTypes } from "../constants/action-types";

const initialState = {
  userCount: 0,
  users: [],
  categoryCount: 0,
  categories: [],
};

export const dashReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USERS_COUNT:
      return { ...state, userCount: payload };
    case ActionTypes.SET_CATEGORY_COUNT:
      return { ...state, categoryCount: payload };
    case ActionTypes.SET_USERS:
      return { ...state, users: payload };
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};

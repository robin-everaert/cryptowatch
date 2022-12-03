import { SET_SEARCH } from "../actions/search.action";

const initialState = {};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
}
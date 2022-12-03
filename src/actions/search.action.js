export const SET_SEARCH = "SET_SEARCH";

export const setSearch = (string) => {
  return (dispatch) => {
    return dispatch({ type: SET_SEARCH, payload: string });
  };
};
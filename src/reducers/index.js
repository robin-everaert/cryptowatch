import { combineReducers } from "redux";
import stableReducer from "./stable.reducer";
import listReducer from "./list.reducer";
import searchReducer from "./search.reducer";

export default combineReducers({ 
    stableReducer,
    listReducer,
    searchReducer,
});
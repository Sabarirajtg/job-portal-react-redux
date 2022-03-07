import { combineReducers } from "redux";

// reducer import

import userReducer from "./userReducer";
import jobReducer from "./jobReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({ userReducer, jobReducer });

export default reducer;

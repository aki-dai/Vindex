import { combineReducers } from "redux";
import tagReducer from "./tagReducer";
import userReducer from "./userReducer"
import searchReducer from "./searchReducer"

export default combineReducers({tagReducer, userReducer, searchReducer})
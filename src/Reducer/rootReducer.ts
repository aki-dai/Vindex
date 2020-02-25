import { combineReducers } from "redux";
import tagReducer from "./tagReducer";
import userReducer from "./userReducer"
import searchReducer from "./searchReducer"
import authReducer from './authReducer'

export default combineReducers({tagReducer, userReducer, searchReducer, authReducer})
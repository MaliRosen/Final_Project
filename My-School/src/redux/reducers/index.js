import { combineReducers } from "redux";
import {userReducer} from "./userReducer.ts";
 

export default combineReducers({
        user : userReducer,
    });
  
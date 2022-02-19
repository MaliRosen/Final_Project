import { combineReducers } from "redux";
import {userReducer} from "./userReducer.ts";
 
const loaderReducer  = (state = false, action) => {
  
    switch (action.type) {
      case "set-loader":
        return action.payload;
      default:
        return state;
    }
  }
export default combineReducers({
        user : userReducer,
        loader: loaderReducer
    });
  

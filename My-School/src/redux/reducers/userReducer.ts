import { User } from '../models'
const initialState = {
  user: null,
}

export const userReducer = (state = initialState, action:{type:string, payload:any}) => {
  
  switch (action.type) {
    case "save_user":
      return { ...state, user: action.payload as User };
    case "save_teacher":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
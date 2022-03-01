import { User } from '../models'
const initialState = {
  user: {},
}

export const userReducer = (state = initialState, action:{type:string, payload:any}) => {
  
  switch (action.type) {
    case "save_user":
      return { ...state, user: action.payload as User };
    case "save_teacher":
      return { ...state, user: action.payload };
      case 'update-lesson-for-student':
      return {...state, user: {...state.user, subject: action.payload.subject} as User}
    default:
      return state;
  }
}
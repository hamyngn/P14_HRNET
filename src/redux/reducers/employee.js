import { ADD_EMPLOYEE, GET_EMPLOYEE } from "../actions/actionTypes";

const initialState = {list:[]}

const employee = (state = initialState, action) => {
    switch (action.type) {
      case ADD_EMPLOYEE: {
        return {
          ...state,
          list: [...(state.list), action.payload],
        };
      }
      case GET_EMPLOYEE: {
        return {
          ...state,
          list: [...(state.list)]
        }
      }
      default:
        return state;
    }
  }

export default employee
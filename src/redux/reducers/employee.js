import { ADD_EMPLOYEE } from "../actions/actionTypes";

const initialState = {}
const saveEmployee = (state = initialState, action) => {
    switch (action.type) {
      case ADD_EMPLOYEE: {
        const { employee } = action.payload;
        return {
          ...state,
          employee: employee,
        };
      }
      default:
        return state;
    }
  }
export default saveEmployee
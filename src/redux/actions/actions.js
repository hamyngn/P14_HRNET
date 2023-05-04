import employeeService from '../../services/employeeService'
import { ADD_EMPLOYEE } from "./actionTypes";

export const save = (firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department) => (dispatch) => {
    const data = employeeService.saveEmployee(firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department);
    if(data) {
      dispatch({
        type: ADD_EMPLOYEE,
        payload: {employee: data}
      })
    }
}
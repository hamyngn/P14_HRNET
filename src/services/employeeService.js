let employees = [];
const saveEmployee = (firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department) => {
    const employee = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        startDate: startDate,
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
        department: department
    }
    employees.push(employee);
}
const exportedObject = {
    employees,
    saveEmployee,
}
export default exportedObject
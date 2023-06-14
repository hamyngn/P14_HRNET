const saveEmployee = (firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department) => {
    const employee = {
        'firstName': firstName,
        'lastName': lastName,
        'dateOfBirth': dateOfBirth,
        'startDate': startDate,
        'street': street,
        'city': city,
        'state': state,
        'zipCode': zipCode,
        'department': department
    }
    return employee;
}
const exportedObject = {
    saveEmployee,
}
export default exportedObject
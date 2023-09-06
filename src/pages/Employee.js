import React, { useEffect, useState } from "react";
import styles from "../assets/styles/Employee.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from '../redux/actions/actions';
import Table from "../components/Table"

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'dateOfBirth', headerName: 'Date Of Birth' },
    { field: 'startDate', headerName: 'Start Date'},
    { field: 'street', headerName: 'Street' },
    { field: 'state', headerName: 'State' },
    { field: 'zipCode', headerName: 'Zip Code', type: 'number' },
    { field: 'department', headerName: 'Department' },
];

const Employee = () => {
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employee.list);

    useEffect(() => {
      dispatch(getEmployee())
    }, [dispatch])

    useEffect(() => {
      const getRows = () => {
        let rows = []
        if(employees) {
        employees.map((e, index) => {
          const employee = e.employee
          rows.push({id: index + 1, firstName: employee.firstName, lastName: employee.lastName, dateOfBirth: employee.dateOfBirth, startDate: employee.startDate, street: employee.street, state: employee.state, zipCode: employee.zipCode, department: employee.department})
          return rows
        })}
        return rows;
    }
        setRows(getRows().reverse())
    }, [employees])

return (
    <>
    <div id="employee-div" className={styles.container}>
            <h2>Current Employees</h2>
    </div>
      <Table
        rows={rows}
        columns={columns}
        id="employees-table"
      />
    </>
)
}
export default Employee;

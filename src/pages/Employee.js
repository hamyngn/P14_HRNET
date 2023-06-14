import React, { useEffect, useState } from "react";
import styles from "../assets/styles/Employee.module.css"
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import employeeService from '../services/employeeService'
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from '../redux/actions/actions';

const columns: GridColDef[] = [
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

    const getRows = () => {
      let rows = []
      if(employees) {
      employees.map((e, index) => {
        const employee = e.employee
        rows.push({id: index, firstName: employee.firstName, lastName: employee.lastName, dateOfBirth: employee.dateOfBirth, startDate: employee.startDate, street: employee.street, state: employee.state, zipCode: employee.zipCode, department: employee.department})
        return rows
      })}
      return rows;
  }

    useEffect(() => {
        setRows(getRows())
    }, [])
return (
    <>
    <div id="employee-div" className={styles.container}>
            <h1>Current Employees</h1>
    </div>
    <Box sx={{ height: 400, width: '80%', marginLeft: '10%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
    </>
)
}
export default Employee;

import React, { useEffect, useState } from "react";
import styles from "../assets/styles/Employee.module.css"
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import employeeService from '../services/employeeService'

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
const getRows = () => {
    let rows = []
    employeeService.employees.map((e, index) => {
        rows.push({id: index, firstName: e.firstName, lastName: e.lastName, dateOfBirth: e.dateOfBirth, startDate: e.startDate, street: e.street, state: e.state, zipCode: e.zipCode, department: e.department})
        return rows
    })
    return rows;
}
const Employee = () => {
    const [rows, setRows] = useState([]);

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

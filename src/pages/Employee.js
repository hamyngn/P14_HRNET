import React from "react";
import { Link } from "react-router-dom";
import styles from "../assets/styles/Employee.module.css"
import DataTable from 'datatables.net'
import employeeService from '../services/employeeService'

const Employee = () => {
    const rows = employeeService.employees.map((e, index) => 
            <tr key={index}>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
            </tr>
        )
        
return (
    <>
    <div id="employee-div" className={styles.container}>
            <h1>Current Employees</h1>
            <table id="employee-table">
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <Link to="/">Home</Link>
    </div>
    </>
)
}

export default Employee;

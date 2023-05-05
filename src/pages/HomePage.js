import React, { useState } from "react";
import styles from "../assets/styles/HomePage.module.css"
import SelectCustom from "../components/SelectCustom"
import { useDispatch } from "react-redux";
import { save } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import states from '../data'

const HomePage = () => {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [street, setStreet] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [zipCode, setZipCode] = useState(null)
    const [department, setDepartment] = useState(null)

    let dispatch = useDispatch()

    const saveEmployee = () => {
        dispatch(save(firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department))
    }
return (
    <>
        <div className={styles.title}>
            <h1>HRnet</h1>
        </div>
        <div className={styles.container}>
            <Link to="employee-list">View Current Employees</Link>
            <h2>Create Employee</h2>
            <form action="#" id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input 
                type="text" 
                id="first-name" 
                required
                onChange={(event) => setFirstName(event.target.value)}/>

                <label htmlFor="last-name">Last Name</label>
                <input 
                type="text" 
                id="last-name" 
                required
                onChange={(event) => setLastName(event.target.value)}
                />

                <label htmlFor="date-of-birth">Date of Birth</label>
                <input 
                id="date-of-birth" 
                type="text" 
                required
                onChange={(event) => setDateOfBirth(event.target.value)}
                />

                <label htmlFor="start-date">Start Date</label>
                <input 
                id="start-date" 
                type="text"
                required
                onChange={(event) => setStartDate(event.target.value)} 
                />

                <fieldset className={styles.address}>
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input 
                    id="street" 
                    type="text"
                    required
                    onChange={(event) => setStreet(event.target.value)} 
                    />

                    <label htmlFor="city">City</label>
                    <input 
                    id="city" 
                    type="text" 
                    required
                    onChange={(event) => setCity(event.target.value)} 
                    />

                    <label htmlFor="state">State</label>
                    <SelectCustom labelFor="state" data={states} onChange={(event) => setState(event.target.value)} />

                    <label htmlFor="zip-code">Zip Code</label>
                    <input 
                    id="zip-code" 
                    type="number"
                    required
                    onChange={(event) => setZipCode(event.target.value)} 
                    />
                </fieldset>

                <label htmlFor="department">Department</label>
                <select 
                name="department" 
                id="department"
                required
                onChange={(event) => setDepartment(event.target.value)} 
                >
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                </select>
            </form>
            </div>
            <div className={styles.center}>
            <button onClick={saveEmployee} style={{marginTop:5}}>Save</button>
            </div>
        <div id="confirmation" className={styles.center}>Employee Created!</div>
    </>
)
}

export default HomePage;
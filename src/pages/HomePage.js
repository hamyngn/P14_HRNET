import React, { useState } from "react";
import styles from "../assets/styles/HomePage.module.css"
import SelectCustom from "../components/SelectCustom"
import { useDispatch } from "react-redux";
import { save } from "../redux/actions/actions";
import {states} from '../data'
import {departments} from '../data'
import Input from "../components/Input"
import Modal from "../components/Modal"

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let dispatch = useDispatch()

    // submit form
    const saveEmployee = (e) => {
        e.preventDefault()
        dispatch(save(firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department))
        handleOpen()
    }

    // converDate to dd/mm/yyyy format
    const pad = (s) => { return (s < 10) ? '0' + s : s; }
    const convertDate = (date) => {
        const newDate = new Date(date);
        const dayMonthYear = `${pad(newDate.getDate())}/${pad(newDate.getMonth()+1)}/${newDate.getFullYear()}`
        return dayMonthYear;
    }

    /**
     * check if string is date format
     * @param {string} value 
     * @returns
     */
    const isDate = (value) => {
        const date_regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
        if(date_regex.test(value)) {
            return true
        } else {
            return false
        }
    }

    /**
     * handle input date validation
     * @param {event} e 
     */
    const validateInputDate = (e) => {
        let bool = isDate(e.target.value);
        if(bool) {
            e.target.type = "text"
            e.target.value = convertDate(e.target.value)
        } else {
            e.target.value = ""
        }
    }

return (
    <div className={styles.container}>
        <div className={styles.flexColumn}>
            <h1>Create Employee</h1>
            <form action="#" id="create-employee" onSubmit={(e) => saveEmployee(e)}>
                <Input 
                label="First Name" 
                id="first-name" 
                type="text" 
                required={true}
                onChange={(value) => setFirstName(value)}
                className={styles.input}
                />
                <Input 
                label="Last Name" 
                id="last-name" 
                type="text" 
                required={true}
                onChange={(value) => setLastName(value)}
                className={styles.input}
                />
                <Input 
                label="Date of birth" 
                id="dateOfBirth" 
                type="text" 
                required={true}
                onChange={(value) => setDateOfBirth(convertDate(value))}
                className={styles.input}
                placeholder={""}
                onFocus={(e) => e.target.type = "date"}
                onBlur={(e) => validateInputDate(e)}
                />
                <Input 
                label="Start date" 
                id="start-date" 
                type="text" 
                required={true}
                onChange={(value) => setStartDate(convertDate(value))}
                className={styles.input}
                placeholder={""}
                onFocus={(e) => e.target.type = "date"}
                onBlur={(e) => validateInputDate(e)}
                />
                <fieldset className={styles.address}>
                    <legend>Address</legend>
                    <Input 
                    label="Street" 
                    id="street" 
                    type="text" 
                    required={true}
                    onChange={(value) => setStreet(value)}
                    className={styles.input}
                    />
                    <Input 
                    label="City" 
                    id="city" 
                    type="text" 
                    required={true}
                    onChange={(value) => setCity(value)}
                    className={styles.input}
                    />
                    <SelectCustom id="state" label="State" data={states} value="abbreviation" text="name" onChange={(value) => setState(value)}/>
                    <Input 
                    label="Zip Code" 
                    id="zip-code"
                    type="number" 
                    required={true}
                    onChange={(value) => setZipCode(value)}
                    className={styles.input}
                    />
                </fieldset>
                <SelectCustom id="department" label="Department" data={departments} value="name" text="name" onChange={(value) => setDepartment(value)}/>
                <button type="submit" className={styles.button} style={{marginTop:5}}>Save</button>
            </form>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            text="Employee Created!"
            >
            </Modal>
    </div>
)
}

export default HomePage;
import React, { useState } from "react";
import styles from "../assets/styles/HomePage.module.css"
import SelectCustom from "../components/SelectCustom"
import { useDispatch } from "react-redux";
import { save } from "../redux/actions/actions";
import {states} from '../data'
import {departments} from '../data'
import Input from "../components/Input"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

    const saveEmployee = () => {
        dispatch(save(firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department))
        handleOpen()
    }
    const pad = (s) => { return (s < 10) ? '0' + s : s; }
    const convertDate = (date) => {
        const newDate = new Date(date);
        const dayMonthYear = `${pad(newDate.getDate())}/${pad(newDate.getMonth()+1)}/${newDate.getFullYear()}`
        return dayMonthYear;
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

return (
    <div className={styles.container}>
        <div className={styles.flexColumn}>
            <h1>Create Employee</h1>
            <form action="#" id="create-employee">
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
                <p className={styles.datePickerLabel}>Date of birth</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    views={['year', 'month', 'day']}
                    onChange={(newValue) => setDateOfBirth(convertDate(newValue.$d.toDateString()))}
                    format="DD/MM/YYYY"/>
                </DemoContainer>
                </LocalizationProvider>
                <p className={styles.datePickerLabel}>Start date</p>
                <div id="datePicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    views={['year', 'month', 'day']}
                    onChange={(newValue) => setStartDate(convertDate(newValue.$d.toDateString()))}
                    format="DD/MM/YYYY"/>
                </DemoContainer>
                </LocalizationProvider>
                </div>
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
                    <SelectCustom id="state" label="State" disabled={["CA", "AZ"]} hidden={["AL", "CT", "WY"]} data={states} value="abbreviation" text="name" onChange={(value) => setState(value)}/>
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
            </form>
            <button onClick={saveEmployee} style={{marginTop:5}}>Save</button>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <Typography id="modal-modal-description">Employee Created!</Typography>
            </Box>
            </Modal>
    </div>
)
}

export default HomePage;
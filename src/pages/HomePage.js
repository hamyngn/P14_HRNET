import React, { useState } from "react";
import styles from "../assets/styles/HomePage.module.css"
import SelectCustom from "../components/SelectCustom"
import { useDispatch } from "react-redux";
import { save } from "../redux/actions/actions";
import states from '../data'
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
            <h2>Create Employee</h2>
            <form action="#" id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input 
                type="text" 
                id="first-name" 
                required
                onChange={(event) => setFirstName(event.target.value)}
                className={styles.input}
                />

                <label htmlFor="last-name">Last Name</label>
                <input 
                type="text" 
                id="last-name" 
                required
                onChange={(event) => setLastName(event.target.value)}
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

                    <label htmlFor="street">Street</label>
                    <input 
                    id="street" 
                    type="text"
                    required
                    onChange={(event) => setStreet(event.target.value)}
                    className={styles.input}
                    />

                    <label htmlFor="city">City</label>
                    <input 
                    id="city" 
                    type="text" 
                    required
                    onChange={(event) => setCity(event.target.value)}
                    className={styles.input}
                    />

                    <SelectCustom id="state" label="State" data={states} value="abbreviation" text="name" onChange={(value) => setState(value)}/>

                    <label htmlFor="zip-code">Zip Code</label>
                    <input 
                    id="zip-code" 
                    type="number"
                    required
                    onChange={(event) => setZipCode(event.target.value)}
                    className={styles.input}
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
            <button onClick={saveEmployee} style={{marginTop:5}}>Save</button>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <Typography id="modal-modal-description">
            Employee Created!
            </Typography>
            </Box>
            </Modal>
    </div>
)
}

export default HomePage;
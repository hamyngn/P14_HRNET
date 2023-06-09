import React from "react"
import PropTypes from 'prop-types';

const Input = ({label, type, id, required, onChange, className}) => {

    return (
    <>
        <label htmlFor={id}>{label}</label>
        <input 
        type={type} 
        id={id}
        name={id}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        />
    </>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    className:  PropTypes.string
}

export default Input
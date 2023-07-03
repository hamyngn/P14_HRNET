import React from "react"
import styles from "../assets/styles/Modal.module.css"
import PropTypes from 'prop-types';

const Modal = ({open, text, onClose}) => {
    return (
        <>
        {open && 
        <div className={styles.container}>
            <div className={styles.modalContent}>
                <div className={styles.modalHead}>
                    <button type="button" className={styles.button} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.modalBody}>
                <p>{text}</p>
                </div>
            </div>
        </div> 
        }
        </>
    )
}

Modal.propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string,
    onClose: PropTypes.func,
}
export default Modal
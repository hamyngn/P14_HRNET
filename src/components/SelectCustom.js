import React, {useState} from "react";
import styles from '../assets/styles/SelectCustom.module.css'

const SelectCustom = ({labelFor, data}) => {

    const [showList, setShowList] = useState(false)

    const options = data.map((state, index) =>
        <option value={state.abbreviation} key={index}>{state.name}</option>
    )

    const handleClick = (value) => {
        document.getElementById(labelFor).value = value;
        setShowList(!showList);
    }

    const list = data.map((state, index) =>
    <li 
        onClick={() => handleClick(state.abbreviation)} 
        key={index}
    >
        {state.name}
    </li>
    )

    const handleShowList = () => {
        setShowList(!showList);
    }

    return (
        <>
        <div className={styles.container}>
        <select name={labelFor} id={labelFor} onClick={() => handleShowList()}>
            {options}
        </select>
        <div className={styles.list} style={showList? { display: 'block' } : {display: 'none'}}>
        <ul>
            {list}
        </ul>
        </div>
        </div>
        </>
    )
}

export default SelectCustom;
import React, {useEffect, useState, useRef, createRef } from "react"
import styles from "../assets/styles/Table.module.css"
import { ReactComponent as Icon } from '../assets/images/arrow-down-solid.svg';

const Table = ({columns, rows, id}) => {
    const [tableHead, setTableHead] = useState([])
    const [tableBody, settableBody] = useState([])
    const [fields, setFields] = useState(null)
    const refTable = useRef()
    
    const createAscArray = () => {
        let asc = []
        for(let i = 0; i < columns.length ; i += 1) {
            asc.push(true)
        }
        return asc
    }
    const [ascending, setAscending] = useState(createAscArray())

    useEffect(() => {
        setAscending(createAscArray())
    },[columns.length])

    let elRefs = []
    let refs = []
    if(rows && rows.length && columns && columns.length) {
        for(let i = 0; i < rows.length; i +=1) {
            for(let j = 0; j < columns.length; j += 1) {
                refs.push(j)
            }
            elRefs.push(refs)
        }
    }

    const createTdRef = () => {
        if(rows && rows.length && columns && columns.length) {
            for(let i = 0; i < rows.length; i +=1) {
                for(let j = 0; j < columns.length; j += 1) {
                    elRefs[i][j] = createRef()
                } 
                console.log(elRefs)
            }
            return elRefs
            }
    }

    const [refTd, setRefTd] = useState(createTdRef())

    // create list items refs
    useEffect(() => {
        setRefTd(createTdRef())
    }, [columns, rows])

    /**
     * check if sort by ascending or descending
     * @param {number} index 
     * @returns 
     */
    const checkAscending = (index) => {
        if(ascending) {
            if(ascending[index]) {
                return true
            } else {
                return false
            }
        }
    }

    /**
     * check if string is date format
     * @param {string} date
     * @returns 
     */
    const isDate = (date) => {
        const date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        if(date_regex.test(date)) {
            return true
        } else {
            return false
        }
    }
    
    /**
     * convert date to date string type yyyy-mm-dd
     * @param {string} date 
     * @returns 
     */
    const newDate = (date) => {
        const convertDate = date.split("/").reverse().join("-");
        return convertDate
    }

    /**
     * handle sort table by columns
     * @param {event} e 
     * @param {number} index 
     */
    const sortData = (e, index) => {
        e.preventDefault()
        let i, switching, shouldSwitch, x, y, table, ifAscending
        table = refTable.current;
        switching = true;
        ifAscending = checkAscending(index)
        setAscending(ascending.splice(index, 1, !ifAscending))

        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
              //start by saying there should be no switching:
              shouldSwitch = false;
              /*Get the two elements you want to compare,
              one from current row and one from the next:*/
              x = rows[i].getElementsByTagName("TD")[index];
              y = rows[i + 1].getElementsByTagName("TD")[index];
              let isnum = /^\d+$/.test(x.innerHTML);
              let ifDate = isDate(x.innerHTML)
            //check if the two rows should switch place:
            if(ifAscending) {
                if(isnum) {
                    if(parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if(ifDate) {
                    if(new Date(newDate(x.innerHTML)).getTime() > new Date(newDate(y.innerHTML)).getTime()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else {
                    if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
                }
            } else {
                if(isnum) {
                    if(parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if(ifDate) {
                    if(new Date(newDate(x.innerHTML)).getTime() < new Date(newDate(y.innerHTML)).getTime()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else {
                    if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
                }
            }
            }
            if (shouldSwitch) {
                if(ifAscending) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                } else {
                    rows[i+1].parentNode.insertBefore(rows[i],rows[i + 1].nextSibling);
                    switching = true;
                }
            }
          }
    }

    useEffect(() => {
        const createTableHeads = () => {
            const cols = columns.map((e, index) => 
            <th key={`${id}-col-${index}`} className={styles.thead} onClick={(e) => sortData(e, index)}>{e.headerName}<Icon aria-label="icon" className={styles.icon} /></th>
            )
            setTableHead(cols)
        } 
        createTableHeads()
    }, [columns, id])

    useEffect(()=> {
        const createFields = () => {
            let fields = []
            columns.map((e, index) => fields.push(e.field))
            if(fields.length > 0) {
                setFields(fields)
            }
        }

        const createTableBody = () => {
            let tableRows = []
            for(let i= 0; i < rows.length; i+=1) {
                let tableDetails = []
                for(let j =0; j< fields.length; j +=1) {
                    console.log(refTd[i][j])
                    tableDetails= [...tableDetails, <td key={`${id}-td-${i}-${j}`} ref={refTd[i][j]}>{rows[i][fields[j]]? rows[i][fields[j]] : ""}</td>]
                }
                tableRows.push(<tr key={`${id}-row-${i}`}>{tableDetails}</tr>)
            }
            settableBody(tableRows)
        }
        createFields()
        if(fields && refTd && refTd.length > 0) {
            createTableBody() 
        }
    }, [columns, rows, id, refTd])

    return (
        <div className={styles.container}>
        <table className={styles.table} ref={refTable}>
            <thead>
            <tr>
                {tableHead}
            </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </table>
        </div>
    )
}

export default Table
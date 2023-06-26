import React, {useEffect, useState, useRef } from "react"
import styles from "../assets/styles/Table.module.css"
import { ReactComponent as Icon } from '../assets/images/arrow-down-solid.svg';

const Table = ({columns, rows, id}) => {
    const [tableHead, setTableHead] = useState([])
    const [tableBody, setTableBody] = useState([])
    const [fields, setFields] = useState(null)
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const refTable = useRef()
    const refPre = useRef()
    const refNext = useRef()
    
    const createAscArray = () => {
        let asc = []
        for(let i = 0; i < columns.length ; i += 1) {
            asc.push(true)
        }
        return asc
    }
    const [ascending, setAscending] = useState(createAscArray())

    useEffect(() => {
        const asc = createAscArray()
        setAscending(asc)
    },[columns.length])

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
         * handle sort table by columns
         * @param {event} e 
         * @param {number} index 
         */

        const sortData = (e, index) => {
            e.preventDefault()
            let i, shouldSwitch, x, y
            let table =  refTable.current;
            let rows = table.rows;
            let switching = true;
            let ifAscending = checkAscending(index)
            let asc = ascending
            asc[index] = !ifAscending
            setAscending(asc)
            if(ifAscending){
                rows[0].getElementsByTagName('svg')[index].style.transform = 'rotate(180deg)'
            } else {
                rows[0].getElementsByTagName('svg')[index].style.transform = ''
            }
            while (switching) {
                //start by saying: no switching is done:
                switching = false;
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
            <th key={`${id}-col-${index}`} className={styles.thead} onClick={(e) => sortData(e, index)}>{e.headerName}<Icon aria-label="icon" className={styles.icon}/></th>
            )
            setTableHead(cols)
        } 
        createTableHeads()
    }, [columns, id, ascending])

    useEffect(() => {
        const createFields = () => {
            let fields = []
            columns.map((e, index) => fields.push(e.field))
            if(fields.length > 0) {
                setFields(fields)
            }
        }
        createFields()
    },[columns])

    useEffect(()=> {
        const createTableBody = () => {
            let tableRows = []
            for(let i= 0; i < rows.length; i+=1) {
                let tableDetails = []
                for(let j =0; j< fields.length; j +=1) {
                    tableDetails= [...tableDetails, <td key={`${id}-td-${i}-${j}`}>{rows[i][fields[j]]? rows[i][fields[j]] : ""}</td>]
                }
                tableRows.push(<tr key={`${id}-row-${i}`}>{tableDetails}</tr>)
            }
            setTableBody(tableRows)
        }
        
        if(fields) {
            createTableBody()
        }
    }, [columns, rows, id])

    const searchByKeyword = (e) => {
        const table = refTable.current
        let filter = e.target.value.toLowerCase();
        let tr = table.rows;
        for (let i = 0; i < tr.length; i += 1) {
            for(let j=0; j < tr[i].getElementsByTagName("td").length; j += 1 ) {
                let td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                  let txtValue = td.textContent || td.innerText;
                  if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                  } else {
                    tr[i].style.display = "none";
                  }
                }      
            }
        }
    }

    //todo: fix rows shown
    const displayRows = (page, rowsPerPage) => {
        const table = refTable.current
        let tr = table.rows;
        console.log(page, rowsPerPage)
        if(page && rowsPerPage && tr) {  
            for (let i = 1; i < tr.length; i += 1 ) {
                tr[i].style.display = "none";
            }
    
            if(rowsPerPage === 5) {
                for (let j = (page - 1) * 5 + 1; j <= page * 5 ; j += 1) {
                    if(tr[j]) {
                        console.log(tr[j])
                        tr[j].style.display = "";
                    }
                }
            }
    
            if(rowsPerPage === 10) {
                for (let j = (page - 1) * 10 + 1; j <= page * 10 ; j += 1) {
                    if(tr[j]) {
                        console.log(tr[j])
                        tr[j].style.display = "";
                    }
                }
            }
        }
    }

    useEffect(() => {
        if(tableBody.length > 0) {
            displayRows(page, rowsPerPage)
        }   
    }, [tableBody, page, rowsPerPage])

    const handleSelect = (e) => {
        const rows = parseInt(e.target.value)
        displayRows(1, rows)
        setRowsPerPage(rows)
    }

    const showNext = (e) => {
        displayRows(page+1, rowsPerPage)
        setPage(page + 1)
    } 

    const showPrevious = (e) => {
        displayRows(page-1, rowsPerPage)
        setPage(page - 1)
    }

    return (
        <>
        <div className={styles.input}>
        <input type="text" id="myInput" onKeyUp={(e) => searchByKeyword(e)} placeholder="Search" title="Type in a keyword" className={styles.input}/>
        </div>
        <div className={styles.container}>
        <div className={styles.responsive}>
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
        <div className={styles.flexRow}>
            <div>
            <label htmlFor="rows">Rows per page:</label>
            <select name="rows" id="rows" onChange={(e) => handleSelect(e)}>
                <option>5</option>
                <option>10</option>
            </select>
            </div>
            <div>
                <span onClick={(e) => showPrevious(e)} className={styles.previous} ref={refPre}>Previous</span>
                <span onClick={(e) => showNext(e)} className={styles.next} ref={refNext}>Next</span>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default Table
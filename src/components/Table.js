import React, {useEffect, useState, useRef } from "react"
import styles from "../assets/styles/Table.module.css"
import { ReactComponent as Icon } from '../assets/images/arrow-down-solid.svg';
import PropTypes from 'prop-types';
import {checkIfShouldSwitch, displayRows, displayRowsAfterFilter, checkAscending} from "../utils/utils"
import { useChangePageTextStyle } from "../hooks/useChangePageTextStyle";
import { useCreateTableBody } from "../hooks/useCreateTableBody";

const Table = ({columns, rows, id}) => {
    const [tableHead, setTableHead] = useState([])
    const [tableBody, setTableBody] = useState([])
    const [fields, setFields] = useState(null)
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [filterElements, setFilterElements] = useState(null)
    const [countElements, setCountElements] = useState(null)
    const refTable = useRef()
    const refPre = useRef()
    const refNext = useRef()
    const refSelect = useRef()
    const refPagination = useRef()
    const refInput = useRef()

    // handle table display by page and rows per page
    useEffect(() => {
        if(tableBody.length > 0) {
            if(filterElements) {
                displayRowsAfterFilter(page, rowsPerPage, filterElements, refTable)
            } else {
                displayRows(page, rowsPerPage, refTable)
            }
        }
    }, [tableBody, page, rowsPerPage, filterElements])
    
    const createAscArray = () => {
        let asc = []
        for(let i = 0; i < columns.length ; i += 1) {
            asc.push(true)
        }
        return asc
    }
    // state to track if a column is sorted  by ascending or descending
    const [ascending, setAscending] = useState(createAscArray())

    useEffect(() => {
        const asc = createAscArray()
        setAscending(asc)
    },[columns.length])

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
            columns.map((col) => fields.push(col.field))
            if(fields.length > 0) {
                setFields(fields)
            }
        }
        createFields()
    },[columns])

    useCreateTableBody(fields, rows, id, setTableBody, setCountElements)
    
    /**
     * 
     * @param {string} text 
     * @returns array of numbers
     */
    const searchByKeyword = (text) => {
        const table = refTable.current
        let filter = text.toLowerCase();
        let tr = table.rows;
        let filteredElements = [];
        for (let i = 0; i < tr.length; i += 1) {
            for(let j=0; j < tr[i].getElementsByTagName("td").length; j += 1 ) {
                let td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                  let txtValue = td.textContent || td.innerText;
                  if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    filteredElements.push(i)
                    break;
                  } else {
                    tr[i].style.display = "none";
                  }
                }      
            }
        }
        setPage(1)
        setFilterElements(filteredElements)
        setCountElements(filteredElements.length)
        return filteredElements;
    }

    /**
     * handle sort table by columns
     * @param {event} e 
     * @param {number} index 
     */
    const sortData = (e, index) => {
        e.preventDefault()
        let table =  refTable.current;
        let rows = table.rows;
        let switching = true;
        let ifAscending = checkAscending(index, ascending)
        let asc = ascending
        asc[index] = !ifAscending
        setAscending(asc)
        if(ifAscending){
            rows[0].getElementsByTagName('svg')[index].style.transform = 'rotate(180deg)'
        } else {
            rows[0].getElementsByTagName('svg')[index].style.transform = ''
        }
        while (switching) {
                switching = false;
                let result = checkIfShouldSwitch(ifAscending, rows, index)
                let {shouldSwitch} = result
                let {i} = result
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
        setPage(1)
        let sortedFilterElements = [];
        let filteredElements = null;
        if(refInput.current.value !== "") {
            filteredElements = searchByKeyword(refInput.current.value)
            if(filteredElements && filteredElements.length !== rows.length) {
                for(let i = 1; i < rows.length; i += 1) {
                    for(let j = 0; j < filteredElements.length; j += 1) {
                        if(rows[i] === rows[filteredElements[j]]){
                            sortedFilterElements.push(i)
                        }
                    }
                }
            }
        }
        
        if(refSelect.current.value === "10") {
            if(filteredElements && filteredElements.length !== rows.length) {
                displayRowsAfterFilter(1, 10, sortedFilterElements, refTable)
            } else {
                displayRows(1, 10, refTable)
            }
        } else {
            if(filteredElements && filteredElements.length !== rows.length) {
                displayRowsAfterFilter(1, 5, sortedFilterElements, refTable)
            } else {
                displayRows(1, 5, refTable)
            }
        }
    }

    /**
     * select number of rows shown per page
     * @param {event} e 
     */
    const handleSelect = (e) => {
        const val = parseInt(e.target.value)
        setPage(1)
        setRowsPerPage(val)
    }

    useChangePageTextStyle(page, refPre, refNext, countElements, rowsPerPage)

    const showNext = () => {
        setPage(page + 1)
        refPre.current.style.color = "black"
        refPre.current.style.pointerEvents = "auto"
    } 

    const showPrevious = () => {
        setPage(page - 1)
        refNext.current.style.color = "black"
        refNext.current.style.pointerEvents = "auto"
    }

    return (
        <>
        <div className={styles.inputContainer}>
        <input 
            ref={refInput}
            type="text" 
            id="myInput" 
            onKeyUp={() => searchByKeyword(refInput.current.value)}
            placeholder="Search" 
            title="Type in a keyword" 
            className={styles.input}/>
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
        </div>
        </div>
        <div className={styles.pagination} ref={refPagination}>
            <div className={styles.flexRow}>
            <label htmlFor="rows">Rows per page:</label>
            <select name="rows" id="rows" onChange={(e) => handleSelect(e)} ref={refSelect} className={styles.selectRows}>
                <option>5</option>
                <option>10</option>
            </select>
            </div>
            <div className={styles.countElements}>
                {
                    rowsPerPage <= countElements && (page * rowsPerPage < countElements) &&
                    <span>{(page - 1) * rowsPerPage + 1} - {page * rowsPerPage} of {countElements}</span>
                }
                {
                    rowsPerPage <= countElements && (page * rowsPerPage >= countElements) &&
                    <span>{(page - 1) * rowsPerPage + 1} - {countElements} of {countElements}</span>
                }

                {
                    rowsPerPage > countElements &&
                    <span>{(page - 1) * rowsPerPage + 1} - {countElements} of {countElements}</span>
                }
            </div>
            <div>
                <span onClick={() => showPrevious()} className={styles.previous} ref={refPre}> &lt;&lt; Previous</span>
                <span onClick={() => showNext()} 
                className={styles.next} 
                ref={refNext}
                style={rows.length <= rowsPerPage ? {pointerEvents:'none', color:'gray'}: {pointerEvents:'auto', color:'black'}}
                >
                    Next &gt;&gt;
                </span>
            </div>
        </div>
        </>
    )
}

Table.propTypes = {
    columns: PropTypes.arrayOf(Object),
    rows: PropTypes.arrayOf(Object),
    id: PropTypes.string
}
export default Table
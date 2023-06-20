import React, {useEffect, useState } from "react"
import styles from "../assets/styles/Table.module.css"
import { ReactComponent as Icon } from '../assets/images/arrow-down-solid.svg';

const Table = ({columns, rows, id}) => {
    const [tableHead, setTableHead] = useState([])
    const [tableBody, settableBody] = useState([])
    const [fields, setFields] = useState(null)

    let ascending = []
    for(let i = 0; i < columns.length ; i += 1) {
        ascending.push(true)
    }

    const checkAscending = (index) => {
            if(ascending[index]) {
                return true
            } else {
                return false
            }
    }

    const sortData = (e, index) => {
        e.preventDefault()
        let i, switching, shouldSwitch, x, y, table, ifAscending
        table = document.getElementById("myTable");
        switching = true;
        ifAscending = checkAscending(index)
        ascending[index] = !ascending[index]
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
              //check if the two rows should switch place:
            if(ifAscending) {
                if(isnum) {
                    if(parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
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
            } 
            else {
                if(isnum) {
                    if(parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
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
            if (shouldSwitch && ifAscending) {
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
            }

            if (shouldSwitch && !ifAscending) {
                rows[i+1].parentNode.insertBefore(rows[i],rows[i + 1].nextSibling);
                switching = true;
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
                    tableDetails= [...tableDetails, <td key={`${id}-td-${i}-${j}`}>{rows[i][fields[j]]? rows[i][fields[j]] : ""}</td>]
                }
                tableRows.push(<tr key={`${id}-row-${i}`}>{tableDetails}</tr>)
            }
            settableBody(tableRows)
        }
        createFields()
        if(fields) {
            createTableBody() 
        }
    }, [columns, rows, id])

    return (
        <div className={styles.container}>
        <table className={styles.table} id="myTable">
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
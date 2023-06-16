import React, {useEffect, useState} from "react"
import styles from "../assets/styles/Table.module.css"

const Table = ({columns, rows, id}) => {
    const [tableHead, setTableHead] = useState([])
    const [tableBody, settableBody] = useState([])
    const [fields, setFields] = useState(null)

    useEffect(() => {
        const createTableHeads = () => {
            const cols = columns.map((e, index) => 
            <th key={`${id}-col-${index}`}>{e.headerName}</th>
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
        <table className={styles.table}>
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
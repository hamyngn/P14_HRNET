import React, {useEffect} from "react"

/**
 * create the table body
 * @param {Array} fields 
 * @param {Array} rows 
 * @param {string} id 
 * @param {*} setTableBody 
 * @param {*} setCountElements 
 */
export function useCreateTableBody(fields, rows, id, setTableBody, setCountElements){
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
            setCountElements(rows.length)
        }
        
        if(fields) {
            createTableBody()
        }
    }, [fields, rows, id])
}
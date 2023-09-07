    /**
     * check if sort by ascending or descending
     * @param {number} index 
     * @returns 
     */
    export function checkAscending(index, ascending){
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
    export function isDate(date) {
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
    export function newDate(date) {
        const convertDate = date.split("/").reverse().join("-");
        return convertDate
    }


    /**
     * check if two rows should switch
     * @param {boolean} ifAscending 
     * @param {arrayOf} rows 
     * @param {number} index 
     * @returns boolean shouldSwitch and index of element
     */
    export function checkIfShouldSwitch (ifAscending, rows, index) {
        let shouldSwitch, x, y, i
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
            return {shouldSwitch: shouldSwitch, i: i }
    }

    /**
     * handle number of rows shown per page
     * @param {number} page 
     * @param {number} rowsPerPage 
     */
        export function displayRows (page, rowsPerPage, refTable){
            const table = refTable.current
            let tr = table.rows;
            if(page && rowsPerPage && tr) {  
                for (let i = 1; i < tr.length; i += 1 ) {
                    tr[i].style.display = "none";
                }
        
                if(rowsPerPage === 5) {
                    for (let j = (page - 1) * 5 + 1; j <= page * 5 ; j += 1) {
                        if(tr[j]) {
                            tr[j].style.display = "";
                        }
                    }
                }
        
                if(rowsPerPage === 10) {
                    for (let j = (page - 1) * 10 + 1; j <= page * 10 ; j += 1) {
                        if(tr[j]) {
                            tr[j].style.display = "";
                        }
                    }
                }
            }
        }

    /**
     * handle number of rows shown per page after filtered
     * @param {number} page 
     * @param {number} rowsPerPage 
     */
        export function displayRowsAfterFilter(page, rowsPerPage, filteredElements, refTable){
            const table = refTable.current
            let tr = table.rows;
            if(page && rowsPerPage && filteredElements) {
                for (let i = 1; i < tr.length; i += 1 ) {
                    tr[i].style.display = "none";
                }
                if(rowsPerPage === 5) {
                    for (let j = (page - 1) * 5; j <= page * 5 - 1 ; j += 1) {
                        if(tr[filteredElements[j]]) {
                            tr[filteredElements[j]].style.display = "";
                        }
                    }
                }
        
                if(rowsPerPage === 10) {
                    for (let j = (page - 1) * 10; j <= page * 10 - 1 ; j += 1) {
                        if(tr[filteredElements[j]]) {
                            tr[filteredElements[j]].style.display = "";
                        }
                    }
                }
            }
        }
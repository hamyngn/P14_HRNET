import { useEffect } from "react"

/**
 * handle style of next and previous button
 * @param {number} page 
 * @param {ref} refPre 
 * @param {ref} refNext 
 * @param {number} countElements 
 * @param {number} rowsPerPage 
 */
export function useChangePageTextStyle(page, refPre, refNext, countElements, rowsPerPage){
    useEffect(() => {
        if(countElements <= rowsPerPage) {
            refNext.current.style.pointerEvents = "none"
            refNext.current.style.color = "gray"
        } else {
            refNext.current.style.pointerEvents = "auto"
            refNext.current.style.color = "black"
        }
    }, [rowsPerPage, countElements])
    
    useEffect(() => {
        if(page === 1) {
            refPre.current.style.color = "gray"
            refPre.current.style.pointerEvents = "none"
            if(countElements <= rowsPerPage) {
                refNext.current.style.pointerEvents = "none"
                refNext.current.style.color = "gray"
            } else {
                refNext.current.style.pointerEvents = "auto"
                refNext.current.style.color = "black"
            }
        } 
        else if(page === Math.ceil(countElements/rowsPerPage)) {
            refNext.current.style.pointerEvents = "none"
            refNext.current.style.color = "gray"
        } else {
            refPre.current.style.color = "black"
            refPre.current.style.pointerEvents = "auto"
            refNext.current.style.color = "black"
            refNext.current.style.pointerEvents = "auto"
        }
    }, [page, countElements, rowsPerPage])
}
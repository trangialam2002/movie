import {useEffect, useState} from 'react'

function useDebounce(value,delay) {
    const [debounce,setDebounce]=useState(value)
    console.log('2');
    useEffect(()=>{
        console.log('debounce render');
        const id=setTimeout(()=>{
            setDebounce(value)
        },delay) 
        
        return ()=>{
            clearTimeout(id)
        }
    },[value])
    return ( debounce );
}

export default useDebounce;
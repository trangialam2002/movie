import clsx from 'clsx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faClose, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import ItemPlaying from '../NowPlaying/ItemPlaying/ItemPlaying';
import styles from './movie.module.scss'
import { useEffect, useRef, useState } from 'react';
import useDebounce from './Hook/useDebounce';


function Movie() {
    const searchRef=useRef()
    const [value,setValue]=useState('')
    const [loading,setLoading]=useState(false)
    const [close,setClose]=useState(false)
    console.log('1');
    const debounce=useDebounce(value,1000)

    useEffect(()=>{
        console.log('chính render');
    })

    const handleClose=()=>{
        console.log('đã click');
        setValue('')
        setClose(false)
    }

    return ( 
        <div className={clsx(styles.movie)} draggable="false">
            <div className={clsx(styles.searchMovie)} draggable="false">
                <div className={styles.input}>
                    <input type="text" placeholder='Enter value to search movies here...'
                        value={value}
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setLoading(true)
                            setClose(false)
                            searchRef.current.setIsActive(1)
                            searchRef.current.setStartCount(0)
                            searchRef.current.setEndCount(5)
                        }}
                     />
                     <span onClick={handleClose} className={styles.close} style={{opacity:`${close?1:0}`}}>
                        <FontAwesomeIcon icon={faClose}/>
                    </span>
                     <FontAwesomeIcon icon={faSpinner} className={styles.spinner} style={{opacity:`${loading?1:0}`}} />
                </div>
                <button>
                    <FontAwesomeIcon icon={faSearch} className={clsx(styles.iconSearch)}/>
                </button>
            </div>
            <ItemPlaying type='popular' ref={{searchRef}} grid debounce={debounce} close={{loading,setLoading,setClose}}/>

        </div>
     );
}

export default Movie;
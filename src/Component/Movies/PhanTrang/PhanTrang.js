import styles from './phanTrang.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function PhanTrang({isActive,setIsActive,sumPage,next}) {
    const count=sumPage<22?sumPage:22
    const add=5
    const arr=new Array(count)
    for(let i=0;i<arr.length;i++){
        arr.fill(i+1,i,i+1)
    }
    
    const [startCount,setStartCount]=useState(0)
    const [endCount,setEndCount]=useState(add)
    next.setStartCount=setStartCount
    next.setEndCount=setEndCount
    const handleClickPage=item=>{
        setIsActive(item)
    }
    const handlePrevPage=()=>{
        if(isActive>startCount+1){
            setIsActive(prev=>prev-1)
        }
        else{
            const n=endCount%add
            // if(n!==0){
            //     setStartCount(prev=>prev-add)
            //     setEndCount(prev=>prev-n)
            //     setIsActive(prev=>prev-1)
            // }
            // else if(startCount>0&&endCount>5&&n===0){
                setStartCount(prev=>prev-add)
                setEndCount(prev=>prev-add)
                setIsActive(prev=>prev-1)
            // }
        }
    }
    const handleNextPage=()=>{
        if(isActive<endCount){
            setIsActive(prev=>prev+1)
        }
        else{
            // if(endCount+add>=count){
            //     setStartCount(endCount)
            //     setEndCount(count)
            //     setIsActive(prev=>prev+1)
            // }
            // else{
                setStartCount(prev=>prev+add)
                setEndCount(prev=>prev+add)
                setIsActive(prev=>prev+1)
            // }
        }
    }
    return ( 
        <div className={styles.pages}>
            {
                startCount>0&&<span className={styles.left} onClick={handlePrevPage} draggable="false">
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                </span>
            }
            <ul className={styles.countPage}>
                {startCount>0&&<strong>...</strong>}
                {
                   arr.slice(startCount,endCount).map((item,index)=>(
                    <li onClick={()=>handleClickPage(item)} key={index} className={isActive===item?styles.active:''}>
                        {item}
                    </li>
                   )) 
                }
                {endCount<count&&<strong>...</strong>}
            </ul>
            {
                endCount<count&&<span className={styles.right} onClick={handleNextPage} draggable="false">
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </span>
            }
        </div>
     );
}

export default PhanTrang;
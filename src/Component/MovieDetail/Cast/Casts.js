import { useEffect, useRef, useState } from 'react';
import styles from './cast.module.scss'
import * as request from '../../API/RequestAPI'


function Casts({id}) {
    const [data,setData]=useState([])
    const dragRef=useRef()
    let start=0
    let end=0
    useEffect(()=>{
        request.customGet(`${id}/credits`,{
            params:{
                api_key:"95f2419536f533cdaa1dadf83c606027"
            }
        }).then(res=>{
            setData(res.cast)
        })
    },[id])

    const handleDragStart=e=>{
        start=e.screenX
    }
    const handleDragEnd=e=>{
        end=e.screenX
        
        if(end>start){
            dragRef.current.scrollLeft-=(end-start)
        }
        else if(end-start<0){
            dragRef.current.scrollLeft+=(start-end)
        }
    }
    return ( 
        <div className={styles.listCasts} draggable="true" 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            ref={dragRef}
            >
            {
                data&&data.slice(0,10).map((item,index)=>(
                    <div className={styles.itemCast} key={index} draggable="false">
                        <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt="" draggable="false"/>
                        <p>{item.name}</p>
                    </div>
                ))
            }
        </div>
     );
}

export default Casts;
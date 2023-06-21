import { useEffect, useRef, useState } from 'react';
import * as request from '../../API/RequestAPI'
import styles from "./trailer.module.scss"
function Trailer({id}) {
    const [data,setData]=useState([])
    useEffect(()=>{
        request.customGet(`${id}/videos`,{
            params:{
                api_key:"95f2419536f533cdaa1dadf83c606027"
            }
        }).then(res=>{
            setData(res.results)
            console.log("data=>",res);
        })
    },[id])

    return ( 
        <div className={styles.listTrailer}>
            {
                data.slice(0,2).map((item,index)=>(
                    <div className={styles.trailer} key={index}>
                        <h3>{item.name}</h3>
                        <iframe width="885" height="498" src={`https://www.youtube.com/embed/${item.key}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                ))
            }
        </div>
     );
}

export default Trailer;
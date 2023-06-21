import {useParams} from "react-router-dom"
import * as request from '../API/RequestAPI'
import { useEffect, useState } from "react"
import clsx from "clsx"
import styles from './movieDetail.module.scss'
import Casts from "./Cast/Casts"
import Trailer from "./VideoTrailer/Trailer"
import SimilarMovie from "./Similar/SimilarMovie"


function MovieDetail() {
    const {movieId}=useParams()
    const [detail,setDetail]=useState({})
    
    useEffect(()=>{
        console.log('re-render');
        request.customGet(`${movieId}`,{
            params:{
                api_key:"95f2419536f533cdaa1dadf83c606027"
            }
        }).then(data=>{
            setDetail(data)
            console.log(data);
        })
    },[movieId])

    return ( 
            detail.id&&(
                <>
                    <div className={clsx(styles.detail)} style={{backgroundImage:`url('https://image.tmdb.org/t/p/original/${detail.backdrop_path}')`}}>
                        <div className={clsx(styles.avatar)}>
                            <img src={`https://image.tmdb.org/t/p/original/${detail.poster_path}`} alt="/"/>
                        </div>
                    </div>
                    <h3 className={styles.h3}>{detail.title}</h3>
                    <div className={styles.listType}>
                        <ul>
                            {detail.genres.length>0&&detail.genres.map((item,index)=>(
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <p className={styles.p}>{detail.overview}</p>
                    <Casts id={movieId}/>
                    <Trailer id={movieId}/>
                    <SimilarMovie id={movieId} ref={{}}/>
                </>
            
            )
     );
}

export default MovieDetail;
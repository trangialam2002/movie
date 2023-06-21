import clsx from "clsx";
import styles from './similar.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar,faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons'
import Button from "../../Button/Button";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import request,* as request1 from "../../API/RequestAPI";
import {useNavigate} from 'react-router-dom'

function SimilarMovie(props,ref={}) {
    const [data,setData]=useState([])
    const divRef=useRef()
    const imageRef=useRef()
    let start=0
    let end=0
    
    const handleDragStart=e=>{
        // console.log(e.screenX)
        start=e.screenX
    }
    const handleDragEnd=e=>{
        end=e.screenX
        if(end>start){
            divRef.current.scrollLeft-=(end-start)
        }
        else if(end-start<0){
            divRef.current.scrollLeft+=(start-end)
        }
    }

    useEffect(()=>{
        const handleGetAPI=async()=>{
            const data=await request1.customGet(`${props.id}/similar`,{
                params:{
                    api_key:"95f2419536f533cdaa1dadf83c606027"
                }
            })
            console.log(data.results)
            setData(data.results)
        }
        handleGetAPI()
    },[props.id])

    const handleNavigate=useNavigate()
    return ( 
        <>
            <h3 className={styles.h3}>Similar Movies</h3>
            <div className={clsx(styles.boxPlaying)} 
                    draggable="true" 
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    ref={divRef}
                    >
                    {
                        data&&data.map((item,index)=>(
                            <div className={clsx(styles.SimilarMovie)} draggable="false" ref={imageRef} key={index}>
                                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="/" draggable="false" />
                                <span className={clsx(styles.plus)}><FontAwesomeIcon icon={faPlus} /></span>
                                <p>{item.title}</p>
                                <div className={clsx(styles.point)}>
                                    <span>{new Date(item.release_date).getFullYear()}</span>
                                    <span>{item.vote_average} <FontAwesomeIcon icon={faStar} className={clsx(styles.star)}/></span>
                                </div>
                                <div className={clsx(styles.watch)}>
                                    <Button title="Watch now" width="100%" height="40px" 
                                    onClick={()=>{handleNavigate(`/movie/${item.id}`)}}
                                    />
                                    <FontAwesomeIcon icon={faPlayCircle} className={clsx(styles.iconWatch)}/>
                                </div>
                            </div>
                        ))
                    }
                    
            </div>
        </>
     );
}

export default forwardRef(SimilarMovie);
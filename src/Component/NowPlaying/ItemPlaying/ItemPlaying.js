import clsx from "clsx";
import styles from './itemPlaying.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar,faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons'
import Button from "../../Button/Button";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import request,* as request1 from "../../API/RequestAPI";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import PhanTrang from "../../Movies/PhanTrang/PhanTrang";
import LoadSkeleton from "../../LoadSkeleton/LoadSkeleton";

function ItemPlaying(props,objRef={}) {
    const [isActive,setIsActive]=useState(1)
    const [sumPage,setSumPage]=useState(1)
    const [data,setData]=useState([])
    const divRef=useRef()
    const imageRef=useRef()
    let start=0
    let end=0
    objRef.searchRef?objRef.searchRef.current={setIsActive}:objRef.searchRef=''
    console.log('debounce-render',props.debounce);
    useImperativeHandle(objRef.itemRef,()=>{
        return divRef.current
    })
    useImperativeHandle(objRef.imgRef,()=>{
        return imageRef.current
    })
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
            if(!props.debounce){
                console.log('ko có debounce');
                const data=await request1.customGet(props.type,{
                    params:{
                        api_key:"95f2419536f533cdaa1dadf83c606027",
                        page:isActive
                    }
                })
                console.log("data",data)
                setSumPage(data.total_pages)
                setData(data.results)
                props.close?.setLoading(false)
            }else{
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=95f2419536f533cdaa1dadf83c606027&query=${props.debounce}&page=${isActive}`)
                .then(res=>{
                    console.log('debounce:',res);
                    // setData(res.data.results) áp dụng cho phân trang
                    setSumPage(res.data.total_pages)
                    setData(prev=>[...prev,...res.data.results])
                    props.close.setLoading(false)
                    props.close.setClose(true)  
                })
            }
        }
        handleGetAPI()
    },[props.type,props.debounce,isActive])

    const handleNavigate=useNavigate()
    
    return ( 
        <>
                <div className={!props.grid?clsx(styles.boxPlaying):clsx(styles.boxPlaying,styles.boxPlaying2)} 
                    draggable={`${!props.grid?'true':'false'}` }
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    ref={divRef}
                    >
    
                    {!props.close?.loading?
                        data&&data.map((item,index)=>(
                            <div className={clsx(styles.itemPlaying)} draggable="false" ref={imageRef} key={index}>
                               
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
                        )):
                        new Array(20).fill(0).map((item,index)=>(
                            <div className={clsx(styles.itemPlaying)} draggable="false" ref={imageRef} key={index}>
                                <LoadSkeleton width="100%" height="55%"/>
                                <span className={clsx(styles.plus)}>
                                    <LoadSkeleton width="100%" height="100%"/>
                                </span>
                                <p><LoadSkeleton width="100%" height="100%"/></p>
                                <div className={clsx(styles.point)}>
                                    <span><LoadSkeleton width="100%" height="100%"/></span>
                                    <span><LoadSkeleton width="100%" height="100%"/></span>
                                </div>
                                <div className={clsx(styles.watch)}>
                                    <Button width="100%" height="40px">
                                        <LoadSkeleton width="100%" height="100%"/>
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            {props.grid&&!props.debounce&&<PhanTrang isActive={isActive} setIsActive={setIsActive} sumPage={sumPage} next={objRef.searchRef.current}/>}
            {props.grid&&props.debounce&&isActive<sumPage&&
            <button className={styles.more} onClick={handleClickLoadMore}>Load more</button>}
        </>
     );

     function handleClickLoadMore(){
        setIsActive(prev=>prev+1)

     }
}

export default forwardRef(ItemPlaying);
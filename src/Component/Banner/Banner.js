import styles from "./banner.module.scss"
import clsx from 'clsx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ItemBanner from "./ItemBanner";
import { useEffect, useRef, useState } from "react";
import * as request from "../API/RequestAPI"

function Banner() {
    const leftRef=useRef()
    const rightRef=useRef()
    const [arr,setArr]=useState([])
    let vitri=0

    useEffect(()=>{
        request.customGet("upcoming",{
            params:{
                api_key:"95f2419536f533cdaa1dadf83c606027"
            }
        }).then(data=>{setArr(data.results)})
    },[])

    const handleLeft=e=>{
        // console.log(leftRef.current);
        const listItemBanner=document.querySelectorAll(`.${clsx(styles.itemBanner)}`)
        if(vitri===0){
            vitri=arr.length-1
        }
        else if(vitri>0){
            vitri--
        }
        listItemBanner.forEach((item,index)=>{
            item.classList.remove(clsx(styles.itemBannerShow))
        })
        listItemBanner[vitri].classList.add(clsx(styles.itemBannerShow))
        console.log('vitri:',vitri);
        console.log('item:',listItemBanner[vitri].classList);

        
    }
    const handleRight=e=>{
        const listItemBanner=document.querySelectorAll(`.${clsx(styles.itemBanner)}`)
        
        if(vitri<arr.length-1){
            vitri++
        }
        else if(vitri===arr.length-1){
            vitri=0
        }
        listItemBanner.forEach((item,index)=>{
            item.classList.remove(clsx(styles.itemBannerShow))
        })
        listItemBanner[vitri].classList.add(clsx(styles.itemBannerShow))

    }
    return ( 
        <div className={clsx(styles.banner)}>
            <div className={clsx(styles.listItemBanner)}>
            {
                arr.length>0&&arr.map((item,index)=>(
                    index==0?
                    <ItemBanner key={index} title={item.title} img={item.poster_path} show/>
                    :<ItemBanner key={index} title={item.title} img={item.poster_path}/> 
                ))
            }
            </div>
            <div className={clsx(styles.chevron)}>
                <FontAwesomeIcon icon={faChevronLeft} className={clsx(styles.iconLeft)} 
                onClick={handleLeft} ref={leftRef}/>
                <FontAwesomeIcon icon={faChevronRight} className={clsx(styles.iconRight)} 
                onClick={handleRight} ref={rightRef} />
            </div>
        </div>
     );
}

export default Banner;

import { useRef } from "react";
import ItemPlaying from "../ItemPlaying/ItemPlaying";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import styles from '../nowPlaying.module.scss'
import clsx from 'clsx'

function BoxPlaying({type,title}) {
    const itemRef=useRef()
    const imgRef=useRef()

    const handleLeft=e=>{
        if(itemRef.current.scrollLeft>0){
            console.log("left");
            itemRef.current.scrollLeft-=imgRef.current.offsetWidth*2
        }
    }
    const handleRight=e=>{
        itemRef.current.scrollLeft+=imgRef.current.offsetWidth*2
        console.log('scrollWidth:',itemRef.current.scrollWidth);
        console.log('clientWidth:',itemRef.current.clientWidth);
        console.log('scrollLeft:',parseInt(itemRef.current.scrollLeft));
        if(parseInt(itemRef.current.clientWidth)+parseInt(itemRef.current.scrollLeft)===itemRef.current.scrollWidth){
            itemRef.current.scrollLeft=0
            console.log('ok');
        }
    }

    return ( 
        <div className={clsx(styles.Playing)}>
            <div className={clsx(styles.topPlaying)}>
                <h3>{title}</h3>
                <div className={clsx(styles.left_right)}>
                    <FontAwesomeIcon icon={faChevronLeft} className={clsx(styles.left)} onClick={handleLeft}/>
                    <FontAwesomeIcon icon={faChevronRight} className={clsx(styles.right)} onClick={handleRight}/>
                </div>
            </div>
            <ItemPlaying ref={{itemRef,imgRef}} type={type}/>
        </div>
     );
}

export default BoxPlaying;
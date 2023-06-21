import Button from "../Button/Button";
import styles from "./banner.module.scss"
import clsx from 'clsx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle } from '@fortawesome/free-solid-svg-icons'


const ItemBanner=({title,img,show} )=> {
    return ( 
        <div className={show?clsx(styles.itemBanner,styles.itemBannerShow):clsx(styles.itemBanner)} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${img})`}}>
                <h1>{title}</h1>
                <div className={clsx(styles.button)}>
                    <button>Action</button>
                    <button>Adventure</button>
                    <button>Drama</button>
                </div>
                <div className={clsx(styles.watch)}>
                    <Button title="Watch" width="105%" height="100%"/>
                    <FontAwesomeIcon icon={faPlayCircle} className={clsx(styles.iconWatch)}/>
                </div>
            </div>
     );
}

export default ItemBanner;
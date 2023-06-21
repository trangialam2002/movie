import styles from './loadSkeleton.module.scss'
function LoadSkeleton({width,height}) {
    return ( 
        <div className={styles.skeleton} style={{width:width,height:height}}>
            
        </div>
     );
}

export default LoadSkeleton;
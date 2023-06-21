import styles from './button.module.scss'
function Button({width,height,title,...props}) {
    return ( 
        <button className={styles.button} style={{width:width,height:height}} {...props}>{title}</button>
     );
}

export default Button;
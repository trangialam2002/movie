import clsx from 'clsx'
import styles from './header.module.scss'
import { NavLink } from 'react-router-dom';


function Header() {
    return ( 
        <div className={clsx(styles.menu)}>
            <NavLink to='/' className={({isActive})=>isActive?clsx(styles.active):''}>Home</NavLink>
            <NavLink to='/movies' className={({isActive})=>isActive?clsx(styles.active):''}>Movies</NavLink>
        </div>
     );
}

export default Header;
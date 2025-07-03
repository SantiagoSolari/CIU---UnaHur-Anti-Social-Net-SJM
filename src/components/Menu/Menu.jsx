import { Link } from 'react-router-dom'
import styles from './Menu.module.css'


const Menu = () => {
  return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li>
                <Link to="/Home" className={styles.navLink}>Home</Link>
                </li>
                <li>
                <Link to="/perfilUsuario" className={styles.navLink}>Perfil</Link>
                </li>
                <li>
                <Link to="/Crear-Post" className={styles.navLink}>Crear Post</Link>
                </li>
                <li>
                <Link to="/Login" className={styles.navLink}>Login</Link>
                </li>
            </ul>
        </nav>
  )
}

export default Menu
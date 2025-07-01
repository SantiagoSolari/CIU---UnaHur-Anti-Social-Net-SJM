import { Link } from 'react-router-dom'

const Menu = () => {
  return (
        <nav className="p-3 mb-2 bg-body-tertiary">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link to="/Inicio" className="nav-link">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/perfilUsuario" className="nav-link">Perfil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Login" className="nav-link">Login</Link>
                </li>
            </ul>
        </nav>    
  )
}

export default Menu
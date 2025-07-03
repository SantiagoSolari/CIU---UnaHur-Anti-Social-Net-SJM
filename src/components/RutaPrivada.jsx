import { useUserContext } from '../context/UserContext'
import { Alert } from 'react-bootstrap'

export function RutaPrivada({ children }){
    const { usuario } = useUserContext()

    if(!usuario) return <Alert variant='warning'>Debe iniciar sesión para acceder a la red social</Alert>
    return children
}

export default RutaPrivada
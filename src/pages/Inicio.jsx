import ModalBienvenida from '../components/ModalBienvenida/ModalBienvenida'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import InfoInicio from '../components/InfoInicio/InfoInicio'

const Inicio = () => {
    const [mostrarModal, setMostrarModal] = useState(false)
    const { usuario } = useContext(UserContext)
    const cerrarModal = () => setMostrarModal(false)
  
    useEffect(() => { setMostrarModal(true) }, [])

    return (
            <>
                <div>
                    <h1>¡Bienvenido/a! a Unahur Antisocial Net</h1>
                    <InfoInicio />
                </div>
                
                <ModalBienvenida 
                    show={mostrarModal} 
                    onHide={cerrarModal} 
                    nickName={usuario?.nickName} 
                />
            </>
        )
}

export default Inicio

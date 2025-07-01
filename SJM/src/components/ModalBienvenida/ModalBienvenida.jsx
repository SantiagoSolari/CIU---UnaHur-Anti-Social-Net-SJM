import { Button, Modal } from 'react-bootstrap'
import './ModalBienvenida.css'

const ModalBienvenida = ({ show, onHide, nickName }) => {

    return (
         <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>¡Bienvenido/a!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hola {nickName}, ¡nos alegra verte de nuevo!</Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={onHide}>
                Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalBienvenida
import { Container, Card, Button, Carousel } from 'react-bootstrap'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from "react-router-dom"
import './InfoInicio.css'

const InfoInicio = () => {
  const { logout } = useUserContext()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    logout()
    navigate("/Login")
  }

  const carouselItems = [
    "Compartí tus ideas",
    "Descubrí publicaciones",
    "Conectate con otros"
  ];

  return (
    <div className="info-wrapper">
      <Container className="info-container">
        <Card.Img 
          variant="top" 
          src="src/assets/ANTI-SOCIALNET.jpeg" 
          className="mini-card-img"
          alt="Logo de la app"
        />

        <Carousel
          interval={3000} 
          controls={false} 
          indicators={true} 
          pause={"hover"}  
          variant="dark"
          style={{ maxWidth: '280px', margin: '0 auto' }} 
        >
          {carouselItems.map((text, idx) => (
            <Carousel.Item key={idx}>
              <div className="carousel-text fs-4 fw-bold d-flex justify-content-center align-items-center" style={{height: '100px'}}>
                {text}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <Button variant="danger" className="logout-button" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </Container>
    </div>
  )
}

export default InfoInicio

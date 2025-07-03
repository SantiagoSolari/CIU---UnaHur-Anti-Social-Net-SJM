import { Container, Card, Carousel } from 'react-bootstrap'
import './InfoInicio.css'

const InfoInicio = () => {

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
      </Container>
    </div>
  )
}

export default InfoInicio

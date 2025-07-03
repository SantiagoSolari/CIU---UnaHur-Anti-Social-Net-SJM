import { Container, Row, Col } from 'react-bootstrap' 
import imagenSobrenosotros from '../../assets/img1.jpg'

const SobreNosotros = () => {
  return (
    <section className="sobre-nosotros bg-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src={imagenSobrenosotros}
              alt="Nuestro equipo"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={6}>
            <h2>Sobre Nosotros</h2>
            <p>
              Equipo de desarrolladores enfocados en brindar una experiencia de usuario agradable.
            </p>
            <p>
              Trabajamos con compromiso para ofrecer interfaces de buena calidad que satisfagan
              las necesidades de nuestros clientes.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SobreNosotros

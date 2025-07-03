import { Container, Row, Col } from 'react-bootstrap'
import imagenSobrenosotros from '../../assets/img1.jpg'
import styles from './SobreNosotros.module.css'

const SobreNosotros = () => {
  return (
    <section className={styles.sobreNosotros}>
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src={imagenSobrenosotros}
              alt="Nuestro equipo"
              className={styles.imagen}
            />
          </Col>
          <Col md={6} className={styles.texto}>
            <h2 className={styles.titulo}>Sobre Nosotros</h2>
            <p className={styles.parrafo}>
              Equipo de desarrolladores enfocados en brindar una experiencia de usuario agradable.
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

import Publicaciones from "../components/Publicaciones/Publicaciones"
import { Container } from "react-bootstrap"
import SobreNosotros from "../components/SobreNosotros/Sobrenosotros"
import Inicio from './Inicio'

const Home = () => {
  return (
      <Container className="text-center py-4">
        <Inicio />
        <hr />
        <Publicaciones />
        <hr />
        <SobreNosotros />
      </Container>
  )
}


export default Home

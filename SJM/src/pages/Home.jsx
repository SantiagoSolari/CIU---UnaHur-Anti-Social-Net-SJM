import Publicaciones from "../components/Publicaciones/Publicaciones"
import { Container } from "react-bootstrap"

const Home = () => {
  return (
      <Container className="text-center py-4">
        <h1>Feed de publicaciones</h1>
        <Publicaciones />
      </Container>
  )
}


export default Home

import { Container, Button, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import styles from './Login.module.css'

export default function Login() {
  const { login } = useUserContext()
  const [nickName, setNickname] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [usuarios, setUsuarios] = useState([])
  const navigate = useNavigate()

  //Get usuarios
  useEffect(() => {
    async function obtenerUsuarios() {
      try{
        const res = await fetch("http://localhost:3001/users")
        const listaUsuarios = await res.json()
        setUsuarios(listaUsuarios)
      } catch(error) {
        console.error(error.message)
      }
    }
    obtenerUsuarios()
  }, [])

  //Verifico usuario
  const manejarLogin = (e) => {
    e.preventDefault()
    const usuarioEncontrado = usuarios.find(u => u.nickName===nickName)
    
    if(!usuarioEncontrado){
      alert("Debe registarse en Unahur Antisocial Net")
      return
    }
    if(contraseña !== "123456"){
      alert("La contraseña es incorrecta")
      return
    }
    console.log(usuarioEncontrado)
    login(usuarioEncontrado)
    navigate("/Home")
  }

  //Redireccion a registro de usuario
  const registrarse = () => {
    navigate("/Registro")
  }

  return (
    <Container fluid className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <Form onSubmit={manejarLogin}>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNickname(e.target.value)}
              placeholder="nombre de usuario"
            />
          </Form.Group>

          <Form.Group className={"mb-3"} controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Recordar contraseña" />
          </Form.Group>

          <div className={styles.botonesWrapper}>
            <Button variant="outline-dark" onClick={registrarse}>
              Registrarse
            </Button>
            <Button variant="dark" type="submit">
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </div>
    </Container>

  )
}

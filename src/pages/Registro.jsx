import { Container, Button, Form, Alert } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Registro = () => {
  const [nickName, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [usuarios, setUsuarios] = useState([])
  const navigate = useNavigate()

  
  useEffect(() => {
      async function obtenerUsuarios() {
        try{
          const res = await fetch("http://localhost:3001/users")
          const listaUsuarios = await res.json()
          setUsuarios(listaUsuarios)
        } catch(error) {
          console.log(error.message)
        }
      }
      obtenerUsuarios()
    }, [])

  //Validar datos de usuario y crearlo
  const validarRegistro = async(e) => {

    e.preventDefault();
    const nicknameExiste = usuarios.some((u) => u.nickName === nickName)

    if(nicknameExiste){
        alert('El nickName ingresado ya existe')
        return
    }

    try {
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickName, email }),
      });

      const data = await res.json();
      console.log('Usuario creado:', data);

      setNickname('');
      setEmail('');
      navigate("/Login")
    } catch (error) {
      console.error('Error al crear usuario:', error.message);
    }
 
  }


  return (
    <Container className="d-flex justify-content-center mt-5">
        <Form onSubmit={validarRegistro}>

            <Form.Group  md="4" controlId="validationCustom01">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" onChange={(e) => setNickname(e.target.value) } placeholder="nombre de usuario" />
                </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={(e) => setEmail(e.target.value) } placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recordar contraseña" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Registrarse
            </Button>
        </Form>
      
    </Container>
  )
}

  
export default Registro
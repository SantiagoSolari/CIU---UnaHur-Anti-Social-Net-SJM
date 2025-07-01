import { useState, useEffect } from "react"
import { UserContext } from "./UserContext"

export default function UserProvider({ children }){
  const [usuario, setUsuario] = useState(null)

  //Recupero usuario guardado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    if(usuarioGuardado){
      setUsuario(JSON.parse(usuarioGuardado))
    }
    console.log(JSON.parse(usuarioGuardado))
  }, [])

  //Guardo en LocalStorage login
  const login = (usuario) => {
    setUsuario( usuario )
    localStorage.setItem('usuario', JSON.stringify(usuario))
    console.log(usuario)
  }

  //Cierro sesión
  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  return (
    <UserContext.Provider value={{ usuario, login, logout}}>
      {children}
    </UserContext.Provider>
  )
}
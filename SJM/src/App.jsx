import { UserProvider }from './context/UserContent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (

    <UserProvider >
      <BrowserRouter>
        <Routes > 
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={<DetallePublicacion />} />
          <Route path="/perfilUsuario" element={<PerfilUsuario />} />
        </Routes>
      
      </BrowserRouter>
    </UserProvider>
  )
}

export default App

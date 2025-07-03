import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Login from './pages/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider from './context/UserProvider'
import Registro from './pages/Registro/Registro'
import RutaPrivada from './components/RutaPrivada'
import UserProfile from './pages/UserProfile/UserProfile'
import CrearPost from './pages/CrearPost'
import Home from './pages/Home'
import Publicacion from './components/Publicaciones/Publicacion'

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className='page-container'>
          <Header />
          <Routes > 
            <Route path="/Login" element={ <Login /> } />
              
            <Route path='/Home' element={ 
              <RutaPrivada>
                <Home />
              </RutaPrivada>
            } />
              
            <Route path='/post/:id' element={<Publicacion />} />
            
            <Route path='/Registro' element={ <Registro />} />

            <Route path='/perfilUsuario' element={ 
              <RutaPrivada>
                <UserProfile />
              </RutaPrivada>
            } />

            <Route path='/Crear-Post' element={
              <RutaPrivada>
                <CrearPost />
              </RutaPrivada>
            }/>
            
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
      
  )
}

export default App

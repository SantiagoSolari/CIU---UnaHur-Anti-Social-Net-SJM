import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider from './context/UserProvider'
import Registro from './pages/Registro'
import RutaPrivada from './components/RutaPrivada'

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className='page-container'>
          <Header />
          <Routes > 
            <Route path="/Login" element={ <Login /> } />
           
            <Route path='/Inicio' element={ 
              <RutaPrivada>
                <Inicio />
              </RutaPrivada>
            } />
            
            <Route path='/Registro' element={ <Registro />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
      

  )
}

export default App

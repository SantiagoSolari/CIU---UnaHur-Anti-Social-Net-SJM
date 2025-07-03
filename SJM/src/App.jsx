import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
//import { UserProvider } from './context/UserContent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Publicacion from './components/Publicaciones/Publicacion'


const App = () => {
  return (
    //<UserProvider >
      <BrowserRouter>
        <Header />
        <Routes >
          <Route path='/' element={<Home />}></Route>
          <Route path='/post/:id' element={<Publicacion />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    //</UserProvider>
  )
}

export default App

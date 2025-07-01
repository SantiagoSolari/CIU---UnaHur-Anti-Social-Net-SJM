import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
//import { UserProvider } from './context/UserContent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    //<UserProvider >
      <BrowserRouter>
        <Header />
        <Routes >
        </Routes>
        <Footer />
      </BrowserRouter>
    //</UserProvider>
  )
}

export default App

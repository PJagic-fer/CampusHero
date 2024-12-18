import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Guides from './Components/Guides/Guides'
import Mapa from './Components/Mapa/Mapa'
import Modal from './Components/Modal/Modal'
import Title from './Components/Title/Title'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import Expiriences from './Components/Expiriences/Expiriences'
import Domovi from './Pages/Domovi/Domovi'
import Domovi_Info from './Pages/Domovi/Info'
import Faks from './Pages/Fakulteti/Faks'
import Faks_Info from './Pages/Fakulteti/Info'
import Prijevoz from './Pages/JavniPrijevoz/JavniPrijevoz'
import Prijevoz_Info from './Pages/JavniPrijevoz/Info'
import Menze from './Pages/Menze/Menze'
import Menze_Info from './Pages/Menze/Info'
import Buddy from './Pages/Buddy/Buddy'
import Buddy_Info from './Pages/Buddy/Info'
import PostCard from './Components/Guides_forum/guides_forum'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
      {location.pathname === '/' && (
        <>
          <Hero />
        </>
      )}
      {location.pathname === '/Domovi' && (
        <>
          <Domovi />
        </>
      )}
      {location.pathname === '/Fakulteti' && (
        <>
          <Faks />
        </>
      )}
      {location.pathname === '/JavniPrijevoz' && (
        <>
          <Prijevoz />
        </>
      )}
       {location.pathname === '/Menze' && (
        <>
          <Menze />
        </>
      )}
       {location.pathname === '/Buddy' && (
        <>
          <Buddy />
        </>
      )}
        <div className="container">
          <Switch>
            <Route path="/Domovi">
              <Domovi_Info/>
            </Route>
            <Route path="/Fakulteti">
              <Faks_Info/>
            </Route>
            <Route path="/JavniPrijevoz">
              <Prijevoz_Info/>
            </Route>
            <Route path="/Menze">
              <Menze_Info/>
            </Route>
            <Route path="/Buddy">
              <Buddy_Info/>
            </Route>
            <Route exact path="/">
              <Guides/>
              <Mapa/>
              <Title subTitle='ISKUSTVA' title='Što kažu studenti'/>
              <Expiriences/>
              <Title subTitle='KONTAKTIRAJ NAS' title= 'Trebaš pomoć?'/>
              <Contact/>
              <Footer/>
            </Route>
          </Switch> 
        </div>
        <Modal/>
      </div>
    </Router>
  )
}

export default App
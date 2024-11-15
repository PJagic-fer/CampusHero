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
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
        <Guides/>
        <Mapa/>
        <Title subTitle='ISKUSTVA' title='Što kažu studenti'/>
        <Expiriences/>
        <Title subTitle='KONTAKTIRAJ NAS' title= 'Trebaš pomoć?'/>
        <Contact/>
        <Footer/>
      </div>
      <Modal/>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import Modal from '../Modal/Modal'

const Navbar = () => {

  const [sticky, setSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 750 ? setSticky(true) : setSticky(false);
    })
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  const goToSurivivalGuide = () => {
    window.scrollTo({
      top: 750
    })
  }

  const goToMap = () => {
    window.scrollTo({
      top: 2000
    })
  }
  
  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
        <div className='logo-div' onClick={goToTop}>
        <img src={logo} alt="Logo" className='logo'/>
        <span className='logo-text'>Campus Hero</span>
        </div>
        <ul>
            <li onClick={goToSurivivalGuide}>Survival Guide</li>
            <li onClick={goToMap}>Mapa</li>
            <li>Novosti</li>
            <li>Kontaktiraj nas</li>
            <li><button className='button' onClick={() => setIsModalOpen(true)}>Prijavi se!</button></li>
        </ul>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </nav>
  )
}

export default Navbar

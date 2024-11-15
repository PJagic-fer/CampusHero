import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import Modal from '../Modal/Modal'
import { Link } from 'react-scroll'
import menu_icon from '../assets/menu-icon.png'

const Navbar = () => {

  const [sticky, setSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user , setUser] = useState("");

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 200 ? setSticky(true) : setSticky(false);
    })
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false): setMobileMenu(true);
  }
  
  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
        <div className='logo-div'>
        <a href='/'><img src={logo} alt="Logo" className='logo'/></a>
        <a href='/'><span className='logo-text'>Campus Hero</span></a>
        </div>
        <ul className={mobileMenu?'':'hide-mobile-menu'}>
            <li><Link to='guides' smooth={true} offset={-110} duration={500}>Survival Guide</Link></li>
            <li><Link to="mapa" smooth={true} offset={-200} duration={500}>Mapa</Link></li>
            <li><Link to="iskustva" smooth={true} offset={-410} duration={500}>Iskustva</Link></li>
            <li><Link to="contact" smooth={true} offset={0} duration={500}>Kontaktiraj nas</Link></li>
            <li> {user ? (
            <span>Pozdrav!</span> // Prikazujemo "Pozdrav!" ako je korisnik prijavljen
          ) : (
            <button className='button' onClick={() => setIsModalOpen(true)}>
              Prijavi se!
            </button>
          )}</li>
        </ul>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setUser={setUser}/>
        <img src={menu_icon} alt='' className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar

import React, { useEffect, useState, useContext } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import Modal from '../Modal/Modal'
import { Link } from 'react-scroll'
import { Link as LinkPage} from 'react-router-dom'
import menu_icon from '../assets/menu-icon.png'
import { AppStateContext } from '../../context/AppStateProvider'


const Navbar = () => {

  const [sticky, setSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(AppStateContext);

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
        <LinkPage to='/'><img src={logo} alt="Logo" className='logo'/></LinkPage>
        <LinkPage to='/'><span className='logo-text'>Campus Hero</span></LinkPage>
        </div>
        <ul className={mobileMenu?'':'hide-mobile-menu'}>
            <li><Link to='guides' smooth={true} offset={-110} duration={500}>Survival Guide</Link></li>
            <li><Link to='mapa' smooth={true} offset={-200} duration={500}>Mapa</Link></li>
            <li><Link to='iskustva' smooth={true} offset={-410} duration={500}>Iskustva</Link></li>
            <li><Link to='contact' smooth={true} offset={0} duration={500}>Kontaktiraj nas</Link></li>
            <li> {user.name ? (
            <button className='button'><LinkPage to='/Profil'>Pozdrav, {user.name}</LinkPage></button> // Prikazujemo "Pozdrav!" ako je korisnik prijavljen
          ) : (
            <button className='button' onClick={() => setIsModalOpen(true)}>
              Prijavi se!
            </button>
          )}</li>
        </ul>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        <img src={menu_icon} alt='' className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar

import React, { useEffect, useState, useContext } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import Modal from '../Modal/Modal'
import { Link } from 'react-router-dom'
import menu_icon from '../assets/menu-icon.png'
import { AppStateContext } from '../../context/AppStateProvider'
import { HashLink } from 'react-router-hash-link';


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

  const scrollWithOffset= (el, id) => {
    let yOffset;
    if (id == "g"){
      yOffset = -100;
    }
    else if (id == "m"){
      yOffset = -200;
    }
    else if (id == "e"){
      yOffset = -400;
    }
    else{
      yOffset = 0;
    }
     
    setTimeout( () => window.scrollTo({ top: el.offsetTop + yOffset, behavior: 'smooth' }), 50);
}
  
  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
        <div className='logo-div'>
        <Link to='/'><img src={logo} alt="Logo" className='logo'/></Link>
        <Link to='/'><span className='logo-text'>Campus Hero</span></Link>
        </div>
        <ul className={mobileMenu?'':'hide-mobile-menu'}>
            <li><HashLink to='/#guides' scroll={el => scrollWithOffset(el, "g")} >Survival Guide</HashLink></li>
            <li><HashLink to='/#mapa'  scroll={el => scrollWithOffset(el, "m")} >Mapa</HashLink></li>
            <li><HashLink to='/#experiences'  scroll={el => scrollWithOffset(el, "e")} >Iskustva</HashLink></li>
            <li><HashLink to='/#contact' scroll={el => scrollWithOffset(el, "c")} >Kontaktiraj nas</HashLink></li>
            <li> {user.name ? (
            <button className='button'><Link to='/Profil'>Pozdrav, {user.name}</Link></button> // Prikazujemo "Pozdrav!" ako je korisnik prijavljen
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

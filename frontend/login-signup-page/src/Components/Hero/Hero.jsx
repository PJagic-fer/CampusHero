import React from 'react'
import './Hero.css'
import strelica from "../assets/strelica.png"
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div className='hero container'>
      <div className="hero-text">
        <h1>Sve što ti treba za studentski život na jednom mjestu!</h1>
        <h2 className='h2H'>Postani heroj svog kampusa - otkrij nove prilike, pronađi Buddy-a i olakšaj si studentski život uz CampusHero.</h2>
        <Link to='guides' smooth={true} offset={-300} duration={700}><button className='button'>Istraži više<img src={strelica}></img></button></Link>
      </div>
    </div>
  )
}

export default Hero

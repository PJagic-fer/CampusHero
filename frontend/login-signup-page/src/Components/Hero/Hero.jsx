import React from 'react'
import './Hero.css'
import strelica from '../assets/strelica.png'

const Hero = () => {
  return (
    <div className='hero container'>
      <div className="hero-text">
        <h1>Sve što ti treba za studentski život na jednom mjestu!</h1>
        <h2>Postani heroj svog kampusa - otkrij nove prilike, pronađi Buddy-a i olakšaj si studentski život uz CampusHero.</h2>
        <button className='button'>Istraži više<img src={strelica}></img></button>
      </div>
    </div>
  )
}

export default Hero

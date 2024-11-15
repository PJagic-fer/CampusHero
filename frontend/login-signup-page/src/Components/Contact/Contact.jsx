import React from 'react'
import './Contact.css'
import mail from '../assets/mail.png'
import lokacija from '../assets/lokacija.png'
import mail2 from '../assets/mail2.png'

const Contact = () => {
  return (
    <div className='contact'>
      <div className="contact-col">
        <h3>Pošalji nam poruku <img src={mail}/></h3>
        <p>Slobodno nam šaljite sve upite i probleme, jer naša je misija olakšati vam boravak na kampusu! Bilo da se radi o pitanjima vezanim uz menze, prijevoz, smještaj ili bilo kojim drugim potrebama, tu smo da vam pomognemo.Zajedno gradimo bolji kampus za studente!</p>
        <ul>
            <li><img src={mail2}/>Contact@Campushero.com</li>
            <li><img src={lokacija}/>Sveučilište u Zagrebu, <br/>10000 Zagreb</li>
        </ul>
      </div>
      <div className="contact-col">
        <form>
            <label>Ime</label>
            <input type='text' name='name' placeholder='Upiši svoje ime' required/>
            <label>Broj Mobitela</label>
            <input type='tel' name='phone' placeholder='Upiši broj mobitela' required/>
            <label>Ostavi svoj upit ovdje</label>
            <textarea name='message' id='' cols="30" rows="6" placeholder='Poruka..' required></textarea>
            <button type='submit' className='button dark-button'>Pošalji</button>
        </form>
      </div>
      
    </div>
  )
}

export default Contact

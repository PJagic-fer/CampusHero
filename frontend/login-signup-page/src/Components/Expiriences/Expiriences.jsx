import React, { useRef } from 'react'
import './Expiriences.css'
import next_icon from '../assets/next-icon.png'
import back_icon from '../assets/back-icon.png'
import osoba1 from '../assets/osoba1.jpeg'
import osoba2 from '../assets/osoba2.jpeg'
import osoba3 from '../assets/osoba3.jpeg'
import osoba4 from '../assets/osoba4.jpeg'

const Expiriences = () => {

    const slider = useRef();

    const slideForward = () => {

    }
    const slideBackward = () => {

    }

  return (
    <div className='iskustva'>
      <img src={next_icon} alt='' className='next-btn' onClick={slideForward}/>
      <img src={back_icon} alt='' className='back-btn' onClick={slideBackward}/>
      <div className="slider">
        <ul>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={osoba1} alt=''/>
                        <div>
                            <h3>Ivan Horvat</h3>
                            <span>Fakultet političkih znanosti, 18</span>
                        </div>
                    </div>
                    <p>Kada sam došao u Zagreb, osjećao sam se kao stranac. CampusHero mi je pomogao da se brzo uklopim. Nije samo pomogla s praktičnim stvarima poput vođenja kroz tramvajske linije, nego i s onim manje očiglednim stvarima, kao što su prijedlozi za studentske aktivnosti i događanja. Pomoću nje sam se upoznao s drugim studentima i brzo pronašao svoj ritam u Zagrebu.</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={osoba2} alt=''/>
                        <div>
                            <h3>Ana Matanić</h3>
                            <span>Ekonomski fakultet, 22</span>
                        </div>
                    </div>
                    <p>Kada sam došao u Zagreb, osjećao sam se kao stranac. CampusHero mi je pomogao da se brzo uklopim. Nije samo pomogla s praktičnim stvarima poput vođenja kroz tramvajske linije, nego i s onim manje očiglednim stvarima, kao što su prijedlozi za studentske aktivnosti i događanja. Pomoću nje sam se upoznao s drugim studentima i brzo pronašao svoj ritam u Zagrebu.</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={osoba3} alt=''/>
                        <div>
                            <h3>Kristijan Lovrić</h3>
                            <span>Medicinski fakultet, 20</span>
                        </div>
                    </div>
                    <p>Kada sam došao u Zagreb, osjećao sam se kao stranac. CampusHero mi je pomogao da se brzo uklopim. Nije samo pomogla s praktičnim stvarima poput vođenja kroz tramvajske linije, nego i s onim manje očiglednim stvarima, kao što su prijedlozi za studentske aktivnosti i događanja. Pomoću nje sam se upoznao s drugim studentima i brzo pronašao svoj ritam u Zagrebu.</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={osoba4} alt=''/>
                        <div>
                            <h3>Ante Gavran</h3>
                            <span>Prirodoslovno-matematički fakultet, 20</span>
                        </div>
                    </div>
                    <p>Kada sam došao u Zagreb, osjećao sam se kao stranac. CampusHero mi je pomogao da se brzo uklopim. Nije samo pomogla s praktičnim stvarima poput vođenja kroz tramvajske linije, nego i s onim manje očiglednim stvarima, kao što su prijedlozi za studentske aktivnosti i događanja. Pomoću nje sam se upoznao s drugim studentima i brzo pronašao svoj ritam u Zagrebu.</p>
                </div>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Expiriences

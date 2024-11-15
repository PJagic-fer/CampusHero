import React from 'react'
import './Guides.css'
import guide_1 from '../assets/dom.jpeg'
import guide_2 from '../assets/fakultet.jpeg'
import guide_3 from '../assets/menza_status.jpeg'
import guide_4 from '../assets/javni_prijevoz.jpeg'
import guide_5 from '../assets/buddies.jpeg'
import guide_icon_1 from '../assets/fakultet_icon.png'
import guide_icon_2 from '../assets/dom_icon.png'
import guide_icon_3 from '../assets/menza_icon.png'
import guide_icon_4 from '../assets/transport_icon.png'
import guide_icon_5 from '../assets/buddy_icon.png'

const Guides = () => {
  return (
    <div className='guides'>
        <div className="grupa1">
            <div className="guide">
                <img src={guide_2}></img>
                <div className="caption">
                    <img src={guide_icon_1} ></img>
                    <p>Fakulteti</p>
                </div>
            </div>
            <a href="./Domovi" target="_blank" rel="noopener noreferrer">
                <div className="guide">
                    <img src={guide_1}></img>
                    <div className="caption">
                        <img src={guide_icon_2} ></img>
                        <p>Studentski Domovi</p>
                    </div>
                </div>
            </a>
            <div className="guide">
                <img src={guide_3}></img>
                <div className="caption">
                    <img src={guide_icon_3} ></img>
                    <p>Live Menza</p>
                </div>
            </div>
        </div>
        <div className='grupa2'>
            <div className="guide">
                <img src={guide_4}></img>
                <div className="caption">
                    <img src={guide_icon_4} ></img>
                    <p>Javni Prijevoz</p>
                </div>
            </div>
            <div className="guide">
                <img src={guide_5}></img>
                <div className="caption">
                    <img src={guide_icon_5} ></img>
                    <p>Pronađi Buddy-a</p>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Guides

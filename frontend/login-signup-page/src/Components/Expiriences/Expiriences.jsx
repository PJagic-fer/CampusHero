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
    let tx = 0;

    const slideForward = () => {
        if (tx > -50){
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }
    const slideBackward = () => {
        if (tx < 0){
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }

  return (
    <div className='iskustva'>
      <img src={next_icon} alt='' className='next-btn' onClick={slideForward}/>
      <img src={back_icon} alt='' className='back-btn' onClick={slideBackward}/>
      <div className="slider">
        <ul ref={slider}>
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
                    <p>Campus Hero je moj go-to alat za snalaženje u Zagrebu. Svaka opcija u aplikaciji mi je pomogla da se lakše povežem s kampusom, bilo da se radi o menzama, prijevozu ili studentskim događanjima. Posebno mi je korisna opcija za praćenje gužvi u menzama, što mi štedi vrijeme. Također, forum mi je pomogao da se upoznam s drugim studentima i pronađem odgovore na sva pitanja.</p>
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
                    <p>Campus Hero mi je olakšao snalaženje u Zagrebu. Aplikacija je nevjerojatno korisna za praćenje gužvi u menzama, a informacije o prijevozu i smještaju uvijek imam pri ruci. Forum mi je pomogao da se povežem s drugim studentima, a opcija za praćenje vremena čekanja u menzi mi je svakodnevno olakšavala planiranje. Ne bih mogao zamisliti studiranje bez nje!</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={osoba4} alt=''/>
                        <div>
                            <h3>Patricija Gotovac</h3>
                            <span>Prirodoslovno-matematički fakultet, 20</span>
                        </div>
                    </div>
                    <p>Došavši u Zagreb, bila sam zapanjena koliko je grad velik i kaotičan. CampusHero mi je pomogao da lakše organiziram svoj dan. Prvo sam počela koristiti opciju za pratiti gužve u menzama, a kasnije sam koristila forum za savjete o prijevozu i okupljanju studenata. Oduvijek sam voljela tehnologiju koja me povezuje s drugima, a ova aplikacija stvarno omogućuje sve što mi je trebalo.</p>
                </div>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Expiriences

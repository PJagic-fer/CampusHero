import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Info.css';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider';

const BuddyInfo = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppStateContext); // Dohvaćamo korisnika iz konteksta
  const [isBuddy, setIsBuddy] = useState(false); // Praćenje stanja checkboxa
  const [loading, setLoading] = useState(true); // Praćenje učitavanja stanja
  const [showModal, setShowModal] = useState(false); // Prikazivanje modala

  // Dohvat trenutnog Buddy statusa s backenda prilikom učitavanja komponente
  useEffect(() => {
    const fetchBuddyStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/campus-hero/buddy-status/${user.id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsBuddy(response.data.isBuddy); // Postavljanje trenutnog stanja
        }
      } catch (error) {
        console.error('Greška prilikom dohvaćanja Buddy statusa:', error);
      } finally {
        setLoading(false); // Učitavanje završeno
      }
    };

    if (user.id) {
      fetchBuddyStatus();
    }
  }, [user.id]);

  const handleCheckboxChange = async () => {
    const newBuddyStatus = !isBuddy;
    setIsBuddy(newBuddyStatus); // Ažuriramo lokalno stanje

    try {
      // Slanje zahtjeva na backend
      const response = await axios.post(
        'http://localhost:8080/campus-hero/buddy-status',
        { userId: user.id, isBuddy: newBuddyStatus }, // Prosljeđujemo ID korisnika i stanje checkboxa
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log('Uspješno poslano na backend:', response.data);
      }
    } catch (error) {
      console.error('Greška prilikom slanja statusa na backend:', error);
      alert('Došlo je do greške prilikom ažuriranja Buddy statusa.');
    }
  };

  const handleClick = () => {
    if (!user.name) {
      // Ako korisnik nije prijavljen, prikaži modal
      setShowModal(true);
      return;
    }
    // Ako je prijavljen, navigiramo na BuddyWorld
    navigate('/BuddyWorld');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="canteens-info-container1">
      <p className="introB">
        Buddy svijet povezuje studente kako bi olakšao prilagodbu na kampus, potaknuo nova prijateljstva i pružio podršku kroz zajedničko iskustvo studiranja.
      </p>

      <h2 className="h2B">Tvoji prvi koraci u stvaranju nezaboravnih prijateljstava!</h2>
      <ul>
        Zamisli da imaš prijatelja koji je uvijek tu za tebe – vodič kroz kampus, mentor i podrška kad ti zatreba. Buddy svijet nudi ti priliku da brzo pronađeš svoje mjesto u novom okruženju, upoznaš ljude i uživaš u studentskom životu.
        Klikni i otkrij kako Buddy svijet može učiniti tvoje studiranje jednostavnijim, zabavnijim i punim novih prilika. Tvoj savršeni početak čeka – zaronimo zajedno u Buddy World!
      </ul>
      <div className="soft-container">
        <div className="spacer"></div>
        <div className="soft btn" onClick={handleClick}>
          <div className="btn-txt soft-txt">BuddyWorld!</div>
          <div></div>
          <div></div>
        </div>
        <div style={{ margin: '20px 0' }}></div>
      </div>

      {/* Prikaži checkbox samo ako je korisnik prijavljen */}
      {user.name && (
        <div className="checkbox">
          <h1 className="buddy-upit">Želiš postati Buddy?</h1>
          <div className="styled-checkbox">
            <input
              type="checkbox"
              id="buddy-checkbox"
              checked={isBuddy}
              onChange={handleCheckboxChange} // Povezujemo funkciju za slanje podataka
            />
            <label htmlFor="buddy-checkbox"></label>
          </div>
        </div>
      )}

      <p className="note">
        Napomena: Ako naiđeš na poteškoće ili imaš bilo kakvih pitanja tijekom korištenja Buddy svijeta, naš support tim je uvijek tu da ti pomogne. Slobodno nas kontaktiraj, tu smo da osiguramo da tvoje iskustvo bude glatko, ugodno i bez stresa!
      </p>

      {/* Modal za korisnika koji nije prijavljen */}
      {showModal && (
        <div className="modal1">
          <div className="modal-content-buddy">
            <h2 className='modal-naslov'>Prijava potrebna</h2>
            <p className='modal-tekst'>Morate se prijaviti da biste pristupili Buddy svijetu!</p>
            <button onClick={closeModal} className="close-modal-btn">Zatvori</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuddyInfo;

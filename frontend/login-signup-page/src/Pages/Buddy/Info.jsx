import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Info.css';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider';

const BuddyInfo = () => {
  const navigate = useNavigate();
  const { user, fetch_path } = useContext(AppStateContext); // Dohvaćamo korisnika iz konteksta
  const [loading, setLoading] = useState(true); // Praćenje učitavanja stanja
  const [showModal, setShowModal] = useState(false); // Prikazivanje modala
  const [showBuddyApplyModal, setShowBuddyApplyModal] = useState(false);

  // Dohvat trenutnog Buddy statusa s backenda prilikom učitavanja komponente
  useEffect(() => {
    const fetchBuddyStatus = async () => {
      try {
        await axios.get(`${fetch_path}/buddy-sustav/${user.id}`, {
          withCredentials: true,
        });
        
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

  const handleBuddyApply = async () => {
    if (!user || !user.id) {
      alert('Morate biti prijavljeni da biste se prijavili kao Buddy.');
      return;
    }

    try {
      const response = await axios.post(
        `${fetch_path}/buddy-sustav/buddy/prijava`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setShowBuddyApplyModal(false);
        alert('Uspješno ste poslali Buddy prijavu!');
      }

    } catch (error) {
      console.error('Greška prilikom prijave:', error);
      alert('Došlo je do greške prilikom prijave. Pokušajte ponovno.');
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

      {user.name && !user.isBuddy && (
        <div className="apply-button-container">
          <h1 className="buddy-upit">Želiš postati Buddy?</h1>
          <button className="apply-button" onClick={() => setShowBuddyApplyModal(true)}>
            Prijavi se
          </button>
        </div>
      )}

      {showBuddyApplyModal && (
        <div className="modal-apply-overlay">
          <div className="modal-apply-content">
            <h2 className="modal-apply-title">Postani Buddy</h2>
            <p className="modal-apply-text">
              Klikom na "Potvrdi" potvrđuješ da želiš postati Buddy.
            </p>
            <div className="modal-apply-buttons">
              <button onClick={() => setShowBuddyApplyModal(false)} className="cancel-apply-btn">
                Odustani
              </button>
              <button onClick={handleBuddyApply} className="confirm-apply-btn">
                Potvrdi
              </button>
            </div>
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

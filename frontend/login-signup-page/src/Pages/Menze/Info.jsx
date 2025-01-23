import React, { useContext, useState, useEffect} from 'react';
import './Info.css';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'


const ZagrebCanteensInfo = () => {
  const {fetch_path} = useContext(AppStateContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCrowdSummary, setShowCrowdSummary] = useState(false);
  const [crowdData, setCrowdData] = useState([]);
  const [cafeterias, setCafeterias] = useState([])


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAttributeValues()
  }, [])

  const getAttributeValues = async () => {
    try {
      const response = await axios.get(`${fetch_path}/menze`)
      setCafeterias(response.data)
    } catch (error) {
      console.error("Neuspješno dohvaćanje elemenata", error)
    }
  }

  const toggleCrowdSummary = () => {
    // Simulirani podaci o gužvama (za stvarnu aplikaciju dohvatiti podatke s backend-a)
    const simulatedData = [
      { name: 'Savska', crowdLevel: 'Manja gužva' },
      { name: 'SC', crowdLevel: 'Umjerena gužva' },
      { name: 'Cvjetno naselje', crowdLevel: 'Nema gužve' },
      { name: 'FSB', crowdLevel: 'Veća gužva' },
      { name: 'Ekonomija', crowdLevel: 'Ogromna gužva' },
    ];
    setCrowdData(simulatedData);
    setShowCrowdSummary((prev) => !prev);
  };

  return (
    <div className="canteens-info-container">
      <p className="canteens-intro">
        Studentske menze u Zagrebu pružaju kvalitetnu i pristupačnu prehranu za studente.
        Ovi objekti ne samo da nude raznovrsne obroke po subvencioniranim cijenama, već su i
        važna mjesta studentskog okupljanja i socijalizacije.
      </p>
      <h2 className="canteens-title">Vodič o studentskim menzama!</h2>
      <ul className="canteens-list">
        <li><b>Broj menzi:</b> U Zagrebu postoji 16 studentskih menzi raspoređenih diljem grada. Popis lokacija je dostupan <u><a href="https://www.sczg.unizg.hr/prehrana">ovdje</a></u>.</li>
        <li><b>Jelovnici:</b> Dnevni jelovnici svih menzi mogu se provjeriti online, što olakšava planiranje obroka.</li>
        <li><b>Vrste obroka:</b> Menze nude raznovrsne opcije, uključujući vegetarijanske obroke, priloge, juhe i deserte.</li>
        <li><b>Subvencionirani obroci:</b> Studenti imaju pravo na dva subvencionirana obroka dnevno uz korištenje iksice.</li>
        <li>Plaćanje se vrši gotovinom, a u nekim je menzama odnedavno uvedeno kartično plaćanje.</li>
      </ul>
      <div className='canteens-buttons'>
      <button className="canteens-toggle-button" onClick={openModal}>
        Podijeli stanje gužve
      </button>
      <button className="canteens-summary-button" onClick={toggleCrowdSummary}>
          Prikaži gužve u menzama
      </button>
      </div>
      {isModalOpen && <CrowdModal onClose={closeModal} cafeterias={cafeterias} />}
      {showCrowdSummary && (
        <div className="canteens-crowd-summary">
          <h3>Trenutno stanje gužvi u menzama</h3>
          <ul>
            {crowdData.map((canteen) => (
              <li key={canteen.name}>
                <strong>{canteen.name}:</strong> {canteen.crowdLevel}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


const CrowdModal = ({ onClose, cafeterias }) => {
  const {fetch_path} = useContext(AppStateContext);

  const [selectedCafeteria, setSelectedCafeteria] = useState('');
  const [crowdLevel, setCrowdLevel] = useState('');

  const postCrowdLevel = async () => {
    try {
      await axios.post(
        `${fetch_path}/menze/guzva`,
        {
          "canteen":
          {   
          "id": selectedCafeteria
          },
          "score": crowdLevel
        },
        { withCredentials: true }
      );

    } catch (error) {
      console.error('Greška prilikom djeljenja stanja gužve!', error);
    }
  } 

  //handle submit jer ga ne vidim
  const handleSubmit = () => {
    if (selectedCafeteria && crowdLevel) {
      console.log(`Menza: ${selectedCafeteria}, Gužva: ${crowdLevel}`);
      postCrowdLevel
      onClose();
    } else {
      alert('Molimo odaberite menzu i razinu gužve.');
    }
  };

  return (
    <div className="canteens-modal-overlay">
      <div className="canteens-modal-container">
        <h2>Podijelite stanje gužve</h2>
        <div className="canteens-modal-content">
          <label htmlFor="cafeteria">Odaberite menzu:</label>
          <select
            id="cafeteria"
            value={selectedCafeteria}
            onChange={(e) => setSelectedCafeteria(e.target.value)}
          >
            <option value="">-- Odaberite menzu --</option>
            {cafeterias.map((cafeteria) => (
              <option key={cafeteria.id} value={cafeteria.name}>
                {cafeteria.name}
              </option>
            ))}
          </select>

          <label htmlFor="crowd">Razina gužve:</label>
          <select
            id="crowd"
            value={crowdLevel}
            onChange={(e) => setCrowdLevel(e.target.value)}
          >
            <option value="">-- Odaberite razinu gužve --</option>
            <option value="1">Nema gužve</option>
            <option value="2">Manja gužva</option>
            <option value="3">Umjerena gužva</option>
            <option value="4">Veća gužva</option>
            <option value="5">Ogromna gužva</option>
          </select>
        </div>
        <div className="canteens-modal-buttons">
          <button onClick={handleSubmit} className="canteens-submit-button">Podijeli</button>
          <button onClick={onClose} className="canteens-cancel-button">Zatvori</button>
        </div>
      </div>
    </div>
  );
};

export default ZagrebCanteensInfo;

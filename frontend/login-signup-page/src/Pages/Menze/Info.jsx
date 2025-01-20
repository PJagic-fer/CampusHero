import React, { useState } from 'react';
import './Info.css';

const ZagrebCanteensInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCrowdSummary, setShowCrowdSummary] = useState(false);
  const [crowdData, setCrowdData] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      {isModalOpen && <CrowdModal onClose={closeModal} />}
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

const CrowdModal = ({ onClose }) => {
  const cafeterias = [
    { id: '1', name: 'Savska' },
    { id: '2', name: 'Studentski centar' },
    { id: '3', name: 'Cvjetno naselje' },
    { id: '4', name: 'FSB'},
    { id: '6', name: 'PMF'},
    { id: '7', name: 'Ekonomija' },
    { id: '8', name: 'Laščina' },
    { id: '9', name: 'Građevina' },
    { id: '10', name: 'FER' },
  ];

  const [selectedCafeteria, setSelectedCafeteria] = useState('');
  const [crowdLevel, setCrowdLevel] = useState('');

  const handleSubmit = () => {
    if (selectedCafeteria && crowdLevel) {
      console.log(`Menza: ${selectedCafeteria}, Gužva: ${crowdLevel}`);
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
            <option value="Nema gužve">Nema gužve</option>
            <option value="Manja gužva">Manja gužva</option>
            <option value="Umjerena gužva">Umjerena gužva</option>
            <option value="Veća gužva">Veća gužva</option>
            <option value="Ogromna gužva">Ogromna gužva</option>
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

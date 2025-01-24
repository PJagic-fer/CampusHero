import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import "./Info.css"
import CanteenDetailView from "./CanteenDetailView"
import { AppStateContext } from '../../context/AppStateProvider'


const ZagrebCanteensInfo = () => {
  const {fetch_path} = useContext(AppStateContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCrowdSummary, setShowCrowdSummary] = useState(false);
  const [crowdData, setCrowdData] = useState([]);
  const [cafeterias, setCafeterias] = useState([])
  const [selectedCanteen, setSelectedCanteen] = useState(null)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    getAttributeValues()
    fetchCrowdData()
  }, [])

  const getAttributeValues = async () => {
    try {
      const response = await axios.get(`${fetch_path}/menze`)
      setCafeterias(response.data)
    } catch (error) {
      console.error("Neuspješno dohvaćanje elemenata", error)
    }
  }

  const fetchCrowdData = async () => {
    try {
      const response = await axios.get(`${fetch_path}/menze/guzva`)
      const currentHourData = response.data.filter((entry) => {
        const entryTime = new Date(entry.time)
        const now = new Date()
        return entryTime.getTime() > now.getTime() - 3600000 // Last hour
      })

      const averageWaitTimes = cafeterias.map((cafeteria) => {
        const cafeteriaData = currentHourData.filter((entry) => entry.canteen.id === cafeteria.id)
        const averageWaitTime =
          cafeteriaData.length > 0
            ? Math.round(cafeteriaData.reduce((sum, entry) => sum + entry.score, 0) / cafeteriaData.length)
            : null
        return { ...cafeteria, averageWaitTime }
      })

      setCrowdData(averageWaitTimes)
    } catch (error) {
      console.error("Neuspješno dohvaćanje podataka o gužvama", error)
    }
  }

  const toggleCrowdSummary = () => {
    setShowCrowdSummary((prev) => !prev)
    if (!showCrowdSummary) {
      fetchCrowdData()
    }
  }

  const handleCanteenClick = (canteen) => {
    setSelectedCanteen(canteen)
  }

  return (
    <div className="canteens-info-container">
      <p className="canteens-intro">
        Studentske menze u Zagrebu pružaju kvalitetnu i pristupačnu prehranu za studente. Ovi objekti ne samo da nude
        raznovrsne obroke po subvencioniranim cijenama, već su i važna mjesta studentskog okupljanja i socijalizacije.
      </p>
      <h2 className="canteens-title">Vodič o studentskim menzama!</h2>
      <ul className="canteens-list">
        <li>
          <b>Broj menzi:</b> U Zagrebu postoji 16 studentskih menzi raspoređenih diljem grada. Popis lokacija je
          dostupan{" "}
          <u>
            <a href="https://www.sczg.unizg.hr/prehrana">ovdje</a>
          </u>
          .
        </li>
        <li>
          <b>Jelovnici:</b> Dnevni jelovnici svih menzi mogu se provjeriti online, što olakšava planiranje obroka.
        </li>
        <li>
          <b>Vrste obroka:</b> Menze nude raznovrsne opcije, uključujući vegetarijanske obroke, priloge, juhe i deserte.
        </li>
        <li>
          <b>Subvencionirani obroci:</b> Studenti imaju pravo na dva subvencionirana obroka dnevno uz korištenje iksice.
        </li>
        <li>Plaćanje se vrši gotovinom, a u nekim je menzama odnedavno uvedeno kartično plaćanje.</li>
      </ul>
      <div className="canteens-buttons">
        <button className="canteens-toggle-button" onClick={openModal}>
          Podijeli stanje gužve
        </button>
        <button className="canteens-summary-button" onClick={toggleCrowdSummary}>
          {showCrowdSummary ? "Sakrij gužve u menzama" : "Prikaži gužve u menzama"}
        </button>
      </div>
      {isModalOpen && <CrowdModal onClose={closeModal} cafeterias={cafeterias} />}
      {showCrowdSummary && (
        <div className="canteens-crowd-summary">
          <h3>Trenutno stanje gužvi u menzama</h3>
          <ul>
            {crowdData.map((canteen) => (
              <li key={canteen.id} onClick={() => handleCanteenClick(canteen)}>
                <span className="canteen-name">{canteen.name}</span>
                <span className="wait-time">
                  {canteen.averageWaitTime !== null ? `${canteen.averageWaitTime} min` : "-"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedCanteen && <CanteenDetailView canteen={selectedCanteen} onClose={() => setSelectedCanteen(null)} />}
    </div>
  )
}

const CrowdModal = ({ onClose, cafeterias }) => {
  const {fetch_path} = useContext(AppStateContext);
  const [selectedCafeteria, setSelectedCafeteria] = useState("")
  const [score, setScore] = useState("")
  const [message, setMessage] = useState("")

  const postCrowdLevel = async () => {
    try {
      await axios.post(
        `${fetch_path}/menze/guzva`,
        {
          canteen: {
            id: selectedCafeteria,
          },
          score: Number.parseInt(score),
          message: message || null,
          time: new Date().toISOString(),
        },
        { withCredentials: true },
      )
      onClose()
    } catch (error) {
        if (error.response && error.response.status === 413) {
          alert('Poruka je predugačka.');
          console.error(error)
        }
        else {
        console.error("Greška prilikom djeljenja stanja gužve!", error)
        }
    }
  }

  const handleSubmit = () => {
    if (selectedCafeteria && score) {
      console.log(`Menza: ${selectedCafeteria}, Čekanje: ${score} minuta, Poruka: ${message}`)
      postCrowdLevel()
      
    } else {
      alert("Molimo odaberite menzu i unesite vrijeme čekanja.")
    }
  }

  return (
    <div className="canteens-modal-overlay">
      <div className="canteens-modal-container">
        <h2>Podijelite stanje gužve</h2>
        <div className="canteens-modal-content">
          <label htmlFor="cafeteria">Odaberite menzu:</label>
          <select id="cafeteria" value={selectedCafeteria} onChange={(e) => setSelectedCafeteria(e.target.value)}>
            <option value="">-- Odaberite menzu --</option>
            {cafeterias.map((cafeteria) => (
              <option key={cafeteria.id} value={cafeteria.id}>
                {cafeteria.name}
              </option>
            ))}
          </select>

          <label htmlFor="score">Vrijeme čekanja (u minutama):</label>
          <input type="number" id="score" value={score} onChange={(e) => setScore(e.target.value)} min="0" />

          <label htmlFor="message">Dodatne informacije (opcionalno):</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
        </div>
        <div className="canteens-modal-buttons">
          <button onClick={handleSubmit} className="canteens-submit-button">
            Podijeli
          </button>
          <button onClick={onClose} className="canteens-cancel-button">
            Zatvori
          </button>
        </div>
      </div>
    </div>
  )
}

export default ZagrebCanteensInfo


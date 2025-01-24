import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import "./CanteenDetailView.css"
import { TodayDataSection } from "./TodayDataSection"
import { DataSection } from "./DataSection"
import { AppStateContext } from '../../context/AppStateProvider'

const CanteenDetailView = ({ canteen, onClose }) => {
  const {fetch_path} = useContext(AppStateContext);

  const [todayData, setTodayData] = useState([])
  const [currentHourData, setCurrentHourData] = useState([])
  const [lastFewDaysData, setLastFewDaysData] = useState([])
  const [nextHourData, setNextHourData] = useState([])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    fetchCanteenData()

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [canteen, onClose])

  const fetchCanteenData = async () => {
    try {
      const todayResponse = await axios.get(`${fetch_path}/menze/guzva/${canteen.id}/danas`)
      setTodayData(todayResponse.data)

      const currentHourResponse = await axios.get(
        `${fetch_path}/menze/guzva/${canteen.id}/danas-ovaj-sat`,
      )
      setCurrentHourData(currentHourResponse.data)

      const lastFewDaysResponse = await axios.get(
        `${fetch_path}/menze/guzva/${canteen.id}/nekoliko-dana-ovaj-sat`,
      )
      setLastFewDaysData(lastFewDaysResponse.data)

      const nextHourResponse = await axios.get(
        `${fetch_path}/menze/guzva/${canteen.id}/nekoliko-dana-sljedeci-sat`,
      )
      setNextHourData(nextHourResponse.data)
    } catch (error) {
      console.error("Neuspješno dohvaćanje podataka o gužvama za menzu", error)
    }
  }

  const calculateAverageWaitTime = (data) => {
    if (data.length === 0) return "Nema podataka"
    const sum = data.reduce((acc, entry) => acc + entry.score, 0)
    return Math.round(sum / data.length)
  }

  return (
    <div className="canteen-detail-overlay">
      <div className="canteen-detail-container">
        <h2>{canteen.name}</h2>
        <div className="canteen-detail-content">
          <TodayDataSection todayData={todayData} showDetails={showDetails} setShowDetails={setShowDetails} />
          <DataSection
            title="Trenutni sat"
            data={currentHourData}
            calculateAverageWaitTime={calculateAverageWaitTime}
          />
          <DataSection
            title="Zadnja 3 dana + danas (ovaj sat)"
            data={lastFewDaysData}
            calculateAverageWaitTime={calculateAverageWaitTime}
          />
          <DataSection
            title="Sljedeći sat (zadnja 3 dana)"
            data={nextHourData}
            calculateAverageWaitTime={calculateAverageWaitTime}
          />
        </div>
        <button onClick={onClose} className="canteen-detail-close-button">
          Zatvori
        </button>
      </div>
    </div>
  )
}

export default CanteenDetailView


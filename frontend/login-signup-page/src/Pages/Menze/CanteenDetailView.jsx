import React, { useState, useEffect } from "react"
import axios from "axios"
import "./CanteenDetailView.css"

const CanteenDetailView = ({ canteen, onClose }) => {
  const [todayData, setTodayData] = useState([])
  const [currentHourData, setCurrentHourData] = useState([])
  const [lastFewDaysData, setLastFewDaysData] = useState([])
  const [nextHourData, setNextHourData] = useState([])

  useEffect(() => {
    fetchCanteenData()
  }, [canteen])

  const fetchCanteenData = async () => {
    try {
      const todayResponse = await axios.get(`http://localhost:8080/campus-hero/menze/guzva/${canteen.id}/danas`)
      setTodayData(todayResponse.data)

      const currentHourResponse = await axios.get(
        `http://localhost:8080/campus-hero/menze/guzva/${canteen.id}/danas-ovaj-sat`,
      )
      setCurrentHourData(currentHourResponse.data)

      const lastFewDaysResponse = await axios.get(
        `http://localhost:8080/campus-hero/menze/guzva/${canteen.id}/nekoliko-dana-ovaj-sat`,
      )
      setLastFewDaysData(lastFewDaysResponse.data)

      const nextHourResponse = await axios.get(
        `http://localhost:8080/campus-hero/menze/guzva/${canteen.id}/nekoliko-dana-sljedeci-sat`,
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
          <h3>Današnji podaci</h3>
          <p>Prosječno vrijeme čekanja danas: {calculateAverageWaitTime(todayData)} {todayData.length > 0 && ("minuta")}</p>
          <h3>Trenutni sat</h3>
          <p>Prosječno vrijeme čekanja u ovom satu: {calculateAverageWaitTime(currentHourData)} {currentHourData.length > 0 && ("minuta")}</p>

          <h3>Zadnja 3 dana + danas (ovaj sat)</h3>
          <p>Prosječno vrijeme čekanja: {calculateAverageWaitTime(lastFewDaysData)} {lastFewDaysData.length > 0 && ("minuta")}</p>

          <h3>Sljedeći sat (zadnja 3 dana)</h3>
          <p>Prosječno vrijeme čekanja: {calculateAverageWaitTime(nextHourData)} {nextHourData.length > 0 && ("minuta")}</p>
        </div>
        <button onClick={onClose} className="canteen-detail-close-button">
          Zatvori
        </button>
      </div>
    </div>
  )
}

export default CanteenDetailView


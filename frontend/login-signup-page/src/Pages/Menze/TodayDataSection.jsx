import React, { useState } from "react"
import { HourlyMessages } from "./HourlyMessages"

export const TodayDataSection = ({ todayData, showDetails, setShowDetails }) => {
  const [selectedHour, setSelectedHour] = useState("all")

  const calculateAverageWaitTime = (data) => {
    if (data.length === 0) return "Nema podataka"
    const sum = data.reduce((acc, entry) => acc + entry.score, 0)
    return Math.round(sum / data.length)
  }

  const filteredData =
    selectedHour === "all"
      ? todayData
      : todayData.filter((entry) => new Date(entry.time).getHours() === Number.parseInt(selectedHour))

  return (
    <div className="today-data-section">
      <h3>Današnji podaci</h3>
      <p>
        Prosječno vrijeme čekanja danas: {calculateAverageWaitTime(todayData)} {todayData.length > 0 && "minuta"}
      </p>
      <button onClick={() => setShowDetails(!showDetails)} className="toggle-details-button">
        {showDetails ? "Sakrij detalje" : "Prikaži detalje"}
      </button>
      {showDetails && (
        <>
          <div className="filter-container">
            <label htmlFor="hour-filter">Filtriraj po satu: </label>
            <select
              id="hour-filter"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              className="hour-filter"
            >
              <option value="all">Svi sati</option>
              {Array.from(Array(24).keys()).map((hour) => (
                <option key={hour} value={hour}>
                  {hour}:00
                </option>
              ))}
            </select>
          </div>
          <HourlyMessages data={filteredData} />
        </>
      )}
    </div>
  )
}


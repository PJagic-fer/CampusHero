import React from "react"

export const DataSection = ({ title, data, calculateAverageWaitTime }) => {
  return (
    <div className="data-section">
      <h3>{title}</h3>
      <p>
        Prosječno vrijeme čekanja: {calculateAverageWaitTime(data)} {data.length > 0 && "minuta"}
      </p>
    </div>
  )
}


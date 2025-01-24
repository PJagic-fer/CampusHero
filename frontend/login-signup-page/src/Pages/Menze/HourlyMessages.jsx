import React from "react"

export const HourlyMessages = ({ data }) => {
  return (
    <div className="hourly-messages">
      {data.map((entry, index) => (
        <div key={index} className="message-entry">
          <p className="message-time">{new Date(entry.time).toLocaleTimeString()}</p>
          <p className="message-content">{entry.message}</p>
          <p className="message-score">Vrijeme čekanja: {entry.score} minuta</p>
        </div>
      ))}
    </div>
  )
}


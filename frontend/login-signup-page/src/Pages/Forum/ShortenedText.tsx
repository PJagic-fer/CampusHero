import React, { useState } from "react"

export const ShortenedText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (text.length <= maxLength) {
    return <p>{text}</p>
  }

  const toggleExpand = (e) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <p>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
        <button onClick={toggleExpand} className="show-more-button">
          {isExpanded ? "Manje" : "Više..."}
        </button>
      </p>
    </div>
  )
}


'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Search } from 'lucide-react'
import './Domovi.css'

const buddy = [
  {
    id: 'dorms',
    name: 'Studentski domovi',
    description: 'Buddy može pomoći s informacijama o studentskim domovima u Zagrebu, uključujući vrste smještaja, lokacije i posebne značajke svakog doma.'
  },
  {
    id: 'faculties',
    name: 'Fakulteti',
    description: 'Buddy pruža informacije o zagrebačkim fakultetima, uključujući njihove glavne studijske programe i korisne informacije za studente.'
  },
  {
    id: 'publicTransport',
    name: 'Javni prijevoz',
    description: 'Buddy može pomoći s informacijama o javnom prijevozu u Zagrebu, poput tramvajskih i autobusnih linija, prigradskih vlakova te usluga poput javnih bicikala i taksija.'
  },
  {
    id: 'cafeterias',
    name: 'Studentske menze',
    description: 'Buddy nudi informacije o menzama u Zagrebu, njihovim lokacijama, radnim vremenima i vrstama jela koja su dostupna studentima.'
  },
  {
    id: 'studentDiscounts',
    name: 'Studentski popusti',
    description: 'Buddy zna sve o raznim studentskim popustima u Zagrebu, uključujući popuste na javni prijevoz, kulturne događaje i sportske aktivnosti.'
  },
  {
    id: 'cityAttractions',
    name: 'Gradske atrakcije',
    description: 'Buddy preporučuje atrakcije i zanimljiva mjesta u Zagrebu koja studenti mogu posjetiti, uključujući muzeje, parkove i kulturne znamenitosti.'
  },
  {
    id: 'events',
    name: 'Događanja',
    description: 'Buddy informira o događanjima u gradu koja su popularna među studentima, kao što su festivali, koncerti i sportski događaji.'
  }
];

// Assume we have a list of comments
const comments = Array.from({ length: 100 }, (_, i) => `Komentar ${i + 1}`)
const commentsPerPage = 10

export default function Menze() {
  const [activeDorm, setActiveDorm] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const scrollContainerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const totalPages = Math.ceil(comments.length / commentsPerPage)

  const filteredComments = comments.filter(comment => 
    comment.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  )

  const pageNumbers = []
  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    pageNumbers.push(1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages)
  }

  const scrollTo = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const child = container.children[index]
      container.scrollTo({
        left: child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2,
        behavior: 'smooth'
      })
    }
    setActiveDorm(index)
    setIsDropdownOpen(false)
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2
      const newActiveDorm = Array.from(container.children).findIndex((child) => {
        return child.offsetLeft <= scrollPosition && scrollPosition <= child.offsetLeft + child.offsetWidth
      })
      if (newActiveDorm !== -1 && newActiveDorm !== activeDorm) {
        setActiveDorm(newActiveDorm)
      }
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="domovi-container">
      <main className="domovi-main">
        <h1>Studentski domovi u Zagrebu</h1>
        
        <div className="carousel-container">
          <button 
            onClick={() => scrollTo((activeDorm - 1 + buddy.length) % buddy.length)}
            className="carousel-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="carousel"
          >
            {buddy.map((dorm) => (
              <div key={dorm.id} className="dorm-card">
                <div className="dorm-content">
                  
                  <h2 className="h2B1">{dorm.name}</h2>
                  <p>{dorm.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollTo((activeDorm + 1) % buddy.length)}
            className="carousel-button right"
          >
            <ChevronRight className="icon" />
          </button>
        </div>

        <div className="dropdown-container">
          

          <button 
            className="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {buddy[activeDorm].name}
            <ChevronDown className="icon" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {buddy.map((faks, index) => (
                <button
                  key={faks.id}
                  className={`dropdown-item ${index === activeDorm ? 'active' : ''}`}
                  onClick={() => scrollTo(index)}
                >
                  {faks.name}
                </button>
              ))}
            </div>
          )}
          
          
        </div>
        
        
      </main>
    </div>
  )
}
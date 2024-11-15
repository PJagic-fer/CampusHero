'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Search } from 'lucide-react'
import './Domovi.css'

const publicTransport = [
  {
    id: 'tramvaj',
    name: 'Tramvaj',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Glavni način prijevoza u Zagrebu, s razgranatom mrežom linija koja pokriva cijeli grad i vozi danju i noću.'
  },
  {
    id: 'autobus',
    name: 'Autobus',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Autobusne linije povezuju dijelove grada koji nisu pokriveni tramvajskom mrežom, uključujući prigradska naselja.'
  },
  {
    id: 'vlak',
    name: 'Vlak',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Prigradski vlakovi povezuju Zagreb s okolnim gradovima i općinama, a korisni su za dnevne migracije.'
  },
  {
    id: 'bicikl',
    name: 'Javni bicikl',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Sustav javnih bicikala omogućava iznajmljivanje bicikala na raznim lokacijama po gradu, idealno za kratke udaljenosti.'
  },
  {
    id: 'taxi',
    name: 'Taxi',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Taxi usluge dostupne su diljem grada, uključujući klasične i aplikacijski podržane servise poput Ubera i Bolta.'
  }
];


// Assume we have a list of comments
const comments = Array.from({ length: 100 }, (_, i) => `Komentar ${i + 1}`)
const commentsPerPage = 10

export default function Prijevoz() {
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
        <h1>Javni prijevoz u Zagrebu</h1>
        
        <div className="carousel-container">
          <button 
            onClick={() => scrollTo((activeDorm - 1 + publicTransport.length) % publicTransport.length)}
            className="carousel-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="carousel"
          >
            {publicTransport.map((dorm) => (
              <div key={dorm.id} className="dorm-card">
                <div className="dorm-content">
                  
                  <h2 className="h2P1">{dorm.name}</h2>
                  <p>{dorm.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollTo((activeDorm + 1) % publicTransport.length)}
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
            {publicTransport[activeDorm].name}
            <ChevronDown className="icon" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {publicTransport.map((faks, index) => (
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
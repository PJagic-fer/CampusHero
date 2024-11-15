'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Search } from 'lucide-react'
import image from '../../Components/assets/home_background.jpeg';
import './Domovi.css'

const dorms = [
  {
    id: 'stjepan-radic',
    name: 'Stjepan Radić',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Najveći studentski dom u Zagrebu, poznat po svojoj živahnoj atmosferi i brojnim sadržajima.'
  },
  {
    id: 'cvjetno-naselje',
    name: 'Cvjetno naselje',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Moderan dom smješten u mirnom dijelu grada, idealan za studente koji cijene mir i tišinu.'
  },
  {
    id: 'lascina',
    name: 'Lašćina',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Mali dom s obiteljskom atmosferom, savršen za studente koji traže intimniji smještaj.'
  },
  {
    id: 'ante-starcevic',
    name: 'Ante Starčević',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Dom u srcu Trešnjevke, poznat po svojim sportskim terenima i blizini gradskih sadržaja.'
  },
  {
    id: 'ivan-mestrovic',
    name: 'Ivan Meštrović',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Umjetnički orijentiran dom, često domaćin kulturnih događanja i izložbi.'
  }
]

// Assume we have a list of comments
const comments = Array.from({ length: 100 }, (_, i) => `Komentar ${i + 1}`)
const commentsPerPage = 10

export default function Domovi() {
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
            onClick={() => scrollTo((activeDorm - 1 + dorms.length) % dorms.length)}
            className="carousel-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="carousel"
          >
            {dorms.map((dorm) => (
              <div key={dorm.id} className="dorm-card">
                <div className="dorm-content">
                  <img src={dorm.image} alt={dorm.name} />
                  <h2>{dorm.name}</h2>
                  <p>{dorm.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollTo((activeDorm + 1) % dorms.length)}
            className="carousel-button right"
          >
            <ChevronRight className="icon" />
          </button>
        </div>

        <div className="dropdown-container">
          <div className="pagination">
              <button 
                className="pagination-button" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              {pageNumbers.map((number, index) => (
                <button
                  key={index}
                  className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                  onClick={() => typeof number === 'number' && setCurrentPage(number)}
                >
                  {number}
                </button>
              ))}
              <button 
                className="pagination-button" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>

          <button 
            className="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {dorms[activeDorm].name}
            <ChevronDown className="icon" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {dorms.map((dorm, index) => (
                <button
                  key={dorm.id}
                  className={`dropdown-item ${index === activeDorm ? 'active' : ''}`}
                  onClick={() => scrollTo(index)}
                >
                  {dorm.name}
                </button>
              ))}
            </div>
          )}
          <div className="search-bar">
            <input 
              className='search-input' 
              type="text" 
              placeholder="Pretraga..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
              <Search size={20} />
            </button>
          </div>
          
        </div>
        
        
      </main>
    </div>
  )
}
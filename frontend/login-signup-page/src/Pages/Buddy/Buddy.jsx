import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Search } from 'lucide-react'
import './Buddy.css'

const buddy = [
  {
    id: 'dorms',
    name: 'Osjećaj se kao doma',
    description: 'Pridruži se Buddy svijetu i dobit ćeš prijatelja koji će ti pomoći da se osjećaš dobrodošlo, sigurnije i opuštenije na kampusu.'
  },
  {
    id: 'faculties',
    name: 'Ubrzaj prilagodbu',
    description: 'Tvoj Buddy te vodi kroz sve što ti je novo, od prijava na kolegije do upoznavanja s najboljim mjestima za kavu. Brže ćeš se prilagoditi uz njegovu podršku.'
  },
  {
    id: 'publicTransport',
    name: 'Postani prijatelj za pamćenje',
    description: 'Buddy svijet nudi priliku da ostaviš trajni trag u životima novih studenata. Kao Buddy, ti postaješ njihov vodič kroz kampus i svijet studiranja, pomažući im da se osjećaju dobrodošlo i sigurno.'
  },
  {
    id: 'cafeterias',
    name: 'Inspiriraj i budi inspiriran',
    description: 'Pomaganje drugima može biti tvoje najveće postignuće. Kao Buddy, ne samo da pomažeš novim studentima, već ih inspiriraš da i oni postanu podrška drugima u budućnosti.'
  },
  {
    id: 'studentDiscounts',
    name: 'Budi oslonac za nove početke',
    description: 'Za nove studente, prvi koraci na kampusu mogu biti zbunjujući. Kao Buddy, ti si taj koji im pomaže pronaći smjer, izgraditi samopouzdanje i otkriti sve što kampus nudi.'
  },
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
    <div className="buddy-container">
      <main className="domovi-main">
        <h1 className='buddy-naslov'>Što nudi Buddy svijet u CampusHero aplikaciji?</h1>
        
        <div className="carousel-container">
          <button 
            onClick={() => scrollTo((activeDorm - 1 + buddy.length) % buddy.length)}
            className="buddy1-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="carousel"
          >
            {buddy.map((dorm) => (
              <div key={dorm.id} className="dorm-card">
                <div className="buddy1-content">
                  
                  <h2 className="h2Buddy">{dorm.name}</h2>
                  <p>{dorm.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollTo((activeDorm + 1) % buddy.length)}
            className="buddy1-button right"
          >
            <ChevronRight className="icon" />
          </button>
        </div>
        
      </main>
    </div>
  )
}
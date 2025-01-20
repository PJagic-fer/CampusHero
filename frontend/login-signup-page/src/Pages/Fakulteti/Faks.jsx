'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Search } from 'lucide-react'
import './Faks.css'

const faculties = [
  {
    id: 'fer',
    name: 'Fakultet elektrotehnike i računarstva (FER)',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Vodeći tehnički fakultet u Hrvatskoj, poznat po inovacijama i visokim standardima u obrazovanju.'
  },
  {
    id: 'ffzg',
    name: 'Filozofski fakultet (FFZG)',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Najveći fakultet društvenih i humanističkih znanosti u Zagrebu, nudi široki spektar studijskih programa.'
  },
  {
    id: 'pravo',
    name: 'Pravni fakultet',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Renomirani fakultet za studij prava s dugom tradicijom i izvrsnim profesorima.'
  },
  {
    id: 'fkit',
    name: 'Fakultet kemijskog inženjerstva i tehnologije (FKIT)',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Fakultet specijaliziran za kemijsko inženjerstvo, tehnologiju i okoliš.'
  },
  {
    id: 'fefzg',
    name: 'Ekonomski fakultet (EFZG)',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Vodeći ekonomski fakultet u Hrvatskoj, pruža znanja iz ekonomije, menadžmenta i financija.'
  },
  {
    id: 'arhitektura',
    name: 'Arhitektonski fakultet',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Fakultet za studij arhitekture i urbanizma s naglaskom na dizajn i prostorno planiranje.'
  },
  {
    id: 'pmf',
    name: 'Prirodoslovno-matematički fakultet (PMF)',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Fakultet specijaliziran za prirodne znanosti i matematiku, s visokim standardima istraživanja i obrazovanja.'
  },
  {
    id: 'medicina',
    name: 'Medicinski fakultet',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Ugledan fakultet za obrazovanje u medicini i zdravstvu, poznat po istraživanjima i kliničkom radu.'
  },
  {
    id: 'fpu',
    name: 'Akademija likovnih umjetnosti (ALU)',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Fakultet umjetničkog usmjerenja s programima iz slikarstva, kiparstva i drugih umjetničkih disciplina.'
  },
  {
    id: 'kif',
    name: 'Kineziološki fakultet (KIF)',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Fakultet za obrazovanje u sportu i tjelesnoj kulturi, nudi programe iz kineziologije i sportskog treninga.'
  }
];


// Assume we have a list of comments
const comments = Array.from({ length: 100 }, (_, i) => `Komentar ${i + 1}`)
const commentsPerPage = 10

export default function Faksevi() {
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
    <div className="faks-container">
      <main className="domovi-main">
        <h1 className='faks-naslov'>Otkrij sve što trebaš znati o fakultetima, tvoje obrazovanje počinje ovdje</h1>
        
        <div className="carousel-container">
          <button 
            onClick={() => scrollTo((activeDorm - 1 + faculties.length) % faculties.length)}
            className="faks-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="carousel"
          >
            {faculties.map((dorm) => (
              <div key={dorm.id} className="dorm-card">
                <div className="dorm-content4">
                  
                  <h2 className="h2F1">{dorm.name}</h2>
                  <p>{dorm.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollTo((activeDorm + 1) % faculties.length)}
            className="faks-button right"
          >
            <ChevronRight className="icon" />
          </button>
        </div>
        
      </main>
    </div>
  )
}
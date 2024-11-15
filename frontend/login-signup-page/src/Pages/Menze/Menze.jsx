'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Search } from 'lucide-react'
import './Domovi.css'

const cafeterias = [
  {
    id: 'savska',
    name: 'Savska 25',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Jedna od najpopularnijih menzi u Zagrebu, smještena u Savskoj ulici, poznata po raznovrsnim jelima i povoljnim cijenama.'
  },
  {
    id: 'stjepan-radic-menza',
    name: 'Stjepan Radić',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Menza unutar studentskog doma Stjepan Radić, nudi širok izbor jela i radno vrijeme prilagođeno studentima.'
  },
  {
    id: 'cvjetno-naselje-menza',
    name: 'Cvjetno naselje',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Menza u sklopu doma Cvjetno naselje, poznata po mirnom ambijentu i zdravim opcijama.'
  },
  {
    id: 'ekonomski-fakultet-menza',
    name: 'Ekonomski fakultet',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Menza na Ekonomskom fakultetu, omiljena među studentima zbog centralne lokacije i kvalitetnih obroka.'
  },
  {
    id: 'fer-menza',
    name: 'FER',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Menza na Fakultetu elektrotehnike i računarstva, popularna među studentima tehničkih smjerova.'
  },
  {
    id: 'fgg-menza',
    name: 'Građevinski fakultet',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Menza u sklopu Građevinskog fakulteta, nudi razne vrste jela i povoljne cijene za studente.'
  },
  {
    id: 'la-scina',
    name: 'Laščina',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Mala menza u sklopu doma Laščina, poznata po intimnijoj atmosferi i ljubaznom osoblju.'
  },
  {
    id: 'pmf-menza',
    name: 'PMF',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Menza na Prirodoslovno-matematičkom fakultetu, omiljena među studentima znanstvenih smjerova.'
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
        <h1>Menze u Zagrebu</h1>
        
        <div className="carousel-container">
          <button 
            onClick={() => scrollTo((activeDorm - 1 + cafeterias.length) % cafeterias.length)}
            className="carousel-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="carousel"
          >
            {cafeterias.map((dorm) => (
              <div key={dorm.id} className="dorm-card">
                <div className="dorm-content">
                  
                  <h2 className="h2M1">{dorm.name}</h2>
                  <p>{dorm.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollTo((activeDorm + 1) % cafeterias.length)}
            className="carousel-button right"
          >
            <ChevronRight className="icon" />
          </button>
        </div>
        
      </main>
    </div>
  )
}
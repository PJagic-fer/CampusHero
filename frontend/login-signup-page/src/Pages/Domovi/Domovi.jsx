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

export default function Domovi() {
  const [activeDorm, setActiveDorm] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const scrollContainerRef = useRef(null)

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
                  
                  <h2 className="h2D1">{dorm.name}</h2>
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
        
      </main>
    </div>
  )
}
'use client'

import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import './Domovi.css'


export const dorms = [
  {
    id: 'stjepan-radic',
    name: 'Stjepan Radić',
    image: 'https://th.bing.com/th/id/R.e493b98324d72a801abbf14aa0c87ab7?rik=CkQZIRGArFwtRw&riu=http%3a%2f%2fwww.zagreb.in%2fwp-content%2fuploads%2f2015%2f10%2fStudentski-dom-stjepan-radi%c4%87-1440x1080.jpg&ehk=7F5EpRQ0FIpAjD2mWnpS9%2f6KrZQh8V%2bGVs3%2f1wMdhJQ%3d&risl=&pid=ImgRaw&r=0',
    description: 'Najveći studentski dom u Zagrebu, poznat po svojoj živahnoj atmosferi i brojnim sadržajima.'
  },
  {
    id: 'cvjetno-naselje',
    name: 'Cvjetno naselje',
    image: 'https://i.ibb.co/jrRb11q/img2.jpg',
    description: 'Moderan dom smješten u mirnom dijelu grada, idealan za studente koji cijene mir i tišinu.'
  },
  {
    id: 'lascina',
    name: 'Lašćina',
    image: 'https://i.ibb.co/NSwVv8D/img3.jpg',
    description: 'Mali dom s obiteljskom atmosferom, savršen za studente koji traže intimniji smještaj.'
  },
  {
    id: 'ante-starcevic',
    name: 'Ante Starčević',
    image: '/Components/assets/sdAnte%281%29.jpg',
    description: 'Dom u srcu Trešnjevke, poznat po svojim sportskim terenima i blizini gradskih sadržaja.'
  },
  {
    id: 'ivan-mestrovic',
    name: 'Ivan Meštrović',
    image: 'https://i.ibb.co/jTQfmTq/img5.jpg',
    description: 'Umjetnički orijentiran dom, često domaćin kulturnih događanja i izložbi.'
  }
]

export default function Domovi() {
  const slideRef = useRef(null)

  const handleNext = () => {
    if (slideRef.current) {
      const items = slideRef.current.children
      slideRef.current.appendChild(items[0].cloneNode(true))
      slideRef.current.removeChild(items[0])
    }
  }

  const handlePrev = () => {
    if (slideRef.current) {
      const items = slideRef.current.children
      const lastItem = items[items.length - 1].cloneNode(true)
      slideRef.current.insertBefore(lastItem, items[0])
      slideRef.current.removeChild(items[items.length - 1])
    }
  }

  return (
    <div className="domovi-container">
      <div className="carousel">
        <div className="slide" ref={slideRef}>
          {dorms.map((dorm) => (
            <div key={dorm.id} className="item" style={{backgroundImage: `url(${dorm.image})`}}>
              <div className="content">
                <div className="name">{dorm.name}</div>
                <div className="des">{dorm.description}</div>
                <button>Forum</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="gumb">
        <ChevronRight className="prev" onClick={handlePrev}></ChevronRight>
      </div>
    </div>
  )
}


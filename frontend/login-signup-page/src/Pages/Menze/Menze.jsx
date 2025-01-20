'use client'

import React, { useState, useRef, useEffect, useContext } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Search, Star } from 'lucide-react'
import './Menze.css'
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider';

const cafeterias = [
  {
    id: '1',
    name: 'Studentski centar',
    description: 'Jedna od najpopularnijih menzi u Zagrebu, smještena u Savskoj ulici, poznata po raznovrsnim jelima i povoljnim cijenama.'
  },
  {
    id: '2',
    name: 'Stjepan Radić',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Menza unutar studentskog doma Stjepan Radić, nudi širok izbor jela i radno vrijeme prilagođeno studentima.'
  },
  {
    id: '3',
    name: 'Cvjetno naselje',
    description: 'Menza u sklopu doma Cvjetno naselje, poznata po mirnom ambijentu i zdravim opcijama.'
  },
  {
    id: '4',
    name: 'Ekonomski fakultet',
    description: 'Menza na Ekonomskom fakultetu, omiljena među studentima zbog centralne lokacije i kvalitetnih obroka.'
  },
  {
    id: '5',
    name: 'FER',
    description: 'Menza na Fakultetu elektrotehnike i računarstva, popularna među studentima tehničkih smjerova.'
  },
  {
    id: '6',
    name: 'Građevinski fakultet',
    description: 'Menza u sklopu Građevinskog fakulteta, nudi razne vrste jela i povoljne cijene za studente.'
  },
  {
    id: '7',
    name: 'Laščina',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Mala menza u sklopu doma Laščina, poznata po intimnijoj atmosferi i ljubaznom osoblju.'
  },
  {
    id: '8',
    name: 'PMF',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Menza na Prirodoslovno-matematičkom fakultetu, omiljena među studentima znanstvenih smjerova.'
  }
];

const comments = Array.from({ length: 100 }, (_, i) => `Komentar ${i + 1}`)
const commentsPerPage = 10

const StarRating = ({ rating, onRate, onHover, hoveredRating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoveredRating || rating) ? 'active' : ''}`}
          onClick={() => onRate(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
        >
          <Star size={25} fill={star <= (hoveredRating || rating) ? 'gold' : 'none'} />
        </span>
      ))}
    </div>
  );
};


export default function Menze() {
  const { user } = useContext(AppStateContext);
  const [activeDorm, setActiveDorm] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const scrollContainerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    description: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);

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

  const fetchReviews = async (cafeteriaId) => {
    try {
      const response = await axios.get(`http://localhost:8080/campus-hero/recenzije?facultyId=null&studentHomeId=null&canteenId=${cafeteriaId}&userId=null`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/campus-hero/recenzije`,
        {
          "canteen": {   
            "id": cafeterias[activeDorm].id
          },
          "score": review.rating,
          "message": review.description
        },
        { withCredentials: true }
      );
      setIsReviewModalOpen(false);
      fetchReviews(cafeterias[activeDorm].id);
      setReview({ rating: 0, description: '' });
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    fetchReviews(cafeterias[activeDorm].id);
  }, [activeDorm]);

  return (
    <div className="menze-container">
      <main className="domovi-main1">
        <h1 className='menze-naslov'>Studentske Menze: Mjesta gdje okusi spajaju studente!</h1>
        <h2 className='h2H1'>Otkrij svog favorita među menzama i javi drugima koliko si dugo čekao u redu</h2>

        <div className="carousel-container1">
          <button 
            onClick={() => scrollTo((activeDorm - 1 + cafeterias.length) % cafeterias.length)}
            className="menze-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="carousel"
          >
            {cafeterias.map((dorm) => (
              <div key={dorm.id} className="dorm-card">
                <div className="menze-content">
                  
                  <h2 className="h2M1">{dorm.name}</h2>
                  <p>{dorm.description}</p>
                  <div className="rating-container">
                    <StarRating
                      rating={review.rating}
                      hoveredRating={hoveredRating}
                      onRate={(rating) => {
                        setReview(prev => ({ ...prev, rating }));
                        setIsReviewModalOpen(true);
                      }}
                      onHover={setHoveredRating}
                    />
                    <button className="ocijeni-gumb" onClick={() => setIsReviewModalOpen(true)}>Ocijeni menzu!</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollTo((activeDorm + 1) % cafeterias.length)}
            className="menze-button right"
          >
            <ChevronRight className="icon" />
          </button>
        </div>
        
      </main>
      {isReviewModalOpen && (
        <div className="modal-overlay">
          <div className="modal review-popup">
            <h2>Reviews for {cafeterias[activeDorm].name}</h2>
            <div className="review-summary">
              <StarRating
                rating={review.rating}
                hoveredRating={hoveredRating}
                onRate={(rating) => setReview(prev => ({ ...prev, rating }))}
                onHover={setHoveredRating}
              />
            </div>
            {user.id && (
              <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <label htmlFor="reviewDescription">Your Review</label>
                  <textarea
                    id="reviewDescription"
                    value={review.description}
                    onChange={(e) => setReview(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell us more about your experience"
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="submit-button" onClick={handleSubmitReview}>
                    Submit Review
                  </button>
                </div>
              </form>
            )}
            <div className="reviews-list">
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-rating">
                    <StarRating rating={review.score} hoveredRating={0} onRate={() => {}} onHover={() => {}} />
                  </div>
                  <p>{review.message}</p>
                  <div className="review-meta">
                    <span>Reviewed by {review.creator.name + " " + review.creator.surname || 'Anonymous'}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="cancel-button" onClick={() => setIsReviewModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
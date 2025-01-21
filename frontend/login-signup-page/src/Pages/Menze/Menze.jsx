"use client"

import React, { useState, useRef, useEffect, useContext } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import "./Menze.css"
import axios from "axios"
import { AppStateContext } from "../../context/AppStateProvider"

const StarRating = ({ rating, onRate, onHover, hoveredRating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoveredRating || rating) ? "active" : ""}`}
          onClick={() => onRate(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
        >
          <Star size={25} fill={star <= (hoveredRating || rating) ? "gold" : "none"} />
        </span>
      ))}
    </div>
  )
}

export default function Menze() {
  const { user } = useContext(AppStateContext);
  const [activeCafeteria, setActiveCafeteria] = useState(0)
  const [cafeterias, setCafeterias] = useState([])
  const [activeDorm, setActiveDorm] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const scrollContainerRef = useRef(null)
  const [reviews, setReviews] = useState([])
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [review, setReview] = useState({
    rating: 0,
    description: "",
  })
  const [hoveredRating, setHoveredRating] = useState(0)

  useEffect(() => {
    getAttributeValues()
  }, [])

  const getAttributeValues = async () => {
    try {
      const response = await axios.get("http://localhost:8080/campus-hero/menze")
      setCafeterias(response.data)
    } catch (error) {
      console.error("Neuspješno dohvaćanje elemenata", error)
    }
  }

  const scrollTo = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const child = container.children[index]
      container.scrollTo({
        left: child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2,
        behavior: "smooth",
      })
    }
    setActiveCafeteria(index)
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2
      const newActiveCafeteria = Array.from(container.children).findIndex((child) => {
        return child.offsetLeft <= scrollPosition && scrollPosition <= child.offsetLeft + child.offsetWidth
      })
      if (newActiveCafeteria !== -1 && newActiveCafeteria !== activeCafeteria) {
        setActiveCafeteria(newActiveCafeteria)
      }
    }
  }

  const fetchReviews = async (cafeteriaId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/campus-hero/recenzije?facultyId=null&studentHomeId=null&canteenId=${cafeteriaId}&userId=null`,
      )
      setReviews(response.data)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `http://localhost:8080/campus-hero/recenzije`,
        {
          canteen: {
            id: cafeterias[activeCafeteria].id,
          },
          score: review.rating,
          message: review.description,
        },
        { withCredentials: true },
      )
      setIsReviewModalOpen(false)
      fetchReviews(cafeterias[activeCafeteria].id)
      setReview({ rating: 0, description: "" })
    } catch (error) {
      console.error("Error posting review:", error)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (cafeterias.length > 0) {
      fetchReviews(cafeterias[activeCafeteria].id)
    }
  }, [activeCafeteria, cafeterias])

  return (
    <div className="menze-container">
      <main className="domovi-main1">
        <h1 className='menze-naslov'>Studentske Menze: Mjesta gdje okusi spajaju studente!</h1>
        <h2 className='h2H1'>Otkrij svog favorita među menzama i javi drugima koliko si dugo čekao u redu</h2>

        <div className="carousel-container1">
          <button 
            onClick={() => scrollTo((activeCafeteria - 1 + cafeterias.length) % cafeterias.length)}
            className="menze-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="carousel"
          >
            {cafeterias.map((cafeteria) => (
              <div key={cafeteria.id} className="dorm-card">
                <div className="menze-content">
                  
                  <h2 className="h2M1">{cafeteria.name}</h2>
                  <p>{cafeteria.description}</p>
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
            onClick={() => scrollTo((activeCafeteria + 1) % cafeterias.length)}
            className="menze-button right"
          >
            <ChevronRight className="icon" />
          </button>
        </div>
      </main>
      {isReviewModalOpen && cafeterias.length > 0 && (
        <div className="modal-overlays">
          <div className="modal review-popup">
            <h2>Recenzije za {cafeterias[activeCafeteria].name}</h2>
            <div className="review-summary">
              <StarRating
                rating={review.rating}
                hoveredRating={hoveredRating}
                onRate={(rating) => setReview((prev) => ({ ...prev, rating }))}
                onHover={setHoveredRating}
              />
            </div>
            {user.id && (
              <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <label htmlFor="reviewDescription">Recenzija</label>
                  <textarea
                    id="reviewDescription"
                    value={review.description}
                    onChange={(e) => setReview((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Reci nam više o svome iskustvu..."
                    required
                  />
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
                    <span>Reviewed by {review.creator.name + " " + review.creator.surname || "Anonymous"}</span>
                  </div>
                </div>
              ))}
            </div>
            
            
            <div className="modal-buttons">
            <button className="cancel-button" onClick={() => setIsReviewModalOpen(false)}>
              Zatvori
            </button>
              <button type="submit" className="submit-button">
                Objavi Recenziju
              </button>
            </div>
     
          </div>
        </div>
      )}
    </div>
  )
}


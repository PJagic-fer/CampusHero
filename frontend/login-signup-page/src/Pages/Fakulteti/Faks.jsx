"use client"
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect, useContext } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import "./Faks.css"
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

export default function Faksevi() {
  const navigate = useNavigate();
  const { user, fetch_path } = useContext(AppStateContext)
  const [activeFaculty, setActiveFaculty] = useState(0)
  const [faculties, setFaculties] = useState([])
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
      const response = await axios.get(`${fetch_path}/fakulteti`)
      setFaculties(response.data)
      console.log(response.data)
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
    setActiveFaculty(index)
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2
      const newActiveFaculty = Array.from(container.children).findIndex((child) => {
        return child.offsetLeft <= scrollPosition && scrollPosition <= child.offsetLeft + child.offsetWidth
      })
      if (newActiveFaculty !== -1 && newActiveFaculty !== activeFaculty) {
        setActiveFaculty(newActiveFaculty)
      }
    }
  }

  const fetchReviews = async (facultyId) => {
    try {
      const response = await axios.get(
        `${fetch_path}/recenzije?facultyId=${facultyId}&studentHomeId=null&canteenId=null&userId=null`,
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
        `${fetch_path}/recenzije`,
        {
          faculty: {
            id: faculties[activeFaculty].id,
          },
          score: review.rating,
          message: review.description,
        },
        { withCredentials: true },
      )
      setIsReviewModalOpen(false)
      fetchReviews(faculties[activeFaculty].id)
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
    if (faculties.length > 0) {
      fetchReviews(faculties[activeFaculty].id)
    }
  }, [activeFaculty, faculties])

  return (
    <div className="faks-container">
      <main className="domovi-main">
        <h1 className='faks-naslov'>Otkrij sve što trebaš znati o fakultetima, tvoje obrazovanje počinje ovdje</h1>
        
        <div className="carousel-container">
          <button 
            onClick={() => scrollTo((activeFaculty - 1 + faculties.length) % faculties.length)}
            className="faks-button left"
          >
            <ChevronLeft className="icon" />
          </button>
          <div ref={scrollContainerRef} className="carousel">
            {faculties.map((faculty) => (
              <div key={faculty.id} className="dorm-card">
                <div className="dorm-content4">
                  <h2 className="h2F1">{faculty.name}</h2>
                  <div className="rating-container">
                    <StarRating
                      rating={review.rating}
                      hoveredRating={hoveredRating}
                      onRate={(rating) => {
                        setReview((prev) => ({ ...prev, rating }))
                        setIsReviewModalOpen(true)
                      }}
                      onHover={setHoveredRating}
                    />
                    <button onClick={() => navigate("./Forum")}>Forum</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scrollTo((activeFaculty + 1) % faculties.length)} className="faks-button right">
            <ChevronRight className="icon" />
          </button>
        </div>
      </main>
      {isReviewModalOpen && faculties.length > 0 && (
        <div className="modal-overlays">
          <div className="modal review-popup">
            <h2>Reviews for {faculties[activeFaculty].name}</h2>
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
                  <label htmlFor="reviewDescription">Your Review</label>
                  <textarea
                    id="reviewDescription"
                    value={review.description}
                    onChange={(e) => setReview((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell us more about your experience"
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="submit-button">
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
                    <span>Reviewed by {review.creator.name + " " + review.creator.surname || "Anonymous"}</span>
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


import React, { useState, useEffect, useContext, useRef } from "react"
import axios from "axios"
import "./Forum.css"
import "./FForum.css"
import { Star } from "lucide-react"
import { AppStateContext } from "../../context/AppStateProvider"

export default function FacultyForum() {
  const { user, fetch_path } = useContext(AppStateContext)
  const [currentFacultyIndex, setCurrentFacultyIndex] = useState(0)
  const [questions, setQuestions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [questionAnswers, setQuestionAnswers] = useState([])
  const [isAnswerFormVisible, setIsAnswerFormVisible] = useState(false)
  const [newAnswer, setNewAnswer] = useState("")
  const [allAnswers, setAllAnswers] = useState([])
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    body: "",
  })
  const [review, setReview] = useState({
    rating: 0,
    description: "",
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviews, setReviews] = useState([])
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
  const [faculties, setFaculties] = useState([])
  const [isFacultySelectorOpen, setIsFacultySelectorOpen] = useState(false)

  useEffect(() => {
    getAttributeValues()
  }, [])

  useEffect(() => {
    if (faculties.length > 0) {
      fetchQuestions(faculties[currentFacultyIndex].id)
      fetchReviews(faculties[currentFacultyIndex].id)
      fetchAllAnswers()
    }
  }, [currentFacultyIndex, faculties])

  const getAttributeValues = async () => {
    let response
    try {
      response = await axios.get(`${fetch_path}/fakulteti`)
      setFaculties(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Neuspješno dohvaćanje elemenata", error)
    }
  }

  const fetchQuestions = async (facultyId) => {
    try {
      const response = await axios.get(
        `${fetch_path}/forum?facultyId=${facultyId}&studentHomeId=null`,
      )
      setQuestions(response.data)
    } catch (error) {
      console.error("Error fetching questions:", error)
    }
  }

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`${fetch_path}/forum/${questionId}`)
      setQuestionAnswers(response.data || [])
      console.log(allAnswers)
    } catch (error) {
      console.error("Error fetching answers:", error)
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

  const handlePostQuestion = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `${fetch_path}/forum`,
        {
          facilityData: {
            facultyId: faculties[currentFacultyIndex].id,
            studentHomeId: null,
          },
          post: {
            title: newQuestion.title,
            message: newQuestion.body,
          },
        },
        { withCredentials: true },
      )
      setIsModalOpen(false)
      fetchQuestions(faculties[currentFacultyIndex].id)
      fetchAllAnswers()
      setNewQuestion({ title: "", body: "" })
    } catch (error) {
      console.error("Error posting question:", error)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `${fetch_path}/recenzije`,
        {
          faculty: {
            id: faculties[currentFacultyIndex].id,
          },
          score: review.rating,
          message: review.description,
        },
        { withCredentials: true },
      )
      setIsReviewFormVisible(false)
      fetchReviews(faculties[currentFacultyIndex].id)
      setReview({ rating: 0, description: "" })
    } catch (error) {
      console.error("Error posting review:", error)
    }
  }

  const handlePostAnswer = async (e) => {
    e.preventDefault()
    if (!selectedQuestion) return

    try {
      await axios.post(
        `${fetch_path}/forum/odgovor`,
        {
          parentPost: {
            id: selectedQuestion.id,
          },
          message: newAnswer,
        },
        { withCredentials: true },
      )
      setNewAnswer("")
      setIsAnswerFormVisible(false)
      fetchAnswers(selectedQuestion.id)
      fetchAllAnswers()
    } catch (error) {
      console.error("Error posting answer:", error)
    }
  }

  const fetchAllAnswers = async () => {
    try {
      const response = await axios.get(
        `${fetch_path}/forum?facultyId=${faculties[currentFacultyIndex].id}&studentHomeId=null`,
      )
      const questions = response.data
      const allAnswersPromises = questions.map((question) => {
        return axios.get(`${fetch_path}/forum/${question.id}`)
      })
      const allAnswersResponses = await Promise.all(allAnswersPromises)
      const allAnswersData = allAnswersResponses.map((response) => response.data)
      const flattenedAnswers = allAnswersData.flat()
      const filteredAnswers = flattenedAnswers.filter((answer) => answer.parentPost !== null)
      setAllAnswers(filteredAnswers)
    } catch (error) {
      console.error("Error fetching all answers:", error)
    }
  }

  const handleFacultySelect = (index) => {
    setCurrentFacultyIndex(index)
    setIsFacultySelectorOpen(false)
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false)
        setIsReviewModalOpen(false)
        setIsQuestionPopupOpen(false)
        setIsFacultySelectorOpen(false)
      }
    }

    if (isModalOpen || isReviewModalOpen || isQuestionPopupOpen || isFacultySelectorOpen) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isModalOpen, isReviewModalOpen, isQuestionPopupOpen, isFacultySelectorOpen])

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
            <Star size={30} fill={star <= (hoveredRating || rating) ? "gold" : "none"} />
          </span>
        ))}
      </div>
    )
  }

  const openQuestionPopup = (question) => {
    setSelectedQuestion(question)
    setIsQuestionPopupOpen(true)
    setIsAnswerFormVisible(false)
    fetchAnswers(question.id)
  }

  return (
    <div className="forum-page">
      <header className="forum-header">
        <h1>{faculties.length > 0 ? faculties[currentFacultyIndex].name : "Loading..."}</h1>
        <div className="carousel-rating">
          <StarRating
            rating={review.rating}
            hoveredRating={hoveredRating}
            onRate={(rating) => {
              setReview((prev) => ({ ...prev, rating }))
              setIsReviewModalOpen(true)
            }}
            onHover={setHoveredRating}
          />
        </div>
        <button className="faculty-selector-button" onClick={() => setIsFacultySelectorOpen(true)}>
          Odaberi Fakultet
        </button>
        
      </header>
      {isFacultySelectorOpen && (
        <div className="faculty-selector-container" onClick={() => setIsFacultySelectorOpen(false)}>
          <div className="faculty-list" onClick={(e) => e.stopPropagation()}>
            {faculties.map((faculty, index) => (
              <div
                key={faculty.id}
                className={`faculty-item ${index === currentFacultyIndex ? "active" : ""}`}
                onClick={() => handleFacultySelect(index)}
              >
                {faculty.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {user.id && (
        <div className="post-button-container">
          <button className="post-button" onClick={() => setIsModalOpen(true)}>
            Postavi Pitanje
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="modal-overlays">
          <div className="modal">
            <h2>Postavi novo Pitanje</h2>
            <form onSubmit={handlePostQuestion}>
              <div className="form-group">
                <label htmlFor="questionTitle">Naslov Pitanja</label>
                <input
                  type="text"
                  id="questionTitle"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Unesi naslov pitanja"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="questionBody">Opis Pitanja</label>
                <textarea
                  id="questionBody"
                  value={newQuestion.body}
                  onChange={(e) => setNewQuestion((prev) => ({ ...prev, body: e.target.value }))}
                  placeholder="Dodaj detalje svom pitanju"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>
                  Odustani
                </button>
                <button type="submit" className="submit-button">
                  Objavi Pitanje
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isReviewModalOpen && (
        <div className="modal-overlays">
          <div className="modal review-popup">
            <h2>Recenzije za {faculties[currentFacultyIndex]?.name || "Loading..."}</h2>
            <div className="review-summary">
              <StarRating
                rating={review.rating}
                hoveredRating={hoveredRating}
                onRate={(rating) => setReview((prev) => ({ ...prev, rating }))}
                onHover={setHoveredRating}
              />
            </div>
            {!isReviewFormVisible && (
              <>
                {user.id && (
                  <button className="submit-button" onClick={() => setIsReviewFormVisible(true)}>
                    Ostavi recenziju
                  </button>
                )}
                <div className="reviews-list">
                  {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-rating">
                        <StarRating rating={review.score} hoveredRating={0} onRate={() => {}} onHover={() => {}} />
                      </div>
                      <p>{review.message}</p>
                      <div className="review-meta">
                        <span>Recenzija: {review.creator.name + " " + review.creator.surname || "Anonymous"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {isReviewFormVisible && (
              <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <label htmlFor="reviewDescription">Vaša Recenzija</label>
                  <textarea
                    id="reviewDescription"
                    value={review.description}
                    onChange={(e) => setReview((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Reci nam više o svome iskustvu..."
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button type="button" className="cancel-button" onClick={() => setIsReviewFormVisible(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Ostavi Recenziju
                  </button>
                </div>
              </form>
            )}
            <button className="cancel-button" onClick={() => setIsReviewModalOpen(false)}>
              Zatvori
            </button>
          </div>
        </div>
      )}

      <div className="questions-list">
        {questions.map((question) => (
          <div key={question.id} className="question-item" onClick={() => openQuestionPopup(question)}>
            <div className="question-content">
              <h3>{question.title}</h3>
              <div className="question-meta">
                <span>Objavio {question.creator.name + " " + question.creator.surname || "Anonymous"}</span>
                <span>Odgovori: {allAnswers.filter((answer) => answer.parentPost.id === question.id).length || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isQuestionPopupOpen && selectedQuestion && (
        <div className="modal-overlays">
          <div className="modal question-popup">
            <h2>{selectedQuestion.title}</h2>
            <p className="question-body">{selectedQuestion.message}</p>
            <div className="question-meta">
              <span>
                Objavio: {selectedQuestion.creator.name + " " + selectedQuestion.creator.surname || "Anonymous"}
              </span>
            </div>
            <h3>Oddgovori:</h3>
            <div className="answers-list">
              {questionAnswers.length > 0 ? (
                questionAnswers.map((answer, index) => (
                  <div key={index} className="answer-item">
                    <p>{answer.message}</p>
                    <div className="answer-meta">
                      <span>Odgovorio: {answer.creator.name + " " + answer.creator.surname || "Anonymous"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Još nema odgovora.</p>
              )}
            </div>
            {isAnswerFormVisible && (
              <form onSubmit={handlePostAnswer} className="answer-form">
                <div className="form-group">
                  <label htmlFor="answerBody">Vaš Odgovor</label>
                  <textarea
                    id="answerBody"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Unesite svoj odgovor ovdje"
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button type="button" className="cancel-button" onClick={() => setIsAnswerFormVisible(false)}>
                    Odustani
                  </button>
                  <button type="submit" className="submit-button">
                    Objavi svoj odgovor
                  </button>
                </div>
              </form>
            )}
            {!isAnswerFormVisible && (
              <div className="modal-buttons">
                <button className="cancel-button" onClick={() => setIsQuestionPopupOpen(false)}>
                  Zatvori
                </button>
                {user.id && (
                  <button className="submit-button" onClick={() => setIsAnswerFormVisible(true)}>
                    Odgovori
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


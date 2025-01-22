import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import "./Forum.css"
import { Star } from "lucide-react"
import { AppStateContext } from "../../context/AppStateProvider"

export default function Forum() {
  const { user } = useContext(AppStateContext)
  const [currentDormIndex, setCurrentDormIndex] = useState(0)
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
  const [dorms, setDorms] = useState([])

  useEffect(() => {
    getAttributeValues()
  }, [])

  useEffect(() => {
    if (dorms.length > 0) {
      fetchQuestions(dorms[currentDormIndex].id)
      fetchReviews(dorms[currentDormIndex].id)
      fetchAllAnswers()
    }
  }, [currentDormIndex, dorms])

  const getAttributeValues = async () => {
    let response
    try {
      response = await axios.get("https://campus-hero.onrender.com/campus-hero/domovi")
      //response = await axios.get("http://localhost:8080/campus-hero/domovi")
      setDorms(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Neuspješno dohvaćanje elemenata", error)
    }
  }

  const fetchQuestions = async (dormId) => {
    try {
      const response = await axios.get(`https://campus-hero.onrender.com/campus-hero/forum?facultyId=null&studentHomeId=${dormId}`)
      //const response = await axios.get(`http://localhost:8080/campus-hero/forum?facultyId=null&studentHomeId=${dormId}`)
      setQuestions(response.data)
    } catch (error) {
      console.error("Error fetching questions:", error)
    }
  }

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`https://campus-hero.onrender.com/campus-hero/forum/${questionId}`)
      //const response = await axios.get(`http://localhost:8080/campus-hero/forum/${questionId}`)
      setQuestionAnswers(response.data || [])
      console.log(allAnswers)
    } catch (error) {
      console.error("Error fetching answers:", error)
    }
  }

  const fetchReviews = async (dormId) => {
    try {
      const response = await axios.get(
        `https://campus-hero.onrender.com/campus-hero/recenzije?facultyId=null&studentHomeId=${dormId}&canteenId=null&userId=null`,
        //`http://localhost:8080/campus-hero/recenzije?facultyId=null&studentHomeId=${dormId}&canteenId=null&userId=null`,
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
        "https://campus-hero.onrender.com/campus-hero/forum",
        //"http://localhost:8080/campus-hero/forum",
        {
          facilityData: {
            facultyId: null,
            studentHomeId: dorms[currentDormIndex].id,
          },
          post: {
            title: newQuestion.title,
            message: newQuestion.body,
          },
        },
        { withCredentials: true },
      )
      setIsModalOpen(false)
      fetchQuestions(dorms[currentDormIndex].id)
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
        `https://campus-hero.onrender.com/campus-hero/recenzije`,
        //`http://localhost:8080/campus-hero/recenzije`,
        {
          studentHome: {
            id: dorms[currentDormIndex].id,
          },
          score: review.rating,
          message: review.description,
        },
        { withCredentials: true },
      )
      setIsReviewFormVisible(false)
      fetchReviews(dorms[currentDormIndex].id)
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
        "https://campus-hero.onrender.com/campus-hero/forum/odgovor",
        //"http://localhost:8080/campus-hero/forum/odgovor",
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
        `https://campus-hero.onrender.com/campus-hero/forum?facultyId=null&studentHomeId=${dorms[currentDormIndex].id}`,
        //`http://localhost:8080/campus-hero/forum?facultyId=null&studentHomeId=${dorms[currentDormIndex].id}`,
      )
      const questions = response.data
      const allAnswersPromises = questions.map((question) => {
        return axios.get(`http://localhost:8080/campus-hero/forum/${question.id}`)
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

  const nextDorm = () => {
    setCurrentDormIndex((prevIndex) => (prevIndex + 1) % dorms.length)
  }

  const prevDorm = () => {
    setCurrentDormIndex((prevIndex) => (prevIndex - 1 + dorms.length) % dorms.length)
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false)
        setIsReviewModalOpen(false)
        setIsQuestionPopupOpen(false)
      }
    }

    if (isModalOpen || isReviewModalOpen || isQuestionPopupOpen) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isModalOpen, isReviewModalOpen, isQuestionPopupOpen])

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
        <h1>{dorms.length > 0 ? dorms[currentDormIndex].name : "Loading..."}</h1>
        <div className="carousel-nav">
          <button onClick={prevDorm} aria-label="Previous dorm">
            &#10094;
          </button>
          <button onClick={nextDorm} aria-label="Next dorm">
            &#10095;
          </button>
        </div>
        <div className="carousel-dots">
          {dorms.map((_, index) => (
            <span
              key={index}
              className={`carousel-dot ${index === currentDormIndex ? "active" : ""}`}
              onClick={() => setCurrentDormIndex(index)}
              role="button"
              aria-label={`Go to dorm ${index + 1}`}
            />
          ))}
        </div>
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
      </header>
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
            <h2>Recenzije za {dorms[currentDormIndex]?.name || "Loading..."}</h2>
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
                  <label htmlFor="answerBody">Vaš Odgobor</label>
                  <textarea
                    id="answerBody"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Type your answer here"
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


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './forum.css';
import { dorms } from '../Domovi/Domovi.jsx';
import { AppStateContext } from '../../context/AppStateProvider';

export default function Forum() {
  const { user } = useContext(AppStateContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [isAnswerFormVisible, setIsAnswerFormVisible] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    body: ''
  });
  const [review, setReview] = useState({
    rating: 0,
    description: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  useEffect(() => {
    fetchQuestions(dorms[currentImageIndex].id);
    fetchReviews(dorms[currentImageIndex].id);
  }, [currentImageIndex]);

  const fetchQuestions = async (dormId) => {
    try {
      const response = await axios.get(`http://localhost:8080/campus-hero/forum?facultyId=null&studentHomeId=${dormId}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/campus-hero/forum/${questionId}`);
      setQuestionAnswers(response.data || []);
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };

  const fetchReviews = async (dormId) => {
    try {
      const response = await axios.get(`http://localhost:8080/campus-hero/recenzije?facultyId=null&studentHomeId=${dorms[currentImageIndex].id}&canteenId=null&userId=null`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
    
  };

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/campus-hero/forum',
        {
          "facilityData": {
            "facultyId": null,
            "studentHomeId": dorms[currentImageIndex].id
          },
          "post": {
            "title": newQuestion.title,
            "message": newQuestion.body
          }
        },
        { withCredentials: true }
      );
      setIsModalOpen(false);
      fetchQuestions(dorms[currentImageIndex].id);
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/campus-hero/recenzije`,
        {
          "studentHome": {   
            "id": 2
          },
          "score": review.rating,
          "message": review.description
        },
        { withCredentials: true }
      );
      setIsReviewFormVisible(false);
      fetchReviews(dorms[currentImageIndex].id);
      setReview({ rating: 0, description: '' });
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!selectedQuestion) return;

    try {
      await axios.post('http://localhost:8080/campus-hero/forum/odgovor',
        {
          "parentPost": {
            "id": selectedQuestion.id
          },
          "message": newAnswer
        },
        { withCredentials: true }
      );
      setNewAnswer('');
      setIsAnswerFormVisible(false);
      fetchAnswers(selectedQuestion.id);
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % dorms.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + dorms.length) % dorms.length
    );
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsReviewModalOpen(false);
        setIsQuestionPopupOpen(false);
      }
    };
    
    if (isModalOpen || isReviewModalOpen || isQuestionPopupOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen, isReviewModalOpen, isQuestionPopupOpen]);

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
            ★
          </span>
        ))}
      </div>
    );
  };

  const openQuestionPopup = (question) => {
    setSelectedQuestion(question);
    setIsQuestionPopupOpen(true);
    setIsAnswerFormVisible(false);
    fetchAnswers(question.id);
  };

  return (
    <div className="forum-page">
      <header className="forum-header">
        <div className="carousel">
          {dorms.map((dorm, index) => (
            <img
              key={dorm.id}
              src={dorm.image}
              alt={`${dorm.name} image`}
              className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
            />
          ))}
          <div className="carousel-nav">
            <button onClick={prevImage} aria-label="Previous image">&#10094;</button>
            <button onClick={nextImage} aria-label="Next image">&#10095;</button>
          </div>
          <div className="carousel-dots">
            {dorms.map((_, index) => (
              <span
                key={index}
                className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                role="button"
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <h1>{dorms[currentImageIndex].name}</h1>
         
        <div className="carousel-rating">
          <StarRating
            rating={review.rating}
            hoveredRating={hoveredRating}
            onRate={(rating) => {
              setReview(prev => ({ ...prev, rating }));
              setIsReviewModalOpen(true);
            }}
            onHover={setHoveredRating}
          />
        </div>
        
      </header>
      {user.id && 
      <div className="post-button-container">
        <button className="post-button" onClick={() => setIsModalOpen(true)}>
          Post a Question
        </button>
      </div>
      }
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Post a New Question</h2>
            <form onSubmit={handlePostQuestion}>
              <div className="form-group">
                <label htmlFor="questionTitle">Question Title</label>
                <input
                  type="text"
                  id="questionTitle"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter your question title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="questionBody">Question Details</label>
                <textarea
                  id="questionBody"
                  value={newQuestion.body}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Provide more details about your question"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isReviewModalOpen && (
        <div className="modal-overlay">
          <div className="modal review-popup">
            <h2>Reviews for {dorms[currentImageIndex].name}</h2>
            <div className="review-summary">
              <StarRating
                rating={review.rating}
                hoveredRating={hoveredRating}
                onRate={(rating) => setReview(prev => ({ ...prev, rating }))}
                onHover={setHoveredRating}
              />
            </div>
            {!isReviewFormVisible && (
              <>
                {user.id &&
                <button className="submit-button" onClick={() => setIsReviewFormVisible(true)}>
                  Submit a Review
                </button>
                }
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
              </>
            )}
            {isReviewFormVisible && (
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
                  <button type="button" className="cancel-button" onClick={() => setIsReviewFormVisible(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Submit Review
                  </button>
                </div>
              </form>
            )}
            <button className="cancel-button" onClick={() => setIsReviewModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="questions-list">
        {questions.map(question => (
          <div key={question.id} className="question-item" onClick={() => openQuestionPopup(question)}>
            <div className="question-content">
              <h3>{question.title}</h3>
              <div className="question-meta">
                <span>Posted by {question.creator.name + " " + question.creator.surname || 'Anonymous'}</span>
                <span>answered: {question.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isQuestionPopupOpen && selectedQuestion && (
        <div className="modal-overlay">
          <div className="modal question-popup">
            <h2>{selectedQuestion.title}</h2>
            <p className="question-body">{selectedQuestion.message}</p>
            <div className="question-meta">
              <span>Posted by {selectedQuestion.creator.name + " " + selectedQuestion.creator.surname || 'Anonymous'}</span>
            </div>
            <h3>Answers:</h3>
            <div className="answers-list">
              {questionAnswers.length > 0 ? (
                questionAnswers.map((answer, index) => (
                  <div key={index} className="answer-item">
                    <p>{answer.message}</p>
                    <div className="answer-meta">
                      <span>Answered by {answer.creator.name + " " + answer.creator.surname || 'Anonymous'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No answers yet.</p>
              )}
            </div>
            {isAnswerFormVisible && (
              <form onSubmit={handlePostAnswer} className="answer-form">
                <div className="form-group">
                  <label htmlFor="answerBody">Your Answer</label>
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
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Post Answer
                  </button>
                </div>
              </form>
            )}
            {!isAnswerFormVisible && (
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setIsQuestionPopupOpen(false)}>
                Close
              </button>
              {user.id && (
                <button className="submit-button" onClick={() => setIsAnswerFormVisible(true)}>
                  Write an Answer
                </button>
              )}
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


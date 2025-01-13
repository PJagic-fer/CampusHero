import React, { useState, useEffect, useContext } from 'react';
import './forum.css';
import { dorms } from '../Domovi/Domovi.jsx';
import { AppStateContext } from '../../context/AppStateProvider'
import axios from 'axios';

export default function Forum() {
  const {user} = useContext(AppStateContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
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

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/campus-hero/forum?facultyId=null&studentHomeId=2');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/campus-hero/forum',
        {
          "facilityData":{
              "facultyId":null,
              "studentHomeId":2
          },
          "post":
          {
          "message": newQuestion.body
          }
        },
          {withCredentials: true}
      );
      setIsModalOpen(false);
      fetchQuestions(); // Refresh the questions list
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/campus-hero/forum?facultyId=null&studentHomeId=2`,
        {
          "facilityData":{
              "facultyId":null,
              "studentHomeId":2
          },
          "post":
          {
          "message": newQuestion.body
          },
        },
        {withCredentials: true}
      );
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handlePostAnswer = async (e, post_id) => {
    e.preventDefault();
    if (!selectedQuestion) return;

    try {
      const response = await axios.post('http://localhost:8080/campus-hero/forum/odgovor',
        {
          "facilityData":{
              "facultyId":null,
              "studentHomeId":2
          },
          "post":
          {
          id: selectedQuestion.id,
          parentPost:
          {
            id:selectedQuestion.id,
            "message": newAnswer
          }
          },
        },
        { withCredentials: true }
      );
      setNewAnswer('');
      setIsAnswerFormVisible(false);
      fetchQuestions(); // Refresh the questions list
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
        {user.id && 
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
        }
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
          <div className="modal">
            <h2>Submit Your Review</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Your Rating</label>
                <StarRating
                  rating={review.rating}
                  hoveredRating={hoveredRating}
                  onRate={(rating) => setReview(prev => ({ ...prev, rating }))}
                  onHover={setHoveredRating}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reviewDescription">Review Description</label>
                <textarea
                  id="reviewDescription"
                  value={review.description}
                  onChange={(e) => setReview(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell us more about your experience"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="button" className="cancel-button" onClick={() => setIsReviewModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button" onClick={handleSubmitReview}>
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="questions-list">
        {questions.map(question => (
          <div key={question.id} className="question-item" onClick={() => openQuestionPopup(question)}>
            <div className="question-content">
              <h3>{question.message}</h3>
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
            <h2>{selectedQuestion.message}</h2>
            <p className="question-body">{selectedQuestion.body}</p>
            <div className="question-meta">
              <span>Posted by {selectedQuestion.creator.name + " " + selectedQuestion.creator.surname || 'Anonymous'}</span>
            </div>
            <h3>Answers:</h3>
            <div className="answers-list">
              {selectedQuestion.comments && selectedQuestion.comments.length > 0 ? (
                selectedQuestion.comments.map((comment, index) => (
                  <div key={index} className="answer-item">
                    <p>{comment.message}</p>
                    <div className="answer-meta">
                      <span>Answered by {comment.creator.name + " " + comment.creator.surname || 'Anonymous'}</span>
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
                  <button type="submit" className="submit-button" onClick={handlePostAnswer}>
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
                <button className="submit-button" onClick={() => setIsAnswerFormVisible(true)}>
                  Write an Answer
                </button>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


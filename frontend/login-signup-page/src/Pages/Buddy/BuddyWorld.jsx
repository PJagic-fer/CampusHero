import React, { useContext, useState, useEffect } from "react"
import "./BuddyWorld.css"
import axios from "axios"
import { AppStateContext } from "../../context/AppStateProvider"
import { Star } from "lucide-react"

const BuddyWorld = () => {
  const { fetch_path, user, setUser } = useContext(AppStateContext)

  const [activeSection, setActiveSection] = useState("") // Praćenje aktivnog dijela
  const [filter, setFilter] = useState({ city: "", studentHome: "", faculty: "" }) // Filtri za fakultet i mjesto
  const [buddyList, setBuddyList] = useState([])
  const [filteredBuddyList, setFilteredBuddyList] = useState([])
  const [buddyDivision, setBuddyDivision] = useState([])
  const [studentRequestList, setStudentRequestList] = useState([])
  const [studentRequestDivision, setStudentRequestDivision] = useState([])
  const [requestedBuddy, setRequestedBuddy] = useState(null)
  const [myBuddy, setMyBuddy] = useState(null)
  const [myStudents, setMyStudents] = useState([])
  const [allMyStudents, setAllMyStudents] = useState([])
  const [buddyReviews, setBuddyReviews] = useState([]) // Added state for buddy reviews
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [review, setReview] = useState({
    rating: 0,
    description: "",
  })
  const [hoveredRating, setHoveredRating] = useState(0)

  const [listCities, setListCities] = useState([])
  const [listStudentHomes, setListStudentHomes] = useState([])
  const [listFaculties, setListFaculties] = useState([])

  useEffect(() => {
    if (activeSection == "findBuddy") {
      const getRequestedBuddy = async () => {
        await fetchCurrentRequestForBuddy()
      }
      getRequestedBuddy()
      fetchBuddyList()
    } else if (activeSection == "manageStudents") {
      fetchStudentRequestList()
    } else if (activeSection === "manageBuddy") {
      setMyBuddy(user.buddy)
    }
  }, [activeSection])

  useEffect(() => {
    if (filteredBuddyList.length > 0) {
      setBuddyDivision(mapBuddy(filteredBuddyList))
    } else {
      setBuddyDivision(["Niti jedan Buddy ne odgovara Vašim željama"])
    }
  }, [filteredBuddyList, requestedBuddy])

  useEffect(() => {
    if (buddyList.length > 0) {
      setBuddyDivision(mapBuddy(buddyList))
      setFilteredBuddyList(filterBuddyList())
    }
    else {
      setBuddyDivision(["Trenutno nema aktivnih buddyja"])
    }
  }, [filter, buddyList])

  useEffect(() => {
    if (studentRequestList.length > 0) {
      setStudentRequestDivision(mapStudent(studentRequestList))
    }
  }, [studentRequestList])

  const fetchBuddyList = async () => {
    try {
      const response = await axios.get(`${fetch_path}/buddy-sustav/student/trazi-buddyja`, {
        withCredentials: true, // Ako backend zahtijeva autentifikaciju putem kolačića
      })

      if (response.status === 200) {
        // Vraća dohvaćene podatke
        setBuddyList(response.data)
      } else {
        console.error("Greška: Neočekivani status odgovora:", response.status)
      }
    } catch (error) {
      if (error.status === 406) {
        alert("Ovaj Buddy Vas je blokirao")
      } else {
        console.error("Greška prilikom dohvaćanja Buddy liste:", error)
      }
    }
  }

  const fetchCurrentRequestForBuddy = async () => {
    try {
      // buddy kojem smo poslali zahtjev
      const response = await axios.get(`${fetch_path}/buddy-sustav/student/trazeni-buddy`, {
        withCredentials: true, // Ako backend zahtijeva autentifikaciju putem kolačića
      })

      if (response.status === 200) {
        // Vraća dohvaćene podatke
        setRequestedBuddy(response.data)
      } else {
        console.error("Greška: Neočekivani status odgovora:", response.status)
      }
    } catch (error) {
      console.error("Greška prilikom dohvaćanja Buddy liste:", error)
    }
  }

  const fetchStudentRequestList = async () => {
    try {
      const response = await axios.get(`${fetch_path}/buddy-sustav/buddy/zahtjevi`, {
        withCredentials: true, // Ako backend zahtijeva autentifikaciju putem kolačića
      })

      if (response.status === 200) {
        // Vraća dohvaćene podatke
        setAllMyStudents(response.data.filter((student) => student.hasBuddyAccepted === true))
        setStudentRequestList(response.data.filter((student) => student.hasBuddyAccepted === false && student.isBlocked === false))
      } else {
        console.error("Greška: Neočekivani status odgovora:", response.status)
      }
    } catch (error) {
      console.error("Greška prilikom dohvaćanja liste studenata:", error)
    }
  }

  const handleRequestThisBuddyClick = async (buddy) => {
    try {
      const response = await axios.post(
        `${fetch_path}/buddy-sustav/student/trazi-buddyja`,
        { value: buddy.id },
        { withCredentials: true },
      )
      if (response.status === 200) {
        setRequestedBuddy(buddy)
      } else {
        console.error("Greška: Neočekivani status odgovora:", response.status)
      }
    } catch (error) {
      console.error("Greška prilikom dohvaćanja Buddy liste:", error)
    }
  }

  const mapBuddy = (buddys) => {
    return buddys.map((user) => (
      <div
        className={
          requestedBuddy && requestedBuddy.id == user.id
            ? "buddy-appuser-card requested-buddy-appuser-card"
            : "buddy-appuser-card"
        }
        key={`${user.id}`}
        id={`user${user.id}`}
        onClick={() => handleRequestThisBuddyClick(user)}
      >
        {requestedBuddy && requestedBuddy.id == user.id && (
          <p className="buddy-info requested-buddy-info">requested buddy</p>
        )}
        {user.name && <p className="buddy-info">Ime: {user.name}</p>}
        {user.city?.name && <p className="buddy-info">Grad: {user.city.name}</p>}
        {user.studentHome?.name && <p className="buddy-info">Dom: {user.studentHome.name}</p>}
        {user.faculty?.name && <p className="buddy-info">Fakultet: {user.faculty.name}</p>}
      </div>
    ))
  }

  const checkCity = (buddy) => {
    if (filter.city == "") {
      return true
    } else if (buddy.city) {
      if (filter.city == buddy.city.id) {
        return true
      }
    }
    return false
  }
  const checkStudentHome = (buddy) => {
    if (filter.studentHome == "") {
      return true
    } else if (buddy.studentHome) {
      if (filter.studentHome == buddy.studentHome.id) {
        return true
      }
    }
    return false
  }
  const checkFaculty = (buddy) => {
    if (filter.faculty == "") {
      return true
    } else if (buddy.faculty) {
      if (filter.faculty == buddy.faculty.id) {
        return true
      }
    }
    return false
  }

  const filterBuddyList = () => {
    return buddyList.filter((buddy) => {
      if (checkCity(buddy) && checkStudentHome(buddy) && checkFaculty(buddy)) {
        return true
      }
      return false
    })
  }

  const handleAproveThisStudetClick = async (student) => {
    alert(`Odobrili ste zahtjev studentu: ${student.name}`)
  }

  const mapStudent = (students) => {
    return students.map((user) => (
      <div
        className="buddy-appuser-card"
        key={`${user.user.id}`}
        id={`user${user.user.id}`}
        onClick={() => handleAproveThisStudetClick(user.user)}
      >
        {user.user.name && <p className="buddy-info">Ime: {user.user.name}</p>}
        {user.user.city?.name && <p className="buddy-info">Grad: {user.user.city.name}</p>}
        {user.user.studentHome?.name && <p className="buddy-info">Dom: {user.user.studentHome.name}</p>}
        {user.user.faculty?.name && <p className="buddy-info">Fakultet: {user.user.faculty.name}</p>}
      </div>
    ))
  }

  useEffect(() => {
    const getFilterValues = async () => {
      setListCities(mapAttribtesToOptions(await getAttributeValues("gradovi")))
      setListStudentHomes(mapAttribtesToOptions(await getAttributeValues("domovi")))
      setListFaculties(mapAttribtesToOptions(await getAttributeValues("fakulteti")))
    }

    getFilterValues()
  }, [])

  // filter za buddy listu- za sad ne treba
  const getAttributeValues = async (attribute) => {
    let response
    try {
      //dohvaćenje atributa iz baze
      response = await axios.get(`${fetch_path}/${attribute}`)
      return response.data
    } catch (error) {
      console.error("Neuspješno dohvaćanje elemenata", error)
    }
  }

  //pretvorba liste atributa u opcije za odabir
  const mapAttribtesToOptions = (atributeList) => {
    return atributeList.map((attribute) => (
      <option key={`${attribute.id}`} value={`${attribute.id}`}>
        {attribute.name}
      </option>
    ))
  }

  const fetchBuddyReviews = async (buddyId) => {
    // Added function to fetch buddy reviews
    try {
      const response = await axios.get(
        `${fetch_path}/recenzije?facultyId=null&studentHomeId=null&canteenId=null&userId=${buddyId}`,
        { withCredentials: true },
      )
      setBuddyReviews(response.data)
    } catch (error) {
      console.error("Error fetching buddy reviews:", error)
    }
  }

  useEffect(() => {
    // Added useEffect to fetch reviews when myBuddy changes
    if (myBuddy) {
      fetchBuddyReviews(myBuddy.id)
    }
  }, [myBuddy])


  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await axios.delete(`${fetch_path}/buddy-sustav/buddy/prihvati/${studentId}`, {
        withCredentials: true,
      })
      if (response.status === 200) {
        setAllMyStudents(allMyStudents.filter((student) => student.user.id !== studentId))
        alert("Student successfully removed.")
      }
    } catch (error) {
      console.error("Error deleting student:", error)
      alert("Failed to remove student. Please try again.")
    }
  }

  const handleRateBuddy = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${fetch_path}/recenzije`,
        {
          buddy: {
            id: myBuddy.id,
          },
          score: review.rating,
          message: review.description,
        },
        { withCredentials: true },
      )
      if (response.status === 200) {
        setMyBuddy({ ...myBuddy, rating: review.rating })
        alert("Buddy successfully rated.")
        setIsReviewModalOpen(false)
        setReview({ rating: 0, description: "" })
        fetchBuddyReviews(myBuddy.id)
      }
    } catch (error) {
      console.error("Error rating buddy:", error)
    }
  }

  const handleApproveStudent = async (studentId) => {
    try {
      const response = await axios.post(
        `${fetch_path}/buddy-sustav/buddy/prihvati/${studentId}`,
        {},
        {
          withCredentials: true,
        },
      )
      if (response.status === 200) {
        fetchStudentRequestList()
        alert("Student request approved.")
      }
    } catch (error) {
      console.error("Error approving student:", error)
    }
  }

  const handleDeleteBuddy = async (studentId) => {
    try {
      const response = await axios.delete(`${fetch_path}/buddy-sustav/student/dodjeljeni-buddy`, {
        withCredentials: true,
      })
      if (response.status === 200) {
        setMyBuddy(null);
        setUser((prevUser) => ({...prevUser, buddy: null}));
        alert("Buddy successfully removed.")
      }
    } catch (error) {
      console.error("Error deleting student:", error)
    }
  }

  const StarRating = ({ rating, onRate, onHover, hoveredRating }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`stars ${star <= (hoveredRating || rating) ? "active" : ""}`}
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

  return (
    <div className="buddy-world-container">
      <div className="buddy-world-buttons">
        
        {!user.isBuddy && (
          <>
            {!user.buddy && (
              <button className="buddy-button" onClick={() => setActiveSection("findBuddy")}>
              <span>Pronađi Buddyja</span>
              </button>
            )}
            {user.buddy && (
              <button className="buddy-button" onClick={() => setActiveSection("manageBuddy")}>
              <span>Upravljaj Buddyjem</span>
              </button>
            )}
          </>
        )}
        {user.isBuddy && (
            <button className="buddy-button" onClick={() => setActiveSection("manageStudents")}>
              <span>Upravljaj Studentima</span>
            </button>
        )}
        <button className="buddy-button" onClick={() => setActiveSection("chat")}>
          <span>Razgovori</span>
        </button>
        
      </div>

      {activeSection === "findBuddy" && (
        <div className="buddy-section">
          <h2>Pronađi Buddyja</h2>
          <p>Ovdje možeš pregledati popis dostupnih Buddyja i odabrati onog koji ti najbolje odgovara.</p>
          {requestedBuddy && <p style={{ color: "#d83071bc" }}>Zahtjev je poslan buddyju: {requestedBuddy.name}</p>}

          {/* Filter sekcija */}
          <div className="filter-section">
            <label>
              Mjesto:
              <select value={filter.city} onChange={(e) => setFilter({ ...filter, city: e.target.value })}>
                <option value="">Sva mjesta</option>
                {listCities}
              </select>
            </label>

            <label>
              Domovi:
              <select
                value={filter.studentHome}
                onChange={(e) => setFilter({ ...filter, studentHome: e.target.value })}
              >
                <option value="">Svi domovi</option>
                {listStudentHomes}
              </select>
            </label>

            <label>
              Fakultet:
              <select value={filter.faculty} onChange={(e) => setFilter({ ...filter, faculty: e.target.value })}>
                <option value="">Svi fakulteti</option>
                {listFaculties}
              </select>
            </label>
          </div>

          {/* Prikaz filtriranih Buddyja */}
          <div className="buddy-grid">{buddyDivision}</div>
        </div>
      )}

      {activeSection === "manageBuddy" && (
        <div className="buddy-section">
          <h2>Upravljaj Buddyjem</h2>
            <>
              {myBuddy ? (
                <>
                  <p>Tvoj trenutni Buddy: {myBuddy.name}</p>
                  <button onClick={handleDeleteBuddy}>Izbriši Buddyja</button>
                  <div>
                    <p>Ocijeni Buddyja:</p>
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
                </>
              ) : (
                <p>Trenutno nemaš Buddyja.</p>
              )}
            </>
        </div>
      )}

      {/* Sekcija za "Razgovori" */}
      {activeSection === "chat" && (
        <div className="buddy-section">
          <h2>Razgovori</h2>
          <p>Uskoro ćeš moći pregledavati i razmjenjivati poruke zajedno s Buddyjem!</p>
        </div>
      )}

      {/* Sekcija za "Upravljaj Studentima" */}
      {activeSection === "manageStudents" && (
        <div className="buddy-section">
          <h2>Upravljaj Studentima</h2>
          <p>Ovdje možeš dodavati, uređivati ili brisati studente koji koriste Buddy svijet.</p>

          <h3>Zahtjevi studenata:</h3>
          <div className="buddy-grid">
            {studentRequestList.map((request) => (
              <div key={request.user.id} className="buddy-appuser-card">
                <p>{request.user.name}</p>
                <button onClick={() => handleApproveStudent(request.user.id)}>Prihvati</button>
              </div>
            ))}
          </div>
          <h3>Moji studenti:</h3>
              <div className="buddy-grid">
                {allMyStudents.map((student) => (
                  <div key={student.user.id} className="buddy-appuser-card">
                    <p>{student.user.name}</p>
                    <p>{student.user.email}</p>
                    <button onClick={() => handleDeleteStudent(student.user.id)}>Izbriši</button>
                  </div>
                ))}
              </div>
        </div>
      )}
      {isReviewModalOpen && myBuddy && (
        <div className="modal-overlay">
          <div className="modal review-popup">
            <h2>Reviews for {myBuddy.name}</h2>
            <div className="review-summary">
              <StarRating
                rating={review.rating}
                hoveredRating={hoveredRating}
                onRate={(rating) => setReview((prev) => ({ ...prev, rating }))}
                onHover={setHoveredRating}
              />
            </div>
            <form onSubmit={handleRateBuddy}>
              <div className="form-group">
                <label htmlFor="reviewDescription">Recenzija</label>
                <textarea
                  id="reviewDescription"
                  value={review.description}
                  onChange={(e) => setReview((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Reci nam više o svom iskustvu..."
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Objavi recenziju
                </button>
                <button className="cancel-button" onClick={() => setIsReviewModalOpen(false)}>
                  Zatvori
                </button>
              </div>
              <div className="reviews-list">
                {buddyReviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-rating">
                      <StarRating rating={review.score} hoveredRating={0} onRate={() => {}} onHover={() => {}} />
                    </div>
                    <p>{review.message}</p>
                    <div className="review-meta">
                      <span>Reviewed by {review.creator?.name || "Anonymous"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuddyWorld


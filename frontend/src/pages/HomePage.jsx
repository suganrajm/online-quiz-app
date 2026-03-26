import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Clock, HelpCircle, ChevronRight, Sparkles } from 'lucide-react'
import { quizAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    quizAPI.getAll()
      .then(res => setQuizzes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-content">
      <div className="container">
        {/* Hero */}
        <div className="home-hero">
          <h1>
            Test Your <span className="gradient-text">Knowledge</span>
            <br />Like Never Before
          </h1>
          <p>
            Welcome back, <strong>{user?.fullName || user?.username}</strong>! Explore our collection of quizzes and challenge yourself.
          </p>

          <div className="home-stats">
            <div className="stat-item">
              <div className="stat-num">{quizzes.length}</div>
              <div className="stat-label">Available Quizzes</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">∞</div>
              <div className="stat-label">Attempts Allowed</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">📊</div>
              <div className="stat-label">Instant Results</div>
            </div>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="section-title">
          <Sparkles size={20} color="var(--accent)" />
          Available Quizzes
        </div>

        {loading ? (
          <div className="loading-center">
            <div className="spinner" />
            <span>Loading quizzes...</span>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No quizzes yet</h3>
            <p>Check back soon — new quizzes are coming!</p>
          </div>
        ) : (
          <div className="quiz-grid">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="quiz-card" onClick={() => navigate(`/quiz/${quiz.id}`)} id={`quiz-card-${quiz.id}`}>
                <div className="quiz-card-icon">
                  <BookOpen size={22} color="white" />
                </div>
                <div className="quiz-card-title">{quiz.title}</div>
                <div className="quiz-card-desc">{quiz.description || 'Test your knowledge on this topic!'}</div>
                <div className="quiz-card-meta">
                  <div className="quiz-card-meta-item">
                    <HelpCircle size={13} />
                    {quiz.questionCount} Questions
                  </div>
                  <div className="quiz-card-meta-item">
                    <Clock size={13} />
                    {quiz.timeLimitMinutes} min
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
                  Start Quiz <ChevronRight size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

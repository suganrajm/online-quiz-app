import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react'
import { quizAPI, attemptAPI } from '../services/api'

export default function QuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionId: selectedOptionId }
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    quizAPI.getById(id).then(res => {
      setQuiz(res.data)
      setTimeLeft(res.data.timeLimitMinutes * 60)
    }).catch(() => navigate('/')).finally(() => setLoading(false))
  }, [id, navigate])

  const submitQuiz = useCallback(async (forceAnswers) => {
    if (submitting) return
    setSubmitting(true)
    const used = forceAnswers || answers
    const answerList = quiz.questions.map(q => ({
      questionId: q.id,
      selectedOptionId: used[q.id] || null
    }))
    try {
      const res = await attemptAPI.submit({ quizId: quiz.id, answers: answerList })
      navigate(`/result/${res.data.attemptId}`)
    } catch (err) {
      console.error(err)
      setSubmitting(false)
    }
  }, [submitting, answers, quiz, navigate])

  // Timer
  useEffect(() => {
    if (!quiz || timeLeft <= 0) return
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); submitQuiz(answers); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [quiz, timeLeft, submitQuiz, answers])

  if (loading) return <div className="loading-center"><div className="spinner" /><span>Loading quiz...</span></div>
  if (!quiz) return null

  const question = quiz.questions[currentQ]
  const totalQ = quiz.questions.length
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')
  const urgent = timeLeft < 60
  const answered = Object.keys(answers).length

  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F']

  return (
    <div className="page-content">
      <div className="container">
        <div className="quiz-page">
          {/* Header */}
          <div className="quiz-header">
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>{quiz.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>
                {answered}/{totalQ} answered
              </p>
            </div>
            <div className={`quiz-timer ${urgent ? 'urgent' : ''}`}>
              <Clock size={20} />
              {mins}:{secs}
            </div>
          </div>

          {/* Progress */}
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }} />
          </div>

          {/* Question */}
          <div className="question-card">
            <div className="question-num">Question {currentQ + 1} of {totalQ}</div>
            <div className="question-text">{question.questionText}</div>

            <div className="options-grid">
              {question.options.map((opt, i) => {
                const selected = answers[question.id] === opt.id
                return (
                  <button
                    key={opt.id}
                    id={`option-${opt.id}`}
                    className={`option-btn ${selected ? 'selected' : ''}`}
                    onClick={() => setAnswers(a => ({ ...a, [question.id]: opt.id }))}
                  >
                    <div className="option-circle">{optionLetters[i]}</div>
                    <span>{opt.optionText}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="question-nav-dots">
            {quiz.questions.map((q, i) => (
              <button
                key={q.id}
                className={`nav-dot ${i === currentQ ? 'current' : ''} ${answers[q.id] ? 'answered' : ''}`}
                onClick={() => setCurrentQ(i)}
                id={`nav-dot-${i}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="quiz-nav" style={{ marginTop: 24 }}>
            <button
              className="btn btn-outline"
              onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
              disabled={currentQ === 0}
            >
              <ChevronLeft size={18} /> Previous
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => setAnswers(a => { const n = { ...a }; delete n[question.id]; return n })}
            >
              Clear Answer
            </button>

            {currentQ < totalQ - 1 ? (
              <button className="btn btn-primary" onClick={() => setCurrentQ(q => q + 1)} id="next-btn">
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button
                className="btn btn-primary"
                id="submit-quiz-btn"
                onClick={() => submitQuiz()}
                disabled={submitting}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                {submitting ? 'Submitting...' : <><Send size={16} /> Submit Quiz</>}
              </button>
            )}
          </div>

          {answered < totalQ && currentQ === totalQ - 1 && (
            <div className="alert alert-danger" style={{ marginTop: 16 }}>
              <AlertTriangle size={16} />
              You have {totalQ - answered} unanswered question(s). You can still submit — they'll be marked as skipped.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

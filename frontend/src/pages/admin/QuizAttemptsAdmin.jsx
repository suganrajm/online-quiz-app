import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { History, Target, CalendarDays, Award } from 'lucide-react'
import { adminPlatformAPI } from '../../services/api'

export default function QuizAttemptsAdmin() {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    adminPlatformAPI.getAttempts()
      .then(res => setAttempts(res.data))
      .catch(err => {
        console.error('Failed to fetch attempts', err)
        alert('Could not load quiz attempts.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-content">
      <div className="container">
        <div className="admin-page">
          <div className="page-header" style={{ marginBottom: 30 }}>
            <div>
              <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <History size={28} color="var(--primary)" />
                Platform Quiz Attempts
              </h1>
              <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>View all quiz attempts by users across the platform</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/admin')}>
              Back to Dashboard
            </button>
          </div>

          <div className="table-container">
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading attempts...</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Quiz Title</th>
                    <th>Score</th>
                    <th>Date Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.length === 0 ? (
                    <tr><td colSpan={4} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No quiz attempts yet.</td></tr>
                  ) : attempts.sort((a,b) => new Date(b.submittedAt) - new Date(a.submittedAt)).map(attempt => {
                    const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100) || 0;
                    return (
                      <tr key={attempt.attemptId}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>@{attempt.username}</td>
                        <td style={{ fontWeight: 500 }}>{attempt.quizTitle}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ 
                              fontWeight: 700, 
                              color: percentage >= 70 ? '#22c55e' : percentage >= 40 ? '#f59e0b' : '#ef4444' 
                            }}>
                              {attempt.score}/{attempt.totalQuestions}
                            </span>
                            <span className="badge" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                              <Award size={12} style={{marginRight: 4, color: 'var(--accent)'}}/>
                              {percentage}%
                            </span>
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <CalendarDays size={14} />
                            {new Date(attempt.submittedAt).toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

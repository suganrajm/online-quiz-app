import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Users, TrendingUp, History } from 'lucide-react'
import { quizAPI, adminPlatformAPI } from '../../services/api'

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([])
  const [stats, setStats] = useState({ totalUsers: 0, totalQuizzes: 0, totalAttempts: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    quizAPI.adminGetAll().then(res => setQuizzes(res.data)).catch(console.error)
    adminPlatformAPI.getStats().then(res => setStats(res.data)).catch(console.error)
  }, [])

  return (
    <div className="page-content">
      <div className="container">
        <div className="admin-page">
          <div className="page-header">
            <div>
              <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LayoutDashboard size={28} color="var(--primary)" />
                Admin Dashboard
              </h1>
              <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>Manage quizzes, users, and track platform activity</p>
            </div>
          </div>

          {/* Stats */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card" onClick={() => navigate('/admin/users')} style={{ cursor: 'pointer' }}>
              <div className="stat-icon purple"><Users size={22} /></div>
              <div>
                <div className="stat-card-value">{stats.totalUsers}</div>
                <div className="stat-card-label">Total Users</div>
              </div>
            </div>
            <div className="admin-stat-card" onClick={() => navigate('/admin/quizzes')} style={{ cursor: 'pointer' }}>
              <div className="stat-icon green"><BookOpen size={22} /></div>
              <div>
                <div className="stat-card-value">{stats.totalQuizzes}</div>
                <div className="stat-card-label">Total Quizzes</div>
              </div>
            </div>
            <div className="admin-stat-card" onClick={() => navigate('/admin/attempts')} style={{ cursor: 'pointer' }}>
              <div className="stat-icon orange"><TrendingUp size={22} /></div>
              <div>
                <div className="stat-card-value">{stats.totalAttempts}</div>
                <div className="stat-card-label">Total Attempts</div>
              </div>
            </div>
          </div>

          {/* Quick Nav Options */}
          <div style={{ display: 'flex', gap: 16, marginTop: 24, marginBottom: 32, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/admin/quizzes')} id="manage-quizzes-btn">
              <BookOpen size={16} /> Manage Quizzes
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/admin/users')} id="manage-users-btn">
              <Users size={16} /> Manage Users
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/admin/attempts')} id="view-attempts-btn">
              <History size={16} /> All Quiz Attempts
            </button>
          </div>

          {/* Recent Quizzes */}
          <h2 className="section-title" style={{ marginBottom: 20 }}><BookOpen size={18} /> Recent Quizzes</h2>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Quiz Title</th>
                  <th>Questions</th>
                  <th>Time Limit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>No quizzes yet. Create one!</td></tr>
                ) : quizzes.slice(0, 5).map(quiz => (
                  <tr key={quiz.id}>
                    <td style={{ fontWeight: 600 }}>{quiz.title}</td>
                    <td><span className="badge badge-accent">{quiz.questionCount} Qs</span></td>
                    <td>{quiz.timeLimitMinutes} min</td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/admin/quizzes/${quiz.id}/edit`)} id={`edit-quiz-dash-${quiz.id}`}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

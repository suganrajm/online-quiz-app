import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, BookOpen, Pencil, Trash2, Clock, HelpCircle, AlertCircle } from 'lucide-react'
import { quizAPI } from '../../services/api'

function CreateQuizModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ title: '', description: '', timeLimitMinutes: 10 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required'); return }
    setLoading(true)
    try {
      const res = await quizAPI.create(form)
      onCreated(res.data)
      onClose()
    } catch { setError('Failed to create quiz') } finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <h2>Create New Quiz</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 22 }}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="alert alert-danger"><AlertCircle size={15} />{error}</div>}
            <div className="form-group">
              <label className="form-label">Quiz Title *</label>
              <input id="create-quiz-title" className="form-input" placeholder="e.g., JavaScript Fundamentals" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" rows={3} placeholder="Brief description of the quiz..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Time Limit (minutes)</label>
              <input id="create-quiz-time" className="form-input" type="number" min={1} max={180} value={form.timeLimitMinutes} onChange={e => setForm(f => ({ ...f, timeLimitMinutes: +e.target.value }))} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button id="create-quiz-submit" type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create Quiz'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    quizAPI.adminGetAll().then(res => setQuizzes(res.data)).finally(() => setLoading(false))
  }, [])

  const handleDelete = async id => {
    if (!window.confirm('Delete this quiz? All questions will be removed.')) return
    setDeleting(id)
    try {
      await quizAPI.delete(id)
      setQuizzes(qs => qs.filter(q => q.id !== id))
    } catch { alert('Failed to delete quiz') } finally { setDeleting(null) }
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="admin-page">
          <div className="page-header">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BookOpen size={24} color="var(--accent)" /> Manage Quizzes
            </h1>
            <button id="create-quiz-btn" className="btn btn-primary" onClick={() => setShowCreate(true)}>
              <Plus size={18} /> Create Quiz
            </button>
          </div>

          {loading ? (
            <div className="loading-center"><div className="spinner" /></div>
          ) : quizzes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>No quizzes yet</h3>
              <p style={{ marginBottom: 20 }}>Create your first quiz to get started</p>
              <button className="btn btn-primary" onClick={() => setShowCreate(true)}><Plus size={16} /> Create Quiz</button>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Description</th>
                    <th>Questions</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map(quiz => (
                    <tr key={quiz.id}>
                      <td style={{ fontWeight: 600 }}>{quiz.title}</td>
                      <td style={{ color: 'var(--text-muted)', maxWidth: 200 }}>
                        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {quiz.description || '—'}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-accent" style={{ display: 'inline-flex', gap: 4 }}>
                          <HelpCircle size={11} /> {quiz.questionCount}
                        </span>
                      </td>
                      <td>
                        <span className="badge" style={{ background: 'var(--success-light)', color: 'var(--success)', display: 'inline-flex', gap: 4 }}>
                          <Clock size={11} /> {quiz.timeLimitMinutes}m
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-ghost btn-sm" id={`edit-quiz-${quiz.id}`} onClick={() => navigate(`/admin/quizzes/${quiz.id}/edit`)}>
                            <Pencil size={14} /> Edit
                          </button>
                          <button className="btn btn-danger btn-sm" id={`delete-quiz-${quiz.id}`} onClick={() => handleDelete(quiz.id)} disabled={deleting === quiz.id}>
                            <Trash2 size={14} /> {deleting === quiz.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showCreate && (
        <CreateQuizModal
          onClose={() => setShowCreate(false)}
          onCreated={q => setQuizzes(qs => [q, ...qs])}
        />
      )}
    </div>
  )
}

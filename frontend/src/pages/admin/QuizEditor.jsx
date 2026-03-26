import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Check, ArrowLeft, GripVertical, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { quizAPI } from '../../services/api'

function QuestionForm({ onSave, onCancel, initialData }) {
  const [questionText, setQuestionText] = useState(initialData?.questionText || '')
  const [options, setOptions] = useState(initialData?.options?.length
    ? initialData.options.map(o => ({ optionText: o.optionText, isCorrect: o.isCorrect }))
    : [{ optionText: '', isCorrect: true }, { optionText: '', isCorrect: false }, { optionText: '', isCorrect: false }, { optionText: '', isCorrect: false }]
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const setOption = (i, field, value) => setOptions(opts => opts.map((o, idx) => {
    if (idx !== i) return field === 'isCorrect' && value ? { ...o, isCorrect: false } : o
    return { ...o, [field]: value }
  }))

  const handleSave = async () => {
    if (!questionText.trim()) { setError('Question text is required'); return }
    const validOpts = options.filter(o => o.optionText.trim())
    if (validOpts.length < 2) { setError('At least 2 options required'); return }
    if (!validOpts.some(o => o.isCorrect)) { setError('Mark at least one correct answer'); return }
    setError('')
    setLoading(true)
    try {
      await onSave({ questionText, options: validOpts })
    } finally { setLoading(false) }
  }

  return (
    <div className="question-card" style={{ marginBottom: 20 }}>
      {error && <div className="alert alert-danger" style={{ marginBottom: 16 }}><AlertCircle size={15} />{error}</div>}

      <div className="form-group">
        <label className="form-label">Question Text *</label>
        <textarea
          id="question-text-input"
          className="form-input"
          rows={3}
          placeholder="Enter your question..."
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          style={{ resize: 'vertical' }}
        />
      </div>

      <div className="form-label" style={{ marginBottom: 10 }}>Answer Options (check ✓ to mark correct)</div>
      {options.map((opt, i) => (
        <div key={i} className="option-editor">
          <input
            id={`option-input-${i}`}
            type="text"
            className="form-input"
            placeholder={`Option ${String.fromCharCode(65 + i)}`}
            value={opt.optionText}
            onChange={e => setOption(i, 'optionText', e.target.value)}
          />
          <button
            type="button"
            className={`correct-toggle ${opt.isCorrect ? 'active' : ''}`}
            onClick={() => setOption(i, 'isCorrect', !opt.isCorrect)}
            title="Mark as correct"
            id={`correct-toggle-${i}`}
          >
            <Check size={16} />
          </button>
          {options.length > 2 && (
            <button
              type="button"
              onClick={() => setOptions(opts => opts.filter((_, idx) => idx !== i))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', display: 'flex', alignItems: 'center' }}
              title="Remove option"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}

      {options.length < 6 && (
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 8 }}
          onClick={() => setOptions(opts => [...opts, { optionText: '', isCorrect: false }])}>
          <Plus size={14} /> Add Option
        </button>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
        <button className="btn btn-outline btn-sm" onClick={onCancel}>Cancel</button>
        <button id="save-question-btn" className="btn btn-primary btn-sm" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : <><Check size={14} /> Save Question</>}
        </button>
      </div>
    </div>
  )
}

export default function QuizEditor() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [expandedQ, setExpandedQ] = useState(null)

  useEffect(() => {
    quizAPI.adminGetById(quizId).then(res => setQuiz(res.data)).finally(() => setLoading(false))
  }, [quizId])

  const handleAddQuestion = async data => {
    const res = await quizAPI.addQuestion(quizId, data)
    setQuiz(q => ({ ...q, questions: [...(q.questions || []), res.data] }))
    setShowAddForm(false)
  }

  const handleUpdateQuestion = async (qId, data) => {
    const res = await quizAPI.updateQuestion(qId, data)
    setQuiz(q => ({ ...q, questions: q.questions.map(qq => qq.id === qId ? res.data : qq) }))
    setEditingId(null)
  }

  const handleDeleteQuestion = async qId => {
    if (!window.confirm('Delete this question?')) return
    await quizAPI.deleteQuestion(qId)
    setQuiz(q => ({ ...q, questions: q.questions.filter(qq => qq.id !== qId) }))
  }

  if (loading) return <div className="loading-center"><div className="spinner" /></div>
  if (!quiz) return null

  return (
    <div className="page-content">
      <div className="container">
        <div className="admin-page">
          <div className="page-header">
            <div>
              <button className="btn btn-ghost btn-sm" style={{ marginBottom: 8 }} onClick={() => navigate('/admin/quizzes')} id="back-to-quizzes-btn">
                <ArrowLeft size={15} /> Back to Quizzes
              </button>
              <h1 style={{ fontSize: '1.5rem' }}>✏️ {quiz.title}</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>
                {quiz.questions?.length || 0} questions · {quiz.timeLimitMinutes} min
              </p>
            </div>
            <button id="add-question-btn" className="btn btn-primary" onClick={() => { setShowAddForm(true); setEditingId(null) }}>
              <Plus size={18} /> Add Question
            </button>
          </div>

          {/* Add Question Form */}
          {showAddForm && (
            <QuestionForm onSave={handleAddQuestion} onCancel={() => setShowAddForm(false)} />
          )}

          {/* Questions List */}
          {!quiz.questions || quiz.questions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">❓</div>
              <h3>No questions yet</h3>
              <p style={{ marginBottom: 20 }}>Add your first question to this quiz</p>
              <button className="btn btn-primary" onClick={() => setShowAddForm(true)}><Plus size={16} /> Add Question</button>
            </div>
          ) : (
            quiz.questions.map((q, i) => (
              <div key={q.id} style={{ marginBottom: 16 }}>
                {editingId === q.id ? (
                  <QuestionForm
                    initialData={q}
                    onSave={data => handleUpdateQuestion(q.id, data)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div className="question-card" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ color: 'var(--text-muted)', marginTop: 2 }}><GripVertical size={18} /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <span className="badge badge-accent">Q{i + 1}</span>
                          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{q.questionText}</span>
                          <button
                            onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}
                            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                          >
                            {expandedQ === q.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>
                        {expandedQ === q.id && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                            {q.options?.map((opt, oi) => (
                              <div key={opt.id} style={{
                                padding: '8px 12px', borderRadius: 8, fontSize: '0.88rem',
                                background: opt.isCorrect ? 'var(--success-light)' : 'var(--accent-light)',
                                color: opt.isCorrect ? 'var(--success)' : 'var(--text-secondary)',
                                display: 'flex', alignItems: 'center', gap: 8
                              }}>
                                {opt.isCorrect && <Check size={13} />}
                                {String.fromCharCode(65 + oi)}. {opt.optionText}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button className="btn btn-ghost btn-sm" id={`edit-q-${q.id}`} onClick={() => { setEditingId(q.id); setShowAddForm(false) }}>
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" id={`delete-q-${q.id}`} onClick={() => handleDeleteQuestion(q.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

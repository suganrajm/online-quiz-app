import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { CheckCircle2, XCircle, MinusCircle, Home, RefreshCw, Trophy } from 'lucide-react'
import { attemptAPI } from '../services/api'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ResultPage() {
  const { attemptId } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    attemptAPI.getResult(attemptId)
      .then(res => setResult(res.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [attemptId, navigate])

  if (loading) return <div className="loading-center"><div className="spinner" /><span>Loading results...</span></div>
  if (!result) return null

  const { correctAnswers: correct, wrongAnswers: wrong, skippedAnswers: skipped, totalQuestions: total, score } = result

  const chartData = {
    labels: ['Correct', 'Wrong', 'Skipped'],
    datasets: [{
      data: [correct, wrong, skipped],
      backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
      borderColor: ['#059669', '#dc2626', '#d97706'],
      borderWidth: 2,
      hoverOffset: 8,
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: { size: 13, weight: '600', family: 'Inter' },
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#0f172a',
          usePointStyle: true,
          pointStyleWidth: 8,
        }
      },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.label}: ${ctx.parsed} (${Math.round(ctx.parsed / total * 100)}%)`
        }
      }
    }
  }

  const grade = score >= 80 ? { text: 'Excellent! 🎉', color: 'var(--success)' }
    : score >= 60 ? { text: 'Good Job! 👍', color: 'var(--accent)' }
    : score >= 40 ? { text: 'Keep Trying! 💪', color: 'var(--warning)' }
    : { text: 'Need More Practice 📚', color: 'var(--danger)' }

  return (
    <div className="page-content">
      <div className="container">
        <div className="result-page">
          {/* Header */}
          <div className="result-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Quiz Results</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{result.quizTitle}</p>

            <div className="result-score-circle">
              <div className="score-num">{score}%</div>
              <div className="score-label">Score</div>
            </div>

            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: grade.color }}>{grade.text}</div>
          </div>

          {/* Chart + Stats Grid */}
          <div className="result-grid">
            {/* Pie Chart */}
            <div className="result-chart-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, alignSelf: 'flex-start' }}>Performance Breakdown</h3>
              <div style={{ width: '100%', height: 260, position: 'relative' }}>
                <Doughnut data={chartData} options={chartOptions} id="result-pie-chart" />
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>✓ {correct} Correct</span>
                <span className="badge" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>✗ {wrong} Wrong</span>
                <span className="badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>— {skipped} Skipped</span>
              </div>
            </div>

            {/* Stats */}
            <div className="result-stats-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Summary</h3>

              <div className="stat-row correct">
                <div className="stat-row-label">
                  <CheckCircle2 size={20} color="var(--success)" />
                  <span style={{ color: 'var(--success)' }}>Correct Answers</span>
                </div>
                <div className="stat-row-value" style={{ color: 'var(--success)' }}>{correct}</div>
              </div>

              <div className="stat-row wrong">
                <div className="stat-row-label">
                  <XCircle size={20} color="var(--danger)" />
                  <span style={{ color: 'var(--danger)' }}>Wrong Answers</span>
                </div>
                <div className="stat-row-value" style={{ color: 'var(--danger)' }}>{wrong}</div>
              </div>

              <div className="stat-row skipped">
                <div className="stat-row-label">
                  <MinusCircle size={20} color="var(--warning)" />
                  <span style={{ color: 'var(--warning)' }}>Skipped</span>
                </div>
                <div className="stat-row-value" style={{ color: 'var(--warning)' }}>{skipped}</div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Total Questions</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>{total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Final Score</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>{score}%</span>
              </div>
            </div>
          </div>

          {/* Question Review */}
          {result.questionResults && result.questionResults.length > 0 && (
            <div className="review-section">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>Answer Review</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>
                Detailed breakdown of each question
              </p>
              {result.questionResults.map((qr, i) => (
                <div key={qr.questionId} className="review-item">
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    {qr.isSkipped ? <MinusCircle size={18} color="var(--warning)" style={{ marginTop: 2, flexShrink: 0 }} />
                      : qr.isCorrect ? <CheckCircle2 size={18} color="var(--success)" style={{ marginTop: 2, flexShrink: 0 }} />
                      : <XCircle size={18} color="var(--danger)" style={{ marginTop: 2, flexShrink: 0 }} />}
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.92rem' }}>
                        Q{i + 1}. {qr.questionText}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {qr.isSkipped ? '⚠️ Skipped' : qr.isCorrect ? '✅ Correct answer' : '❌ Incorrect answer'}
                      </div>
                    </div>
                    <span
                      className="badge"
                      style={{
                        marginLeft: 'auto',
                        background: qr.isSkipped ? 'var(--warning-light)' : qr.isCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                        color: qr.isSkipped ? 'var(--warning)' : qr.isCorrect ? 'var(--success)' : 'var(--danger)'
                      }}
                    >
                      {qr.isSkipped ? 'Skipped' : qr.isCorrect ? 'Correct' : 'Wrong'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <button id="go-home-btn" className="btn btn-outline btn-lg" onClick={() => navigate('/')}>
              <Home size={18} /> Back to Home
            </button>
            <button id="retake-btn" className="btn btn-primary btn-lg" onClick={() => navigate(`/quiz/${result.quizId || ''}`)}>
              <RefreshCw size={18} /> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

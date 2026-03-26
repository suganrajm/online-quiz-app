import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Trophy, LogOut, LayoutDashboard, BookOpen, User } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { user, logout, isAdmin, isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = path => location.pathname === path ? 'nav-link active' : 'nav-link'

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <Trophy size={22} />
          <span>Quiz<span style={{ color: 'var(--text-primary)' }}>Master</span></span>
        </Link>

        {/* Nav Links */}
        {isAuthenticated && (
          <div className="navbar-nav">
            {isAdmin ? (
              <>
                <Link to="/admin" className={isActive('/admin')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <LayoutDashboard size={15} /> Dashboard
                  </span>
                </Link>
                <Link to="/admin/quizzes" className={isActive('/admin/quizzes')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <BookOpen size={15} /> Quizzes
                  </span>
                </Link>
              </>
            ) : (
              <Link to="/" className={isActive('/')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BookOpen size={15} /> Browse Quizzes
                </span>
              </Link>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="navbar-actions">
          {isAuthenticated && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              <User size={14} style={{ display: 'inline', marginRight: 4 }} />
              {user?.fullName || user?.username}
            </span>
          )}
          <button className="theme-toggle" onClick={toggle} title="Toggle theme" id="theme-toggle-btn">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {isAuthenticated && (
            <button className="btn btn-outline btn-sm" onClick={handleLogout} id="logout-btn">
              <LogOut size={15} /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

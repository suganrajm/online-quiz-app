import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Trash2, Shield, CalendarDays } from 'lucide-react'
import { adminPlatformAPI } from '../../services/api'

export default function UsersManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    setLoading(true)
    adminPlatformAPI.getUsers()
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Failed to fetch users', err)
        alert('Could not load users.')
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = (id, username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?\nThis action cannot be undone and will delete all their quiz attempts.`)) {
      adminPlatformAPI.deleteUser(id)
        .then(() => {
          setUsers(users.filter(u => u.id !== id))
        })
        .catch(err => {
          console.error('Failed to delete user', err)
          alert('Failed to delete the user.')
        })
    }
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="admin-page">
          <div className="page-header" style={{ marginBottom: 30 }}>
            <div>
              <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Users size={28} color="var(--primary)" />
                Users Management
              </h1>
              <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>View and manage platform users</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/admin')}>
              Back to Dashboard
            </button>
          </div>

          <div className="table-container">
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading users...</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No users found.</td></tr>
                  ) : users.map(user => (
                    <tr key={user.id}>
                      <td style={{ fontWeight: 600 }}>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'ROLE_ADMIN' ? 'badge-primary' : 'badge-accent'}`}>
                          {user.role === 'ROLE_ADMIN' ? <Shield size={12} style={{marginRight: 4}}/> : null}
                          {user.role.replace('ROLE_', '')}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <CalendarDays size={14} />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        {user.role !== 'ROLE_ADMIN' && (
                          <button 
                            className="btn btn-ghost btn-sm" 
                            style={{ color: '#ef4444' }}
                            onClick={() => handleDelete(user.id, user.username)}
                            title="Delete User"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

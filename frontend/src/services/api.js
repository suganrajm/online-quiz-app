import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('qm-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('qm-token')
      localStorage.removeItem('qm-user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── Auth ───
export const authAPI = {
  register: data => api.post('/api/auth/register', data),
  login: data => api.post('/api/auth/login', data),
}

// ─── Quizzes ───
export const quizAPI = {
  getAll: () => api.get('/api/quizzes'),
  getById: id => api.get(`/api/quizzes/${id}`),
  // Admin
  adminGetAll: () => api.get('/api/admin/quizzes'),
  adminGetById: id => api.get(`/api/admin/quizzes/${id}`),
  create: data => api.post('/api/admin/quizzes', data),
  update: (id, data) => api.put(`/api/admin/quizzes/${id}`, data),
  delete: id => api.delete(`/api/admin/quizzes/${id}`),
  addQuestion: (quizId, data) => api.post(`/api/admin/quizzes/${quizId}/questions`, data),
  updateQuestion: (qId, data) => api.put(`/api/admin/questions/${qId}`, data),
  deleteQuestion: qId => api.delete(`/api/admin/questions/${qId}`),
}

// ─── Attempts ───
export const attemptAPI = {
  submit: data => api.post('/api/attempts/submit', data),
  getResult: id => api.get(`/api/attempts/${id}`),
  getMyAttempts: () => api.get('/api/attempts/my'),
}

// ─── Admin Platform ───
export const adminPlatformAPI = {
  getStats: () => api.get('/api/admin/stats'),
  getUsers: () => api.get('/api/admin/users'),
  deleteUser: id => api.delete(`/api/admin/users/${id}`),
  getAttempts: () => api.get('/api/admin/attempts'),
}

export default api

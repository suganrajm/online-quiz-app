import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageQuizzes from './pages/admin/ManageQuizzes'
import QuizEditor from './pages/admin/QuizEditor'
import UsersManagement from './pages/admin/UsersManagement'
import QuizAttemptsAdmin from './pages/admin/QuizAttemptsAdmin'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* User Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout><HomePage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/quiz/:id" element={
              <ProtectedRoute>
                <Layout><QuizPage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/result/:attemptId" element={
              <ProtectedRoute>
                <Layout><ResultPage /></Layout>
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Layout><AdminDashboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/quizzes" element={
              <ProtectedRoute adminOnly>
                <Layout><ManageQuizzes /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/quizzes/:quizId/edit" element={
              <ProtectedRoute adminOnly>
                <Layout><QuizEditor /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly>
                <Layout><UsersManagement /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/attempts" element={
              <ProtectedRoute adminOnly>
                <Layout><QuizAttemptsAdmin /></Layout>
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

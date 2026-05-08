import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';

// Pages
import DashboardPage from './pages/DashboardPage';
import InsightsPage from './pages/InsightsPage';
import LearnConceptPage from './pages/Learn[conceptId]Page';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
import NoteDetailPage from './pages/Notes[id]Page';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import QuizConceptPage from './pages/Quiz[conceptId]Page';
import FlashcardPage from './pages/FlashcardPage';
import RegisterPage from './pages/RegisterPage';
import ResourcesPage from './pages/ResourcesPage';

// Simple Auth Guard (you can expand this to use your actual auth context)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
          <Route path="/learn/:conceptId" element={<ProtectedRoute><LearnConceptPage /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
          <Route path="/notes/:id" element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
          <Route path="/quiz/:conceptId" element={<ProtectedRoute><QuizConceptPage /></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute><FlashcardPage /></ProtectedRoute>} />
          <Route path="/flashcards/:conceptId" element={<ProtectedRoute><FlashcardPage /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

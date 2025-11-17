// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import KalingaAuthSystem from "./pages/KalingaAuthSystem";
import Dashboard from "./pages/Dashboard";
import EmergencySOS from "./pages/EmergencySOS";
import TriageSystem from "./pages/TriageSystem";
import OnlineTraining from "./pages/OnlineTraining";
import Modules from "./pages/Online/Modules";
import Certifications from "./pages/Online/Certifications";
import Settings from "./pages/Settings";
import IncidentLogs from "./pages/IncidentLogs";
import CourseDetails from "./pages/Online/CourseDetails";
import InfoPage from "./pages/Online/InfoPage";
import LessonDetails from "./pages/Online/LessonDetails";
import AssessmentPage from "./pages/Online/AssessmentPage";
import Grades from "./pages/Grades";
import Profile from "./pages/Profile";

// 🧠 Context
import { TriageProvider } from "./context/TriageProvider";

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      {/* 🧠 Wrap all private routes inside TriageProvider */}
      <TriageProvider>
        <Routes>
          {/* 🟢 Public Route */}
          <Route path="/login" element={<KalingaAuthSystem />} />

          {/* 🟢 Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/incident-logs"
            element={
              <PrivateRoute>
                <IncidentLogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/emergency-sos"
            element={
              <PrivateRoute>
                <EmergencySOS />
              </PrivateRoute>
            }
          />
          <Route
            path="/triage-system"
            element={
              <PrivateRoute>
                <TriageSystem />
              </PrivateRoute>
            }
          />
          <Route
            path="/online-training"
            element={
              <PrivateRoute>
                <OnlineTraining />
              </PrivateRoute>
            }
          />
          <Route
            path="/modules"
            element={
              <PrivateRoute>
                <Modules />
              </PrivateRoute>
            }
          />
          <Route
            path="/certifications"
            element={
              <PrivateRoute>
                <Certifications />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <PrivateRoute>
                <Grades />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* 🧾 Course Main Page */}
          <Route
            path="/modules/:id"
            element={
              <PrivateRoute>
                <CourseDetails />
              </PrivateRoute>
            }
          />

          {/* 🧠 Info Page (General / Helpful Materials) */}
          <Route
            path="/modules/:id/info/:topicSlug"
            element={
              <PrivateRoute>
                <InfoPage />
              </PrivateRoute>
            }
          />

          {/* 🎥 Lesson Details (Training Materials - Lessons & Modules) */}
          <Route
            path="/modules/:id/lesson/:lessonSlug"
            element={
              <PrivateRoute>
                <LessonDetails />
              </PrivateRoute>
            }
          />

          {/* 📝 Assessments (Pre-Test, Quiz, Final Assessment) */}
          <Route
            path="/modules/:id/assessment/:type"
            element={
              <PrivateRoute>
                <AssessmentPage />
              </PrivateRoute>
            }
          />

          {/* 🏁 Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </TriageProvider>
    </Router>
  );
}

export default App;

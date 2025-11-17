import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../../layouts/Layout";
import Footer from "../../components/Footer";
import courseContent from "../../data/courseContent";
import "../../styles/lessonDetails.css";
import { markLessonComplete } from "../../lib/progressUtils";

const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function LessonDetails() {
  const { id, activitySlug } = useParams();
  const navigate = useNavigate();

  const course = courseContent[id];
  if (!course) {
    return (
      <Layout>
        <div className="lesson-center">
          <h2>Course not found</h2>
          <p>We could not find the course you requested.</p>
        </div>
        <Footer />
      </Layout>
    );
  }

  // ✅ Always include a requiredTime (default 10 seconds)
  const activities = useMemo(
    () =>
      (course.sections || []).map((section) => {
        if (typeof section === "string") {
          return { title: section, slug: slugify(section), requiredTime: 10 };
        } else {
          return {
            title: section.title,
            slug: slugify(section.title),
            requiredTime: section.requiredTime ?? 10,
          };
        }
      }),
    [course]
  );

  const idx = activitySlug
    ? activities.findIndex((a) => a.slug === activitySlug)
    : -1;
  const activeIndex = idx === -1 ? 0 : idx;
  const current = activities[activeIndex];
  const pdfUrl = `/lessons/${id}/learner-handout.pdf`;

  const progressKey = `course-progress-${id}`;
  const [completedLessons, setCompletedLessons] = useState([]);
  const [waitTime, setWaitTime] = useState(current.requiredTime || 10);
  const [isWaiting, setIsWaiting] = useState(true);
  const [isAssessmentPassed, setIsAssessmentPassed] = useState(true);

  // ✅ Check for assessment score (for current module)
  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("assessmentResults")) || {};
    const result = storedResults[id];
    if (result && result.score < 80) {
      setIsAssessmentPassed(false);
    } else {
      setIsAssessmentPassed(true);
    }
  }, [id]);

  // ✅ Timer logic: force at least 10s stay per lesson
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(progressKey)) || [];
    setCompletedLessons(saved);
    setWaitTime(current.requiredTime || 10);
    setIsWaiting(true);

    let timer;
    const timeLimit = current.requiredTime ?? 10;

    // If already completed or training materials
    if (timeLimit === 0 || saved.includes(current.slug)) {
      setIsWaiting(false);
      setWaitTime(0);
    } else {
      timer = setInterval(() => {
        setWaitTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsWaiting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [id, activitySlug]);

  const handleMarkComplete = () => {
    if (!isAssessmentPassed) {
      alert("❌ You need to pass the assessment (80% or higher) before moving to the next lesson.");
      return;
    }

    const saved = JSON.parse(localStorage.getItem(progressKey)) || [];
    if (!saved.includes(current.slug)) {
      const updated = [...saved, current.slug];
      localStorage.setItem(progressKey, JSON.stringify(updated));
      setCompletedLessons(updated);
      alert(`✅ You have completed: ${current.title}`);
    }

    // Redirect to assessment or next lesson
    if (completedLessons.length + 1 === activities.length) {
      setTimeout(() => navigate(`/assessment/${id}`), 600);
    } else {
      setTimeout(() => {
        if (activeIndex < activities.length - 1) {
          navigate(`/modules/${id}/activity/${activities[activeIndex + 1].slug}`);
        }
      }, 600);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0)
      navigate(`/modules/${id}/activity/${activities[activeIndex - 1].slug}`);
  };

  const handleNext = () => {
    if (!isAssessmentPassed) {
      alert("❌ You need to pass the assessment (80% or higher) before moving to the next lesson.");
      return;
    }
    if (isWaiting) return; // prevent skipping before 10s
    if (activeIndex < activities.length - 1)
      navigate(`/modules/${id}/activity/${activities[activeIndex + 1].slug}`);
  };

  const handleJump = (e) => {
    const slug = e.target.value;
    if (!slug) return;
    navigate(`/modules/${id}/activity/${slug}`);
  };

  const isCompleted = completedLessons.includes(current.slug);

  return (
    <Layout>
      <div className="lesson-page">
        {/* Breadcrumbs */}
        <div className="lesson-breadcrumbs">
          <Link to="/modules">Home</Link>
          <span>/</span>
          <Link to={`/modules/${id}`}>Modules</Link>
          <span>/</span>
          <span className="muted">{course.title}</span>
          <span>/</span>
          <span className="muted">{current.title}</span>
        </div>

        {/* Header */}
        <div className="lesson-header">
          <h1 className="lesson-course-title">{course.title}</h1>
          <h3 className="lesson-activity-title">{current.title}</h3>
        </div>

        {/* PDF Viewer */}
        <div className="pdf-wrapper">
          <iframe
            title={`${current.title} - ${course.title}`}
            src={pdfUrl}
            className="pdf-iframe"

          />
        </div>

        <div className="pdf-fallback">
          <a href={pdfUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
            Open lesson resource in a new tab / download
          </a>
        </div>

        {/* ✅ Mark Complete Section */}
        <div className="completion-wrapper">
          {isCompleted ? (
            <button className="btn btn-disabled" disabled>
              Completed ✅
            </button>
          ) : isWaiting ? (
            <button className="btn btn-disabled" disabled>
              Please wait {waitTime}s…
            </button>
          ) : (
            <button onClick={handleMarkComplete} className="btn btn-success">
              Mark as Complete
            </button>
          )}
        </div>

        {/* ✅ Navigation Controls */}
        <div className="lesson-controls">
          <button
            onClick={handlePrev}
            className="btn btn-light"
            disabled={activeIndex === 0}
          >
            Back
          </button>

          <div className="jump-wrapper">
            <select
              className="jump-select"
              value={current.slug}
              onChange={handleJump}
            >
              {activities.map((a, i) => (
                <option key={a.slug} value={a.slug}>
                  {i + 1}. {a.title}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Disable Next button if timer not finished or failed assessment */}
          <button
            onClick={handleNext}
            className={`btn ${
              isWaiting || !isAssessmentPassed ? "btn-disabled" : "btn-light"
            }`}
            disabled={
              activeIndex === activities.length - 1 ||
              isWaiting ||
              !isAssessmentPassed
            }
          >
            {isAssessmentPassed
              ? isWaiting
                ? `Please wait ${waitTime}s…`
                : activeIndex === activities.length - 1
                ? "End"
                : "Next"
              : "Locked (Fail)"}
          </button>
        </div>

        {/* Sidebar */}
        <div className="lesson-activity-list">
          <h4>All Lessons</h4>
          <ul>
            {activities.map((a, i) => (
              <li
                key={a.slug}
                className={`${i === activeIndex ? "active" : ""} ${
                  completedLessons.includes(a.slug) ? "done" : ""
                }`}
              >
                <Link to={`/modules/${id}/activity/${a.slug}`}>
                  {i + 1}. {a.title}{" "}
                  {completedLessons.includes(a.slug) && (
                    <span className="check">✓</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

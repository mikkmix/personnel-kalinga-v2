import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../../layouts/Layout";
import Footer from "../../components/Footer";
import courseContent from "../../data/courseContent";
import "../../styles/lessonDetails.css";

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

  const idx = activitySlug ? activities.findIndex((a) => a.slug === activitySlug) : -1;
  const activeIndex = idx === -1 ? 0 : idx;
  const current = activities[activeIndex];

  const videoUrl = `/lessons/${id}/lesson-video.mp4`;
  const progressKey = `course-progress-${id}`;
  const [completedLessons, setCompletedLessons] = useState([]);
  const [waitTime, setWaitTime] = useState(current.requiredTime || 10);
  const [isWaiting, setIsWaiting] = useState(true);
  const [isAssessmentPassed, setIsAssessmentPassed] = useState(true);

  // NEW: State for collapsible transcript
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("assessmentResults")) || {};
    const result = storedResults[id];
    if (result && result.score < 80) setIsAssessmentPassed(false);
    else setIsAssessmentPassed(true);
  }, [id]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(progressKey)) || [];
    setCompletedLessons(saved);
    setWaitTime(current.requiredTime || 10);
    setIsWaiting(true);

    let timer;
    const timeLimit = current.requiredTime ?? 10;
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
      alert("❌ You need to pass the assessment (80% or higher).");
      return;
    }

    const saved = JSON.parse(localStorage.getItem(progressKey)) || [];
    if (!saved.includes(current.slug)) {
      const updated = [...saved, current.slug];
      localStorage.setItem(progressKey, JSON.stringify(updated));
      setCompletedLessons(updated);
      alert(`✅ Completed: ${current.title}`);
    }

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
    if (isWaiting || !isAssessmentPassed) return;
    if (activeIndex < activities.length - 1) {
      navigate(`/modules/${id}/activity/${activities[activeIndex + 1].slug}`);
    }
  };

  const handleJump = (e) => {
    const slug = e.target.value;
    if (!slug) return;
    navigate(`/modules/${id}/activity/${slug}`);
  };

  const isCompleted = completedLessons.includes(current.slug);

  return (
    <Layout>
      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="lesson-layout">
        {/* LEFT COLUMN: MAIN CONTENT */}
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

          {/* VIDEO VIEWER */}
          <div className="video-wrapper">
            <video src={videoUrl} className="video-player" controls controlsList="nodownload" />
          </div>
          <div className="pdf-fallback">
            <a href={videoUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              Open video in new tab
            </a>
          </div>

          {/* COLLAPSIBLE TRANSCRIPT */}
          <div className="transcript-section">
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => setShowTranscript((prev) => !prev)}
            >
              Transcript {showTranscript ? "▲" : "▼"}
            </h3>
            {showTranscript && (
              <p>
                  You know, when a typhoon is raging or the ground starts to shake,
                 there's one place we all assume will be a sanctuary, right? A 
                 place of healing that's supposed to stand strong when everything 
                 else is failing. But is that always the case? Let's dig into 
                 that really critical question and find out what it actually 
                 takes to make a hospital safe when disaster strikes. So, we're 
                 going to zero in on the Philippines for this. This is a country
                  that, you know, faces some of the most intense natural hazards
                  on the entire planet. And that means the stakes for its health 
                  care system are just incredibly high because when a disaster
                  hits, hospitals aren't just important, they are the front line. 
                  And to really get a sense of the urgency here, just think about
                  this one number. Third. That's it. Third. Out of 171 countries,
                  the Philippines ranks third for having the highest disaster 
                  risk. I mean, that's not just some random statistic on a chart.

                  It's a constant everyday reality that shapes absolutely everything,
                 especially how you prepare for an emergency. I mean, it's just a 
                 natural instinct in a crisis. This, isn't it? When things go wrong,
                  we immediately look for the helpers. We look for that one place 
                  that can mend injuries and save lives. And where do we turn? To 
                  our hospitals, of course. They're supposed to be the bedrock of
                  a community's response. But this is where you get this terrifying
                  paradox. The one place that's meant to save us becomes a victim
                  itself. And think about that. A hospital getting knocked out 
                  of commission during a disaster, that's a double tragedy. It 
                  means lives that absolutely could have been saved are suddenly 
                  at risk. So the big question is how do you stop that from 
                  happening? Well, you create a system and in the Philippines 
                  that system is called the hospital safety index. The best way
                  to think about it is like a stress test.
              </p>
            )}
          </div>

          {/* Mark Complete */}
          <div className="completion-wrapper">
            {isCompleted ? (
              <button className="btn btn-disabled" disabled>Completed ✅</button>
            ) : isWaiting ? (
              <button className="btn btn-disabled" disabled>Please wait {waitTime}s…</button>
            ) : (
              <button onClick={handleMarkComplete} className="btn btn-success">Mark as Complete</button>
            )}
          </div>

          {/* Navigation */}
          <div className="lesson-controls">
            <button onClick={handlePrev} className="btn btn-light" disabled={activeIndex === 0}>Back</button>
            <div className="jump-wrapper">
              <select className="jump-select" value={current.slug} onChange={handleJump}>
                {activities.map((a, i) => (
                  <option key={a.slug} value={a.slug}>{i + 1}. {a.title}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleNext}
              className={`btn ${isWaiting || !isAssessmentPassed ? "btn-disabled" : "btn-light"}`}
              disabled={activeIndex === activities.length - 1 || isWaiting || !isAssessmentPassed}
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
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="lesson-activity-list">
          <h4>All Lessons</h4>
          <ul>
            {activities.map((a, i) => (
              <li
                key={a.slug}
                className={`${i === activeIndex ? "active" : ""} ${completedLessons.includes(a.slug) ? "done" : ""}`}
              >
                <Link to={`/modules/${id}/activity/${a.slug}`}>
                  {i + 1}. {a.title} {completedLessons.includes(a.slug) && <span className="check">✓</span>}
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

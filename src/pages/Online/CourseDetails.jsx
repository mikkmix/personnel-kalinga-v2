// src/pages/Online/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import Footer from "../../components/Footer";
import {
  FaInfoCircle,
  FaBook,
  FaClipboardList,
  FaPlayCircle,
} from "react-icons/fa";
import "../../styles/courseDetails.css";

// ----------------------
// 🔹 Helper Functions
// ----------------------
const getProgress = () =>
  JSON.parse(localStorage.getItem("courseProgress")) || {
    generalInfo: [],
    helpfulMaterials: [],
    trainingMaterials: [],
  };

const markLessonComplete = (section, lessonId) => {
  const progress = getProgress();
  if (!progress[section].includes(lessonId)) {
    progress[section].push(lessonId);
    localStorage.setItem("courseProgress", JSON.stringify(progress));
  }
};

const isSectionComplete = (section, totalLessons) => {
  const progress = getProgress();
  return progress[section].length >= totalLessons;
};

// ----------------------
// 🔹 All Courses Data (1–12)
// ----------------------
const allCourses = {
  "1": {
    title: "Barangay First 1000 Days Facilitator's Guide eTraining",
    sections: [
      {
        heading: "General Information",
        items: [
          "Welcome Message",
          "Course Overview & Objectives",
          "Training Flow & Requirements",
          "Facilitator’s Guide Outline",
        ],
      },
      {
        heading: "Helpful Material",
        items: [
          "Reference Materials",
          "Nutrition Policy Documents",
          "Community Tools & Templates",
          "Sample Session Plans",
        ],
      },
      {
        heading: "Training Material",
        items: [
          "Pre-Test",
          "Module 1: Understanding the First 1000 Days",
          "Lesson 1: Importance of Early Nutrition",
          "Lesson 2: Maternal and Child Health Integration",
          "Lesson 3: Key Nutrition Interventions",
          "Quiz",
          "Module 2: Community Mobilization Strategies",
          "Lesson 1: Engaging Stakeholders",
          "Lesson 2: Conducting Barangay Sessions",
          "Lesson 3: Monitoring and Evaluation Tools",
          "Lesson 4: Success Stories and Case Studies",
          "Final Assessment",
        ],
      },
    ],
  },
 
    "2": {
      title: "DOH Integrated People-Centered Health Services",
      sections: [
        {
          heading: "General Information",
          items: ["Welcome", "Program Overview", "Learning Objectives"],
          content: ``, // placeholder
        },
        {
          heading: "Helpful Material",
          items: ["IPCHS Framework", "Implementation Manual", "Case References"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Understanding IPCHS",
            "Module 2: Service Integration in the Community",
            "Module 3: Health Systems Strengthening",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "3": {
      title: "Integrated Course on Primary Care",
      sections: [
        {
          heading: "General Information",
          items: ["Overview", "Course Goals", "Prerequisites"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["Primary Care Guidelines", "PHC Policy Framework"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Core Primary Health Care Concepts",
            "Module 2: Preventive and Promotive Services",
            "Module 3: Primary Care Practice Models",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "4": {
      title:
        "Introduction to Seven Major Recommendations to Prevent Tuberculosis Transmission",
      sections: [
        {
          heading: "General Information",
          items: ["Welcome", "Background", "Learning Outcomes"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["TB Prevention Toolkit", "DOH & WHO Guidelines"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Overview of TB Transmission",
            "Module 2: Seven Core Recommendations Explained",
            "Module 3: Implementing TB Prevention Measures",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "5": {
      title: "Healthy Hearts Technical Package",
      sections: [
        {
          heading: "General Information",
          items: ["Introduction", "Program Goals", "Heart Health Basics"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["Healthy Hearts Toolkit", "Cardiovascular Guidelines"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Understanding Cardiovascular Risk Factors",
            "Module 2: Implementing HEARTS Interventions",
            "Module 3: Monitoring & Evaluation Framework",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "6": {
      title:
        "Basic Course in Family Planning Final Exam and Certificate of Training",
      sections: [
        {
          heading: "General Information",
          items: ["Overview", "Course Objectives", "Accreditation Details"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["FP Handbook", "Clinical Protocols", "Service Delivery Tools"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Family Planning Concepts",
            "Module 2: Counseling and Client-Centered Approach",
            "Module 3: FP Commodities and Logistics",
            "Module 4: Program Management and Reporting",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "7": {
      title: "Nutrition Care Process for Clinical Nutritionist Dietitians",
      sections: [
        {
          heading: "General Information",
          items: ["Introduction", "Purpose of the Course", "Expected Outcomes"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["NCP Reference Guide", "Sample Nutrition Plans"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Nutrition Assessment and Diagnosis",
            "Module 2: Intervention and Monitoring",
            "Module 3: Documentation and Evaluation",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "8": {
      title:
        "Basic Life Support Online Training - Didactic [NCMH - 2025 BATCH 10]",
      sections: [
        {
          heading: "General Information",
          items: ["Welcome", "Course Requirements", "Completion Criteria"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["BLS Manual", "CPR Flowchart", "AED Use Guidelines"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Basic Life Support Principles",
            "Lesson 1: Adult & Pediatric CPR",
            "Lesson 2: AED Operation",
            "Lesson 3: Airway Management",
            "Quiz",
            "Module 2: Emergency Response",
            "Lesson 1: Scene Safety & Assessment",
            "Lesson 2: Post-Resuscitation Care",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "9": {
      title: "Basic Course on Continuous Quality Improvement for Health Facilities",
      sections: [
        {
          heading: "General Information",
          items: ["Overview", "Course Objectives", "QI Principles"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["CQI Toolkit", "Performance Indicators", "Case Studies"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Understanding QI Concepts",
            "Module 2: Data-Driven Improvement",
            "Module 3: Implementing CQI Cycles",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "10": {
      title: "Data to Policy Competency 1 - Problem Statement",
      sections: [
        {
          heading: "General Information",
          items: ["Welcome", "Competency Overview", "Learning Objectives"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["Policy Brief Templates", "Data Analysis Tools"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Understanding the Policy Process",
            "Module 2: Identifying and Framing Problems",
            "Module 3: Crafting Evidence-Based Policy Statements",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "11": {
      title:
        "Orientation on Navigating the Continuing Professional Accreditation System (CPDAS)",
      sections: [
        {
          heading: "General Information",
          items: ["Welcome", "System Overview", "User Roles and Access"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["CPDAS User Guide", "Accreditation FAQs"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Accessing the CPDAS Portal",
            "Module 2: Managing Accreditation Records",
            "Module 3: Uploading Certificates and Evaluations",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },

    "12": {
      title: "Laboratory Quality Management System Online Training",
      sections: [
        {
          heading: "General Information",
          items: ["Welcome", "Course Introduction", "Quality System Essentials"],
          content: ``,
        },
        {
          heading: "Helpful Material",
          items: ["LQMS Manual", "Documentation Templates", "WHO Standards"],
          content: ``,
        },
        {
          heading: "Training Material",
          items: [
            "Pre-Test",
            "Module 1: Introduction to Quality Management",
            "Module 2: Laboratory Process Control",
            "Module 3: Internal Audits & Corrective Actions",
            "Final Assessment",
          ],
          content: ``,
        },
      ],
    },
  };


// ----------------------
// 🔹 Component
// ----------------------
const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const updateProgress = () => {
    setProgress(getProgress());
  };

  const getIcon = (heading) => {
    if (heading.includes("General"))
      return <FaInfoCircle className="text-green-700 text-2xl" />;
    if (heading.includes("Helpful"))
      return <FaBook className="text-green-700 text-2xl" />;
    if (heading.includes("Training"))
      return <FaPlayCircle className="text-green-700 text-2xl" />;
    return <FaClipboardList className="text-green-700 text-2xl" />;
  };

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  // ---------------------------
  // 🔸 If no course is selected
  // ---------------------------
  if (!id) {
    return (
      <Layout>
        <div className="course-wrapper">
          <h1 className="course-title">Professional Development Courses</h1>
          <p className="text-gray-600 mb-6">
            Select a course below to begin your eTraining.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(allCourses).map(([courseId, course]) => (
              <div
                key={courseId}
                className="p-5 bg-white border border-green-700 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-green-800 text-lg mb-2">
                  {course.title}
                </h3>
                <button
                  onClick={() => navigate(`/modules/${courseId}`)}
                  className="px-3 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 text-sm"
                >
                  Open Course
                </button>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  // ---------------------------
  // 🔸 Display selected course
  // ---------------------------
  const course = allCourses[id];
  if (!course)
    return (
      <Layout>
        <p className="p-6 text-red-500">Course not found.</p>
        <Footer />
      </Layout>
    );

  if (!course.sections) {
    return (
      <Layout>
        <div className="course-wrapper">
          <h1 className="course-title">{course.title}</h1>
          <p className="text-gray-600">
            Training materials for this course are not yet available.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Back
          </button>
        </div>
        <Footer />
      </Layout>
    );
  }

  // ---------------------------
  // 🔸 Section Unlock Logic
  // ---------------------------
  const generalDone = isSectionComplete("generalInfo", 4);
  const helpfulDone = isSectionComplete("helpfulMaterials", 4);

  const sectionUnlocked = (heading) => {
    if (heading.includes("General")) return true;
    if (heading.includes("Helpful")) return generalDone;
    if (heading.includes("Training")) return generalDone && helpfulDone;
    return false;
  };

  // ---------------------------
  // 🔸 UI for Course 1 sections
  // ---------------------------
  return (
    <Layout>
      <div className="course-wrapper">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-breadcrumb">Home / Modules / {course.title}</p>

        <div className="space-y-6">
          {course.sections.map((section, idx) => {
            const unlocked = sectionUnlocked(section.heading);
            return (
              <div
                key={idx}
                className={`course-card open ${
                  unlocked ? "" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3 p-5 bg-white shadow-md rounded-lg border border-green-700">
                  {getIcon(section.heading)}
                  <span className="course-heading-text">
                    {section.heading}
                    {!unlocked && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Locked)
                      </span>
                    )}
                  </span>
                </div>

                {unlocked && (
                  <div className="course-items">
                    {section.items.map((item, i) => {
                      const url = `/modules/${id}/activity/${slugify(item)}`;
                      return (
                        <div key={i} className="course-subitem">
                          <Link
                            to={url}
                            onClick={() => {
                              if (section.heading.includes("General"))
                                markLessonComplete("generalInfo", item);
                              if (section.heading.includes("Helpful"))
                                markLessonComplete("helpfulMaterials", item);
                              if (section.heading.includes("Training"))
                                markLessonComplete("trainingMaterials", item);
                              updateProgress();
                            }}
                            className="text-green-700 hover:underline font-semibold"
                          >
                            {item}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default CourseDetails;

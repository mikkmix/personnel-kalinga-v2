// src/data/courses.js

// List of available courses
export const COURSES = [
  {
    id: 1,
    title: "Professional Development Training Certificate (PDTC)",
    short: "Professional Development Training Certificate",
    description:
      "Short description: boost skills and certifications for professionals.",
    category: "Recently Viewed Courses",
  },
  {
    id: 2,
    title: "Emergency Management Certificate Program",
    short: "Emergency Management Certificate Program",
    description: "Ready your staff for disaster response & management.",
    category: "Recently Viewed Courses",
  },
  // ✅ add more if needed
];

// Lessons per course
export const LESSONS = {
  1: [
    {
      id: "1-1",
      title: "Welcome",
      materials: [
        { id: "m1", type: "pdf", title: "Course Overview (PDF)", url: "#" },
      ],
      activities: [
        { id: "a1", title: "Pre-Test", instructions: "Answer 10 Qs" },
      ],
      quizzes: [{ id: "q1", title: "Quick Quiz 1", questions: 5 }],
    },
    {
      id: "1-2",
      title: "Course Outline & Objectives",
      materials: [{ id: "m2", type: "pdf", title: "Outline", url: "#" }],
      activities: [{ id: "a2", title: "Reflection", instructions: "Write 3 items" }],
      quizzes: [],
    },
    {
      id: "1-3",
      title: "Revision History",
      materials: [{ id: "m3", type: "pdf", title: "Revision Log", url: "#" }],
      activities: [],
      quizzes: [],
    },
    {
      id: "1-4",
      title: "Activity 1: Pre-Test",
      materials: [],
      activities: [
        { id: "a3", title: "Pre-Test (form)", instructions: "Start pre-test" },
      ],
      quizzes: [{ id: "q2", title: "Pre-test Quiz", questions: 10 }],
    },
    {
      id: "1-5",
      title: "Activity 2-1: Introduction",
      materials: [],
      activities: [{ id: "a4", title: "Intro Activity", instructions: "Follow steps" }],
      quizzes: [],
    },
    {
      id: "1-6",
      title: "Activity 3-2: Basic First-Aid",
      materials: [
        { id: "m4", type: "video", title: "First Aid Video", url: "#" },
      ],
      activities: [
        { id: "a5", title: "Practical Task", instructions: "Submit photo" },
      ],
      quizzes: [{ id: "q3", title: "First Aid Quiz", questions: 8 }],
    },
  ],

  2: [
    {
      id: "2-1",
      title: "Intro to Emergency Management",
      materials: [],
      activities: [],
      quizzes: [],
    },
  ],

  // ✅ add more for new courses
};

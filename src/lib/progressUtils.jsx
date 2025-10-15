// /src/lib/progressUtils.jsx

export function markLessonComplete(section, lessonId) {
  const key = `course-progress-${section}`;
  const saved = JSON.parse(localStorage.getItem(key)) || [];

  if (!saved.includes(lessonId)) {
    const updated = [...saved, lessonId];
    localStorage.setItem(key, JSON.stringify(updated));
    console.log(`✅ Lesson marked complete: ${lessonId} in ${section}`);
  }
}

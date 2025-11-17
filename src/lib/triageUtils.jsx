// ---------------------------
// 🏥 Hospital Information
// ---------------------------
export const hospitals = [
  {
    name: "Philippine General Hospital (PGH)",
    specialty: "Emergency, Cardiology, Pediatrics",
  },
  {
    name: "East Avenue Medical Center",
    specialty: "Neurology, Trauma, Internal Medicine",
  },
  {
    name: "Rizal Medical Center",
    specialty: "Surgery, OB-GYN, General Medicine",
  },
  {
    name: "Jose R. Reyes Memorial Medical Center",
    specialty: "Emergency, Neurosurgery, Pediatrics",
  },
  {
    name: "St. Luke’s Medical Center (Quezon City)",
    specialty: "Cardiology, Oncology, Orthopedics",
  },
];

// ---------------------------
// 🚨 Triage Level Classification
// ---------------------------
export const determineTriageLevel = ({
  temp,
  heartRate,
  spo2,
  mentalStatus,
  comorbidity,
  complaint,
}) => {
  let level = "low";

  if (
    temp >= 36 &&
    temp <= 37.5 &&
    heartRate >= 60 &&
    heartRate <= 100 &&
    spo2 >= 95 &&
    mentalStatus === "A (Alert)" &&
    !comorbidity
  ) {
    level = "low";
  } else if (
    (temp > 37.5 && temp <= 38.5) ||
    (heartRate > 100 && heartRate <= 110) ||
    (spo2 >= 92 && spo2 < 95) ||
    mentalStatus === "V (Verbal)" ||
    comorbidity
  ) {
    level = "medium";
  } else if (
    (temp > 38.5 && temp <= 39) ||
    (heartRate > 110 && heartRate <= 130) ||
    (spo2 >= 88 && spo2 < 92) ||
    mentalStatus === "P (Pain)" ||
    ["Seizure", "Difficulty breathing", "Chest pain"].includes(complaint)
  ) {
    level = "high";
  } else if (
    (temp > 39 || temp < 35) ||
    (heartRate > 130 && heartRate <= 140) ||
    (spo2 >= 85 && spo2 < 88) ||
    (mentalStatus === "P (Pain)" && complaint === "Seizure") ||
    complaint === "Severe chest pain"
  ) {
    level = "very-high";
  } else if (
    spo2 < 85 ||
    heartRate > 140 ||
    heartRate < 40 ||
    mentalStatus === "U (Unresponsive)"
  ) {
    level = "critical";
  }

  return level;
};

// ---------------------------
// 👩‍⚕️ Recommended Doctor
// ---------------------------
export const getRecommendedDoctor = ({
  complaint,
  spo2,
  temp,
  mentalStatus,
  comorbidity,
  level,
}) => {
  if (complaint === "Chest pain") return "Cardiologist";
  if (complaint === "Difficulty breathing" || spo2 < 90) return "Pulmonologist";
  if (complaint === "Seizure" || complaint === "Dizziness") return "Neurologist";
  if (temp > 38.5) return "Infectious Disease Specialist";
  if (mentalStatus === "U (Unresponsive)" || level === "critical")
    return "Emergency Medicine";
  if (comorbidity) return "Internal Medicine";
  return "General Practitioner";
};

// ---------------------------
// 🧬 Patient Generator
// ---------------------------
export const generatePatientTriage = () =>
  hospitals.map((hospital) => {
    const patientCount = Math.floor(Math.random() * 10 + 5);

    const patients = Array.from({ length: patientCount }, (_, idx) => {
      const temp = Number((36 + Math.random() * 4).toFixed(1));
      const heartRate = Math.floor(Math.random() * 60 + 60);
      const spo2 = Math.floor(Math.random() * 15 + 85);
      const age = Math.floor(Math.random() * 70 + 12);
      const comorbidity = Math.random() < 0.35;
      const mentalStatus = [
        "A (Alert)",
        "V (Verbal)",
        "P (Pain)",
        "U (Unresponsive)",
      ][Math.floor(Math.random() * 4)];
      const complaint = [
        "Chest pain",
        "Difficulty breathing",
        "Dizziness",
        "Fever",
        "Seizure",
      ][Math.floor(Math.random() * 5)];

      const level = determineTriageLevel({
        temp,
        heartRate,
        spo2,
        mentalStatus,
        comorbidity,
        complaint,
      });

      const recommendedDoctor = getRecommendedDoctor({
        complaint,
        spo2,
        temp,
        mentalStatus,
        comorbidity,
        level,
      });

      return {
        id: `${hospital.name.replace(/\s+/g, "-")}-${idx + 1}`, // FIXED LINE
        age,
        temp,
        heartRate,
        spo2,
        comorbidity,
        complaint,
        mentalStatus,
        level,
        recommendedDoctor,
      };
    });

    // Count per triage level
    const counts = patients.reduce((acc, p) => {
      acc[p.level] = (acc[p.level] || 0) + 1;
      return acc;
    }, {});

    // Determine top doctor
    const doctorFrequency = patients.reduce((acc, p) => {
      acc[p.recommendedDoctor] = (acc[p.recommendedDoctor] || 0) + 1;
      return acc;
    }, {});

    const topDoctor =
      Object.entries(doctorFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "General Practitioner";

    return {
      hospital: hospital.name,
      specialty: hospital.specialty,
      patients,
      counts,
      topDoctor,
    };
  });

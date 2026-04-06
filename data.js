/* ================================================================
   TIMETABLE DATA STRUCTURE
   ================================================================ */

const timetableData = {
  monday: [
    {
      time: "08:00–09:00",
      course: "Business Communication Skills",
      venue: "Main Hall",
      type: "core",
    },
    {
      time: "10:00–11:00",
      course: "Advanced Physics",
      venue: "Main Hall",
      type: "core",
    },
    {
      time: "11:00–12:00",
      course: "Computer Hardware",
      venue: "Main Hall",
      type: "core",
    },
    {
      time: "12:00–13:00",
      course: "Advanced Chemistry",
      venue: "Main Hall",
      type: "core",
      clash: true,
    },
    {
      time: "12:00–13:00",
      course: "Fundamentals of Information Security",
      venue: "LR 1",
      type: "core",
      clash: true,
    },
    {
      time: "13:00–14:00",
      course: "Solid State Chemistry",
      venue: "Hall",
      type: "elective",
    },
    {
      time: "14:00–15:00",
      course: "Electronics for Computing 1",
      venue: "Main Hall",
      type: "core",
      clash: true,
    },
    {
      time: "14:00–15:00",
      course: "Internetworking Design and LAN/MAN Administration 1",
      venue: "Hall",
      type: "core",
      clash: true,
    },
    {
      time: "15:00–16:00",
      course: "Interactive Web Development",
      venue: "Main Hall",
      type: "core",
    },
    {
      time: "15:00–16:00",
      course: "Java Programming",
      venue: "Hall",
      type: "elective",
    },
    {
      time: "16:00–17:00",
      course: "Electricity and Magnetism",
      venue: "LR 2",
      type: "core",
    },
  ],
  tuesday: [
    {
      time: "09:00–10:00",
      course: "Internetworking Design and LAN/MAN Administration 1",
      venue: "TR 3",
      type: "core",
    },
  ],
  sunday: [
    {
      time: "10:00–11:00",
      course: "Fundamentals of Information Security",
      venue: "TR 3",
      type: "elective",
    },
    {
      time: "12:00–13:00",
      course: "Electricity and Magnetism",
      venue: "LR 2",
      type: "core",
      clash: true,
    },
  ],
  library: [
    {
      day: "Library",
      time: "08:00–09:00",
      course: "Artificial Intelligence",
      venue: "LIB R2",
      type: "elective",
    },
    {
      day: "Library",
      time: "08:00–09:00",
      course: "Internetworking Design 2",
      venue: "LIB R8",
      type: "elective",
      clash: true,
    },
    {
      day: "Library",
      time: "09:00–10:00",
      course: "Network Security Administration 1",
      venue: "LIB R8",
      type: "elective",
    },
    {
      day: "Library",
      time: "12:00–13:00",
      course: "Fibre Optic Technology",
      venue: "LIB R8",
      type: "elective",
    },
    {
      day: "Library",
      time: "12:00–13:00",
      course: "Mobile Programming",
      venue: "LIB R9",
      type: "elective",
      clash: true,
    },
    {
      day: "Library",
      time: "13:00–14:00",
      course: "Geographical Information Systems",
      venue: "EXT R1",
      type: "elective",
    },
    {
      day: "Library",
      time: "14:00–15:00",
      course: "Software Engineering 1",
      venue: "LIB R9",
      type: "elective",
    },
    {
      day: "Library",
      time: "15:00–16:00",
      course: "Digital Communications I",
      venue: "EXT R1",
      type: "elective",
    },
    {
      day: "Library",
      time: "15:00–16:00",
      course: "Information Systems Security",
      venue: "LIB R9",
      type: "elective",
      clash: true,
    },
  ],
};

const clashData = [
  {
    severity: "critical",
    time: "Monday 12:00–13:00",
    conflict: "Advanced Chemistry vs Fundamentals of Information Security",
    resolution: "Contact coordinator for rescheduling",
  },
  {
    severity: "critical",
    time: "Monday 14:00–15:00",
    conflict:
      "Electronics for Computing 1 vs Internetworking Design and LAN/MAN Administration 1",
    resolution: "Check if online alternative available",
  },
  {
    severity: "warning",
    time: "Sunday 12:00–13:00",
    conflict: "Electricity and Magnetism overlap in scheduling",
    resolution: "Verify with department",
  },
  {
    severity: "warning",
    time: "Library Sessions",
    conflict: "Multiple overlapping electives",
    resolution: "Select non-overlapping sessions only",
  },
];

// Export for use in HTML
if (typeof module !== "undefined" && module.exports) {
  module.exports = { timetableData, clashData };
}

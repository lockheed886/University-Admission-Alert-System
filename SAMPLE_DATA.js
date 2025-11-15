/**
 * Sample Data
 * 
 * This file shows example university entries that you can use to test the application.
 * To add these to your MongoDB database manually through the UI:
 * 1. Start the application (npm run dev)
 * 2. Open http://localhost:3000
 * 3. Click "+ Add University"
 * 4. Fill in the form using the data below
 * 5. Click "Add University"
 */

const sampleUniversities = [
  {
    universityName: "University of Oxford",
    country: "United Kingdom",
    courseName: "Master of Computer Science",
    deadline: "2024-12-31",
    ieltsRequired: true,
    scholarshipAvailable: true,
    scholarshipAmount: "50% tuition coverage",
    additionalInfo: "One of the world's top universities. Highly competitive admissions.",
  },
  {
    universityName: "Stanford University",
    country: "United States",
    courseName: "MS Computer Science",
    deadline: "2024-12-15",
    ieltsRequired: false,
    scholarshipAvailable: true,
    scholarshipAmount: "Full scholarship available",
    additionalInfo: "Located in Silicon Valley. Excellent internship opportunities.",
  },
  {
    universityName: "University of Toronto",
    country: "Canada",
    courseName: "Master of Applied Science",
    deadline: "2025-02-28",
    ieltsRequired: true,
    scholarshipAvailable: false,
    scholarshipAmount: null,
    additionalInfo: "Strong engineering program. Growing tech hub.",
  },
  {
    universityName: "National University of Singapore",
    country: "Singapore",
    courseName: "MSc Computer Science",
    deadline: "2025-01-20",
    ieltsRequired: true,
    scholarshipAvailable: true,
    scholarshipAmount: "$10,000 per year",
    additionalInfo: "Asia's leading university. Growing startup ecosystem.",
  },
  {
    universityName: "ETH Zurich",
    country: "Switzerland",
    courseName: "Master in Data Science",
    deadline: "2025-03-15",
    ieltsRequired: true,
    scholarshipAvailable: true,
    scholarshipAmount: "Partial scholarship",
    additionalInfo: "World-class engineering and technical education.",
  },
  {
    universityName: "University of Melbourne",
    country: "Australia",
    courseName: "Master of Engineering (Software)",
    deadline: "2025-02-01",
    ieltsRequired: true,
    scholarshipAvailable: false,
    scholarshipAmount: null,
    additionalInfo: "Australia's top university. Beautiful campus.",
  },
  {
    universityName: "MIT",
    country: "United States",
    courseName: "Master of Science in Computer Science",
    deadline: "2024-12-20",
    ieltsRequired: false,
    scholarshipAvailable: true,
    scholarshipAmount: "Merit-based scholarships",
    additionalInfo: "Prestigious institution. Need-blind admissions policy.",
  },
  {
    universityName: "University of Hong Kong",
    country: "Hong Kong",
    courseName: "MSc in Computer Science",
    deadline: "2025-04-01",
    ieltsRequired: true,
    scholarshipAvailable: true,
    scholarshipAmount: "Up to HK$100,000",
    additionalInfo: "Asia-Pacific region's prestigious university.",
  },
];

/**
 * IMPORTANT NOTES:
 * 
 * 1. All fields are OPTIONAL - you can add entries with just a university name
 * 2. Deadline format: YYYY-MM-DD (use the date picker in the form)
 * 3. Scholarship amount is only shown if "Scholarship Available" is checked
 * 4. IELTS requirement is displayed as a badge on the card
 * 5. Deadlines are color-coded based on urgency:
 *    - Red (Urgent): Less than 7 days away
 *    - Yellow (Warning): 7-14 days away
 *    - Blue (Upcoming): 14-30 days away
 *    - Green (Safe): More than 30 days away
 * 
 * 6. All data is automatically saved to MongoDB Atlas
 * 7. Data persists across browser refreshes and restarts
 */

export default sampleUniversities;

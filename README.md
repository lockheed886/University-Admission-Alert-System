# University Admission Alert System

A beautiful, responsive, and modern web application for tracking university admission applications, deadlines, and scholarship information. Built with Next.js, React, Tailwind CSS, and MongoDB Atlas.

![University Admission Alert System](https://img.shields.io/badge/Next.js-14-black?style=flat-square) ![React](https://img.shields.io/badge/React-18-blue?style=flat-square) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square)

## 🎯 Features

- ✅ **Add, Edit, Delete Universities** - Manage your university applications with ease
- ✅ **Deadline Tracking** - Color-coded urgency indicators (Urgent, Warning, Upcoming, Safe)
- ✅ **Scholarship Management** - Track scholarship availability and amounts
- ✅ **Search & Filter** - Filter by country, scholarship status, and deadline urgency
- ✅ **Persistent Storage** - All data saved in MongoDB Atlas (survives browser refreshes)
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Beautiful UI** - Modern design with professional color scheme and smooth animations
- ✅ **Fast Performance** - Optimized for quick loading and smooth interactions
- ✅ **IELTS Tracking** - Mark universities requiring IELTS exams
- ✅ **Additional Notes** - Store extra information for each university

## 📱 Screenshots

### Main Dashboard
- Clean, organized card-based layout
- Search and filter functionality
- Add button prominently displayed
- Empty state with helpful guidance

### University Card
- University name, country, course details
- Color-coded deadline urgency indicators
- Scholarship status with amount
- IELTS requirement badge
- Edit and Delete action buttons

### Add/Edit Form
- Modal form overlay
- All optional fields with proper labels
- Conditional scholarship amount field
- Form validation and error handling
- Success/error notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (download from [nodejs.org](https://nodejs.org))
- MongoDB Atlas account (free tier available at [mongodb.com](https://www.mongodb.com/cloud/atlas))
- Git (optional, for version control)

### Local Development Setup

#### 1. Clone or Download the Project

```bash
# If using git
git clone <your-repository-url>
cd Universities

# Or simply navigate to the project folder in VS Code
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up MongoDB Atlas

1. Create a free MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project and cluster (free tier M0)
3. Add a database user:
   - Click "Database Access" → "Add New Database User"
   - Create username and password
   - Note these credentials
4. Get your connection string:
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`)
   - **Important**: Replace `<password>` with your database user password

#### 4. Configure Environment Variables

1. Rename `.env.local.example` to `.env.local`
2. Add your MongoDB connection string:

```bash
# .env.local
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/universities?retryWrites=true&w=majority
```

Replace:
- `username` with your MongoDB database user
- `password` with your database password
- `cluster` with your actual cluster name

#### 5. Run Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

## 🌐 Deployment to Vercel

### Free Tier Requirements
- Vercel (free tier with no payment required)
- MongoDB Atlas (free tier with no payment required)

### Deployment Steps

#### Option 1: Deploy Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project directory
vercel

# Follow the prompts and link to your GitHub account
```

#### Option 2: Deploy Using GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/universities.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repository
4. Add environment variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string
5. Click "Deploy"

#### After Deployment

1. Your application will be live at a URL like: `https://your-project.vercel.app`
2. Set MongoDB Atlas network access:
   - In MongoDB Atlas, go to "Network Access"
   - Add `0.0.0.0/0` to allow access from any IP (for Vercel)
3. Test the application with a few university entries

## 💻 Project Structure

```
Universities/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── universities/
│   │   │       ├── route.js          # GET (list), POST (create)
│   │   │       └── [id]/
│   │   │           └── route.js      # GET, PUT, DELETE
│   │   ├── globals.css               # Global styles & Tailwind
│   │   ├── layout.js                 # Root layout
│   │   └── page.js                   # Home page
│   ├── components/
│   │   ├── UniversityList.jsx        # Main component (list, search, filters)
│   │   ├── UniversityCard.jsx        # Card component for each university
│   │   └── UniversityForm.jsx        # Form for adding/editing
│   ├── lib/
│   │   ├── mongoose.js               # MongoDB connection
│   │   └── utils.js                  # Helper functions
│   └── models/
│       └── University.js             # Mongoose schema
├── public/                           # Static assets
├── .env.local                        # Environment variables (create this)
├── .env.local.example                # Example environment file
├── .gitignore                        # Git ignore rules
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🗄️ Database Schema

MongoDB Collection: `universities`

```javascript
{
  _id: ObjectId,
  universityName: String (optional),
  country: String (optional),
  courseName: String (optional),
  deadline: Date (optional),
  ieltsRequired: Boolean (default: false),
  scholarshipAvailable: Boolean (default: false),
  scholarshipAmount: String (optional),
  additionalInfo: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 📡 API Endpoints

### Get All Universities
```
GET /api/universities
```

### Create New University
```
POST /api/universities
Content-Type: application/json

{
  "universityName": "University of Oxford",
  "country": "United Kingdom",
  "courseName": "Master of Computer Science",
  "deadline": "2024-12-31",
  "ieltsRequired": true,
  "scholarshipAvailable": true,
  "scholarshipAmount": "50% tuition",
  "additionalInfo": "..."
}
```

### Get University by ID
```
GET /api/universities/{id}
```

### Update University
```
PUT /api/universities/{id}
Content-Type: application/json

{
  "universityName": "Updated Name",
  ...
}
```

### Delete University
```
DELETE /api/universities/{id}
```

## 🎨 Color Scheme

- **Primary**: Blue (#3B82F6) - Main buttons and actions
- **Secondary**: Green (#10B981) - Scholarships and safe deadlines
- **Accent**: Orange (#F59E0B) - Warnings and upcoming dates
- **Danger**: Red (#EF4444) - Urgent deadlines and delete actions
- **Background**: Light gray/slate - Clean, professional appearance

## ⏰ Deadline Urgency Levels

- 🔴 **Urgent** (Red): Less than 7 days
- 🟡 **Warning** (Yellow): 7-14 days
- 🔵 **Upcoming** (Blue): 14-30 days
- 🟢 **Safe** (Green): More than 30 days
- ⚫ **Passed** (Gray): Deadline has passed

## 🔒 Security Notes

- All sensitive data (MongoDB connection string) is stored in `.env.local`
- Never commit `.env.local` to GitHub (it's in `.gitignore`)
- Input validation on both frontend and backend
- No sensitive information exposed in client-side code

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check MongoDB connection string in `.env.local`
- ✅ Verify MongoDB Atlas Network Access allows your IP
- ✅ Ensure database user credentials are correct
- ✅ Check that `.env.local` file exists (not just `.env.local.example`)

### "Port 3000 already in use"
```bash
# Kill process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti :3000 | xargs kill -9
```

### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Build fails on Vercel"
- ✅ Check that MongoDB URI is set in Vercel environment variables
- ✅ Ensure MongoDB Atlas network access includes Vercel IPs
- ✅ Check build logs in Vercel dashboard for specific errors

## 📝 Features for Enhancement

Future improvements could include:
- Email notifications for upcoming deadlines
- Multiple user accounts with authentication
- Import/export university data
- Calendar view for deadlines
- Scholarship comparison tools
- University rankings integration
- Document upload for applications
- Progress tracking (applied, accepted, rejected)

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review MongoDB Atlas documentation
3. Check Next.js documentation at [nextjs.org](https://nextjs.org)

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Atlas Tutorial](https://docs.mongodb.com/atlas/)
- [Mongoose Documentation](https://mongoosejs.com)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**Happy tracking! 🚀 Good luck with your university applications!**

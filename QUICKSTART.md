# Quick Start Guide - University Admission Alert System

## ⚡ 5-Minute Setup

### 1. MongoDB Atlas Setup (2 minutes)
```
1. Go to mongodb.com/cloud/atlas
2. Sign up for FREE
3. Create a free cluster (M0)
4. Create a database user (save credentials)
5. Get connection string and copy it
```

### 2. Add Environment Variable (1 minute)
```
1. Open .env.local in the project root
2. Replace MONGODB_URI with your connection string
3. Save the file
```

### 3. Run Locally (2 minutes)
```powershell
npm install        # If not done yet
npm run dev        # Start development server
```
Then visit: **http://localhost:3000**

---

## 🎯 What You Can Do Now

✅ Add university entries with all details
✅ Edit existing entries
✅ Delete entries (with confirmation)
✅ Search by university/course name
✅ Filter by country, scholarships, urgent deadlines
✅ See color-coded deadline urgency
✅ All data saved to MongoDB

---

## 🚀 Deploy to Vercel (when ready)

1. Push code to GitHub
2. Connect to Vercel
3. Add MongoDB URI to Vercel environment variables
4. Deploy!

See **DEPLOYMENT.md** for detailed steps.

---

## 📁 Project Structure Quick Reference

```
src/
├── app/
│   ├── api/universities/       ← API endpoints
│   ├── page.js                 ← Home page
│   └── layout.js               ← Layout & metadata
├── components/
│   ├── UniversityList.jsx      ← Main component
│   ├── UniversityCard.jsx      ← Card display
│   └── UniversityForm.jsx      ← Add/Edit form
├── models/
│   └── University.js           ← MongoDB schema
└── lib/
    ├── mongoose.js             ← DB connection
    └── utils.js                ← Helper functions
```

---

## 🔧 Common Commands

```powershell
npm run dev       # Start development server (localhost:3000)
npm run build     # Build for production
npm start         # Run production build
npm run lint      # Run ESLint
```

---

## ❓ Need Help?

- **README.md** - Full documentation
- **DEPLOYMENT.md** - Deployment instructions
- Check error messages in terminal for specific issues

---

**Happy coding! 🎓**

# ⚡ Quick Reference Card

## 🚀 Common Commands

```powershell
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Check code with ESLint

# Database
# MongoDB URI format:
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

---

## 📂 Key Files

| File | Purpose | Edit For |
|------|---------|----------|
| `src/app/page.js` | Home page | Change main layout |
| `src/components/UniversityList.jsx` | Main component | Change features |
| `src/components/UniversityCard.jsx` | Card display | Change card design |
| `src/components/UniversityForm.jsx` | Add/edit form | Add form fields |
| `src/models/University.js` | Database schema | Add data fields |
| `src/app/api/universities/route.js` | List/create API | Change API logic |
| `tailwind.config.js` | Colors & theme | Change colors |
| `.env.local` | Config | Add MongoDB URI |

---

## 🔗 API Endpoints

```
GET    /api/universities           # List all
POST   /api/universities           # Create new
GET    /api/universities/[id]      # Get one
PUT    /api/universities/[id]      # Update
DELETE /api/universities/[id]      # Delete
```

---

## 🗄️ Database Schema

```javascript
{
  _id: ObjectId,
  universityName: String,
  country: String,
  courseName: String,
  deadline: Date,
  ieltsRequired: Boolean,
  scholarshipAvailable: Boolean,
  scholarshipAmount: String,
  additionalInfo: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Colors

```javascript
primary:   #3B82F6  (Blue)   - Main buttons
secondary: #10B981  (Green)  - Scholarships
accent:    #F59E0B  (Orange) - Warnings
danger:    #EF4444  (Red)    - Delete/Urgent
```

---

## 📅 Deadline Colors

- 🔴 < 7 days:   Red (Urgent)
- 🟡 7-14 days:  Yellow (Warning)
- 🔵 14-30 days: Blue (Upcoming)
- 🟢 > 30 days:  Green (Safe)
- ⚫ Passed:      Gray

---

## 🔧 Environment Variables

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority
```

Set in:
- **Local**: `.env.local` file
- **Vercel**: Environment Variables in dashboard

---

## 📝 Common Code Snippets

### Add a Field to Form
```jsx
<input
  type="text"
  name="fieldName"
  value={formData.fieldName}
  onChange={handleChange}
  placeholder="Placeholder text"
/>
```

### Add a Field to Database
```javascript
// In src/models/University.js
fieldName: {
  type: String,
  trim: true,
}
```

### Fetch Data
```javascript
const response = await axios.get('/api/universities');
const data = response.data;
```

### Send Data
```javascript
const response = await axios.post('/api/universities', formData);
```

---

## 🐛 Quick Debugging

```powershell
# Check errors
npm run build

# View logs
npm run dev
# Check terminal output

# Browser console
F12 → Console tab
# Look for red error messages

# Network issues
F12 → Network tab
# Check API calls

# Database connection
# Check .env.local has MONGODB_URI
# Check MongoDB Atlas network access
```

---

## 🚀 Deployment Checklist

- [ ] Run `npm run build` (no errors)
- [ ] Code in GitHub
- [ ] `.env.local` NOT in git
- [ ] Vercel connected to GitHub
- [ ] `MONGODB_URI` in Vercel env vars
- [ ] MongoDB Atlas allows 0.0.0.0/0
- [ ] Click Deploy!

---

## 📖 Documentation Map

| Need | File |
|------|------|
| Start here | `GETTING_STARTED.md` |
| 5-min setup | `QUICKSTART.md` |
| Full docs | `README.md` |
| Deployment | `DEPLOYMENT.md` |
| Problems | `TROUBLESHOOTING.md` |
| Verify setup | `CHECKLIST.md` |
| Production | `PRODUCTION.md` |
| All docs | `INDEX.md` |

---

## ⚠️ Common Mistakes

❌ **Don't**: Commit `.env.local` to GitHub
✅ **Do**: Add to `.gitignore` (already done)

❌ **Don't**: Use wrong MongoDB URI
✅ **Do**: Copy from MongoDB Atlas exactly

❌ **Don't**: Edit deployed code directly
✅ **Do**: Change locally, commit, push

❌ **Don't**: Forget to add env vars to Vercel
✅ **Do**: Set `MONGODB_URI` in Vercel dashboard

---

## 🔑 MongoDB Connection String

Pattern:
```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?retryWrites=true&w=majority
```

From MongoDB Atlas:
1. Click "Connect"
2. Choose "Connect Your Application"
3. Copy connection string
4. Replace `<password>` with actual password

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1023px (2 columns)
- **Desktop**: > 1024px (3+ columns)

---

## 🎯 Performance Tips

1. Keep MongoDB queries simple
2. Use filters to limit data
3. Monitor storage usage
4. Clear old entries occasionally
5. Check browser DevTools

---

## 💾 Backup Your Data

MongoDB Atlas provides:
- Automatic daily backups (free tier)
- Download backups anytime
- Point-in-time recovery (paid)

To export:
1. Go to MongoDB Atlas
2. Databases → Collections
3. Download

---

## 🆘 When Stuck

1. Read error message carefully
2. Check documentation files
3. Run `npm run build`
4. Check browser console (F12)
5. Verify `.env.local` is correct
6. Restart dev server
7. Clear `.next` folder
8. Run `npm install` again

---

## 📞 Help Resources

- **Docs**: See INDEX.md
- **Error**: See TROUBLESHOOTING.md
- **Setup**: See CHECKLIST.md
- **Deploy**: See DEPLOYMENT.md
- **All**: See README.md

---

## 🎓 Learning Order

1. Read GETTING_STARTED.md
2. Run `npm run dev`
3. Add some entries
4. Look at UniversityList.jsx
5. Look at API routes
6. Read full README.md
7. Deploy to Vercel
8. Celebrate! 🎉

---

**Happy building! Remember: Check docs first, they have answers! 📚**

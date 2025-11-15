# Project Setup Verification Checklist

Use this checklist to verify everything is set up correctly before starting development.

## ✅ Environment Setup

- [ ] Node.js installed (version 18+)
  ```powershell
  node --version  # Should show v18 or higher
  npm --version   # Should show 9 or higher
  ```

- [ ] Project folder opened in VS Code
  ```powershell
  # Should see "Universities" folder in VS Code
  ```

- [ ] Dependencies installed
  ```powershell
  ls node_modules  # Should show many folders
  ```

## ✅ Configuration Files

- [ ] `jsconfig.json` exists
  - Enables `@/` path aliases
  - Makes imports cleaner

- [ ] `.env.local` exists
  - Contains `MONGODB_URI` variable
  - Has correct MongoDB connection string

- [ ] `package.json` exists
  - Lists all dependencies
  - Has `npm` scripts

- [ ] `tailwind.config.js` exists
  - Configures Tailwind CSS

## ✅ Project Structure

- [ ] `src/app/` folder exists with:
  - [ ] `page.js` - Home page
  - [ ] `layout.js` - Root layout
  - [ ] `globals.css` - Global styles
  - [ ] `api/universities/route.js` - API endpoints

- [ ] `src/components/` folder exists with:
  - [ ] `UniversityList.jsx` - Main component
  - [ ] `UniversityCard.jsx` - Card display
  - [ ] `UniversityForm.jsx` - Form component

- [ ] `src/models/` folder exists with:
  - [ ] `University.js` - MongoDB schema

- [ ] `src/lib/` folder exists with:
  - [ ] `mongoose.js` - Database connection
  - [ ] `utils.js` - Helper functions

## ✅ Build Verification

- [ ] Project builds without errors
  ```powershell
  npm run build
  # Should show "✓ Compiled successfully"
  ```

- [ ] ESLint passes
  ```powershell
  npm run lint
  # Should show no errors or just warnings
  ```

## ✅ MongoDB Setup

- [ ] MongoDB Atlas account created
  - [ ] Free tier M0 cluster created
  - [ ] Database user created
  - [ ] Network access configured

- [ ] Connection string obtained
  - [ ] Format: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/...`
  - [ ] Password has been replaced (not showing `<password>`)

- [ ] `.env.local` contains valid URI
  ```powershell
  # Should not show errors when connecting
  ```

## ✅ Local Development

- [ ] Development server starts
  ```powershell
  npm run dev
  # Should show "ready on http://localhost:3000"
  ```

- [ ] Browser connects to application
  - [ ] Visit `http://localhost:3000`
  - [ ] Page loads (shows header)
  - [ ] No error messages in console (F12)

- [ ] Form works
  - [ ] Click "+ Add University" button
  - [ ] Form modal opens
  - [ ] Can type in fields
  - [ ] Submit button works

- [ ] Database connection works
  - [ ] Add test university entry
  - [ ] Click "Add University" button
  - [ ] See success message
  - [ ] University appears in list
  - [ ] Refresh page (F5)
  - [ ] Data still there ✅

## ✅ Features Testing

- [ ] Add functionality
  - [ ] Click "+ Add University"
  - [ ] Fill some fields
  - [ ] Submit
  - [ ] Entry appears in list

- [ ] Edit functionality
  - [ ] Click "Edit" on a card
  - [ ] Form opens with data
  - [ ] Can change fields
  - [ ] Click "Update Entry"
  - [ ] Changes appear on card

- [ ] Delete functionality
  - [ ] Click "Delete" on a card
  - [ ] Confirmation dialog appears
  - [ ] Entry is removed

- [ ] Search functionality
  - [ ] Type in search box
  - [ ] Results filter correctly

- [ ] Filter functionality
  - [ ] Use country filter
  - [ ] Results update
  - [ ] Use scholarship filter
  - [ ] Results update

## ✅ Documentation

- [ ] `README.md` exists
  - Has setup instructions
  - Has deployment guide
  - Has troubleshooting section

- [ ] `QUICKSTART.md` exists
  - Quick reference guide

- [ ] `DEPLOYMENT.md` exists
  - Deployment instructions
  - Environment variable setup

- [ ] `TROUBLESHOOTING.md` exists
  - Common issues and solutions

- [ ] `SAMPLE_DATA.js` exists
  - Example university entries

## ✅ Ready for Deployment

- [ ] Code is committed to GitHub (if using)
  ```powershell
  git status  # Should show clean working directory
  ```

- [ ] Build succeeds
  ```powershell
  npm run build  # No errors
  ```

- [ ] Production build works
  ```powershell
  npm start  # Starts on http://localhost:3000
  ```

- [ ] MongoDB Atlas network access is configured
  - [ ] Development IP whitelisted
  - [ ] Or 0.0.0.0/0 allowed (for Vercel)

- [ ] Environment variables documented
  - [ ] `.env.local.example` shows all variables needed
  - [ ] Instructions for getting credentials included

## ✅ Next Steps

If all checkboxes are checked ✅:

1. **Ready for local development**
   ```powershell
   npm run dev
   ```

2. **Ready to deploy to Vercel**
   - Push code to GitHub
   - Follow DEPLOYMENT.md guide

3. **Add your universities**
   - Start adding your real applications
   - Invite friends to use the app

## ⚠️ Common Issues to Check

If any checkbox is unchecked, check these:

- **Node.js version too old?**
  - Install Node.js 18+ from nodejs.org

- **MongoDB connection failing?**
  - Verify connection string in `.env.local`
  - Check network access in MongoDB Atlas

- **Build failing?**
  - Run `npm install` again
  - Delete `node_modules` and `.next` folders
  - Run `npm install` and `npm run build`

- **Port 3000 in use?**
  - Use `npm run dev -- -p 3001` instead
  - Or kill process: `netstat -ano | findstr :3000`

---

**✨ When all items are checked, your application is ready!**

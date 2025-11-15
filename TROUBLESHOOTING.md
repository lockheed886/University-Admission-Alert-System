# Troubleshooting Guide

## Common Issues and Solutions

### 1. "Cannot GET /" or Blank Page

**Problem**: Application shows blank page or 404 error

**Solutions**:
- ✅ Make sure you ran `npm install`
- ✅ Ensure you're on `http://localhost:3000` (not 3001 or another port)
- ✅ Check browser console (F12) for JavaScript errors
- ✅ Try `Ctrl+Shift+R` (hard refresh) to clear cache
- ✅ Check terminal for build errors: `npm run build`

---

### 2. MongoDB Connection Error

**Problem**: "Cannot connect to MongoDB" or database errors in console

**Solutions**:
1. Check `.env.local` file exists:
   ```powershell
   ls .env.local
   ```

2. Verify MongoDB connection string:
   - Go to MongoDB Atlas dashboard
   - Click "Connect" on your cluster
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Ensure no typos

3. Test connection locally:
   ```powershell
   npm run dev
   # Try adding a university entry
   ```

4. If still failing:
   - Check MongoDB Atlas "Network Access"
   - Ensure your IP is whitelisted (click "Add IP Address")
   - For development: Add your current IP
   - For Vercel: Allow access from anywhere (0.0.0.0/0)

---

### 3. Module Not Found Errors

**Problem**: 
```
Module not found: Can't resolve '@/components/...'
```

**Solutions**:
- ✅ Make sure `jsconfig.json` exists in project root
- ✅ Check file paths match (case-sensitive)
- ✅ Verify files exist in `src/` directory
- ✅ Restart development server: `Ctrl+C` then `npm run dev`

---

### 4. Port 3000 Already in Use

**Problem**: 
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions**:

**Windows PowerShell**:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Then restart
npm run dev
```

**Alternative**: Use a different port
```powershell
npm run dev -- -p 3001
# Now visit http://localhost:3001
```

---

### 5. Changes Not Showing

**Problem**: Code changes aren't reflected in browser

**Solutions**:
- ✅ Hard refresh browser: `Ctrl+Shift+R`
- ✅ Clear browser cache and cookies
- ✅ Check terminal for compilation errors
- ✅ Restart development server: `Ctrl+C` then `npm run dev`
- ✅ Wait 2-3 seconds for hot reload

---

### 6. Form Data Not Saving

**Problem**: Added university entry but it disappears on refresh

**Solutions**:
1. Check MongoDB connection:
   - Verify `.env.local` has correct connection string
   - Test with `npm run dev` and check console errors

2. Check MongoDB Atlas:
   - Go to Atlas dashboard
   - Click "Collections"
   - Verify `universities` collection exists
   - Check if documents are being created

3. Check browser console:
   - Open Developer Tools (F12)
   - Go to "Console" tab
   - Look for error messages
   - Check "Network" tab for failed API calls

4. Test API manually:
   - Open `http://localhost:3000/api/universities` in browser
   - Should show empty array `[]` or list of universities as JSON

---

### 7. Deployment Issues on Vercel

**Problem**: Application works locally but fails on Vercel

**Solutions**:

1. Check environment variables:
   - Go to Vercel dashboard
   - Click your project → "Settings" → "Environment Variables"
   - Verify `MONGODB_URI` is set correctly
   - Redeploy after adding/updating

2. Check MongoDB Atlas network access:
   - Go to MongoDB Atlas dashboard
   - Click "Network Access"
   - If using Vercel, allow `0.0.0.0/0` (access from anywhere)
   - Or add Vercel's IP ranges

3. Check Vercel logs:
   - Go to your project on Vercel
   - Click "Deployments"
   - Click latest deployment
   - Check "Build Logs" and "Function Logs" tabs
   - Look for error messages

4. Test build locally:
   ```powershell
   npm run build
   npm start
   ```
   - This tests production build locally
   - Check for errors before deploying

---

### 8. Form Submission Error

**Problem**: "Failed to save university entry" when clicking submit

**Solutions**:
1. Check browser console for detailed error
2. Verify all required fields (at least one field must be filled)
3. Check date format if deadline is set
4. Ensure MongoDB connection is working
5. Check if duplicate entry exists

---

### 9. Search/Filter Not Working

**Problem**: Filters don't seem to filter anything

**Solutions**:
- ✅ Ensure at least one university entry exists
- ✅ Check that field you're searching has data
- ✅ Try clearing all filters
- ✅ Refresh page and try again
- ✅ Check browser console for errors

---

### 10. Slow Performance

**Problem**: Application is slow to load or respond

**Solutions**:
1. Check internet connection
2. Verify MongoDB Atlas cluster is not hitting resource limits
3. Check browser developer tools (F12):
   - "Network" tab: See if requests are slow
   - "Performance" tab: Check for bottlenecks
4. Try with fewer entries (delete some old ones)
5. Restart development server

---

## Getting Help

### Check These Resources First
1. **README.md** - Complete documentation
2. **QUICKSTART.md** - Quick setup guide
3. **DEPLOYMENT.md** - Deployment instructions
4. **SAMPLE_DATA.js** - Example entries

### Online Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Help](https://docs.mongodb.com/atlas/)
- [React Documentation](https://react.dev)
- [Stack Overflow](https://stackoverflow.com) - Tag: `nextjs`, `mongodb`, `vercel`

### Debug Tips
1. **Check terminal output** - Most errors are logged there
2. **Use browser DevTools** - F12 opens developer tools
   - Console tab: See JavaScript errors
   - Network tab: See API calls
   - Application tab: See local storage
3. **Read error messages carefully** - They usually tell you exactly what's wrong
4. **Restart everything** - Sometimes a fresh start fixes issues:
   ```powershell
   # Stop dev server (Ctrl+C)
   # Clear node cache
   npm cache clean --force
   # Delete .next folder
   rm -r .next
   # Restart
   npm run dev
   ```

---

## Still Having Issues?

1. Take a screenshot of the error
2. Check the error message carefully
3. Try the solutions above
4. Check that your MongoDB connection string is correct
5. Ask for help on Stack Overflow or GitHub Issues with:
   - Error message
   - Steps to reproduce
   - What you've tried so far

Good luck! 🚀

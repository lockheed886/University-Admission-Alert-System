# 🏗️ Architecture & Data Flow

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser / Client Side                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           React Components (Frontend)                     │   │
│  │                                                           │   │
│  │  UniversityList          UniversityCard    UniversityForm│   │
│  │  ┌──────────────┐       ┌──────────────┐  ┌───────────┐ │   │
│  │  │ Search/Filter│──────▶│ Display Card │  │ Add/Edit  │ │   │
│  │  │ List entries │       │ Show details │  │ Form      │ │   │
│  │  │ State mgmt   │       │ Edit/Delete  │  │ Submit    │ │   │
│  │  └──────────────┘       └──────────────┘  └───────────┘ │   │
│  │           │                                       │       │   │
│  │           └───────────────┬───────────────────────┘       │   │
│  │                           │ Axios/Fetch                  │   │
│  └───────────────────────────┼──────────────────────────────┘   │
└─────────────────────────────┼────────────────────────────────────┘
                              │
                    HTTP JSON API Calls
                              │
┌─────────────────────────────┼────────────────────────────────────┐
│                        Vercel Server                             │
│                                                                  │
│           Next.js API Routes (Backend)                          │
│                                                                  │
│  /api/universities              /api/universities/[id]          │
│  ┌────────────────────────┐     ┌──────────────────────┐        │
│  │ GET   - List all       │     │ GET  - Get by ID     │        │
│  │ POST  - Create new     │────▶│ PUT  - Update        │        │
│  │ ├─ Validation          │     │ DELETE - Delete      │        │
│  │ ├─ Duplicate check     │     └──────────────────────┘        │
│  │ └─ Save to DB          │                                      │
│  └─────────────┬──────────┘                                      │
│                │ Mongoose ODM                                    │
│                │ (Database Abstraction Layer)                   │
└────────────────┼────────────────────────────────────────────────┘
                 │
                 │ TCP Connection
                 │
┌────────────────┼────────────────────────────────────────────────┐
│                ▼                                                  │
│          MongoDB Atlas                                            │
│          (Cloud Database)                                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Database: universities                                   │   │
│  │  Collection: universities (plural)                        │   │
│  │                                                           │   │
│  │  Document Example:                                        │   │
│  │  {                                                        │   │
│  │    _id: ObjectId,                                         │   │
│  │    universityName: "Oxford",                              │   │
│  │    country: "UK",                                         │   │
│  │    courseName: "CS Masters",                              │   │
│  │    deadline: 2024-12-31,                                  │   │
│  │    ieltsRequired: true,                                   │   │
│  │    scholarshipAvailable: true,                            │   │
│  │    scholarshipAmount: "50%",                              │   │
│  │    additionalInfo: "...",                                 │   │
│  │    createdAt: 2025-11-15,                                 │   │
│  │    updatedAt: 2025-11-15                                  │   │
│  │  }                                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### 1. **Adding a New University**

```
User Action
    │
    ▼
Click "+ Add University"
    │
    ▼
UniversityForm opens (Modal)
    │
    ▼
User fills form:
├─ University Name
├─ Country
├─ Course Name
├─ Deadline
├─ IELTS Required
├─ Scholarship Available
├─ Scholarship Amount
└─ Additional Info
    │
    ▼
Click "Add University" button
    │
    ▼
Frontend validation
    ├─ At least 1 field? ✓
    ├─ Valid date? ✓
    └─ All good? Send to API
    │
    ▼
POST /api/universities
    │
    ▼
Backend validation & checks
    ├─ Validate input ✓
    ├─ Check for duplicates ✓
    └─ Create new document
    │
    ▼
MongoDB insert
    │
    ▼
Return created document
    │
    ▼
Frontend updates state
    │
    ▼
UniversityList re-renders with new entry
    │
    ▼
Success message shown
```

---

### 2. **Searching Universities**

```
User types in search box
    │
    ▼
onChange event (UniversityList)
    │
    ▼
Update searchTerm state
    │
    ▼
Filter universitiesList:
    │
    ├─ filter by name OR course
    │  (case-insensitive)
    │
    ▼
Re-render list with filtered results
    │
    ▼
Show matching cards only
```

---

### 3. **Filtering by Country**

```
User selects country from dropdown
    │
    ▼
onChange event
    │
    ▼
Update filterCountry state
    │
    ▼
Apply filters to universities array:
    │
    ├─ If filterCountry is set:
    │  └─ Keep only entries with matching country
    ├─ If searchTerm is set:
    │  └─ Also apply search filter
    ├─ If filterScholarship is set:
    │  └─ Also apply scholarship filter
    └─ Combine all filters (AND operation)
    │
    ▼
Re-render filtered list
```

---

### 4. **Editing a University**

```
User clicks "Edit" button on card
    │
    ▼
Set editingId = university._id
    │
    ▼
Open form with existing data
    │
    ▼
useEffect fetches data:
    └─ Find university in state
    └─ Populate form fields
    │
    ▼
User modifies fields
    │
    ▼
Click "Update Entry" button
    │
    ▼
PUT /api/universities/[id]
    │
    ▼
Backend:
    ├─ Validate ID ✓
    ├─ Validate data ✓
    └─ Update document
    │
    ▼
MongoDB update
    │
    ▼
Return updated document
    │
    ▼
Frontend:
    ├─ Fetch fresh list
    ├─ Close form
    └─ Show success message
```

---

### 5. **Deleting a University**

```
User clicks "Delete" button
    │
    ▼
Show confirmation dialog
    │
    ▼
If user confirms:
    │
    ▼
DELETE /api/universities/[id]
    │
    ▼
Backend:
    ├─ Validate ID ✓
    └─ Delete document
    │
    ▼
MongoDB delete
    │
    ▼
Return success
    │
    ▼
Frontend:
    ├─ Fetch fresh list
    └─ Show success message
```

---

## Component Hierarchy

```
App (Next.js Page)
│
└─ UniversityList (Main Component)
   │
   ├─ Header Section
   │  ├─ Title
   │  └─ "+ Add University" Button
   │
   ├─ Messages Section
   │  ├─ Success Alert (conditional)
   │  └─ Error Alert (conditional)
   │
   ├─ Form Modal (conditional)
   │  └─ UniversityForm
   │     ├─ University Name Input
   │     ├─ Country Input
   │     ├─ Course Name Input
   │     ├─ Deadline Date Picker
   │     ├─ IELTS Checkbox
   │     ├─ Scholarship Checkbox
   │     ├─ Scholarship Amount (conditional)
   │     ├─ Additional Info Textarea
   │     └─ Form Buttons
   │
   ├─ Search & Filter Section
   │  ├─ Search Input
   │  ├─ Country Dropdown
   │  ├─ Scholarship Filter
   │  └─ Deadline Urgency Filter
   │
   └─ Universities Grid
      └─ UniversityCard[] (Loop)
         ├─ Urgency Badge
         ├─ University Details
         ├─ Scholarship Info
         ├─ IELTS Badge
         ├─ Additional Info
         ├─ Timestamps
         └─ Action Buttons (Edit, Delete)
```

---

## Database Schema Visual

```
┌─────────────────────────────────────────────────────┐
│ Collection: universities                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Document 1:                                         │
│ ├─ _id: ObjectId                                    │
│ ├─ universityName: "Oxford"                         │
│ ├─ country: "United Kingdom"                        │
│ ├─ courseName: "MS Computer Science"                │
│ ├─ deadline: ISODate("2024-12-31")                  │
│ ├─ ieltsRequired: true                              │
│ ├─ scholarshipAvailable: true                       │
│ ├─ scholarshipAmount: "50% tuition"                 │
│ ├─ additionalInfo: "Highly competitive..."         │
│ ├─ createdAt: ISODate("2025-11-15T10:30:00Z")     │
│ └─ updatedAt: ISODate("2025-11-15T10:30:00Z")     │
│                                                     │
│ Document 2:                                         │
│ ├─ _id: ObjectId                                    │
│ ├─ universityName: "MIT"                            │
│ ├─ country: "United States"                         │
│ ├─ courseName: "MS Data Science"                    │
│ ├─ deadline: ISODate("2024-12-20")                  │
│ ├─ ieltsRequired: false                             │
│ ├─ scholarshipAvailable: true                       │
│ ├─ scholarshipAmount: "Merit-based"                 │
│ ├─ additionalInfo: "Top engineering school"        │
│ ├─ createdAt: ISODate("2025-11-15T11:00:00Z")     │
│ └─ updatedAt: ISODate("2025-11-15T11:00:00Z")     │
│                                                     │
│ ... (more documents)                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## State Management Flow

```
UniversityList Component State:
│
├─ universities: []              // All entries
├─ loading: boolean              // API call status
├─ showForm: boolean             // Modal visibility
├─ editingId: string | null      // Which entry being edited
├─ searchTerm: string            // Search input
├─ filterCountry: string         // Country filter
├─ filterDeadline: string        // Deadline filter
├─ filterScholarship: string     // Scholarship filter
├─ error: string | null          // Error message
└─ success: string | null        // Success message

When any state changes:
    │
    ▼
Component re-renders
    │
    ├─ Apply filters
    ├─ Update UI
    └─ Fetch data if needed
```

---

## API Response Examples

### GET /api/universities

```json
[
  {
    "_id": "657a9f1234567890",
    "universityName": "Oxford",
    "country": "UK",
    "courseName": "CS Masters",
    "deadline": "2024-12-31",
    "ieltsRequired": true,
    "scholarshipAvailable": true,
    "scholarshipAmount": "50%",
    "additionalInfo": "Competitive",
    "createdAt": "2025-11-15T10:30:00Z",
    "updatedAt": "2025-11-15T10:30:00Z"
  }
]
```

### POST /api/universities

**Request**:
```json
{
  "universityName": "Stanford",
  "country": "USA",
  "courseName": "MS CS",
  "deadline": "2024-12-15",
  "ieltsRequired": false,
  "scholarshipAvailable": true,
  "scholarshipAmount": "Full",
  "additionalInfo": "Silicon Valley"
}
```

**Response**:
```json
{
  "_id": "657a9f1234567891",
  "universityName": "Stanford",
  ...
  "createdAt": "2025-11-15T11:00:00Z",
  "updatedAt": "2025-11-15T11:00:00Z"
}
```

---

## Error Handling Flow

```
API Call fails
    │
    ▼
Catch error
    │
    ├─ Is it a 409 (duplicate)?
    │  └─ Show: "This university entry already exists!"
    │
    ├─ Is it a 400 (validation)?
    │  └─ Show: "Invalid data provided"
    │
    ├─ Is it a 404 (not found)?
    │  └─ Show: "University not found"
    │
    ├─ Is it a 500 (server error)?
    │  └─ Show: "Failed to save university entry"
    │
    └─ Other error?
       └─ Show error.response?.data?.error
       └─ Default to generic message

Error displays in red alert box
Error auto-dismisses after 3 seconds
```

---

## Responsive Design Breakpoints

```
Mobile (< 768px)
│
├─ 1 column grid
├─ Full-width cards
├─ Stacked search filters
└─ Touch-friendly buttons

        │
        ▼

Tablet (768px - 1023px)
│
├─ 2 column grid
├─ Side-by-side cards
├─ Horizontal filter layout
└─ Optimized spacing

        │
        ▼

Desktop (> 1024px)
│
├─ 3 column grid
├─ Full layout
├─ All features visible
└─ Maximum comfort

```

---

## Deployment Architecture

```
Local Development
│
├─ npm run dev
├─ http://localhost:3000
└─ .env.local (contains MONGODB_URI)
    │
    ▼ git push
    │
GitHub Repository
│
    │
    ▼ Vercel detects push
    │
Vercel Build Server
│
├─ npm install
├─ npm run build
├─ npm run lint
└─ Build verification
    │
    ▼
Vercel Deployment
│
├─ Upload to CDN
├─ Set environment variables
├─ Start server
└─ Assign URL
    │
    ▼
Production Application
│
├─ https://your-app.vercel.app
├─ Connected to MongoDB Atlas
├─ Publicly accessible
└─ Auto-scales with traffic
```

---

**This architecture provides a complete, scalable, and maintainable web application! 🚀**

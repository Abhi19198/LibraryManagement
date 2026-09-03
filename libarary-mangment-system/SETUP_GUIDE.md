# Library Management System - Setup Guide

## ⚙️ Prerequisites

### Frontend
- Node.js 18+ and npm
- React 18.3.1
- Vite 5.4.21

### Backend
- C++ 17 compiler (g++)
- WinSock2 (Windows Sockets)
- SQLite3 development libraries

### Database
- SQLite3

---

## 🚀 Quick Start

### 1. **Install SQLite3** (Required for Database)

#### For MSYS2/MinGW Users:
```bash
pacman -S mingw-w64-x86_64-sqlite3
```

#### For Windows:
- Download from: https://www.sqlite.org/download.html
- Or use: `choco install sqlite` (if using Chocolatey)
- Or use: `scoop install sqlite` (if using Scoop)

### 2. **Setup Database**

Navigate to the `backend` folder and run:

```bash
setup_database.bat
```

This will:
- Create `library.db` SQLite database file
- Initialize tables (books, issued_books, returned_books, members)
- Insert sample data

### 3. **Compile & Run Backend**

In the `backend` folder, double-click:

```
build_and_run.bat
```

Or manually compile:
```bash
g++ -o server.exe server.cpp -lws2_32 -lsqlite3 -std=c++17
server.exe
```

You should see:
```
==========================================
🚀 C++ Backend Server running on http://localhost:3001
📚 Library Management System API (SQLite)
📊 Database: library.db
==========================================
```

### 4. **Setup Frontend**

In the project root folder:

```bash
npm install
npm run dev
```

Open browser to: `http://localhost:5173`

---

## 📁 Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── MainPage.jsx          (Main dashboard with 5 features)
│   │   ├── HeroSection.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SectionTitle.jsx
│   │   └── ... (other components)
│   ├── App.jsx                    (Route management)
│   ├── main.jsx                   (React entry point)
│   └── styles.css                 (2400+ lines of premium styling)
│
├── backend/
│   ├── server.cpp                 (C++ HTTP server with SQLite integration)
│   ├── database_schema.sql        (SQLite schema & sample data)
│   ├── build_and_run.bat          (Compile & run script)
│   ├── setup_database.bat         (Database initialization)
│   └── library.db                 (SQLite database file - created after setup)
│
├── package.json
├── vite.config.js
└── index.html
```

---

## 🔄 Workflow: Adding & Deleting Books

### **Adding a Book**

1. **Frontend**: Click "➕ Add Book" button
2. **Form Modal Opens**: Fill in book details (Title, Author, ISBN, etc.)
3. **Submit Form**: Click "➕ Add Book"
4. **Frontend**: Sends POST request to `/api/books` with JSON body
5. **Backend**: Receives request, parses JSON, executes SQL INSERT
6. **Database**: Book stored in `books` table persistently
7. **Response**: Returns success, frontend refreshes table
8. **Notification**: Toast shows "✓ Book added successfully!"

### **Deleting a Book**

1. **Frontend**: Click 🗑️ delete button on any book row
2. **Confirmation**: Browser prompts "Are you sure?"
3. **Frontend**: Sends DELETE request to `/api/books/:id`
4. **Backend**: Receives request, executes SQL DELETE by ID
5. **Database**: Book permanently removed from `books` table
6. **Response**: Returns success, frontend removes row
7. **Notification**: Toast shows "✓ Book deleted successfully!"

---

## 🔌 API Endpoints

### **Books Management**
- `GET /api/books` → Get all books
- `POST /api/books` → Add new book (JSON body required)
- `DELETE /api/books/:id` → Delete book by ID
- `GET /api/search?q=query` → Search books by title/author

### **Tracking**
- `GET /api/issued-books` → Get currently issued books
- `GET /api/returned-books` → Get returned books

### **Members**
- `GET /api/members` → Get all members

### **Analytics**
- `GET /api/analytics` → Get most issued books statistics

---

## 📝 Example API Usage

### **Add Book (POST)**
```javascript
fetch('http://localhost:3001/api/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    publisher: 'Scribner',
    year: 2004,
    category: 'Literature',
    quantity: 3,
    description: 'A classic American novel'
  })
})
```

### **Delete Book (DELETE)**
```javascript
fetch('http://localhost:3001/api/books/1', {
  method: 'DELETE'
})
```

### **Search Books (GET)**
```javascript
fetch('http://localhost:3001/api/search?q=gatsby')
```

---

## 🎯 Features

### **Book Management**
- ✅ View all books in table format
- ✅ Add new books with comprehensive form
- ✅ Delete books with confirmation
- ✅ Search books by title/author
- ✅ Sort and filter options
- ✅ Status badges (Available/Issued)

### **Smart Search**
- ✅ Real-time search by title/author
- ✅ Case-insensitive matching
- ✅ Filter buttons
- ✅ Instant results display

### **Issue & Return Tracking**
- ✅ View issued books (currently out)
- ✅ View returned books (history)
- ✅ Status indicators (Active/Overdue/On Time)
- ✅ Issue and due dates

### **Member Management**
- ✅ List all library members
- ✅ Student ID and contact info
- ✅ Books issued count
- ✅ Member status

### **Reports & Analytics**
- ✅ Top 8 most issued books chart
- ✅ Issue count statistics
- ✅ Return statistics
- ✅ Overdue tracking
- ✅ Summary stat cards

---

## 🛠️ Troubleshooting

### **Problem**: Backend compilation fails with sqlite3 errors
**Solution**: 
```bash
# Install SQLite3
pacman -S mingw-w64-x86_64-sqlite3
```

### **Problem**: "Cannot open database" error
**Solution**: Run `setup_database.bat` to create and initialize the database

### **Problem**: Frontend shows empty book list
**Solution**: 
- Ensure backend is running on port 3001
- Check browser console (F12) for network errors
- Verify database was initialized: `setup_database.bat`

### **Problem**: "Connection refused" on localhost:3001
**Solution**:
- Backend may not be running
- Try running `build_and_run.bat` again
- Check if port 3001 is already in use by another application

### **Problem**: Cannot add books from frontend
**Solution**:
- Fill all required fields (Title, Author, Quantity)
- Check browser console for errors
- Ensure backend is responding to API calls
- Verify database file exists: `library.db`

---

## 📊 Database Schema

### **books** Table
```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT,
  publisher TEXT,
  year INTEGER,
  category TEXT,
  quantity INTEGER DEFAULT 1,
  description TEXT,
  status TEXT DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **issued_books** Table
```sql
CREATE TABLE issued_books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  member TEXT NOT NULL,
  student_id TEXT NOT NULL,
  issue_date DATE,
  due_date DATE,
  status TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### **returned_books** Table
```sql
CREATE TABLE returned_books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  member TEXT NOT NULL,
  student_id TEXT NOT NULL,
  issue_date DATE,
  return_date DATE,
  status TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### **members** Table
```sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  student_id TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  membership_date DATE,
  books_issued INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 🎨 UI Features

- **Glass-morphism Design**: Modern frosted glass effect
- **Dark Theme**: Sophisticated dark background with orange accents
- **Smooth Animations**: Fade-in, slide-up, and glow effects
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Google Fonts**: Inter, Poppins, Rokkitt for premium typography
- **Status Badges**: Color-coded status indicators
- **Loading States**: Button feedback during operations
- **Toast Notifications**: Success/Error messages
- **Modal Forms**: Centered add book form with validation

---

## 🚀 Performance Optimizations

- **Database Indexes**: On frequently searched columns
- **Lazy Loading**: Features load data on demand
- **Efficient Queries**: SQL queries optimized for SQLite
- **Frontend Caching**: Component state management
- **Vite Build**: Fast production builds (168 KB JS + 34 KB CSS)

---

## 📝 Development

### **Build Frontend**
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### **Start Dev Server**
```bash
npm run dev
```
Runs on http://localhost:5173 with hot reload

### **Compile Backend**
```bash
cd backend
g++ -o server.exe server.cpp -lws2_32 -lsqlite3 -std=c++17
```

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Check browser console for errors (F12)
4. Ensure backend is running on port 3001
5. Verify database file exists: `backend/library.db`

---

## 📜 License

This project is created for educational purposes.

**Enjoy your Library Management System! 📚✨**

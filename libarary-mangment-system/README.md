# 📚 Library Management System

A complete, full-stack library management system built with React frontend and C++ REST API backend. Manage books, track issues/returns, handle member information, and access real-time analytics.

---
## id password
id =23BCS10289
password = 10289
## ✨ Features

### 📖 **Book Management**
- View comprehensive library catalog
- Add new books with detailed information (title, author, category, quantity)
- Track real-time book availability
- Filter and sort books by various criteria
- Update book information

### 🔍 **Smart Search**
- Search books by title, author, or category
- Real-time search with instant results
- Multiple filter combinations
- Fast and responsive search experience

### 📅 **Issue & Return Tracking**
- Issue books to members with automatic date tracking
- Track all issued books with current status
- Monitor return status (On Time, Late, Pending)
- View issue dates and due dates
- Identify and manage overdue books

### 👨‍🎓 **Member Management**
- Manage library members database
- View member details and contact information
- Track number of books issued per member
- Monitor active memberships
- Member profile information

### 📊 **Reports & Analytics**
- Interactive radar chart of most issued books
- Real-time statistics and metrics
- Issue tracking analytics
- Key metrics summary cards
- Live chart updates after issue/return actions

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.3.1** - UI library
- **Vite 5.4.10** - Fast build tool and dev server
- **CSS3** - Modern styling with glass-morphism effects
- **Google Fonts** - Inter & Poppins typography

### **Backend**
- **C++ 17** - High-performance server logic
- **WinSock2** - Windows network programming
- **JSON** - Data format for REST API
- **Port**: 3001

### **Database** (Optional)
- **SQLite3** - Persistent data storage
- Schema included for future integration

---

## 📋 Prerequisites

### Frontend Requirements
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

### Backend Requirements
- **C++ Compiler** - g++ (MinGW recommended for Windows)
- **MinGW** - MinGW-w64 for Windows development
- **WinSock2** - Included with Windows SDK (built-in on Windows)

### Optional
- **SQLite3** - For database setup ([Download](https://www.sqlite.org/download.html))
  - Windows: `choco install sqlite` or `scoop install sqlite`
  - MinGW: `pacman -S mingw-w64-x86_64-sqlite3`

---

## 🚀 Quick Start Guide

### Step 1: Clone/Navigate to Project
```bash
cd your-project-directory
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

### Step 3: Compile & Run Backend
Navigate to the `backend` folder and run:
```bash
# Windows
.\build_and_run.bat
```

Or manually compile:
```bash
g++ -o server.exe server.cpp -lws2_32 -std=c++17
server.exe
```

The backend will start on **http://localhost:3001**

### Step 4: Start Frontend Development Server
In the root directory:
```bash
npm run dev
```

The frontend will be available at **http://localhost:5173**

### Step 5: Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

### Step 6: Login with Default Credentials
Use the following credentials to log in:

| Field | Value |
|-------|-------|
| **ID** | `23BCS10289` |
| **Password** | `10289` |

---

## 📁 Project Structure

```
Library-Management-System/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── MainPage.jsx         # Main dashboard
│   │   ├── LoginPage.jsx        # Authentication
│   │   ├── HeroSection.jsx      # Landing page
│   │   └── ...other sections/
│   ├── App.jsx                  # App root component
│   ├── main.jsx                 # Entry point
│   └── styles.css               # Global styles
├── backend/
│   ├── server.cpp               # C++ REST API server
│   ├── build_and_run.bat        # Build script (Windows)
│   ├── database_schema.sql      # SQLite schema
│   └── setup_database.bat       # Database setup script
├── package.json                 # Frontend dependencies
├── vite.config.js               # Vite configuration
├── ARCHITECTURE.md              # Detailed architecture
├── SETUP_GUIDE.md               # Detailed setup guide
└── README.md                    # This file
```

---

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/books` | GET | Get all books |
| `/books` | POST | Add a new book |
| `/search` | GET | Search books (query param: q) |
| `/issued-books` | GET | Get all issued books |
| `/issued-books` | POST | Issue a book to a member |
| `/returned-books` | GET | Get all returned books |
| `/returned-books` | POST | Return an issued book |
| `/members` | GET | Get all members |
| `/members` | POST | Add a new member |
| `/analytics` | GET | Get analytics data |

---

## 🔧 Development

### Available npm Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Workflow

1. Frontend changes auto-reload via Vite HMR
2. Backend requires recompilation (run `build_and_run.bat` again)
3. API requests from frontend to `localhost:3001`

---

## 🗄️ Database Setup (Optional)

To set up persistent SQLite database:

1. **Install SQLite3** (see Prerequisites)

2. Navigate to backend folder:
   ```bash
   cd backend
   ```

3. Run setup script:
   ```bash
   .\setup_database.bat
   ```

This creates `library.db` with all required tables and sample data.

---

## ⚙️ Build for Production

```bash
npm run build
```

This generates an optimized production build in the `dist/` folder.

---

## 🐛 Troubleshooting

### Frontend Issues

#### Issue: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

#### Issue: Port 5173 already in use
**Solution:**
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or start on different port
npm run dev -- --port 3000
```

### Backend Issues

#### Issue: "g++ command not found"
**Solution:**
- Install MinGW-w64 from [here](https://www.mingw-w64.org/)
- Add g++ to system PATH
- Verify: `g++ --version`

#### Issue: "WinSock2 not found"
**Solution:**
- WinSock2 is built-in on Windows
- Ensure Windows SDK is installed
- Try compiling with: `g++ -o server.exe server.cpp -lws2_32 -std=c++17`

#### Issue: Port 3001 already in use
**Solution:**
```bash
# Find process on port 3001 (Windows)
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

#### Issue: Compilation errors
**Solution:**
- Ensure C++ 17 support: `g++ -std=c++17 --version`
- Check file encoding (should be UTF-8)
- Try rebuilding: `build_and_run.bat`

### Database Issues

#### Issue: SQLite3 command not found during database setup
**Solution:**
- Install SQLite3 (see Prerequisites)
- Windows: `choco install sqlite`
- MinGW: `pacman -S mingw-w64-x86_64-sqlite3`
- Verify: `sqlite3 --version`

#### Issue: "library.db" not created
**Solution:**
- Ensure SQLite3 is properly installed
- Run setup script from correct directory
- Check file permissions in backend folder
- Manually create with: `sqlite3 library.db < database_schema.sql`

---

## 🔄 API Usage Examples

### Get All Books
```bash
curl http://localhost:3001/books
```

### Search Books
```bash
curl "http://localhost:3001/search?q=Harry"
```

### Issue a Book
```bash
curl -X POST http://localhost:3001/issued-books \
  -H "Content-Type: application/json" \
  -d '{"bookId": 1, "memberId": 1}'
```

### Get Analytics
```bash
curl http://localhost:3001/analytics
```

---

## 📖 Additional Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design
- **[vite.config.js](vite.config.js)** - Vite configuration details

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/YourFeature`)
3. **Commit** your changes (`git commit -m 'Add YourFeature'`)
4. **Push** to the branch (`git push origin feature/YourFeature`)
5. **Open** a Pull Request

### Code Style
- Frontend: Standard React/JavaScript conventions
- Backend: C++ 17 standard, meaningful variable names
- Comments for complex logic
- Follow existing code patterns

---

## 📝 License

This project is open source and available under the MIT License.

---

## 📞 Support & Issues

If you encounter any issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
4. Open an issue with detailed error information

---

## 🎯 Roadmap

- [ ] Persistent database integration (SQLite)
- [ ] User authentication system
- [ ] Advanced reporting features
- [ ] Export to PDF functionality
- [ ] Multi-language support
- [ ] Mobile app support
- [ ] Cloud deployment

---

## 👥 Team & Credits

Developed as a full-stack library management solution combining modern frontend technologies with efficient C++ backend.

---

**Last Updated:** April 2026  
**Version:** 1.0.0
  "title": "DBMS",
  "author": "Navathe",
  "isbn": "978-0132145374",
  "publisher": "Pearson",
  "year": 2015,
  "category": "Computer Science",
  "quantity": 5,
  "description": "Database Management Systems",
  "status": "Available"
}
```

### Member
```json
{
  "id": 1,
  "name": "Abhishek Kumar",
  "studentId": "23BCS10289",
  "email": "abhishek.kumar@example.com",
  "phone": "9876543210",
  "membershipDate": "2023-08-15",
  "booksIssued": 1,
  "status": "Active"
}
```

## 🎨 UI Features

- **Centered Navbar** - Brand name and navigation features
- **Glass-morphism Effects** - Modern frosted glass design
- **Gradient Glows** - Orange accent (#ff7a00 - #ff9a2b)
- **Smooth Animations** - Fade-in, slide-up, pulse effects
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Dark Theme** - Professional dark background
- **Status Badges** - Color-coded status indicators

## 🔄 How It Works

1. **Frontend** loads and initializes with React
2. **User navigates** between different features using navbar
3. **useEffect hook** triggers API calls to backend based on active feature
4. **Backend** processes requests and returns JSON data
5. **Frontend** renders data with beautiful animations and styling
6. **Real-time updates** for search, member management, and analytics graph

## 🐛 Troubleshooting

### Backend Won't Start
- Check if port 3001 is in use: `netstat -ano | findstr :3001`
- Ensure g++ is installed: `g++ --version`
- Check Windows Firewall settings

### CORS Errors
- Backend includes CORS headers automatically
- Ensure backend is running before frontend

### Search Not Working
- Verify book titles in database match search query
- Check browser console for API errors
- Ensure backend endpoint is `/api/search?q=query`

## 📊 Default Test Data

### Books
1. DBMS - Navathe (Available)
2. Data Structures - Tanenbaum (Available)
3. Operating Systems - Galvin (Issued)
4. Computer Networks - Forouzan (Available)

### Members
- Abhishek Kumar(23BCS10289)
- Sana (23BCS10113)
- Abhishek Singh (23BCS12427)

### Default Issued Graph Dataset
1. DBMS → 2
2. Algorithm Design → 3
3. Computer Networks → 1
4. Data Structures → 5
5. Operating Systems → 1
6. Software Engineering → 4

> Note: Jab nayi book issue hoti hai, graph count live increase hota hai. Agar naya title issue ho, woh graph me auto-add ho jata hai.

## 🎯 Future Enhancements

- Database integration (SQLite/MySQL)
- User authentication
- Email notifications
- PDF report generation
- Advanced search filters
- Book reservations
- Fine management
- Mobile app
- Dark/Light mode toggle

## 📄 License

Free to use for educational purposes

## 👤 Author

Library Management System - 2026

---

**Enjoy managing your library! 📚**

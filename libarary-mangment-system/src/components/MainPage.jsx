import { useState, useEffect, useRef } from 'react';

const navigationFeatures = [
  { id: 'book-management', icon: '📖', title: 'Book Management' },
  { id: 'smart-search', icon: '🔍', title: 'Smart Search' },
  { id: 'issue-tracking', icon: '📅', title: 'Issue & Return Tracking' },
  { id: 'member-management', icon: '👨‍🎓', title: 'Member Management' },
  { id: 'reports-analytics', icon: '📊', title: 'Reports & Analytics' },
];

const SAMPLE_BOOKS = [
  { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', publisher: 'MIT Press', year: 2022, category: 'Computer Science', quantity: 5, status: 'Available', description: 'Comprehensive introduction to algorithms and data structures.' },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', publisher: 'Prentice Hall', year: 2008, category: 'Computer Science', quantity: 3, status: 'Available', description: 'A handbook of agile software craftsmanship.' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', publisher: 'Scribner', year: 1925, category: 'Literature', quantity: 4, status: 'Available', description: 'A classic American novel set in the Jazz Age.' },
  { id: 4, title: 'Calculus: Early Transcendentals', author: 'James Stewart', isbn: '978-1285741550', publisher: 'Cengage', year: 2015, category: 'Mathematics', quantity: 6, status: 'Available', description: 'Comprehensive calculus textbook for engineering and science students.' },
  { id: 5, title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '978-0553380163', publisher: 'Bantam Books', year: 1988, category: 'Physics', quantity: 3, status: 'Issued', description: 'Landmark volume in science writing about cosmology.' },
  { id: 6, title: 'Design Patterns', author: 'Gang of Four', isbn: '978-0201633610', publisher: 'Addison-Wesley', year: 1994, category: 'Computer Science', quantity: 2, status: 'Available', description: 'Elements of reusable object-oriented software.' },
  { id: 7, title: 'Sapiens: A Brief History', author: 'Yuval Noah Harari', isbn: '978-0062316097', publisher: 'Harper', year: 2015, category: 'History', quantity: 4, status: 'Available', description: 'A narrative history of humankind.' },
  { id: 8, title: 'Organic Chemistry', author: 'Paula Bruice', isbn: '978-0134042282', publisher: 'Pearson', year: 2016, category: 'Chemistry', quantity: 5, status: 'Available', description: 'Comprehensive organic chemistry for undergraduates.' },
  { id: 9, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0135957059', publisher: 'Addison-Wesley', year: 2019, category: 'Computer Science', quantity: 3, status: 'Available', description: 'Your journey to mastery in software development.' },
  { id: 10, title: 'Linear Algebra Done Right', author: 'Sheldon Axler', isbn: '978-3319110790', publisher: 'Springer', year: 2015, category: 'Mathematics', quantity: 4, status: 'Available', description: 'A fresh approach to linear algebra.' },
];

const SAMPLE_ISSUED_BOOKS = [
  { id: 101, title: 'A Brief History of Time', member: 'Rahul Sharma', studentId: '23BCS10001', issueDate: '2026-04-01', dueDate: '2026-04-15', status: 'Overdue' },
  { id: 102, title: 'Clean Code', member: 'Priya Singh', studentId: '23BCS10002', issueDate: '2026-04-10', dueDate: '2026-04-24', status: 'Issued' },
];

const SAMPLE_RETURNED_BOOKS = [
  { id: 201, title: 'Sapiens: A Brief History', member: 'Sneha Patel', studentId: '23BCS10004', issueDate: '2026-03-15', returnDate: '2026-03-28', status: 'Returned' },
];

const SAMPLE_MEMBERS = [
  { id: 1, name: 'Rahul Sharma', studentId: '23BCS10001', email: 'rahul@college.edu', booksIssued: 2, status: 'Active' },
  { id: 2, name: 'Priya Singh', studentId: '23BCS10002', email: 'priya@college.edu', booksIssued: 1, status: 'Active' },
  { id: 3, name: 'Amit Kumar', studentId: '23BCS10289', email: 'amit@college.edu', booksIssued: 0, status: 'Active' },
  { id: 4, name: 'Sneha Patel', studentId: '23BCS10004', email: 'sneha@college.edu', booksIssued: 3, status: 'Active' },
  { id: 5, name: 'Vikram Rao', studentId: '23BCS10005', email: 'vikram@college.edu', booksIssued: 1, status: 'Inactive' },
];

function normalizeAnalytics(items) {
  const sortedItems = [...items].sort((left, right) => right.issueCount - left.issueCount);
  const maxCount = Math.max(...sortedItems.map((item) => item.issueCount), 1);

  return sortedItems.slice(0, 8).map((item, index) => ({
    id: item.id ?? index + 1,
    title: item.title,
    issueCount: item.issueCount,
    percentage: Math.max(0, Math.min(100, Math.round((item.issueCount * 100) / maxCount)))
  }));
}

function buildAnalyticsFromIssuedBooks(issuedBooks) {
  const counts = new Map();

  issuedBooks.forEach((book) => {
    counts.set(book.title, (counts.get(book.title) || 0) + 1);
  });

  return normalizeAnalytics(
    Array.from(counts.entries()).map(([title, issueCount], index) => ({
      id: index + 1,
      title,
      issueCount,
      percentage: issueCount
    }))
  );
}

const SAMPLE_ANALYTICS = buildAnalyticsFromIssuedBooks(SAMPLE_ISSUED_BOOKS);

async function fetchJson(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

// ── Local chatbot engine ──────────────────────────────────────────────────────
function getBotReply(input, books, issuedBooks, returnedBooks, members) {
  const q = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|namaste|hii|helo)/.test(q))
    return 'Hello! I am your Library AI Assistant. Ask me anything about books, members, issue/return tracking, or how to use this system.';

  if (/how are you|how r u/.test(q))
    return "I'm doing great, ready to help you manage the library! What do you need?";

  // About the system
  if (/what is this|about this (system|app|project)|what does this (do|system)|library management/.test(q))
    return 'This is a Library Management System built with React (frontend) and C++ (backend). It lets you manage books, track issues/returns, manage members, search the collection, and view analytics — all from one dashboard.';

  if (/who (made|built|created|developed) (this|it)|developer|creator/.test(q))
    return 'This Library Management System was built as a college project using React for the frontend and C++ with a REST API for the backend.';

  if (/tech(nology|stack| stack)|built with|frontend|backend|language/.test(q))
    return 'Frontend: React 18 + Vite. Backend: C++ with a custom HTTP server. Database: SQL (via database_schema.sql). The UI uses plain CSS with a dark theme.';

  // Features
  if (/feature|what can (i|you) do|capabilities|functions/.test(q))
    return 'This system has 5 main features:\n1. 📖 Book Management – Add, view, delete books\n2. 🔍 Smart Search – Search by title, author, or category\n3. 📅 Issue & Return Tracking – Track who has which book\n4. 👨‍🎓 Member Management – View registered library members\n5. 📊 Reports & Analytics – Radar chart of most-issued books';

  // Books count / list
  if (/how many books|total books|number of books|book count/.test(q))
    return `There are currently ${books.length} books in the library collection.`;

  if (/list (all )?books|show (all )?books|all books|available books/.test(q)) {
    const available = books.filter(b => b.status === 'Available');
    return `Available books (${available.length}):\n` + available.map((b, i) => `${i+1}. "${b.title}" by ${b.author}`).join('\n');
  }

  if (/issued books|currently issued|books out/.test(q)) {
    if (issuedBooks.length === 0) return 'No books are currently issued.';
    return `Currently issued (${issuedBooks.length}):\n` + issuedBooks.map((b, i) => `${i+1}. "${b.title}" – ${b.member} (due: ${b.dueDate})`).join('\n');
  }

  if (/returned books|recent returns/.test(q)) {
    if (returnedBooks.length === 0) return 'No books have been returned yet.';
    return `Recently returned (${returnedBooks.length}):\n` + returnedBooks.map((b, i) => `${i+1}. "${b.title}" by ${b.member}`).join('\n');
  }

  // Search for a specific book
  const bookSearchMatch = q.match(/(?:find|search|look for|where is|do you have|is there) (.+)/);
  if (bookSearchMatch) {
    const term = bookSearchMatch[1].replace(/book|by|author/g, '').trim();
    const found = books.filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      b.category.toLowerCase().includes(term)
    );
    if (found.length > 0)
      return `Found ${found.length} result(s):\n` + found.map(b => `📚 "${b.title}" by ${b.author} — ${b.status}`).join('\n');
    return `No books found matching "${term}". Try searching by title, author, or category.`;
  }

  // Members
  if (/how many members|total members|member count/.test(q))
    return `There are ${members.length} registered members in the library.`;

  if (/list members|show members|all members/.test(q))
    return `Members (${members.length}):\n` + members.map((m, i) => `${i+1}. ${m.name} (${m.studentId}) – ${m.status}`).join('\n');

  if (/active members/.test(q)) {
    const active = members.filter(m => m.status === 'Active');
    return `Active members: ${active.length}\n` + active.map(m => `• ${m.name} (${m.studentId})`).join('\n');
  }

  // How to add a book
  if (/how to add (a )?book|add book|adding book/.test(q))
    return 'To add a book:\n1. Go to "Book Management" tab\n2. Click the "➕ Add Book" button\n3. Fill in the title, author, and other details\n4. Click "Add Book" to save it.';

  // How to issue a book
  if (/how to issue|issue a book|issuing book/.test(q))
    return 'To issue a book:\n1. Go to "Smart Search" tab\n2. Search for the book\n3. Click "📤 Issue" next to the book\n4. Enter the member name, student ID, and due date\n5. Click "Issue Book".';

  // How to return a book
  if (/how to return|return a book|returning book/.test(q))
    return 'To return a book:\n1. Go to "Issue & Return Tracking" tab\n2. Find the book in the "Currently Issued Books" table\n3. Click "↩️ Return" to mark it as returned.';

  // How to search
  if (/how to search|search books|smart search/.test(q))
    return 'To search books:\n1. Click the "🔍 Smart Search" tab\n2. Type a title, author name, or category in the search box\n3. Press Enter or click "Search"\n4. Results will appear below.';

  // Login
  if (/login|password|credentials|student id|how to login/.test(q))
    return 'To login:\n• Student ID: 23BCS10289\n• Password: 10289\nEnter these on the login page to access the dashboard.';

  // Categories
  if (/categor|genre|type of books/.test(q))
    return 'Book categories available:\n• Computer Science\n• Mathematics\n• Physics\n• Chemistry\n• Literature\n• History\n• Other';

  // Analytics / reports
  if (/analytics|report|chart|radar|statistics|stats/.test(q))
    return 'The Reports & Analytics section shows a radar chart of the most-issued books. It also displays total issues, returns, currently issued count, and overdue books. Data refreshes every 4 seconds.';

  // Overdue
  if (/overdue|late|fine|penalty/.test(q)) {
    const overdue = issuedBooks.filter(b => b.status === 'Overdue');
    if (overdue.length === 0) return 'Great news — no overdue books right now!';
    return `There are ${overdue.length} overdue book(s):\n` + overdue.map(b => `• "${b.title}" – ${b.member}`).join('\n');
  }

  // Delete book
  if (/delete|remove (a )?book/.test(q))
    return 'To delete a book:\n1. Go to "Book Management" tab\n2. Find the book in the table\n3. Click the 🗑️ icon in the Action column\n4. Confirm the deletion.';

  // Navigation help
  if (/navigate|how to use|guide|help|tutorial/.test(q))
    return 'Navigation guide:\n• Use the top navbar to switch between sections\n• 📖 Book Management – manage your collection\n• 🔍 Smart Search – find books quickly\n• 📅 Issue & Return – track borrowed books\n• 👨‍🎓 Members – view library users\n• 📊 Analytics – usage reports\n• The 🤖 chat button (bottom-right) is always available for help!';

  // Goodbye
  if (/bye|goodbye|see you|thanks|thank you|thx/.test(q))
    return 'You\'re welcome! Happy reading 📚 Come back anytime you need help.';

  // Fallback
  return `I'm not sure about that. Here are things I can help with:\n• Book info (list, search, count)\n• How to add/issue/return books\n• Member details\n• Login credentials\n• System features & navigation\n• Analytics & reports\n\nTry asking something like "how do I add a book?" or "list all books".`;
}

function MainPage({ onBack }) {
  const [activeFeature, setActiveFeature] = useState('book-management');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isIssueBookModalOpen, setIsIssueBookModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: 'bot', text: 'Hi! I am your Library AI Assistant. Ask me anything about books, members, how to use this system, or library operations!' }
  ]);
  const [selectedBookForIssue, setSelectedBookForIssue] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const chatEndRef = useRef(null);

  const [formData, setFormData] = useState({
    bookTitle: '', bookAuthor: '', bookISBN: '', bookPublisher: '',
    bookYear: new Date().getFullYear(), bookCategory: 'Computer Science',
    bookQuantity: 1, bookDescription: ''
  });

  const [issueFormData, setIssueFormData] = useState({
    memberName: '', studentId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const [books, setBooks] = useState(SAMPLE_BOOKS);
  const [issuedBooks, setIssuedBooks] = useState(SAMPLE_ISSUED_BOOKS);
  const [returnedBooks, setReturnedBooks] = useState(SAMPLE_RETURNED_BOOKS);
  const [members, setMembers] = useState(SAMPLE_MEMBERS);
  const [analytics, setAnalytics] = useState(SAMPLE_ANALYTICS);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      setLoading(true);

      try {
        if (activeFeature === 'book-management') {
          const data = await fetchJson(`${API_BASE_URL}/books`);
          if (!cancelled) {
            setBooks(Array.isArray(data) ? data : SAMPLE_BOOKS);
          }
          return;
        }

        if (activeFeature === 'issue-tracking') {
          const [issuedData, returnedData] = await Promise.all([
            fetchJson(`${API_BASE_URL}/issued-books`),
            fetchJson(`${API_BASE_URL}/returned-books`)
          ]);

          if (!cancelled) {
            setIssuedBooks(Array.isArray(issuedData) ? issuedData : SAMPLE_ISSUED_BOOKS);
            setReturnedBooks(Array.isArray(returnedData) ? returnedData : SAMPLE_RETURNED_BOOKS);
          }
          return;
        }

        if (activeFeature === 'member-management') {
          const data = await fetchJson(`${API_BASE_URL}/members`);
          if (!cancelled) {
            setMembers(Array.isArray(data) ? data : SAMPLE_MEMBERS);
          }
          return;
        }

        if (activeFeature === 'reports-analytics') {
          const [analyticsData, issuedData, returnedData] = await Promise.all([
            fetchJson(`${API_BASE_URL}/analytics`),
            fetchJson(`${API_BASE_URL}/issued-books`),
            fetchJson(`${API_BASE_URL}/returned-books`)
          ]);

          if (!cancelled) {
            setAnalytics(Array.isArray(analyticsData) ? analyticsData : SAMPLE_ANALYTICS);
            setIssuedBooks(Array.isArray(issuedData) ? issuedData : SAMPLE_ISSUED_BOOKS);
            setReturnedBooks(Array.isArray(returnedData) ? returnedData : SAMPLE_RETURNED_BOOKS);
          }
        }
      } catch (error) {
        console.error('Error loading feature data:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    refresh();

    return () => {
      cancelled = true;
    };
  }, [activeFeature]);

  useEffect(() => {
    if (activeFeature !== 'reports-analytics') {
      return undefined;
    }

    const intervalId = window.setInterval(async () => {
      try {
        const [analyticsData, issuedData, returnedData] = await Promise.all([
          fetchJson(`${API_BASE_URL}/analytics`),
          fetchJson(`${API_BASE_URL}/issued-books`),
          fetchJson(`${API_BASE_URL}/returned-books`)
        ]);

        setAnalytics(Array.isArray(analyticsData) ? analyticsData : SAMPLE_ANALYTICS);
        setIssuedBooks(Array.isArray(issuedData) ? issuedData : SAMPLE_ISSUED_BOOKS);
        setReturnedBooks(Array.isArray(returnedData) ? returnedData : SAMPLE_RETURNED_BOOKS);
      } catch (error) {
        console.error('Error refreshing analytics data:', error);
      }
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [activeFeature]);

  const getRadarChartData = () => {
    const source = analytics.length > 0 ? analytics : buildAnalyticsFromIssuedBooks(issuedBooks);
    const topBooks = [...source].slice(0, 6);

    const size = 520;
    const center = size / 2;
    const radius = 142;
    const ringLevels = [20, 40, 60, 80, 100];
    const maxCount = Math.max(...topBooks.map((book) => book.issueCount), 1);

    const points = topBooks.map((book, index) => {
      const angle = (-Math.PI / 2) + (index * (2 * Math.PI)) / topBooks.length;
      const valuePercent = topBooks.length > 0 ? Math.round((book.issueCount / maxCount) * 100) || 10 : 0;
      const pointRadius = (valuePercent / 100) * radius;
      const x = center + pointRadius * Math.cos(angle);
      const y = center + pointRadius * Math.sin(angle);
      const outerX = center + radius * Math.cos(angle);
      const outerY = center + radius * Math.sin(angle);
      const labelX = center + (radius + 44) * Math.cos(angle);
      const labelY = center + (radius + 44) * Math.sin(angle);
      let textAnchor = 'middle';
      if (Math.cos(angle) > 0.32) textAnchor = 'start';
      if (Math.cos(angle) < -0.32) textAnchor = 'end';
      const labelDy = Math.sin(angle) > 0.55 ? 14 : (Math.sin(angle) < -0.55 ? -8 : 4);
      return { ...book, x, y, outerX, outerY, labelX, labelY: labelY + labelDy, textAnchor, valuePercent };
    });

    const getPolygonByLevel = (level) => {
      const levelRadius = (level / 100) * radius;
      return points.map((_, index) => {
        const angle = (-Math.PI / 2) + (index * (2 * Math.PI)) / points.length;
        return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
      }).join(' ');
    };

    return {
      size, center, points,
      rings: ringLevels.map(level => ({ level, polygon: getPolygonByLevel(level) })),
      valuePolygon: points.map(p => `${p.x},${p.y}`).join(' ')
    };
  };

  const radarChartData = getRadarChartData();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    const results = books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );
    setSearchResults(results);
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIssueFormChange = (e) => {
    const { name, value } = e.target;
    setIssueFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      title: formData.bookTitle,
      author: formData.bookAuthor,
      isbn: formData.bookISBN,
      publisher: formData.bookPublisher,
      year: parseInt(formData.bookYear),
      category: formData.bookCategory,
      quantity: parseInt(formData.bookQuantity),
      description: formData.bookDescription,
      status: 'Available'
    };
    setBooks(prev => [...prev, newBook]);
    showNotification('✓ Book added successfully!', 'success');
    setFormData({ bookTitle: '', bookAuthor: '', bookISBN: '', bookPublisher: '', bookYear: new Date().getFullYear(), bookCategory: 'Computer Science', bookQuantity: 1, bookDescription: '' });
    setIsAddBookModalOpen(false);
  };

  const handleDeleteBook = (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    setBooks(prev => prev.filter(b => b.id !== bookId));
    showNotification('✓ Book deleted successfully!', 'success');
  };

  const handleIssueBook = (e) => {
    e.preventDefault();
    if (!selectedBookForIssue) return;
    if (!issueFormData.memberName || !issueFormData.studentId) {
      showNotification('✗ Please fill all required fields', 'error');
      return;
    }
    const newIssue = {
      id: Date.now(),
      title: selectedBookForIssue.title,
      member: issueFormData.memberName,
      studentId: issueFormData.studentId,
      issueDate: issueFormData.issueDate,
      dueDate: issueFormData.dueDate,
      status: 'Issued'
    };
    setIssuedBooks(prev => [...prev, newIssue]);
    setBooks(prev => prev.map(b => b.id === selectedBookForIssue.id ? { ...b, status: 'Issued' } : b));
    showNotification('✓ Book issued successfully!', 'success');
    setIssueFormData({ memberName: '', studentId: '', issueDate: new Date().toISOString().split('T')[0], dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] });
    setSelectedBookForIssue(null);
    setIsIssueBookModalOpen(false);
  };

  const handleReturnBook = (bookId) => {
    const issued = issuedBooks.find(b => b.id === bookId);
    if (!issued) return;
    const returned = { ...issued, returnDate: new Date().toISOString().split('T')[0], status: 'Returned' };
    setReturnedBooks(prev => [...prev, returned]);
    setIssuedBooks(prev => prev.filter(b => b.id !== bookId));
    setBooks(prev => prev.map(b => b.title === issued.title ? { ...b, status: 'Available' } : b));
    showNotification('✓ Book returned successfully!', 'success');
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    const userMessage = { id: Date.now(), role: 'user', text };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    setTimeout(() => {
      const reply = getBotReply(text, books, issuedBooks, returnedBooks, members);
      setChatMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }]);
      setIsChatLoading(false);
    }, 400);
  };

  const renderContent = () => {
    switch (activeFeature) {
      case 'book-management':
        return (
          <div className="feature-content">
            <div className="feature-header">
              <div className="feature-title-group">
                <span className="feature-icon-large" aria-hidden="true">📖</span>
                <div>
                  <h1>Book Management</h1>
                  <p>Add, update, and organize books effortlessly with a centralized digital system.</p>
                </div>
              </div>
              <button className="btn btn-primary add-book-btn" onClick={() => setIsAddBookModalOpen(true)}>➕ Add Book</button>
            </div>
            {books.length > 0 ? (
              <div className="books-table-container">
                <table className="books-table">
                  <thead>
                    <tr><th>Title</th><th>Author</th><th>Category</th><th>Year</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {books.map(book => (
                      <tr key={book.id}>
                        <td>📚 {book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>{book.year}</td>
                        <td><span className={`status-badge status-${book.status.toLowerCase()}`}>{book.status}</span></td>
                        <td>
                          <button className="btn-delete-small" onClick={() => handleDeleteBook(book.id)} title="Delete book">🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-state-icon" aria-hidden="true">📚</span>
                <h3>No books available</h3>
                <p>Click "Add Book" to begin building your library collection</p>
              </div>
            )}
          </div>
        );

      case 'smart-search':
        return (
          <div className="feature-content">
            <div className="feature-header">
              <div className="feature-title-group">
                <span className="feature-icon-large" aria-hidden="true">🔍</span>
                <div><h1>Smart Search</h1><p>Find books instantly by title, author, or category.</p></div>
              </div>
            </div>
            <div className="search-container">
              <div className="search-box">
                <input type="text" className="search-input" placeholder="Search by title, author, or category..." aria-label="Search books" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} />
                <button className="btn btn-primary search-btn" onClick={handleSearch} disabled={loading}>🔍 Search</button>
              </div>
              <div className="search-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Title</button>
                <button className="filter-btn">Author</button>
                <button className="filter-btn">Category</button>
              </div>
            </div>
            {searchResults.length > 0 ? (
              <div className="books-table-container">
                <table className="books-table">
                  <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {searchResults.map(book => (
                      <tr key={book.id}>
                        <td>📚 {book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td><span className={`status-badge status-${book.status.toLowerCase()}`}>{book.status}</span></td>
                        <td>
                          <button className="btn-issue" onClick={() => { setSelectedBookForIssue(book); setIsIssueBookModalOpen(true); }} title="Issue this book">📤 Issue</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-state-icon" aria-hidden="true">🔍</span>
                <h3>{searchQuery ? 'No results found' : 'Start searching'}</h3>
                <p>{searchQuery ? 'Try different keywords' : 'Enter keywords to find books in the library collection'}</p>
              </div>
            )}
          </div>
        );

      case 'issue-tracking':
        return (
          <div className="feature-content">
            <div className="feature-header">
              <div className="feature-title-group">
                <span className="feature-icon-large" aria-hidden="true">📅</span>
                <div><h1>Issue & Return Tracking</h1><p>Monitor issued books and due dates.</p></div>
              </div>
            </div>
            <div className="tracking-section">
              <div className="section-header">
                <h2 className="section-title">📤 Currently Issued Books</h2>
                <span className="badge-count">{issuedBooks.length} Books</span>
              </div>
              {issuedBooks.length > 0 ? (
                <div className="books-table-container">
                  <table className="books-table">
                    <thead><tr><th>Book Title</th><th>Member</th><th>Student ID</th><th>Issue Date</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                      {issuedBooks.map(book => (
                        <tr key={book.id}>
                          <td>📚 {book.title}</td>
                          <td>{book.member}</td>
                          <td>{book.studentId}</td>
                          <td>{book.issueDate}</td>
                          <td>{book.dueDate}</td>
                          <td><span className={`status-badge status-${book.status.toLowerCase()}`}>{book.status}</span></td>
                          <td><button className="btn-return" onClick={() => handleReturnBook(book.id)} title="Return book">↩️ Return</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-state-icon" aria-hidden="true">📤</span>
                  <h3>No issued books</h3>
                  <p>All books are currently available in the library</p>
                </div>
              )}
            </div>
            <div className="tracking-section">
              <div className="section-header">
                <h2 className="section-title">✅ Recently Returned Books</h2>
                <span className="badge-count">{returnedBooks.length} Returns</span>
              </div>
              {returnedBooks.length > 0 ? (
                <div className="books-table-container">
                  <table className="books-table">
                    <thead><tr><th>Book Title</th><th>Member</th><th>Student ID</th><th>Issue Date</th><th>Return Date</th><th>Status</th></tr></thead>
                    <tbody>
                      {returnedBooks.map(book => (
                        <tr key={book.id}>
                          <td>📚 {book.title}</td>
                          <td>{book.member}</td>
                          <td>{book.studentId}</td>
                          <td>{book.issueDate}</td>
                          <td>{book.returnDate}</td>
                          <td><span className={`status-badge status-${book.status.toLowerCase().replace(' ', '-')}`}>{book.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-state-icon" aria-hidden="true">✅</span>
                  <h3>No returns yet</h3>
                  <p>Returned books will appear here</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'member-management':
        return (
          <div className="feature-content">
            <div className="feature-header">
              <div className="feature-title-group">
                <span className="feature-icon-large" aria-hidden="true">👨‍🎓</span>
                <div><h1>Member Management</h1><p>Manage students and library users efficiently.</p></div>
              </div>
            </div>
            <div className="books-table-container">
              <table className="books-table">
                <thead><tr><th>Name</th><th>Student ID</th><th>Email</th><th>Books Issued</th><th>Status</th></tr></thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td>{member.studentId}</td>
                      <td>{member.email}</td>
                      <td>{member.booksIssued}</td>
                      <td><span className={`status-badge status-${member.status.toLowerCase()}`}>{member.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reports-analytics':
        return (
          <div className="feature-content">
            <div className="feature-header">
              <div className="feature-title-group">
                <span className="feature-icon-large" aria-hidden="true">📊</span>
                <div><h1>Reports & Analytics</h1><p>Track usage and maintain accurate records.</p></div>
              </div>
            </div>
            <div className="analytics-section">
              <div className="section-header">
                <h2 className="section-title">📈 Most Issued Books</h2>
                <span className="badge-count">Top {radarChartData.points.length} Books</span>
              </div>
              <div className="chart-container">
                {radarChartData.points.length > 0 ? (
                  <div className="radar-layout">
                    <div className="radar-chart-wrapper">
                      <svg className="radar-chart" viewBox={`0 0 ${radarChartData.size} ${radarChartData.size}`} aria-label="Most issued books radar chart">
                        {radarChartData.rings.map(ring => (
                          <polygon key={ring.level} className="radar-grid-ring" points={ring.polygon} />
                        ))}
                        {radarChartData.points.map(point => (
                          <line key={`spoke-${point.id}`} className="radar-spoke" x1={radarChartData.center} y1={radarChartData.center} x2={point.outerX} y2={point.outerY} />
                        ))}
                        <polygon className="radar-area" points={radarChartData.valuePolygon} />
                        <polyline className="radar-outline" points={`${radarChartData.valuePolygon} ${radarChartData.points[0]?.x},${radarChartData.points[0]?.y}`} />
                        {radarChartData.points.map(point => (
                          <circle key={`dot-${point.id}`} className="radar-point" cx={point.x} cy={point.y} r="6" />
                        ))}
                        {radarChartData.points.map(point => (
                          <text key={`label-${point.id}`} className="radar-axis-label" x={point.labelX} y={point.labelY} textAnchor={point.textAnchor}>
                            <tspan className="radar-axis-title" x={point.labelX}>{point.title}</tspan>
                            <tspan className="radar-axis-value" x={point.labelX} dy="22">{point.valuePercent}%</tspan>
                          </text>
                        ))}
                      </svg>
                    </div>
                    <div className="radar-book-list">
                      {radarChartData.points.map((book, index) => (
                        <div key={`book-${book.id}`} className="radar-book-item">
                          <span className="radar-book-rank">#{index + 1}</span>
                          <span className="radar-book-title">{book.title}</span>
                          <span className="radar-book-count">{book.issueCount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <span className="empty-state-icon" aria-hidden="true">📊</span>
                    <h3>No analytics data yet</h3>
                    <p>Issue some books to see analytics</p>
                  </div>
                )}
              </div>
              <div className="stats-grid">
                <div className="stat-card"><div className="stat-icon">📚</div><div className="stat-info"><div className="stat-value">{issuedBooks.length + returnedBooks.length}</div><div className="stat-label">Total Issues</div></div></div>
                <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-info"><div className="stat-value">{returnedBooks.length}</div><div className="stat-label">Returned</div></div></div>
                <div className="stat-card"><div className="stat-icon">📤</div><div className="stat-info"><div className="stat-value">{issuedBooks.length}</div><div className="stat-label">Currently Issued</div></div></div>
                <div className="stat-card"><div className="stat-icon">⚠️</div><div className="stat-info"><div className="stat-value">{issuedBooks.filter(b => b.status === 'Overdue').length}</div><div className="stat-label">Overdue</div></div></div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-page">
      <nav className="main-navbar">
        <div className="navbar-brand">
          <span className="brand-icon" aria-hidden="true">📚</span>
          <span className="brand-text">Library Management System</span>
        </div>
        <ul className="navbar-links">
          {navigationFeatures.map(feature => (
            <li key={feature.id}>
              <button className={`nav-link ${activeFeature === feature.id ? 'active' : ''}`} onClick={() => setActiveFeature(feature.id)} aria-current={activeFeature === feature.id ? 'page' : undefined}>
                <span className="nav-icon" aria-hidden="true">{feature.icon}</span>
                <span className="nav-text">{feature.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <button className="btn-back-navbar" onClick={onBack} title="Go back">← Back</button>
      </nav>

      <main className="main-content container">{renderContent()}</main>

      <div className="floating-chat-wrapper">
        {isChatOpen && (
          <div className="floating-chat-panel" role="dialog" aria-label="AI chat panel">
            <div className="floating-chat-header">
              <div className="floating-chat-title">🤖 AI Assistant</div>
              <button className="floating-chat-close" onClick={() => setIsChatOpen(false)} aria-label="Close chat">✕</button>
            </div>
            <div className="floating-chat-messages">
              {chatMessages.map(message => (
                <div key={message.id} className={`chat-message ${message.role === 'user' ? 'chat-message-user' : 'chat-message-bot'}`} style={{ whiteSpace: 'pre-line' }}>
                  {message.text}
                </div>
              ))}
              {isChatLoading && <div className="chat-message chat-message-bot">Typing...</div>}
              <div ref={chatEndRef} />
            </div>
            <form className="floating-chat-input-row" onSubmit={handleSendChatMessage}>
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask me anything..." aria-label="Chat message" disabled={isChatLoading} />
              <button type="submit" className="floating-chat-send" disabled={isChatLoading}>Send</button>
            </form>
          </div>
        )}
        <button className={`floating-chat-button ${isChatOpen ? 'active' : ''}`} onClick={() => setIsChatOpen(prev => !prev)} aria-label="Open AI chat" title="Open AI chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chat-bot-icon">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" /><path d="M20 14h2" />
            <path className="chat-bot-eye chat-bot-eye-right" d="M15 13v2" />
            <path className="chat-bot-eye chat-bot-eye-left" d="M9 13v2" />
          </svg>
        </button>
      </div>

      {notification.show && (
        <div className={`notification notification-${notification.type}`}>{notification.message}</div>
      )}

      {isAddBookModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddBookModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📖 Add New Book</h2>
              <button className="modal-close-btn" onClick={() => setIsAddBookModalOpen(false)}>✕</button>
            </div>
            <form className="add-book-form" onSubmit={handleAddBook}>
              <div className="form-group">
                <label htmlFor="bookTitle">Book Title *</label>
                <input type="text" id="bookTitle" name="bookTitle" placeholder="Enter book title" value={formData.bookTitle} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="bookAuthor">Author *</label>
                <input type="text" id="bookAuthor" name="bookAuthor" placeholder="Enter author name" value={formData.bookAuthor} onChange={handleFormChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bookISBN">ISBN</label>
                  <input type="text" id="bookISBN" name="bookISBN" placeholder="Enter ISBN" value={formData.bookISBN} onChange={handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="bookPublisher">Publisher</label>
                  <input type="text" id="bookPublisher" name="bookPublisher" placeholder="Enter publisher" value={formData.bookPublisher} onChange={handleFormChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bookYear">Publication Year</label>
                  <input type="number" id="bookYear" name="bookYear" placeholder="2024" min="1900" max="2026" value={formData.bookYear} onChange={handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="bookCategory">Category</label>
                  <select id="bookCategory" name="bookCategory" value={formData.bookCategory} onChange={handleFormChange}>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Literature">Literature</option>
                    <option value="History">History</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bookQuantity">Number of Copies *</label>
                <input type="number" id="bookQuantity" name="bookQuantity" placeholder="1" min="1" value={formData.bookQuantity} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="bookDescription">Description</label>
                <textarea id="bookDescription" name="bookDescription" placeholder="Enter book description (optional)" rows="3" value={formData.bookDescription} onChange={handleFormChange}></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddBookModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">➕ Add Book</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isIssueBookModalOpen && selectedBookForIssue && (
        <div className="modal-overlay" onClick={() => setIsIssueBookModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📤 Issue Book: {selectedBookForIssue.title}</h2>
              <button className="modal-close-btn" onClick={() => setIsIssueBookModalOpen(false)}>✕</button>
            </div>
            <form className="add-book-form" onSubmit={handleIssueBook}>
              <div className="form-group">
                <label htmlFor="memberName">Member Name *</label>
                <input type="text" id="memberName" name="memberName" placeholder="Enter member name" value={issueFormData.memberName} onChange={handleIssueFormChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="studentId">Student ID *</label>
                <input type="text" id="studentId" name="studentId" placeholder="Enter student ID" value={issueFormData.studentId} onChange={handleIssueFormChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="issueDate">Issue Date</label>
                  <input type="date" id="issueDate" name="issueDate" value={issueFormData.issueDate} onChange={handleIssueFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input type="date" id="dueDate" name="dueDate" value={issueFormData.dueDate} onChange={handleIssueFormChange} />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsIssueBookModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">📤 Issue Book</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;

-- Library Management System Database Schema
-- SQLite3

-- Books Tablea
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT,
    publisher TEXT,
    year INTEGER DEFAULT 2024,
    category TEXT DEFAULT 'General',
    quantity INTEGER DEFAULT 1,
    description TEXT,
    status TEXT DEFAULT 'Available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Issued Books Table
CREATE TABLE IF NOT EXISTS issued_books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    member TEXT NOT NULL,
    student_id TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    due_date TEXT NOT NULL,
    status TEXT DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Returned Books Table
CREATE TABLE IF NOT EXISTS returned_books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    member TEXT NOT NULL,
    student_id TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    return_date TEXT NOT NULL,
    status TEXT DEFAULT 'On Time',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Members Table
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    student_id TEXT UNIQUE NOT NULL,
    email TEXT,
    phone TEXT,
    membership_date TEXT NOT NULL,
    books_issued INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO books (title, author, isbn, publisher, year, category, quantity, description, status) 
VALUES 
    ('DBMS', 'Navathe', '978-0132145374', 'Pearson', 2015, 'Computer Science', 5, 'Database Management Systems', 'Available'),
    ('Data Structures', 'Tanenbaum', '978-0133485967', 'McGraw-Hill', 2016, 'Computer Science', 3, 'Data Structures and Algorithms', 'Available'),
    ('Operating Systems', 'Galvin', '978-1118063330', 'Wiley', 2018, 'Computer Science', 4, 'Operating System Concepts', 'Issued'),
    ('Computer Networks', 'Forouzan', '978-0073523224', 'McGraw-Hill', 2017, 'Computer Science', 6, 'Data Communications and Networking', 'Available'),
    ('Clean Code', 'Robert C. Martin', '978-0132350884', 'Prentice Hall', 2008, 'Software Engineering', 4, 'A Handbook of Agile Software Craftsmanship', 'Available');

INSERT INTO issued_books (title, member, student_id, issue_date, due_date, status) 
VALUES 
    ('Operating Systems', 'Rahul Kumar', '23BCS10289', '2026-02-15', '2026-03-01', 'Active'),
    ('Computer Networks', 'Priya Sharma', '23BCS10234', '2026-02-18', '2026-03-04', 'Active'),
    ('Software Engineering', 'Amit Singh', '23BCS10156', '2026-02-10', '2026-02-24', 'Overdue');

INSERT INTO returned_books (title, member, student_id, issue_date, return_date, status) 
VALUES 
    ('DBMS', 'Sneha Gupta', '23BCS10178', '2026-01-20', '2026-02-05', 'On Time'),
    ('Data Structures', 'Vikram Patel', '23BCS10267', '2026-01-25', '2026-02-12', 'On Time'),
    ('Algorithm Design', 'Neha Reddy', '23BCS10245', '2026-01-15', '2026-02-08', 'Late');

INSERT INTO members (name, student_id, email, phone, membership_date, books_issued, status) 
VALUES 
    ('Abhishek Kumar', '23BCS10289', 'abhishek.kumar@example.com', '9876543210', '2023-08-15', 1, 'Active'),
    ('Sana', '23BCS10113', 'sana@example.com', '9876543211', '2023-08-16', 0, 'Active'),
    ('Abhishek Singh', '23BCS12427', 'abhishek.singh@example.com', '9876543212', '2023-08-17', 0, 'Active');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_issued_books_member ON issued_books(member);
CREATE INDEX IF NOT EXISTS idx_returned_books_member ON returned_books(member);
CREATE INDEX IF NOT EXISTS idx_members_student_id ON members(student_id);

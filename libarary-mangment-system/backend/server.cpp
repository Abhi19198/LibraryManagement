#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <sstream>
#include <algorithm>
#include <ctime>
#include <iomanip>
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")

using namespace std;

// JSON helper functions
string escapeJson(const string& str) {
    string result;
    for (char c : str) {
        switch (c) {
            case '"': result += "\\\""; break;
            case '\\': result += "\\\\"; break;
            case '\n': result += "\\n"; break;
            case '\r': result += "\\r"; break;
            case '\t': result += "\\t"; break;
            default: result += c;
        }
    }
    return result;
}

// Data structures
struct Book {
    int id;
    string title;
    string author;
    string isbn;
    string publisher;
    int year;
    string category;
    int quantity;
    string description;
    string status;
};

struct IssuedBook {
    int id;
    string title;
    string member;
    string studentId;
    string issueDate;
    string dueDate;
    string status;
};

struct ReturnedBook {
    int id;
    string title;
    string member;
    string studentId;
    string issueDate;
    string returnDate;
    string status;
};

struct Member {
    int id;
    string name;
    string studentId;
    string email;
    string phone;
    string membershipDate;
    int booksIssued;
    string status;
};

// In-memory database
vector<Book> books;
vector<IssuedBook> issuedBooks;
vector<ReturnedBook> returnedBooks;
vector<Member> members;
map<string, int> issuedAnalyticsCounts;
vector<string> issuedAnalyticsOrder;
int nextBookId = 6;
int nextIssuedId = 4;
int nextReturnedId = 4;
int nextMemberId = 4;

void initializeData() {
    // Initialize books
    books = {
        {1, "DBMS", "Navathe", "978-0132145374", "Pearson", 2015, "Computer Science", 5, "Database Management Systems", "Available"},
        {2, "Data Structures", "Tanenbaum", "978-0133485967", "McGraw-Hill", 2016, "Computer Science", 3, "Data Structures and Algorithms", "Available"},
        {3, "Operating Systems", "Galvin", "978-1118063330", "Wiley", 2018, "Computer Science", 4, "Operating System Concepts", "Issued"},
        {4, "Computer Networks", "Forouzan", "978-0073523224", "McGraw-Hill", 2017, "Computer Science", 6, "Data Communications and Networking", "Available"},
        {5, "Clean Code", "Robert C. Martin", "978-0132350884", "Prentice Hall", 2008, "Software Engineering", 4, "A Handbook of Agile Software Craftsmanship", "Available"}
    };

    // Initialize issued books
    issuedBooks = {
        {1, "Operating Systems", "Rahul Kumar", "23BCS10289", "2026-02-15", "2026-03-01", "Active"},
        {2, "Computer Networks", "Priya Sharma", "23BCS10234", "2026-02-18", "2026-03-04", "Active"},
        {3, "Software Engineering", "Amit Singh", "23BCS10156", "2026-02-10", "2026-02-24", "Overdue"}
    };

    // Initialize returned books
    returnedBooks = {
        {1, "DBMS", "Sneha Gupta", "23BCS10178", "2026-01-20", "2026-02-05", "On Time"},
        {2, "Data Structures", "Vikram Patel", "23BCS10267", "2026-01-25", "2026-02-12", "On Time"},
        {3, "Algorithm Design", "Neha Reddy", "23BCS10245", "2026-01-15", "2026-02-08", "Late"}
    };

    // Initialize members
    members = {
        {1, "Abhishek Kumar", "23BCS10289", "abhishek.kumar@example.com", "9876543210", "2023-08-15", 1, "Active"},
        {2, "Sana", "23BCS10113", "sana@example.com", "9876543211", "2023-08-16", 0, "Active"},
        {3, "Abhishek Singh", "23BCS12427", "abhishek.singh@example.com", "9876543212", "2023-08-17", 0, "Active"}
    };

    // Initialize issued books analytics default dataset
    issuedAnalyticsOrder = {
        "DBMS",
        "Algorithm Design",
        "Computer Networks",
        "Data Structures",
        "Operating Systems",
        "Software Engineering"
    };

    issuedAnalyticsCounts = {
        {"DBMS", 2},
        {"Algorithm Design", 3},
        {"Computer Networks", 1},
        {"Data Structures", 5},
        {"Operating Systems", 1},
        {"Software Engineering", 4}
    };
}

string getCurrentDate() {
    time_t now = time(0);
    tm* ltm = localtime(&now);
    stringstream ss;
    ss << (1900 + ltm->tm_year) << "-" 
       << setfill('0') << setw(2) << (1 + ltm->tm_mon) << "-" 
       << setfill('0') << setw(2) << ltm->tm_mday;
    return ss.str();
}

string booksToJson() {
    stringstream json;
    json << "[";
    for (size_t i = 0; i < books.size(); i++) {
        if (i > 0) json << ",";
        json << "{\"id\":" << books[i].id
             << ",\"title\":\"" << escapeJson(books[i].title) << "\""
             << ",\"author\":\"" << escapeJson(books[i].author) << "\""
             << ",\"isbn\":\"" << escapeJson(books[i].isbn) << "\""
             << ",\"publisher\":\"" << escapeJson(books[i].publisher) << "\""
             << ",\"year\":" << books[i].year
             << ",\"category\":\"" << escapeJson(books[i].category) << "\""
             << ",\"quantity\":" << books[i].quantity
             << ",\"description\":\"" << escapeJson(books[i].description) << "\""
             << ",\"status\":\"" << escapeJson(books[i].status) << "\"}";
    }
    json << "]";
    return json.str();
}

string issuedBooksToJson() {
    stringstream json;
    json << "[";
    for (size_t i = 0; i < issuedBooks.size(); i++) {
        if (i > 0) json << ",";
        json << "{\"id\":" << issuedBooks[i].id
             << ",\"title\":\"" << escapeJson(issuedBooks[i].title) << "\""
             << ",\"member\":\"" << escapeJson(issuedBooks[i].member) << "\""
             << ",\"studentId\":\"" << escapeJson(issuedBooks[i].studentId) << "\""
             << ",\"issueDate\":\"" << issuedBooks[i].issueDate << "\""
             << ",\"dueDate\":\"" << issuedBooks[i].dueDate << "\""
             << ",\"status\":\"" << escapeJson(issuedBooks[i].status) << "\"}";
    }
    json << "]";
    return json.str();
}

string returnedBooksToJson() {
    stringstream json;
    json << "[";
    for (size_t i = 0; i < returnedBooks.size(); i++) {
        if (i > 0) json << ",";
        json << "{\"id\":" << returnedBooks[i].id
             << ",\"title\":\"" << escapeJson(returnedBooks[i].title) << "\""
             << ",\"member\":\"" << escapeJson(returnedBooks[i].member) << "\""
             << ",\"studentId\":\"" << escapeJson(returnedBooks[i].studentId) << "\""
             << ",\"issueDate\":\"" << returnedBooks[i].issueDate << "\""
             << ",\"returnDate\":\"" << returnedBooks[i].returnDate << "\""
             << ",\"status\":\"" << escapeJson(returnedBooks[i].status) << "\"}";
    }
    json << "]";
    return json.str();
}

string membersToJson() {
    stringstream json;
    json << "[";
    for (size_t i = 0; i < members.size(); i++) {
        if (i > 0) json << ",";
        json << "{\"id\":" << members[i].id
             << ",\"name\":\"" << escapeJson(members[i].name) << "\""
             << ",\"studentId\":\"" << escapeJson(members[i].studentId) << "\""
             << ",\"email\":\"" << escapeJson(members[i].email) << "\""
             << ",\"phone\":\"" << escapeJson(members[i].phone) << "\""
             << ",\"membershipDate\":\"" << members[i].membershipDate << "\""
             << ",\"booksIssued\":" << members[i].booksIssued
             << ",\"status\":\"" << escapeJson(members[i].status) << "\"}";
    }
    json << "]";
    return json.str();
}

string analyticsToJson() {
    vector<pair<string, int>> chartBooks;
    for (const auto& title : issuedAnalyticsOrder) {
        auto it = issuedAnalyticsCounts.find(title);
        if (it != issuedAnalyticsCounts.end()) {
            chartBooks.push_back({ title, it->second });
        }
    }

    // Include any dynamically added titles not in initial order
    for (const auto& entry : issuedAnalyticsCounts) {
        if (find(issuedAnalyticsOrder.begin(), issuedAnalyticsOrder.end(), entry.first) == issuedAnalyticsOrder.end()) {
            chartBooks.push_back(entry);
        }
    }

    int maxCount = 1;
    for (const auto& entry : chartBooks) {
        maxCount = max(maxCount, entry.second);
    }
    
    stringstream json;
    json << "[";
    for (size_t i = 0; i < min(chartBooks.size(), size_t(8)); i++) {
        if (i > 0) json << ",";
        int percentage = (chartBooks[i].second * 100) / maxCount;
        json << "{\"id\":" << (i + 1)
             << ",\"title\":\"" << escapeJson(chartBooks[i].first) << "\""
             << ",\"issueCount\":" << chartBooks[i].second
             << ",\"percentage\":" << percentage << "}";
    }
    json << "]";
    return json.str();
}

bool addBook(const string& title, const string& author, const string& isbn, 
             const string& publisher, int year, const string& category, 
             int quantity, const string& description) {
    Book newBook;
    newBook.id = nextBookId++;
    newBook.title = title;
    newBook.author = author;
    newBook.isbn = isbn;
    newBook.publisher = publisher;
    newBook.year = year;
    newBook.category = category;
    newBook.quantity = quantity;
    newBook.description = description;
    newBook.status = "Available";
    
    books.push_back(newBook);
    return true;
}

bool deleteBook(int bookId) {
    for (size_t i = 0; i < books.size(); i++) {
        if (books[i].id == bookId) {
            books.erase(books.begin() + i);
            return true;
        }
    }
    return false;
}

bool returnBook(int bookId) {
    // Find the issued book
    for (size_t i = 0; i < issuedBooks.size(); i++) {
        if (issuedBooks[i].id == bookId) {
            // Create a returned book entry
            ReturnedBook returnedBook;
            returnedBook.id = issuedBooks[i].id;
            returnedBook.title = issuedBooks[i].title;
            returnedBook.member = issuedBooks[i].member;
            returnedBook.studentId = issuedBooks[i].studentId;
            returnedBook.issueDate = issuedBooks[i].issueDate;
            returnedBook.returnDate = getCurrentDate();
            returnedBook.status = "On Time";
            
            // Add to returned books
            returnedBooks.push_back(returnedBook);
            
            // Remove from issued books
            issuedBooks.erase(issuedBooks.begin() + i);
            
            return true;
        }
    }
    return false;
}

bool addIssuedBook(int bookId, const string& bookTitle, const string& memberName, 
                   const string& studentId, const string& issueDate, const string& dueDate) {
    // Find next ID
    int nextId = 1;
    for (const auto& book : issuedBooks) {
        if (book.id >= nextId) {
            nextId = book.id + 1;
        }
    }
    
    // Create new issued book
    IssuedBook newIssue;
    newIssue.id = nextId;
    newIssue.title = bookTitle;
    newIssue.member = memberName;
    newIssue.studentId = studentId;
    newIssue.issueDate = issueDate;
    newIssue.dueDate = dueDate;
    newIssue.status = "Active";
    
    issuedBooks.push_back(newIssue);

    if (issuedAnalyticsCounts.find(bookTitle) == issuedAnalyticsCounts.end()) {
        issuedAnalyticsOrder.push_back(bookTitle);
        issuedAnalyticsCounts[bookTitle] = 0;
    }
    issuedAnalyticsCounts[bookTitle]++;

    return true;
}

string searchBooks(const string& query) {
    stringstream json;
    json << "[";
    
    bool first = true;
    for (const auto& book : books) {
        string lowerQuery = query;
        transform(lowerQuery.begin(), lowerQuery.end(), lowerQuery.begin(), ::tolower);
        string lowerTitle = book.title;
        transform(lowerTitle.begin(), lowerTitle.end(), lowerTitle.begin(), ::tolower);
        string lowerAuthor = book.author;
        transform(lowerAuthor.begin(), lowerAuthor.end(), lowerAuthor.begin(), ::tolower);
        
        if (lowerTitle.find(lowerQuery) != string::npos || 
            lowerAuthor.find(lowerQuery) != string::npos) {
            if (!first) json << ",";
            first = false;
            json << "{\"id\":" << book.id
                 << ",\"title\":\"" << escapeJson(book.title) << "\""
                 << ",\"author\":\"" << escapeJson(book.author) << "\""
                 << ",\"status\":\"" << escapeJson(book.status) << "\"}";
        }
    }
    
    json << "]";
    return json.str();
}

string handleRequest(const string& method, const string& path, const string& body) {
    stringstream response;
    
    // CORS headers
    string corsHeaders = "HTTP/1.1 200 OK\r\n"
                        "Access-Control-Allow-Origin: *\r\n"
                        "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n"
                        "Access-Control-Allow-Headers: Content-Type\r\n"
                        "Content-Type: application/json\r\n\r\n";
    
    if (method == "OPTIONS") {
        return corsHeaders;
    }
    
    // GET /api/books
    if (method == "GET" && path == "/api/books") {
        return corsHeaders + booksToJson();
    }
    
    // POST /api/books
    if (method == "POST" && path == "/api/books") {
        // Simple parsing - in production, use a JSON library
        string title = "New Book", author = "Unknown", isbn = "", publisher = "";
        int year = 2024, quantity = 1;
        string category = "General", description = "";
        
        // Extract JSON values
        auto extractValue = [&body](const string& key) -> string {
            size_t pos = body.find("\"" + key + "\":\"");
            if (pos == string::npos) return "";
            pos += key.length() + 4;
            size_t endPos = body.find("\"", pos);
            return body.substr(pos, endPos - pos);
        };
        
        title = extractValue("title");
        author = extractValue("author");
        isbn = extractValue("isbn");
        publisher = extractValue("publisher");
        category = extractValue("category");
        description = extractValue("description");
        
        if (addBook(title, author, isbn, publisher, year, category, quantity, description)) {
            return corsHeaders + "{\"success\":true,\"message\":\"Book added successfully\"}";
        }
        return corsHeaders + "{\"success\":false,\"message\":\"Failed to add book\"}";
    }
    
    // DELETE /api/books/:id
    if (method == "DELETE" && path.find("/api/books/") == 0) {
        string idStr = path.substr(11);
        int bookId = stoi(idStr);
        
        if (deleteBook(bookId)) {
            return corsHeaders + "{\"success\":true,\"message\":\"Book deleted successfully\"}";
        }
        return corsHeaders + "{\"success\":false,\"message\":\"Failed to delete book\"}";
    }
    
    // GET /api/issued-books
    if (method == "GET" && path == "/api/issued-books") {
        return corsHeaders + issuedBooksToJson();
    }
    
    // GET /api/returned-books
    if (method == "GET" && path == "/api/returned-books") {
        return corsHeaders + returnedBooksToJson();
    }
    
    // GET /api/members
    if (method == "GET" && path == "/api/members") {
        return corsHeaders + membersToJson();
    }
    
    // GET /api/analytics
    if (method == "GET" && path == "/api/analytics") {
        return corsHeaders + analyticsToJson();
    }
    
    // POST /api/return-book
    if (method == "POST" && path == "/api/return-book") {
        // Extract id from JSON body
        size_t idPos = body.find("\"id\":");
        int bookId = 0;
        if (idPos != string::npos) {
            idPos = body.find(":", idPos) + 1;
            size_t endPos = body.find("}", idPos);
            string idStr = body.substr(idPos, endPos - idPos);
            // Remove whitespace
            idStr.erase(remove_if(idStr.begin(), idStr.end(), ::isspace), idStr.end());
            bookId = stoi(idStr);
        }
        
        if (returnBook(bookId)) {
            return corsHeaders + "{\"success\":true,\"message\":\"Book returned successfully\"}";
        }
        return corsHeaders + "{\"success\":false,\"message\":\"Failed to return book\"}";
    }
    
    // POST /api/issue-book
    if (method == "POST" && path == "/api/issue-book") {
        // Simple JSON parsing
        auto extractValue = [&body](const string& key) -> string {
            size_t pos = body.find("\"" + key + "\":\"");
            if (pos == string::npos) return "";
            pos += key.length() + 4;
            size_t endPos = body.find("\"", pos);
            return body.substr(pos, endPos - pos);
        };
        
        auto extractIntValue = [&body](const string& key) -> int {
            size_t pos = body.find("\"" + key + "\":");
            if (pos == string::npos) return 0;
            pos = body.find(":", pos) + 1;
            size_t endPos = body.find(",", pos);
            if (endPos == string::npos) endPos = body.find("}", pos);
            string valStr = body.substr(pos, endPos - pos);
            valStr.erase(remove_if(valStr.begin(), valStr.end(), ::isspace), valStr.end());
            try { return stoi(valStr); } catch (...) { return 0; }
        };
        
        int bookId = extractIntValue("bookId");
        string bookTitle = extractValue("bookTitle");
        string memberName = extractValue("memberName");
        string studentId = extractValue("studentId");
        string issueDate = extractValue("issueDate");
        string dueDate = extractValue("dueDate");
        
        if (addIssuedBook(bookId, bookTitle, memberName, studentId, issueDate, dueDate)) {
            return corsHeaders + "{\"success\":true,\"message\":\"Book issued successfully\"}";
        }
        return corsHeaders + "{\"success\":false,\"message\":\"Failed to issue book\"}";
    }
    
    // GET /api/search?q=query
    if (method == "GET" && path.find("/api/search") == 0) {
        // Extract query parameter
        size_t qPos = path.find("q=");
        string query = "";
        if (qPos != string::npos) {
            query = path.substr(qPos + 2);
        }
        
        return corsHeaders + searchBooks(query);
    }
    
    return corsHeaders + "{\"error\":\"Not found\"}";
}

int main() {
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
    
    initializeData();
    
    SOCKET serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket == INVALID_SOCKET) {
        cerr << "Failed to create socket" << endl;
        return 1;
    }
    
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    serverAddr.sin_port = htons(3001);
    
    if (bind(serverSocket, (sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        cerr << "Bind failed" << endl;
        closesocket(serverSocket);
        return 1;
    }
    
    if (listen(serverSocket, 10) == SOCKET_ERROR) {
        cerr << "Listen failed" << endl;
        closesocket(serverSocket);
        return 1;
    }
    
    cout << "==========================================" << endl;
    cout << "🚀 C++ Backend Server running on http://localhost:3001" << endl;
    cout << "📚 Library Management System API" << endl;
    cout << "✓ In-memory data storage (session only)" << endl;
    cout << "==========================================" << endl << endl;
    
    while (true) {
        sockaddr_in clientAddr;
        int clientAddrSize = sizeof(clientAddr);
        SOCKET clientSocket = accept(serverSocket, (sockaddr*)&clientAddr, &clientAddrSize);
        
        if (clientSocket == INVALID_SOCKET) {
            continue;
        }
        
        char buffer[4096] = {0};
        recv(clientSocket, buffer, sizeof(buffer), 0);
        
        string request(buffer);
        stringstream ss(request);
        string method, path, version;
        ss >> method >> path >> version;
        
        // Extract body if present
        string body;
        size_t bodyPos = request.find("\r\n\r\n");
        if (bodyPos != string::npos) {
            body = request.substr(bodyPos + 4);
        }
        
        cout << method << " " << path;
        if (!body.empty()) cout << " [Body: " << body.length() << " chars]";
        cout << endl;
        
        string response = handleRequest(method, path, body);
        send(clientSocket, response.c_str(), response.length(), 0);
        
        closesocket(clientSocket);
    }
    
    closesocket(serverSocket);
    WSACleanup();
    return 0;
}

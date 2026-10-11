# Personal Item Lending & Return Management System

## 1. Project Overview

The **Personal Item Lending & Return Management System** is a React-based web application designed to manage personal items lent to or borrowed from other people. It helps users organize items, track lending and borrowing transactions, record returns, and monitor upcoming or overdue return dates.

The application provides a centralized interface for managing personal item transactions and tracking their status.

## 2. Problem Statement

People often lend personal belongings to friends, family members, or colleagues and may forget who borrowed an item or when it should be returned. Managing these transactions manually can lead to confusion, missed return dates, and difficulty tracking item availability.

This project aims to provide a simple web application to organize personal items, maintain lending and borrowing records, and monitor pending returns.

## 3. Objectives

- Maintain a record of personal items.
- Track items lent to and borrowed from others.
- Record return transactions and their status.
- Monitor upcoming and overdue return dates.
- Provide a dashboard for viewing lending activity.
- Store application data locally in the browser.

## 4. Features

### Dashboard
- View a summary of item and transaction information.
- Monitor lending and borrowing activity.

### Item Management
- View and manage personal items.
- Maintain item information and availability.

### Lending and Borrowing
- Record items lent to other people.
- Record items borrowed from others.
- Track transaction details and expected return dates.

### Return Management
- Record item returns.
- Monitor pending and completed returns.

### Reminders
- Review upcoming return dates.
- Identify overdue items that require attention.

## 5. Technology Stack

- **Frontend:** React.js
- **Programming Language:** JavaScript
- **UI Structure:** JSX
- **Styling:** CSS3
- **Build Tool:** Vite
- **Data Storage:** Browser Local Storage
- **Version Control:** Git and GitHub

## 6. Project Structure

```text
personal-item-lending-management/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Items.jsx
│   │   ├── LendBorrow.jsx
│   │   ├── Reminders.jsx
│   │   └── Returns.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── Register.jsx
│   ├── index.css
│   ├── main.jsx
│   └── student.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 7. Installation and Setup

### Prerequisites

Install the following tools before running the project:

- Node.js
- npm
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/sailikitha248-del/Personal-_item_lending_frontend_.git
```

### Step 2: Navigate to the Project Directory

```bash
cd Personal-_item_lending_frontend_
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open the Application

Open the localhost URL displayed in the terminal, usually:

```text
http://localhost:5173/
```

## 8. Running a Production Build

To build the application for production, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

The generated production files are stored in the `dist/` directory.

## 9. Screenshots

Screenshots of the application interface will be added here.

### Dashboard

![alt text](image.png)

### Item Management
![alt text](image-1.png)

### Lending and Borrowing

![alt text](image-2.png)
### Returns


### Reminders

![alt text](image-3.png)

## 10. Data Storage

The current frontend uses browser Local Storage to retain application data between browser sessions.

Data is stored locally in the browser. The current implementation does not synchronize information with a remote database or backend server.

## 11. Limitations

- Application data is stored locally in the browser.
- Data is not automatically synchronized across devices or browsers.
- A backend server and database have not yet been integrated.
- Authentication and multi-user access are not currently part of the implemented frontend unless added separately.

## 12. Future Enhancements

- Develop a backend using Node.js and Express.js.
- Integrate a MySQL database for persistent storage.
- Add user authentication and authorization.
- Implement backend APIs for items and transactions.
- Improve notification and reminder functionality.
- Deploy the application for online access.

## 13. Learning Outcomes

This project provides practical experience with:

- Building user interfaces using React.
- Organizing applications into reusable components.
- Managing application data using JavaScript.
- Styling interfaces with CSS.
- Using Local Storage for browser-side persistence.
- Managing source code with Git and GitHub.
- Running and building applications with Vite.

## 14. Project Status

**Current stage:** Frontend development and testing.

Backend and database integration are planned as future enhancements.

## 15. License

No license has been specified for this project yet.
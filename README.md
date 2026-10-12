# Personal Item Lending & Return Management System

A React-based web application to manage personal items, track lending and borrowing transactions, record returns, and monitor upcoming or overdue return dates.

## Features

- Dashboard for viewing item and transaction summaries
- Add and manage personal items
- Record lending and borrowing transactions
- Track active and returned transactions
- Record item returns
- Monitor upcoming and overdue return dates
- Store application data in a MySQL database

## Technology Stack

- **Frontend:** React.js, JavaScript, Vite, HTML, CSS
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Database:** MySQL
- **API:** REST API

## Project Structure

- `src/` — React frontend source code
- `src/pages/` — Dashboard, Items, Lend/Borrow, Reminders, and Returns pages
- `backend/personal_item_lending/` — Spring Boot backend
- `README.md` — Project documentation

## Prerequisites

- Node.js and npm
- Java Development Kit (JDK)
- MySQL Server

## Run the Application

### 1. Configure MySQL

Create the database:

```sql
CREATE DATABASE personal_item_lending;
```

Configure the database connection in the backend's `application.properties` file. Set the `DB_PASSWORD` environment variable to your MySQL password.

### 2. Start the Backend

Open a terminal and navigate to:

```bash
cd backend/personal_item_lending
```

Run on Windows:

```cmd
mvnw.cmd spring-boot:run
```

Backend URL: `http://localhost:8080`

### 3. Start the Frontend

Open a second terminal in the main project directory:

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/items` | Retrieve items |
| POST | `/api/items` | Add an item |
| GET | `/api/transactions` | Retrieve transactions |
| POST | `/api/transactions` | Create a transaction |
| GET | `/api/returns` | Retrieve return records |
| POST | `/api/returns` | Record a return |
| GET | `/api/dashboard` | Retrieve dashboard statistics |

## Future Enhancements

- Search and filtering
- User authentication
- Automated return reminders
- Improved reporting and transaction history

## Conclusion

This application provides a centralized way to organize personal items and manage lending, borrowing, and returns through a React frontend, Spring Boot backend, and MySQL database.
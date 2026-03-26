# QuizMaster - Online Quiz Application 🚀

A modern, full-stack **Online Quiz Application** built with **React (Vite)** on the frontend and **Spring Boot (Java)** on the backend. This platform allows users to take quizzes, review their performance dynamically, and features a comprehensive Admin Dashboard to manage users, create quizzes, and track platform-wide attempt statistics.

![Full Stack Application](https://img.shields.io/badge/Full_Stack-Project-blueviolet)
![React](https://img.shields.io/badge/Frontend-React_Vite-61DAFB?logo=react&logoColor=black)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-6DB33F?logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)

---

## ✨ Features
- **User Authentication**: Secure JWT-based Login & Registration system.
- **Interactive Quizzes**: Dynamic quiz taking interface with timer functionality.
- **Score Results visually**: Beautifully animated result pages displaying Pie Charts of your performance (Correct, Wrong, Skipped answers), detailed question reviews, and dynamic percentage markings.
- **Admin Dashboard**:
  - Global real-time attempt statistics.
  - User management (View roles, delete accounts).
  - Track every quiz attempt by any user on the platform.
  - Create and edit new quizzes effortlessly.

---

## 🛠️ Technology Stack
- **Frontend**: React (Vite), React Router DOM, Axios, Chart.js, Lucide Icons, Pure CSS (No external UI libraries like Tailwind/Bootstrap were used).
- **Backend**: Java, Spring Boot 3.x, Spring Security (JWT), Spring Data JPA.
- **Database**: MySQL.

---

## 🚀 Getting Started

Follow these step-by-step instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18+)
- **Java JDK** (v17+)
- **Maven**
- **MySQL Server** (Running on port `3306`)

### 1️⃣ Database Setup
Create the MySQL database before running the backend application:
```sql
CREATE DATABASE online_quiz_db;
```
*(The backend is configured to run on `root` username with no password by default. If your local MySQL setup has a password, update the `backend/src/main/resources/application.properties` file with your credentials).*

### 2️⃣ Backend Setup (Spring Boot)
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Build and run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   *The backend server will start locally on `http://localhost:8080`.*

### 3️⃣ Frontend Setup (React/Vite)
1. Open a **new, separate** terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the necessary Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend application will start locally. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).*

---

## 🔐 Default Admin Account
When the backend runs for the very first time, it will automatically populate your database with an initial `admin` account so you can access the Admin Dashboard immediately.
- **Username:** `admin`
- **Password:** `admin123`

*(Log in with these credentials to access `/admin` and start creating quizzes!)*

---

## 📜 License
This project is open-source and free to use.

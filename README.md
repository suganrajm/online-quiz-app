# QuizMaster - Online Quiz Application 🚀

A modern, full-stack **Online Quiz Application** built with **React (Vite)** on the frontend and **Spring Boot (Java)** on the backend. This platform allows users to take quizzes, review their performance dynamically, and features a comprehensive Admin Dashboard to manage users, create quizzes, and track platform-wide attempt statistics.

![Full Stack Application](https://img.shields.io/badge/Full_Stack-Project-blueviolet)
![React](https://img.shields.io/badge/Frontend-React_Vite-61DAFB?logo=react&logoColor=black)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-6DB33F?logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)


---
## 🖼️Sample Screenshots
<img width="1919" height="1079" alt="Screenshot 2026-03-26 123942" src="https://github.com/user-attachments/assets/ca320df1-5d91-4574-a1c0-1ffb2d7acbeb" />
<img width="1919" height="1079" alt="Screenshot 2026-03-26 124346" src="https://github.com/user-attachments/assets/a8d1be33-cce0-4f3e-a2f2-2600ef38ad54" />
<img width="1919" height="1079" alt="Screenshot 2026-03-26 124039" src="https://github.com/user-attachments/assets/0a0d64db-3e35-42a3-b46f-2f26c0fbdc9b" />
<img width="1919" height="1079" alt="Screenshot 2026-03-26 124057" src="https://github.com/user-attachments/assets/e4acefc1-dc38-40d4-9f84-3bf8bd3e25d9" />
<img width="1919" height="1079" alt="Screenshot 2026-03-26 124122" src="https://github.com/user-attachments/assets/5870595f-4fe1-4f1b-a33b-e37af7443196" />




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
<img width="1919" height="1077" alt="Screenshot 2026-03-26 124238" src="https://github.com/user-attachments/assets/0b6ab2f4-b3f4-47a9-a516-9d8da13e7836" />
<img width="1919" height="516" alt="Screenshot 2026-03-26 124257" src="https://github.com/user-attachments/assets/ad44599e-9d7f-49b0-9f63-96722fa20406" />
<img width="1919" height="481" alt="Screenshot 2026-03-26 124309" src="https://github.com/user-attachments/assets/9abd8967-3f51-4419-9418-16bed604d4f4" />
<img width="1919" height="449" alt="Screenshot 2026-03-26 124318" src="https://github.com/user-attachments/assets/a76d292a-4603-4b76-bc42-398326ec7242" />



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

# Real Estate Platform

A full-stack real estate platform that enables users to register, log in, and manage appointments based on their roles (poster or claimer).

---

## Features

- **User Registration and Login**: Role-based authentication using `poster` and `claimer`.
- **Role-Based Dashboard**:
  - **Posters** can view and manage their posted appointments.
  - **Claimers** can view and claim available appointments.
- **JWT Authentication**: Secure access to protected routes.
- **Email Notifications**: Automatic email notifications after successful registration.
- **Responsive Design**: User-friendly design across devices.
- **State Management**: Powered by Redux Toolkit.
- **APIs**:
  - User authentication
  - Appointment management

---

## Technologies Used

### Backend
- **Node.js** with **Express.js**
- **Sequelize** (ORM) with **PostgreSQL**
- **JWT** for authentication
- **Nodemailer** for email notifications

### Frontend
- **React.js** with React Router
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **pnpm**
- **PostgreSQL** database

---

### Installation

#### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
```bash
npm install
```
or 
```bash
pnpm install
```
3. Configure environment variables: Create a .env file in the backend directory with the following:
```plaintext
PORT=3002
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```
4. Start the backend server:
```bash
npm run dev
```
#### Frontend Setup
1. Navigate to the frontend folder:
```bash
cd frontend
```
2. Install dependencies
```bash
npm install
```
3. Start the development server:
```bash
npm start
```
The frontend will be available at http://localhost:3000.

## Project Structure

### Backend
```bash
backend/
├── models/               # Sequelize models
├── routes/               # Express routes
├── migrations/           # Database migrations
├── middleware/           # Authentication middleware
├── server.js             # Main server entry point
└── .env                  # Environment variables
```
### Frontend
```bash
frontend/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/            # Application pages
│   ├── redux/            # Redux slices and store
│   ├── App.js            # Main React entry point
│   └── index.js          # React DOM entry point
└── tailwind.config.js    # Tailwind CSS configuration
```
## Pages and Routes

Below is a list of pages and their respective routes:

| Page         | Route                 | Description                              |
|--------------|-----------------------|------------------------------------------|
| Home         | `/`                   | The landing page of the application.    |
| Login        | `/login`              | Login page for user authentication.     |
| Register     | `/register`           | Registration page for new users.        |
| Dashboard    | `/dashboard`          | User dashboard for viewing personalized data. |
| Appointments | `/appointments`       | View and claim or post appointments.    |
| About        | `/about`              | Information about the platform.         |
| Not Found    | `*`                   | Catch-all route for undefined pages.    |

### Notes
- The app dynamically renders content based on the user's role (`poster` or `claimer`).
- Authenticated routes may redirect unauthorized users to the login page.



## API Endpoints

### Authentication
| Endpoint               | Method | Description             |
|------------------------|--------|-------------------------|
| `/api/auth/register`   | POST   | Register a new user     |
| `/api/auth/login`      | POST   | Log in an existing user |
| `/api/auth/me`         | GET    | Get current user        |

### Appointments
| Endpoint                       | Method | Description                      |
|--------------------------------|--------|----------------------------------|
| `/api/appointments`            | GET    | Get all appointments             |
| `/api/appointments/mine`       | GET    | Get logged-in user's appointments |
| `/api/appointments/available`  | GET    | Get available appointments       |
| `/api/appointments/claim/:id`  | POST   | Claim an appointment by ID       |

## Contributing


### How to Contribute
1. **Fork the Repository**: Start by forking the repository to your own GitHub account.
2. **Clone Your Fork**: Clone your forked repository to your local machine.
   ```bash
   git clone https://github.com/AustinAllison/tmess.git
   ```


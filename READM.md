![App Screenshot](images/orbithcm.png)

## Link: https://orbit-hcm-9f12ae868600.herokuapp.com/

Orbit HCM is a Human Capital Management web application that allows users to manage employee information — from hiring to termination — all in one place.  
Built using **Node.js**, **Express**, **MongoDB**, and **EJS templates**, it supports **authentication**, **authorization**, and **full CRUD** functionality.

---

## 🚀 Features

- User registration and login (session-based authentication)
- Dashboard displaying all employees in a grid layout
- Create new employees (New Hire Form)
- View individual employee profiles
- Terminate employee (with termination reason and date)
- Automatic status update reflected on employee profile and dashboard
- Responsive and accessible UI styled with `#3167DB` color theme

---

## 🧠 Technologies Used

- Node.js
- Express.js
- MongoDB / Mongoose
- EJS Templates
- Express-Session + Connect-Mongo
- bcrypt (for password hashing)
- CSS Flexbox/Grid for layout
- Method-Override (for PUT/DELETE routes)

## 📂 Project Structure

```text
orbit-hcm/
├── controllers/
│   ├── authController.js       # Handles user authentication (register, login, logout)
│   └── employeeController.js   # Handles employee CRUD operations
│
├── middleware/
│   ├── passUserToView.js       # Makes current user available to all views
│   └── requireAuth.js          # Protects routes from unauthorized access
│
├── models/
│   ├── employee.js             # Employee schema and database model
│   └── user.js                 # User schema with bcrypt authentication
│
├── public/
│   └── css/
│       └── styles.css          # Custom CSS styles with grid layout
│
├── routes/
│   ├── auth.js                 # Authentication routes (/auth/login, /auth/register)
│   └── employee.js             # Employee routes (CRUD operations)
│
├── views/
│   ├── auth/
│   │   ├── login.ejs           # Login form
│   │   └── register.ejs        # Registration form
│   │
│   ├── employees/
│   │   ├── edit.ejs            # Edit employee form
│   │   ├── index.ejs           # Employee list (grid table)
│   │   ├── new.ejs             # New employee form
│   │   ├── show.ejs            # Employee detail page
│   │   └── terminate.ejs       # Employee termination form
│   │
│   ├── pages/
│   │   └── landing.ejs         # Landing page for non-authenticated users
│   │
│   └── partials/
│       ├── footer.ejs          # Footer component
│       ├── head.ejs            # HTML head with meta tags and CSS
│       └── navbar.ejs          # Navigation bar with conditional rendering
│
├── .env                        # Environment variables (PORT, MONGODB_URI, SESSION_SECRET)
├── package.json                # Project dependencies and scripts
└── server.js                   # Main application entry point


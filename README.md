# Easily Job Portal

Easily is an MVC job portal built with Express.js and EJS. Job seekers can browse jobs and submit applications, while authenticated recruiters can manage their job postings and review applicants.

## Features

- Recruiter registration, login, logout, and session management
- Password hashing using Node.js `crypto`
- Create, view, update, and delete job postings
- Recruiter ownership checks for jobs and applicants
- Server-side validation with preserved form values
- Job applications with PDF, DOC, or DOCX resume uploads
- Protected applicant listing and resume downloads
- Application confirmation emails using Nodemailer
- Cookie-based last-visit tracking
- In-memory user, job, and applicant storage
- Responsive EJS interface and reusable partials

## Technologies and dependencies

- Node.js with ES6 modules
- Express.js
- EJS and express-ejs-layouts
- express-session
- cookie-parser
- Multer
- Nodemailer

## MVC organization

```text
src/
├── controllers/   Request handling and model/view coordination
├── middlewares/   Authentication, validation, uploads, email, and cookies
├── model/         In-memory user and job data operations
├── routes/        Authentication, job, applicant, and home routes
└── views/         EJS pages, layouts, partials, and error pages
public/css/        Application styling
uploads/resumes/   Uploaded resume files created at runtime
index.js           Express application configuration and startup
```

## Installation

```bash
npm install
npm start
```

Open `http://localhost:3000` in a browser.

For development with automatic restarts:

```bash
npm run dev
```

## Email configuration

Set these environment variables to send real confirmation emails through an SMTP provider:

```text
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
MAIL_FROM=Easily Jobs <no-reply@example.com>
SESSION_SECRET=replace-with-a-secure-secret
```

Without SMTP configuration, Nodemailer uses its JSON transport so applications still complete during local development without sending an external email.

## Resume uploads

Resumes are stored under `uploads/resumes/`. Allowed formats are PDF, DOC, and DOCX, with a maximum size of 5 MB. Only the recruiter who created a job can view its applicants or download their resumes.

## Data storage

This project intentionally uses in-memory arrays. Users, jobs created at runtime, and applications are reset whenever the server restarts. Uploaded resume files remain on disk until removed manually.

## Available scripts

```bash
npm start    # Start the application
npm run dev  # Start with Node.js watch mode
npm test     # Run Node.js tests
```

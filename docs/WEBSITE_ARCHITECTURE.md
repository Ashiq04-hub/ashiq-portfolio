# Website Architecture

## Overview

This portfolio website follows a modern **Jamstack Architecture** built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. The application is statically generated for optimal performance, SEO, security, and scalability.

**Architecture Style:** Static Site Generation (SSG) + Serverless Functions

---

# High-Level Architecture

```text
┌─────────────────────┐
│     User Browser    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     Vercel CDN      │
│ Static HTML/CSS/JS  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Next.js 14     │
│    Frontend Layer   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Serverless API    │
│   /api/contact      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     Resend API      │
│  Email Delivery     │
└─────────────────────┘
```

---

# Technology Stack

| Layer | Technology |
|---------|------------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Forms | React Hook Form |
| Validation | Zod |
| Email Service | Resend |
| Hosting | Vercel |
| Analytics | Vercel Analytics |
| Version Control | Git & GitHub |

---

# System Layers

## 1. Presentation Layer (Frontend)

Responsible for rendering the user interface and handling interactions.

### Main Components

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── hooks/
└── public/
```

### Website Sections

- Hero
- About
- Education
- Skills
- Tools
- Why Hire Me
- Projects
- Contact

### Responsibilities

- Render UI Components
- Handle User Interactions
- Manage Navigation
- Trigger Animations
- Validate Form Inputs

---

## 2. Business Logic Layer

Contains reusable application logic and utilities.

```text
src/
├── hooks/
├── lib/
│   ├── data.ts
│   ├── constants.ts
│   └── utils.ts
```

### Responsibilities

- Scroll Tracking
- Active Navigation Detection
- Utility Functions
- Data Management
- Site Configuration

---

## 3. API Layer

Handles server-side operations.

```text
src/
└── app/
    └── api/
        └── contact/
            └── route.ts
```

### Responsibilities

- Process Contact Form Requests
- Validate Request Data
- Communicate with Resend API
- Return Success/Error Responses

---

## 4. Data Layer

This project does not use a traditional database.

### Data Source

```text
src/lib/data.ts
```

### Stored Content

- Projects
- Skills
- Tools
- Why Hire Me Cards
- Site Information

### Benefits

- Faster Performance
- Lower Cost
- Simpler Maintenance
- Easier Deployment

---
# Featured Projects

The portfolio showcases selected projects that demonstrate software development, problem-solving, and system design skills.

## Project 01 — Public Library Management System

### Description

A library management system designed to automate book borrowing, returns, penalty calculation, and user management for educational institutions.

### Features

- Book Borrowing System
- Return Book Processing
- Automatic Penalty Calculation
- Due Date Tracking
- Borrow History Reports
- User Management

### Technology Stack

- React
- Node.js
- PostgreSQL
- CSS

### Status

Completed

### Key Challenge

Developed an automated penalty calculation system that computes overdue fines based on the number of days beyond the due date.

---

## Project 02 — Weather Forecasting Application

### Description

A weather forecasting application that provides real-time weather information, temperature monitoring, and forecast predictions for different locations. The system helps users plan their activities by delivering accurate and up-to-date weather conditions.

### Features

- Real-Time Weather Updates
- Temperature Monitoring
- 7-Day Weather Forecast
- Location-Based Weather Search
- Humidity and Wind Speed Tracking
- Weather Condition Icons
- Responsive User Interface

### Technology Stack

- HTML
- CSS
- Python
- MongoDB

### Status

Completed

### Key Challenge

Implemented API integration to retrieve and display live weather data while ensuring a smooth and user-friendly experience.

---

## Project 03 — Online Voting System

### Description

A secure online voting platform designed to streamline election processes and provide efficient vote management. The system allows users to cast votes electronically while maintaining transparency and accuracy.

### Features

- User Authentication
- Secure Voting Process
- Candidate Management
- Election Management
- Vote Counting Automation
- Real-Time Results Dashboard
- Administrative Control Panel

### Technology Stack

- React
- Node.js
- MySQL
- CSS


### Status

Completed

### Key Challenge

Developed a reliable voting workflow that prevents duplicate voting and ensures accurate vote counting.

---

# Future Projects

## AI Resume Analyzer

### Planned Features

- Resume Upload
- ATS Compatibility Analysis
- Skill Gap Detection
- AI-Powered Suggestions

### Planned Stack

- Next.js
- TypeScript
- OpenAI API
- PostgreSQL

### Status

Planning

---

## Student Information Management System

### Planned Features

- Student Records
- Grade Management
- Attendance Tracking
- Report Generation

### Planned Stack

- React
- Node.js
- PostgreSQL

### Status

Planning

# Data Flow

## Website Load Flow

```text
User Visits Website
         │
         ▼
Vercel CDN
         │
         ▼
Static HTML Served
         │
         ▼
Next.js Hydration
         │
         ▼
Interactive Website
```

---

## Contact Form Flow

```text
User Submits Form
         │
         ▼
Client Validation
         │
         ▼
POST /api/contact
         │
         ▼
Server Validation
         │
         ▼
Resend API
         │
         ▼
Email Sent
         │
         ▼
Success Response
```

---

# Folder Structure

```text
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
│
├── hooks/
│
├── lib/
│   ├── data.ts
│   ├── constants.ts
│   └── utils.ts
│
├── types/
│
└── public/
    ├── images/
    ├── favicon.ico
    └── resume.pdf
```

---

# Deployment Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Git Push
    │
    ▼
Vercel CI/CD
    │
    ▼
Build & Validation
    │
    ▼
Production Deployment
    │
    ▼
Global CDN Distribution
```

---

# Security Architecture

## Environment Variables

```env
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

### Security Rules

- Never commit `.env.local`
- Store secrets in Vercel Environment Variables
- Validate requests on both client and server
- Sanitize user input
- Use HTTPS in production

---

# Scalability Plan

Future upgrades may include:

- Blog System
- CMS Integration
- Authentication
- Admin Dashboard
- PostgreSQL Database
- Supabase Integration
- Prisma ORM
- Stripe Payments

---

# Architecture Principles

1. Performance First
2. SEO Optimized
3. Type Safety
4. Component Reusability
5. Maintainability
6. Scalability
7. Clean Code Structure
8. Low Infrastructure Cost

---

## Author

**Ashiq Alsinawi**  
Aspiring Software Developer

**Version:** 1.0.0  
**Architecture Style:** Jamstack + Serverless
# Deployment Guide

## Overview

This document explains how to deploy the Ashiq Portfolio Website using GitHub and Vercel.

---

# Requirements

Install:

* Node.js 18+
* Git
* GitHub Account
* Vercel Account

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/Ashiq04-hub/ashiq-portfolio.git
cd ashiq-portfolio
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create:

```bash
.env.local
```

Add:

```env
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Production Build

## Build Project

```bash
npm run build
```

## Test Production Build

```bash
npm run start
```

---

# GitHub Deployment

## Initialize Repository

```bash
git init
git add .
git commit -m "Initial Portfolio Setup"
```

## Connect Remote Repository

```bash
git remote add origin https://github.com/Ashiq04-hub/ashiq-portfolio.git
```

## Push Code

```bash
git push -u origin main
```

---

# Vercel Deployment

## Create Project

1. Login to Vercel
2. Click "Add New Project"
3. Import GitHub Repository
4. Select Repository

---

## Configure Environment Variables

Add:

```env
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Deploy

Click:

```text
Deploy
```

Vercel will automatically:

1. Install dependencies
2. Run build process
3. Deploy application
4. Create preview URLs

---

# Automatic Deployments

Every push to:

```text
main
```

Automatically triggers:

```text
GitHub
    ↓
Vercel Build
    ↓
Production Deployment
```

---

# Custom Domain

Steps:

1. Open Project Settings
2. Go to Domains
3. Add Custom Domain
4. Update DNS Records
5. Verify Domain

Example:

```text
ashiq.dev
```

---

# Deployment Checklist

Before deployment:

* Environment variables configured
* Resume PDF uploaded
* Images optimized
* Metadata configured
* Contact form tested
* Mobile responsiveness verified

---

# Monitoring

Tools:

* Vercel Analytics
* Lighthouse
* Google Search Console

Monitor:

* Performance
* SEO
* Accessibility
* User Experience

---

# Rollback Strategy

If deployment fails:

1. Revert latest commit
2. Push previous stable version
3. Trigger redeployment

```bash
git revert HEAD
git push origin main
```

---

# Maintenance

Monthly Tasks:

* Update dependencies
* Verify contact form
* Review analytics
* Add new projects
* Update resume

---

**Deployment Platform:** Vercel

**Repository:** GitHub

**Framework:** Next.js 16

**Version:** 1.0.0

# AVAA RMS (Recruitment Management System)

This repository contains the source code for the AVAA RMS, consisting of a **Laravel** backend and a **Next.js** frontend.

## Prerequisites

Ensure you have the following installed on your machine:
*   [PHP](https://www.php.net/downloads) (v8.2 or higher)
*   [Composer](https://getcomposer.org/)
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [Git](https://git-scm.com/)

---

## 🚀 Quick Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/1L-401/avaa-rms.git
cd avaa-rms
```

### 2. Backend Setup (Laravel)
Open a terminal in the `backend` directory.

```bash
cd backend

# Install PHP dependencies
composer install

# Set up environment variables
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations (Ensure your database is configured in .env)
php artisan migrate

# Serve the backend
php artisan serve
```
The backend will be available at `http://localhost:8000`.

### 3. Frontend Setup (Next.js)
Open a **new** terminal in the `frontend` directory.

```bash
cd frontend

# Install Node.js dependencies
npm install

# Run the development server
npm run dev
```
The frontend will be available at `http://localhost:3000`.

---

## 📂 Project Structure

*   **`backend/`**: Laravel API application.
*   **`frontend/`**: Next.js frontend application (App Router).

## 🛠 Common Commands

| Command | Directory | Description |
| :--- | :--- | :--- |
| `php artisan serve` | `backend/` | Starts the Laravel development server. |
| `npm run dev` | `frontend/` | Starts the Next.js development server. |
| `php artisan migrate` | `backend/` | Runs database migrations. |
| `composer install` | `backend/` | Installs backend dependencies. |
| `npm install` | `frontend/` | Installs frontend dependencies. |

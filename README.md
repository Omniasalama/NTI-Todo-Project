# ToDo App - Frontend & API Integration

This project implements a modern, responsive frontend application for task management using **React**, integrated with a professional RESTful API.

## Overview

The ToDo App provides users with a clean, earthy-themed interface to manage tasks efficiently. Built with a focus on robust form validation and secure authentication, this application connects to a backend API to perform CRUD operations (Create, Read, Update, Delete) with real-time updates and persistent data storage.

## Technologies Used

* **React:** Frontend library for building a dynamic and component-based user interface.
* **Axios:** A promise-based HTTP client used to handle secure communication with the backend API.
* **Tailwind CSS:** A utility-first CSS framework used to create a custom "Earthy" theme (Creams, Browns, and Oranges).
* **React Hook Form & Zod:** Used together for high-performance form handling and strict schema-based validation.
* **React Router:** For seamless navigation between Login, Register, Home, and Profile views.
* **Context API:** For global state management of user authentication tokens and profile data.

## Features

* **Authentication & Security:** Secure User Registration and Login flows with JWT token management.
* **Strict Validation:** Frontend forms are protected by Zod schemas to ensure data integrity before API calls.
* **CRUD Operations:** Users can create new tasks, view their list, update task status, and delete records.
* **Responsive UI:** A fully mobile-responsive design featuring a custom navigation bar with active state tracking.
* **Real-time Feedback:** Integrated toast notifications and loading spinners to enhance user experience during data fetching.

## Getting Started

1. **Clone the Repository:** `git clone https://github.com/Omniasalama/NTI-Todo-Project.git`
2. **Install Dependencies:** `npm install`
3. **Start the Application:** `npm run dev`

## Folder Structure

* **src/:** Main source directory.
* **Components/:** Reusable UI components like Navbar, Footer, and ProtectedRoutes.
* **Context/:** AuthContext for managing login states and user tokens.
* **Pages/:** Main view components (Register, Login, Home, Profile).
* **Api/:** Axios configurations and service calls.


* **Public/:** Static assets, icons, and fonts.

## API Integration

This application is integrated with the **NTI API** hosted on Vercel. All authentication and task data are synced in real-time with the following base endpoint:

**Base URL:** `https://todo-nti.vercel.app`

### Key Endpoints:

* **User Signup:** `POST /user/signup`
* **User Login:** `POST /user/login`
* **Get All Todos:** `GET /todo`
* **Create Todo:** `POST /todo`


## Creator

**Omnia Salama**

---

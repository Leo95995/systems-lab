# Task Board Full stack - Symfony + React

## Description

This POC project showcases full stack development skills using a Symfony backend and a React frontend.
It implements a task management system with full CRUD functionality, real-time updates, and a clean API contract.

The goal was to build a fully working application in just a few days to demonstrate the ability to learn new technologies fast and deliver production-ready features.

## Tech Stack:

### Backend:

Symfony with Entities, DTOs, and Controllers, containerized using a custom PHP Docker image to fit Railway’s deploy requirements.

### Database:

MySQL hosted on Railway, connected to the backend with environment-based configuration.

### API Documentation:

The API is fully documented using a Swagger, and integrated with Swagger UI for live inspection and testing of all available endpoints.

### Frontend:

A React application that consumes the API in real time and displays task data dynamically.
Deployed on Railway, automatically containerized via Railway’s static frontend support.

### Deployment:

Full deployment on Railway with:

- A custom Docker container for the Symfony backend
- A Railway-managed container for the React frontend

## Features

- Full CRUD for tasks (create, read, update, delete)

- Real-time sync between frontend and backend

- API documented with Swagger and testable via Swagger UI

- Environment-based configuration for backend services

- Clean separation of concerns with DTOs and controllers

- Containerized backend using a custom PHP Docker image

- Frontend and backend deployed and running on Railway


## Live Demo

https://symfony-task-manager.up.railway.app/



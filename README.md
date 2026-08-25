# React Student Location System

A Vite + React application for registering students, geocoding submitted addresses, displaying student markers with React Leaflet, and showing all records in a responsive React Bootstrap table.

## Features

- Required fields: Firstname, Lastname, Course, Email, Address
- Client-side validation
- Address geocoding on form submit
- React state array for student records
- React Leaflet map with one marker per registered student
- Marker popup with student information
- Responsive student table
- Delete student functionality
- React Bootstrap components + Tailwind CSS utilities
- Vercel-ready Vite build

## Install

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Open Vercel and import the GitHub repository.
3. Vercel should detect **Vite** automatically.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy and submit the generated Vercel URL.

## Important geocoding note

This classroom demo uses the public OpenStreetMap Nominatim service only when a user submits the form. Do not implement autocomplete or rapid repeated requests. For testing, use public/sample locations rather than real private student home addresses. For a production system containing personal addresses, use a geocoding provider and architecture appropriate for your privacy and usage requirements.

# Deutsch Lernen

A frontend-only Angular application for learning German from A1 to B2.

## Tech Stack

- Angular 21 (standalone components, signals, zoneless)
- SCSS design system (CSS custom properties)
- JSON content source (`frontend/public/data/curriculum.json`)
- Client-side persistence (`localStorage`) for user progress/theme

## Project Structure

```
LearningGerman/
├── frontend/
│   ├── public/data/curriculum.json
│   └── src/
│       ├── app/
│       │   ├── core/models
│       │   ├── core/services
│       │   ├── features
│       │   ├── layout
│       │   └── shared/components
│       └── styles/
└── README.md
```

## Run Locally

```bash
cd frontend
npm install
ng serve
```

App URL: `http://localhost:4200`

## Data and State

- Curriculum/content data: `frontend/public/data/curriculum.json`
- Progress state: JSON serialized to `localStorage` (`lg_progress`)
- Theme state: JSON/string in `localStorage` (`lg_theme`)

## Content Workflow

When adding new German materials:

1. Classify CEFR level (A1/A2/B1/B2)
2. Select category/topic in `curriculum.json`
3. Add lessons with:
   - `sections`
   - `vocabulary`
   - `exercises`
4. Reload app and verify topic/lesson navigation

## Railway Deployment (Frontend Only)

- Service Root Directory: `frontend`
- Uses `frontend/Dockerfile`
- Nginx serves Angular static build on port `8080`
- Custom domains should point to the frontend Railway generated domain

## Notes

- Backend support has been intentionally removed.
- All logic and runtime data flow are frontend-only.

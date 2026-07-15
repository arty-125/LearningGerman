# 🇩🇪 Deutsch Lernen — German Learning Platform

A modern, full-stack web application for learning German from A1 to B2 level.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21, Standalone Components, Signals |
| Backend | .NET 10 Web API, Clean Architecture |
| Database | SQLite (dev) → PostgreSQL (production) |
| Styling | SCSS with CSS Custom Properties |

---

## Project Structure

```
LearningGerman/
├── frontend/                   # Angular 21 application
│   ├── public/
│   │   └── data/
│   │       └── curriculum.json  ← Learning content structure
│   └── src/
│       ├── app/
│       │   ├── core/
│       │   │   ├── models/      ← TypeScript interfaces
│       │   │   └── services/    ← CurriculumService, ProgressService, ThemeService
│       │   ├── shared/
│       │   │   └── components/  ← Reusable UI components
│       │   ├── features/        ← Lazy-loaded page components
│       │   │   ├── dashboard/
│       │   │   ├── level-overview/
│       │   │   ├── category/
│       │   │   ├── lesson/
│       │   │   └── progress/
│       │   └── layout/
│       │       └── main-layout/ ← App shell (sidebar + header)
│       └── styles/              ← SCSS design system
│
└── backend/
    └── src/
        ├── LearningGerman.Domain/       ← Entities, Enums
        ├── LearningGerman.Application/  ← Use cases, Interfaces, DTOs
        ├── LearningGerman.Infrastructure/ ← EF Core, Repositories
        └── LearningGerman.API/          ← Controllers, Program.cs
```

---

## Getting Started

### Prerequisites

- Node.js 22+ and npm
- Angular CLI 21: `npm install -g @angular/cli@21`
- .NET 10 SDK

---

### Frontend Setup

```bash
cd frontend
npm install
ng serve
```

App runs at **http://localhost:4200**

---

### Backend Setup

```bash
cd backend/src/LearningGerman.API

# Restore packages
dotnet restore ../../LearningGerman.sln

# Run migrations (first time)
dotnet ef migrations add InitialCreate --project ../LearningGerman.Infrastructure --startup-project .
dotnet ef database update --project ../LearningGerman.Infrastructure --startup-project .

# Run the API
dotnet run
```

API runs at **https://localhost:7xxx** (port shown in console)  
Swagger UI: **https://localhost:7xxx/swagger**

---

## Development Phases

### Phase 1 — Infrastructure ✅ (current)
- Angular project structure and routing
- .NET Clean Architecture foundation
- Design system (CSS variables, SCSS)
- Responsive layout (sidebar + header)
- Curriculum data structure (A1–B2, all categories and topics defined)
- Progress tracking (localStorage)
- Dark/light theme

### Phase 2+ — Content (upcoming)
For each German learning document provided:
1. Analyze level, category, topic
2. Add lesson to `curriculum.json`
3. Populate `sections`, `vocabulary`, `exercises`
4. Content automatically flows into the lesson view

---

## Curriculum Structure

Learning content lives in `frontend/public/data/curriculum.json`.

```
A1 Beginner
 ├── Grammar (8 topics)
 │    ├── Personal Pronouns
 │    ├── Present Tense Verbs
 │    ├── Sentence Structure
 │    ├── Nominativ
 │    ├── Akkusativ
 │    ├── Dativ Introduction
 │    ├── Articles (der/die/das)
 │    └── Negation (nicht/kein)
 ├── Vocabulary (7 topics)
 ├── Conversation (3 topics)
 └── Pronunciation (2 topics)

A2 Elementary — 14 topics
B1 Intermediate — 10 topics
B2 Upper-Intermediate — 8 topics
```

**Total: 52 topics ready to receive lesson content.**

---

## Adding Lesson Content (Phase 2 instructions)

To add a lesson, find the topic in `curriculum.json` and populate its `lessons` array:

```json
{
  "id": "a1-grammar-personal-pronouns",
  "lessons": [
    {
      "id": "a1-grammar-personal-pronouns-lesson-1",
      "topicId": "a1-grammar-personal-pronouns",
      "categoryId": "a1-grammar",
      "levelId": "a1",
      "title": "Personal Pronouns in German",
      "shortDescription": "Learn all German personal pronouns and their usage",
      "order": 1,
      "estimatedMinutes": 15,
      "sections": [
        {
          "type": "explanation",
          "title": "What are Personal Pronouns?",
          "content": "German personal pronouns correspond to English I, you, he..."
        },
        {
          "type": "table",
          "title": "Personal Pronouns Overview",
          "headers": ["German", "English", "Formality"],
          "rows": [
            ["ich", "I", "neutral"],
            ["du", "you (informal)", "informal"]
          ]
        }
      ],
      "vocabulary": [],
      "exercises": []
    }
  ]
}
```

---

## Design System

Colors are defined as CSS custom properties in `src/styles/_variables.scss`.

| Level | Color |
|-------|-------|
| A1 | `#10b981` (Emerald) |
| A2 | `#3b82f6` (Blue) |
| B1 | `#8b5cf6` (Violet) |
| B2 | `#f59e0b` (Amber) |

Theme: Light/dark via `data-theme` attribute, toggled by `ThemeService`.

---

## Angular Architecture Notes

- **No NgModules** — all standalone components
- **Signals** for all state (`signal()`, `computed()`, `effect()`)
- **`inject()`** for dependency injection (no constructor injection)
- **`withComponentInputBinding()`** — route params auto-bind to `input()` signals
- **Lazy loading** — all feature modules loaded on demand
- **Zoneless** — `provideZonelessChangeDetection()`

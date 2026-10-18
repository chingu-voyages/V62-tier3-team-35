# Learning Path Generator

An AI-powered learning path generator that helps users plan and track their learning journey toward a career goal. Built as a collaborative project for Chingu Voyage 62 (Team 35).

---

## Key Features

- **AI-generated learning paths**: Create personalized learning journeys based on a career goal, current skill level, existing skills, weekly time commitment, and preferred learning pace.
- **Authentication**: Sign in with email and password, Google, or GitHub.
- **Interactive learning paths**: View learning paths as a visual canvas organized into steps and topics.
- **Progress tracking**: Mark topics as completed and track progress as you work through each step. Completed steps are visually distinguished in the learning path.
- **Learning resources**: Access relevant learning resources through links provided for each step.
- **Dashboard**: View and manage all saved learning paths in one place.
- **Path management**: Edit learning path names and descriptions, delete saved paths, and filter paths by status.

---

## Tech Stack

| Category | Technologies |
| :---------------------- | :-------------------------------------- | 
| **Framework**            | Next.js, React, TypeScript |
| **Styling & UI** | Tailwind CSS, shadcn/ui, Radix UI |
| **Interactive Canvas** | XYFlow (React Flow) |
| **Authentication** | Better Auth |
| **Database & ORM** | Supabase (PostgreSQL), Prisma |
| **AI Integration** | Google Gemini API |
| **Forms & Validation** | React Hook Form, Zod |
| **Testing** | Vitest, Playwright |
| **Formatting** | ESLint, Prettier |

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- A [Supabase](https://supabase.com/) project
- A Google Gemini API key
- OAuth credentials for Google and GitHub, if using those sign-in providers

---

## Quick Start

1. **Clone & enter the repo**

```bash
   git clone https://github.com/chingu-voyages/V62-tier3-team-35.git
   cd V62-tier3-team-35
```

2. **Install dependencies**

```bash
   npm install
```

3. **Configure environment variables**

Create a local environment file from the example:

```bash
   cp .env.example .env
```

Obtain the database connection strings, API key, OAuth credentials, and authentication secret before running the application. Add the required values to your .env file.

4. **Set up the database**

- Create a project in Supabase.
- Get the database connection strings from your Supabase project settings and add them to your .env file as DATABASE_URL and DIRECT_URL.
- Apply the database migrations.

5. **Start the development server**

```bash
   npm run dev
```
Open http://localhost:3000 in your browser.

---

## Our Team

| Name | Links |
| :------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **Lilla Toth** |  |
| **Sarah Dahman** | [GitHub](https://github.com/SaraDahman) |
| **Nadiia Lashtun** | [GitHub](https://github.com/NadiiaLashtun) |
| **Eva Langerova** | [GitHub](https://github.com/eva-lng) |
| **Eduard** | [GitHub](https://github.com/EduardDE7) |
| **Fabrizio** | [GitHub](https://github.com/fabirez) |
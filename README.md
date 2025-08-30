# HabitFlow — Track. Improve. Transform.

![GitHub Repo stars](https://img.shields.io/github/stars/devcom33/habitflow?style=social)
![GitHub forks](https://img.shields.io/github/forks/devcom33/habitflow?style=social)
![GitHub issues](https://img.shields.io/github/issues/devcom33/habitflow)
![GitHub pull requests](https://img.shields.io/github/issues-pr/devcom33/habitflow)
![GitHub contributors](https://img.shields.io/github/contributors/devcom33/habitflow)
![License](https://img.shields.io/github/license/devcom33/habitflow)

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC?logo=tailwindcss)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)

**HabitFlow** is a full-stack, open-source habit tracker designed for developers who appreciate clean UIs, meaningful data, and the occasional green square.

Inspired by GitHub’s contribution graph, HabitFlow helps you build daily routines and stick with them — without the bloat.

---

## What it does

- Visualizes daily habit completion using a contribution-style grid
- Tracks multiple habits with daily toggles
- Displays real-time stats including streaks and completion rate
- Built with modern, scalable technologies

---

## Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Spring Boot 3.5 (REST API)
- **Database:** PostgreSQL (via Docker)
- **Extras:** MapStruct, Spring Security, OpenAPI, Lucide Icons

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Java 17
- Docker + Docker Compose

---

### Run the App

You can run the full stack with a few simple commands.

```bash
# 1. Start database and Admire UI with Docker
docker-compose up -d

# 2. Start the backend (Spring Boot)
cd backend
./mvnw spring-boot:run

# 3. Start the frontend (Vite + React)
cd ../frontend
npm install
npm run dev

# 4. Open the app in your browser
http://localhost:5173

```

## Features

- **GitHub-style Habit Grid** – Visualize daily completions with color-coded intensity
- **Track Multiple Habits** – Add, toggle, and monitor habits day-by-day
- **Live Stats** – Get your daily progress, streak count, and completion percentage
- **Modern UI** – Responsive, dark-themed design using Tailwind CSS
- **Real-Time Data** – Optimized updates and interactions via React hooks
- **Backend API** – Secure and scalable Spring Boot RESTful API

## 📸 Screenshots

![Screenshot](./frontend/public/habitflow.png)
![Screenshot](./frontend/public/habitflow-2.png)

## Contributing

Contributions are welcome — whether it's a bug fix, new feature, or even just cleaning up code.

```bash
# Fork the project

git clone https://github.com/devcom33/habitflow.git

# Create a new feature branch

git checkout -b feature/your-feature-name

# Commit and push

git commit -m "Add your change"
git push origin feature/your-feature-name
```

## Open a Pull Request

Before implementing major changes, please open an issue to discuss your idea and ensure we're aligned.

When you're ready to contribute:

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add brief, descriptive message"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## Roadmap

- [ ] Add JWT-based authentication
- [ ] Multi-user support
- [ ] Weekly/monthly reporting
- [ ] Public profile sharing

## License

This project is released under the [MIT License](LICENSE).  
© [Devcom33](https://github.com/devcom33)

## Attribution

If you use **HabitFlow** in your own project or share it publicly, a link back to this repository or a mention of [@devcom33](https://github.com/devcom33) is appreciated!

---

## Support the Project

If HabitFlow has added value to your routine:

- Star the repo to show your support
- Fork it to make your own modifications
- Share it with developers who might benefit
- Provide feedback or suggest enhancements via issues

Your engagement helps make HabitFlow better.

---

## Contact

Got a question or a suggestion?  
Open an issue or reach out through GitHub: [devcom33](https://github.com/devcom33)

Crafted with care by [Devcom33](https://github.com/devcom33)

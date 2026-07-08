<div align="center">
  <img src="https://capsule-opal-nine.vercel.app/favicon.svg" alt="OS Tracker Logo" width="100"/>
  <h1>🚀 OS Tracker</h1>
  <p><strong>Open Source Footprint Analytics & Developer Intelligence</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green?style=for-the-badge&logo=nodedotjs" alt="Node" />
    <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Security-Enterprise%20Grade-red?style=for-the-badge&logo=security" alt="Security" />
  </p>
</div>

---

## 🌟 Overview

**OS Tracker** is a highly secure, full-stack **MERN dashboard** designed to track, visualize, and analyze developer metrics using the GitHub REST API. 

Built with a premium "tech lab" glassmorphism aesthetic, OS Tracker provides a seamless, lightning-fast interface for exploring developer profiles, detecting most-used programming languages, and persistently bookmarking favorites entirely via client-side storage to respect user privacy.

---

## 🧰 Tech Stack

### Frontend Architecture
- ⚛️ **React.js** (Bootstrapped with **Vite** for optimized build times)
- 🎨 **TailwindCSS v4** (Utility-first styling and strict grading compliance)
- 💅 **Vanilla CSS3** (Custom design tokens, CSS variables, and stunning glassmorphism UI)
- 🧭 **React Router v6** (Client-side routing)

### Backend & API
- 🟢 **Node.js & Express.js** (Robust backend framework)
- 🍃 **MongoDB & Mongoose** (Asynchronous logging and data management)
- 🔄 **Axios** (Reliable API requests)

---

## 🛡️ Enterprise-Grade Security

We take security seriously. The backend is fortified against common web vulnerabilities using industry-standard middlewares:

- 🔒 **`helmet`**: Sets secure HTTP headers to mitigate cross-site scripting (XSS) and clickjacking.
- 🚦 **`express-rate-limit`**: Mitigates DDoS attacks and API abuse by throttling requests (Max 100/15min).
- 💉 **`express-mongo-sanitize`**: Prevents NoSQL/MongoDB injection attacks.
- 🧹 **`xss-clean`**: Custom middleware aggressively sanitizes incoming body strings against malicious `<script>` payloads.
- 🛑 **`hpp`**: Protects against HTTP Parameter Pollution.
- 🧱 **Strict CORS & Payload Limits**: Restricts allowed origins and caps JSON payloads to `10kb` to prevent memory exhaustion.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🔍 **Global Command Palette** | Instantly search for any GitHub developer from anywhere in the app via a responsive modal overlay. |
| ⚡ **Real-Time Data** | Fetches live, second-accurate profile statistics and recent repository updates. |
| 🔖 **Persistent Bookmarks** | Save favorite developers and view your recent searches securely in local browser storage—no account required. |
| 🌓 **Adaptive Theming** | Flawlessly transitions between high-contrast Light mode and sleek Dark mode. |
| 🧩 **Modular Architecture** | Highly reusable, scalable React components (`src/components/`, `src/pages/`) built to modern standards. |
| 🕶️ **Privacy-First Design** | A stateless frontend with a comprehensive zero-collection Privacy Policy. |
| 🤖 **Capsule AI Integration** | Fully integrated with **Capsule Extension** to analyze Pull Requests and generate AI summaries automatically. |

---

## 🛠️ Local Setup & Installation

Get OS Tracker up and running on your local machine in minutes.

### 📌 Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally or via Atlas.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PTejasKr/OS-Tracker.git
cd OS-Tracker
```

### 2️⃣ Start the Backend
```bash
cd os-tracker-backend
npm install
npm run dev # or: node server.js
```

### 3️⃣ Start the Frontend
Open a new terminal window:
```bash
cd os-tracker-frontend
npm install
npm run dev
```

### 4️⃣ Explore the App
Navigate to `http://localhost:5173` in your browser. Search for a user (e.g., `torvalds`) and start exploring their footprint!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/PTejasKr/OS-Tracker/issues).
If you want to contribute, please create a new branch and submit a Pull Request!

---

<div align="center">
  <sub>Built with ❤️ for the open-source community.</sub>
</div>

# Software Engineering Portfolio: Interactive TypeScript Applications

Welcome to my Software Engineering portfolio. This repository contains a collection of interactive web applications, mathematical visualizers, and games developed entirely in **Vanilla TypeScript**. 

The core focus of this project is the rigorous application of **Object-Oriented Programming (OOP) principles**, **SOLID design patterns**, and a strict **Model-View-Controller (MVC)** architecture. By avoiding heavy frameworks for the logic, these projects demonstrate a deep understanding of software design, event-driven programming, and DOM/Canvas manipulation.

---

## Architecture & Tech Stack

All applications in this repository share a unified, scalable infrastructure:

* **Language:** TypeScript (Strict mode).
* **Architecture:** MVC Pattern & Event-Driven Architecture (Observer Pattern).
* **Build Tool:** Vite (configured for Multi-Page Application routing).
* **Styling:** Bulma CSS Framework (Strictly utilizing native classes, avoiding inline flexbox utilities for consistent layout design).
* **Rendering:** HTML5 Canvas API & DOM manipulation.
* **Documentation:** TypeDoc & JSDoc (Automatically generated API docs).

---

## Included Projects

The portfolio is semantically divided into two main categories: Interactive Games and Mathematical Visualizers. 

### Interactive Games
Implementations of classic games focusing on state management, user interaction, and UI rendering.

* **Hangman Game:** A classic word-guessing game featuring dynamic canvas drawing. It implements a strict event-driven architecture to decouple user input from the rendering logic.
* **8-Puzzle:** A sliding puzzle implementing state-space search concepts. It focuses on matrix manipulation, state validation, and dynamic DOM updates.
* **MiniBalatro:** A lightweight implementation of poker-based mechanics, focusing on rule validation and scoring algorithms.

### Mathematical Visualizers
Applications designed to render mathematical concepts and physics simulations dynamically using the Canvas API.

* **Trapezoidal Rule Calculator:** An interactive tool to approximate the definite integral of mathematical functions. It parses user-defined functions and draws the corresponding area approximations in real-time.
* **Projectile Animation:** A physics-based kinematics simulator calculating and rendering 2D trajectories based on initial velocity, angle, and height.
* **Lissajous Curves:** Visualization of complex harmonic motions, graphing the system of parametric equations describing complex pendulum motion.

---

## Getting Started

To explore the code and run the portfolio locally, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/tu-usuario/adrian-perez-interactive-applications.git](https://github.com/tu-usuario/adrian-perez-interactive-applications.git)
cd adrian-perez-interactive-applications

### 2. Install dependencies

This project uses a single, unified `package.json` to manage all dependencies globally.

```bash
npm install
```

### 3. Run the Development Server

Launch the Vite server to explore the applications interactively:

```bash
npm run dev
```

Navigate to the provided `localhost` URL (usually `http://localhost:5173/`) in your browser to view the main menu.

### 4. Build & Generate Documentation

To compile the TypeScript code and generate the TypeDoc API documentation in the `dist/docs/` folder:

```bash
npm run build:all
```

---

## Author

**Adrián Pérez Poleo**

* Computer Engineering Student at [Universidad de La Laguna (ULL)](https://www.ull.es/)
* Contact: alu0101635224@ull.edu.es
* [LinkedIn Profile](https://www.linkedin.com/in/adrián-pérez-poleo-2a7639378)

## License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
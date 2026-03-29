# Assembly: Rise

A Hangman-style word game built with React. Guess the hidden word before the programming world falls to Assembly!

🔗 **[Live Demo](https://assemblyrise.netlify.app/)**

---

## How to Play

- Guess letters one at a time by clicking the on-screen keyboard
- You have **8 attempts** before Assembly takes over
- Each wrong guess eliminates a programming language
- Reveal the full word before all languages are gone to win

---

## Features

- 🎮 Random word selection from a curated word list
- 💀 Language elimination chips with visual skull overlay on wrong guesses
- 🎉 Confetti animation on win
- ♿ Accessible — screen reader support via `aria-live` regions and `sr-only` status announcements
- 🔄 New Game button to restart without a page refresh

---

## Built With

- **React 18** — component architecture, `useState`, derived state
- **clsx** — conditional class management
- **react-confetti** — win animation
- **Vite** — build tooling
- **CSS3** — custom styling, no UI framework

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/CodeCary80/assembly-rise.git
cd assembly-rise

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── App.jsx        # Main game component — all state and logic
├── languages.js   # Programming language data (name, colors)
├── utils.js       # getRandomWord, getFarewellText helpers
├── words.js       # Word list
├── index.css      # Global styles
└── App.css        # Component styles
```

---

## What I Learned

- Managing multiple pieces of derived state from a single source of truth
- Using `clsx` for clean conditional class logic
- Implementing accessible UI with `aria-live` and visually hidden status regions
- Lazy initializer in `useState` for one-time random word selection

---

Made by [Cary Zhu](https://build-nu-two.vercel.app/) · [GitHub](https://github.com/CodeCary80)
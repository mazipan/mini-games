# mini-games

🎮 A curated collection of classic browser games. Free to play, no account needed, no downloads — just pure fun.

**Live site:** https://games.mazipan.space/

Built with [Eleventy](https://www.11ty.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Nunjucks](https://mozilla.github.io/nunjucks/).

## Games

### 🕹️ Arcade

| Game              | Difficulty |
| ----------------- | ---------- |
| 🐦 Flappy Bird    | Easy       |
| 🎹 Piano Tiles    | Easy       |
| 🏓 Pong           | Easy       |
| 🐍 Snake          | Easy       |
| 📦 Stack          | Easy       |
| 🦔 Whack-a-Mole   | Easy       |
| 🧱 Breakout       | Medium     |
| 🟦 Tetris         | Medium     |
| 👾 Space Invaders | Hard       |

### 🧩 Puzzle

| Game                    | Difficulty |
| ----------------------- | ---------- |
| 🔢 2048                 | Medium     |
| 🟦 Color Block          | Medium     |
| 🔗 Color Connect        | Medium     |
| 🍬 Match Three          | Medium     |
| 🀄 Onet Connect Classic | Medium     |
| 🔲 Sliding Puzzle       | Medium     |
| 💣 Minesweeper          | Hard       |
| 🔢 Sudoku               | Hard       |

### ♟️ Board

| Game            | Difficulty |
| --------------- | ---------- |
| 🃏 Memory Match | Easy       |
| ⭕ Tic-Tac-Toe  | Easy       |
| 🎲 Yahtzee      | Easy       |
| 🃏 Blackjack    | Medium     |
| 🔴 Checkers     | Medium     |
| 🔴 Connect Four | Medium     |
| 🎲 Domino       | Medium     |
| 🪨 Mancala      | Medium     |
| ♠️ Solitaire    | Medium     |

### 🔤 Word

| Game           | Difficulty |
| -------------- | ---------- |
| 🪢 Hangman     | Easy       |
| 🔤 Word Search | Easy       |
| 🟩 Wordle      | Easy       |

## Tech Stack

- **Eleventy 3.x** — static site generator
- **Nunjucks** — templates and layouts
- **Tailwind CSS v4** — utility-first styling
- **PostCSS + @tailwindcss/postcss** — CSS pipeline
- **Prettier** — code formatting (enforced via Lefthook pre-commit hooks)
- **Commitlint** — conventional commit enforcement
- **Bun** — package manager and script runner

## Getting Started

Requires [Bun](https://bun.sh) >= 1.3.12.

```bash
bun install
bun run dev     # start dev server at localhost:8080
bun run build   # production build to _site/
```

## Contributing

See [AGENTS.md](./AGENTS.md) for the full development guide — project structure, conventions for adding new games, and coding standards.

## License

MIT

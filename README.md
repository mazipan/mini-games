# mini-games

🎮 A curated collection of classic browser games. Free to play, no account needed, no downloads — just pure fun.

**Live site:** https://games.mazipan.space/

Built with [Eleventy](https://www.11ty.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Nunjucks](https://mozilla.github.io/nunjucks/).

## Games

| Game            | Category | Difficulty |
| --------------- | -------- | ---------- |
| 🟦 Tetris       | Arcade   | Medium     |
| 🏓 Pong         | Arcade   | Easy       |
| 🐍 Snake        | Arcade   | Easy       |
| 🧱 Breakout     | Arcade   | Medium     |
| 🔢 2048         | Puzzle   | Medium     |
| 💣 Minesweeper  | Puzzle   | Hard       |
| ⭕ Tic-Tac-Toe  | Board    | Easy       |
| 🃏 Memory Match | Board    | Easy       |
| 🔴 Connect Four | Board    | Medium     |
| 🪨 Mancala      | Board    | Medium     |
| 🔢 Sudoku       | Puzzle   | Hard       |
| 🦔 Whack-a-Mole | Arcade   | Easy       |

## Tech Stack

- **Eleventy 2.x** — static site generator
- **Nunjucks** — templates and layouts
- **Tailwind CSS v3** — utility-first styling
- **PostCSS + Autoprefixer** — CSS pipeline
- **Prettier** — code formatting (enforced via Husky pre-commit hooks)
- **Commitlint** — conventional commit enforcement

## Getting Started

Requires Node.js >= 24.

```bash
npm install
npm run dev     # start dev server at localhost:8080
npm run build   # production build to _site/
```

## Contributing

See [AGENTS.md](./AGENTS.md) for the full development guide — project structure, conventions for adding new games, and coding standards.

## License

MIT

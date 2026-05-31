# mini-games — AI Coding Guide

## Project Overview

A collection of free, browser-based mini games built with Eleventy (SSG), Tailwind CSS, and Nunjucks templates. Each game is a self-contained page.

## Tech Stack

- **Eleventy 2.x** — static site generator, config in `.eleventy.js`
- **Nunjucks** — template engine for layouts and partials
- **Tailwind CSS v3** — utility-first CSS, config in `tailwind.config.js`
- **PostCSS + autoprefixer** — CSS pipeline, config in `postcss.config.js`
- **Prettier** — code formatter, config in `.prettierrc`
- **Husky + lint-staged** — pre-commit hooks
- **Commitlint** — conventional commit enforcement

## Development Commands

```bash
npm run dev          # start dev server (Eleventy + Tailwind watch)
npm run build        # production build
npm run format       # format all files with Prettier
npm run format:check # check formatting without writing
```

## Project Structure

```
src/
  _data/
    site.js         # site-wide metadata (title, description, url)
    games.js        # array of all games with metadata
  _includes/
    layouts/
      base.njk      # base HTML wrapper (head, meta, CSS)
      game.njk      # game page layout (minimal nav + back button)
    partials/
      header.njk    # site header with nav
      footer.njk    # site footer
      hero.njk      # landing page hero section
      features.njk  # USP/features section
      games-list.njk # games grouped by category
  css/
    main.css        # Tailwind entry point (@tailwind directives)
  games/
    [slug]/
      index.njk     # individual game page
  index.njk         # homepage
```

## Adding a New Game

1. Add an entry to `src/_data/games.js`:

   ```js
   {
     slug: "my-game",       // URL slug: /games/my-game/
     name: "My Game",
     description: "Short description shown on card",
     category: "arcade",    // arcade | puzzle | board | word
     difficulty: "easy",    // easy | medium | hard
     icon: "🎮",            // emoji icon shown on card
     tags: ["tag1"],
   }
   ```

2. Create `src/games/my-game/index.njk` using the game layout:
   ```njk
   ---
   layout: layouts/game.njk
   title: My Game
   description: Short description
   gameSlug: my-game
   ---
   <!-- Game HTML, canvas, and inline script here -->
   ```

## Categories

- `arcade` — action games (Tetris, Snake, Breakout)
- `puzzle` — logic/thinking games (2048, Minesweeper)
- `board` — turn-based/board games (Tic-Tac-Toe, Memory Match)
- `word` — word/text games

## Conventions

- Games are fully self-contained in their `index.njk` — no external JS dependencies
- Use canvas for games requiring pixel-precise rendering (Tetris, Snake, Breakout)
- Use DOM manipulation for grid-based games (2048, Minesweeper, Memory Match)
- Commit types include a custom `game:` type for adding new games
- All code must be formatted with Prettier before committing (enforced via husky)

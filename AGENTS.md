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

## Categories

- `arcade` — action games (Tetris, Snake, Breakout)
- `puzzle` — logic/thinking games (2048, Minesweeper)
- `board` — turn-based/board games (Tic-Tac-Toe, Memory Match)
- `word` — word/text games

---

## Game Feature Requirements

Every game in this project must implement the following features.

### 1. Local Best Score (localStorage)

- Store the player's best result in `localStorage` under the key `mini-<slug>-best`
- Load the stored value on page initialisation and display it immediately
- Update storage whenever a new best is achieved
- Display the best score/time/moves in the score row (label: **Best**)

### 2. Level Progression (start slow → get faster)

- Arcade games (Snake, Breakout, Tetris): must start at an easy/slow pace and increase speed or difficulty over time
  - Snake: `getSpeed(lvl) = max(65, 200 - (lvl-1)*20)` ms; level up every 5 foods eaten
  - Breakout: ball speed scales with level via `(1.5 + lvl * 0.35) * S`; 5 levels total
  - Tetris: `dropInterval = max(100, 800 - (lvl-1)*80)` ms; level up every 10 lines
- Puzzle/board games (2048, Memory Match, Minesweeper, Tic-Tac-Toe): difficulty is selectable (easy/medium/hard) rather than auto-scaling speed

### 3. Mobile Responsiveness

- All canvases must fit within `window.innerWidth - 32` pixels — use `Math.min(desiredSize, window.innerWidth - 32)` and set `canvas.width` / `canvas.height` dynamically
- All game constants (paddle width, ball radius, brick sizes, etc.) must scale proportionally using `S = actualSize / designSize`
- Input coordinate mapping must account for CSS ↔ canvas scale: `(e.clientX - rect.left) * (canvas.width / rect.width)`
- D-pad / virtual controls must be provided for touch-only games (Snake, Tetris)
- Touch drag must work for games using a paddle (Breakout) via `touchstart` + `touchmove` events with `{ passive: false }`
- Long-press (≥500 ms) must be supported for secondary actions on mobile (e.g. Minesweeper flagging)
- Minesweeper cell size must scale dynamically: `min(32, max(18, floor((viewportWidth - padding - gaps) / cols)))` px
- Add `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation` to all interactive buttons

### 4. Demo / Preview Mode

- Canvas-based arcade games (Snake, Breakout) must show an auto-playing AI demo on the canvas while the start/game-over overlay is visible
- The demo overlay background should be semi-transparent (`rgba(15,23,42,0.82–0.85)`) so the live demo is visible behind it
- A **"Live Demo"** label should appear at the top of the overlay while the demo runs
- The demo label is hidden once the real game starts; it does not reappear on game-over (demo restarts but label stays hidden — optional: re-show it)
- Demo AIs are simple greedy approaches (e.g. snake: nearest-food greedy; breakout: smooth paddle tracking)

### 5. How to Play + FAQ

- Every game must include a collapsible info section **below** the game wrapper (`<div class="info-section">`)
- Two `<details class="info-details">` blocks are required:
  1. **How to Play** — Goal, Controls (desktop & mobile), Scoring/Levels
  2. **FAQ** — at least 3 questions covering common confusion points
- Use the shared `.info-details` / `.info-body` CSS pattern (defined per-game in each `<style>` block — copy from any existing game file)

---

## Code Conventions

- Every game is fully self-contained in `src/games/<slug>/index.njk` — no external JS dependencies
- Inline `<style>` block first, then HTML, then `<script>` — all in the one `.njk` file
- Use canvas for games requiring pixel-level rendering (Snake, Breakout, Tetris); DOM manipulation for grid games (2048, Memory Match, Minesweeper, Tic-Tac-Toe)
- Commit new games with the `game:` commit type (e.g. `game: add Pong`)
- All code must be formatted with Prettier before committing (`npm run format`)
- **Always add a `launchConfetti()` reward animation** when a player wins a game or advances a level. Paste the standard implementation (fixed canvas overlay, 80 particles, 3s duration, pointer-events:none) directly into the game's `<script>` block since each game is self-contained. Call it at: game-win moments (all pairs matched, 2048 tile reached, board cleared, match won) and level-advance moments (Tetris line-clear level up, Breakout level clear, Snake level up).

## localStorage Key Convention

| Game         | Key(s)                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------ |
| Snake        | `mini-snake-best`                                                                          |
| Breakout     | `mini-breakout-best`                                                                       |
| Tetris       | `mini-tetris-best`                                                                         |
| 2048         | `mini-2048-best`                                                                           |
| Memory Match | `mini-memory-best-easy`, `mini-memory-best-medium`, `mini-memory-best-hard`                |
| Minesweeper  | `mini-minesweeper-best-easy`, `mini-minesweeper-best-medium`, `mini-minesweeper-best-hard` |
| Tic-Tac-Toe  | `mini-tictactoe-scores` (JSON: `{X, D, O}`)                                                |

## Adding a New Game — Checklist

- [ ] Entry added to `src/_data/games.js` (slug, name, description, category, difficulty, icon, tags)
- [ ] File created at `src/games/<slug>/index.njk`
- [ ] `localStorage` best score implemented and displayed
- [ ] Level/difficulty progression implemented
- [ ] Mobile responsive (canvas sizing, touch controls, D-pad if needed)
- [ ] Demo mode on start/game-over overlay (for canvas arcade games)
- [ ] How to Play + FAQ section below the game
- [ ] Prettier formatting passes (`npm run format:check`)

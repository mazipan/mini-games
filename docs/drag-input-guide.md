# Drag Input Guide for Grid Games

This document captures the problems encountered while building Color Connect
and the solutions that resolved them. Use it as a reference when adding any
game that requires touch/mouse drag over a grid.

---

## Problem Summary

Grid-drag games (where the player draws a path by pressing and sliding across
cells) fail in subtle ways on mobile — especially Android — if you use the
traditional `mousedown` / `touchstart` event split. The symptoms are:

- Drag starts only from the gap between cells, not from inside a dot/circle.
- Drag works on desktop but does nothing on Android Chrome.
- Diagonal finger movement silently aborts the draw mid-path.
- The path disappears the moment the finger leaves the grid boundary.

---

## Root Causes & Fixes

### 1. Android hit-test misses child elements (dot circles)

**Problem:** On Android, `touchstart` on a child `div` (e.g. the colored dot
inside a cell) fires on the child, not the parent grid. The parent's listener
never sees it, so drag never begins. The user has to start from an empty cell —
unnatural and confusing.

**Fix:** Use the **Pointer Events API** (`pointerdown` / `pointermove` /
`pointerup` / `pointercancel`) on the grid element itself, combined with
`element.setPointerCapture(e.pointerId)` in `pointerdown`. The browser then
routes all subsequent pointer events directly to the grid regardless of which
child was touched.

```js
gridEl.addEventListener("pointerdown", (e) => {
  if (!e.isPrimary) return; // ignore multi-touch
  const pos = cellFromPoint(e.clientX, e.clientY);
  if (!pos) return;
  e.preventDefault();
  gridEl.setPointerCapture(e.pointerId); // lock all events to grid
  startDraw(pos.row, pos.col);
});

gridEl.addEventListener("pointermove", (e) => {
  if (!e.isPrimary || !activeColor) return;
  const pos = cellFromPoint(e.clientX, e.clientY);
  if (pos) extendDraw(pos.row, pos.col);
});

gridEl.addEventListener("pointerup", (e) => {
  if (e.isPrimary) stopDraw();
});
gridEl.addEventListener("pointercancel", (e) => {
  if (e.isPrimary) stopDraw();
});
```

**Do NOT use separate `mousedown` + `touchstart` handlers.** They work on
desktop but fail on Android for the reason above, and they double-fire on
some devices.

### 2. Hit-testing inside `pointermove`

Use `document.elementFromPoint(x, y)` and walk up to the `.gc` grid-cell
ancestor, then read its `data-idx` attribute:

```js
function cellFromPoint(clientX, clientY) {
  let el = document.elementFromPoint(clientX, clientY);
  while (el && !el.classList.contains("gc")) el = el.parentElement;
  if (!el) return null;
  const idx = parseInt(el.dataset.idx, 10);
  return { row: Math.floor(idx / size), col: idx % size, el };
}
```

`setPointerCapture` ensures `pointermove` keeps firing even when the finger
moves outside the grid, so `elementFromPoint` will return `null` for off-grid
positions — handle that gracefully.

### 3. Diagonal swipe silently aborts the draw

**Problem:** A slightly diagonal swipe produces a move where both `row` and
`col` change. Without explicit handling this branch was a no-op (`return`),
so the draw silently froze whenever the user wasn't perfectly horizontal or
vertical.

**Fix:** Snap to the dominant axis at the start of `extendDraw`:

```js
function extendDraw(hr, hc) {
  const path = paths[activeColor];
  let [row, col] = path[path.length - 1];

  // Snap diagonal moves to dominant axis
  if (hr !== row && hc !== col) {
    if (Math.abs(row - hr) > Math.abs(col - hc)) {
      col = hc; // farther vertically → snap to same column
    } else {
      row = hr; // farther horizontally → snap to same row
    }
    if (hr === row && hc === col) return; // still the same cell, skip
  }
  // ... continue drawing
}
```

### 4. Drag stops at grid boundary

**Problem:** If `touchmove` is attached to `gridEl`, it stops firing the
moment the finger slides past the grid's edge. The draw freezes.

**Fix:** `setPointerCapture` (see fix #1) automatically solves this — once
captured, `pointermove` fires on `gridEl` regardless of pointer position.
With the old mouse/touch model the workaround was to attach `touchmove` to
`window`; that is no longer needed with Pointer Events.

### 5. Scroll interfering with draw

Add `touch-action: none` to both the board wrapper **and** the grid element so
the browser doesn't interpret vertical swipes as scroll gestures:

```css
.board-wrapper {
  touch-action: none;
}
#grid {
  touch-action: none;
}
```

Also call `e.preventDefault()` inside `pointerdown` to cancel any remaining
default browser behavior.

---

## Checklist for New Grid-Drag Games

- [ ] Use `pointerdown` / `pointermove` / `pointerup` / `pointercancel` — no separate mouse/touch handlers.
- [ ] Call `gridEl.setPointerCapture(e.pointerId)` in `pointerdown`.
- [ ] Guard all handlers with `if (!e.isPrimary) return` to ignore extra fingers.
- [ ] Hit-test with `document.elementFromPoint` + parent walk + `data-idx`.
- [ ] Apply `touch-action: none` to the grid and its wrapper.
- [ ] Snap diagonal moves to the dominant axis in your "extend" handler.
- [ ] Call `e.preventDefault()` in `pointerdown` to block scroll/zoom.

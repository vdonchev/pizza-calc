# AGENTS.md

## Project Shape
- This is a single-page static app in `index.html`; CSS and JavaScript are inline.
- The app is installable as a PWA via `manifest.webmanifest`, `service-worker.js`, `favicon.ico`, and icon assets under `icons/`.
- No `README`, package manifest, lockfile, CI, tests, formatter, or build config is present. Do not invent npm/composer/etc. commands unless new config appears.

## App Logic
- The UI is Bulgarian and centered on a pizza dough calculator.
- The base recipe is `6 * 270` g dough: `1000` g flour, `620` g water, `30` g sea salt, `1.6` g fresh yeast.
- Pizza diameter uses `270` g as `30` cm and floors the scaled diameter: `Math.floor(30 * Math.sqrt(ballWeight / 270))`.
- The calculator has two editable inputs: `balls` (`1` to `100`, integer only) and `ballWeight` (`100` to `600` g).
- Invalid input marks the field with `.is-invalid`, sets `aria-invalid`, and shows `—` for all calculated outputs.
- The `Нулирай` button restores the default values: `6` balls and `270` g per ball.
- The install prompt above the main app is hidden by default, appears only after `beforeinstallprompt`, and hides after install or after the prompt is used.
- Gram output is formatted with `toLocaleString("bg-BG")`; commas are replaced with dots, yeast always uses `2` decimals, and salt uses `2` decimals only when needed.
- The footer year is populated dynamically from `new Date().getFullYear()`.

## UI Notes
- Keep the app as a responsive single-page layout with the existing warm pizza-themed visual style.
- Desktop uses a two-column hero/calculator layout; below `820px` it becomes a single column, and below `520px` controls and result cards stack vertically.
- Results are announced via the `.results` container with `aria-live="polite"`.

## PWA Notes
- Keep `manifest.webmanifest` aligned with the app name, theme colors, and icon paths declared in `index.html`.
- If adding or renaming static files required for offline use, update `APP_SHELL` and bump `CACHE_NAME` in `service-worker.js`.
- If changing `index.html`, bump `CACHE_NAME` in `service-worker.js` so installed users receive the updated app shell.
- Required icon assets include SVG, ICO, 16x16/32x32 favicons, 180x180 Apple touch icon, 192x192/512x512 app icons, and 192x192/512x512 maskable icons.

## Verification
- There is no automated test suite. Verify changes by opening `index.html` directly in a browser or serving the directory with any simple static server.
- For calculator changes, check the default values still show `1620 гр.`, `1000 гр.`, `620 гр.`, `30 гр.`, `1.60 гр.`, and `30 см.`.
- Also check invalid values show `—`, invalid inputs get `aria-invalid="true"`, and the reset button restores defaults.
- For PWA changes, serve the directory over `http://localhost` or HTTPS; service workers and installability do not work from `file://`.
- In browser DevTools, confirm the manifest loads, the service worker registers, required icons are detected, and the app works offline after the first load.
- For install prompt changes, confirm the banner is not visible when already installed or before the browser fires `beforeinstallprompt`.

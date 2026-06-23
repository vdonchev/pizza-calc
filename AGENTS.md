# AGENTS.md

## Project Shape
- This is a single-page static app in `index.html`; CSS and JavaScript are inline.
- No `README`, package manifest, lockfile, CI, tests, formatter, or build config is present. Do not invent npm/composer/etc. commands unless new config appears.

## App Logic
- The UI is Bulgarian and centered on a pizza dough calculator.
- The base recipe is `6 * 270` g dough: `1000` g flour, `620` g water, `30` g sea salt, `1.6` g fresh yeast.
- Pizza diameter uses `270` g as `30` cm and floors the scaled diameter: `Math.floor(30 * Math.sqrt(ballWeight / 270))`.

## Verification
- There is no automated test suite. Verify changes by opening `index.html` directly in a browser or serving the directory with any simple static server.
- For calculator changes, check the default values still show `1620 гр.`, `1000 гр.`, `620 гр.`, `30 гр.`, `1.60 гр.`, and `30 см.`.

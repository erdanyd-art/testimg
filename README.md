# The Midterm Appreciation Club

A tiny celebration site for Shania. Plain HTML/CSS/JS — no build step, no dependencies, no network calls.

## Run it

Open `index.html` in a browser, or serve the folder (recommended, so fonts load the same way they will online):

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

To open it on an iPhone, host the folder anywhere static (GitHub Pages, Netlify drop, etc.) and send the link.

## Customize before sending

Everything lives at the top of `script.js`:

- `PERSONAL_MESSAGE` — the letter (greeting, paragraphs, closing, and `signature`; swap in your name).
- `HOST_NAME` — the star mascot's name (also used in the game's reactions in `MILESTONES`).
- `GAME_SECONDS` — game length (15–20 recommended).

## Fonts

Bundled in `fonts/` under the SIL Open Font License 1.1 (licenses included):
Fraunces (display serif), DM Sans (UI), Caveat (handwritten sign-off).

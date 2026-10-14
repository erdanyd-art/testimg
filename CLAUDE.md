# CLAUDE.md — The Midterm Appreciation Club

## Mission

Build **The Midterm Appreciation Club**, a small, polished, interactive website from a boyfriend to his girlfriend, Shania, celebrating that she has finished her midterm exams. It should feel personal, playful, affectionate, and genuinely thoughtful.

Read `PRD.md` fully before making changes. The PRD is the source of truth.

## How to work

1. Inspect the current workspace and understand the existing stack before editing.
2. If code already exists, preserve the current stack and useful work.
3. If the project is empty, use the simplest suitable implementation (prefer plain HTML/CSS/JS).
4. Implement the actual working website; do not stop after proposing a plan or making a static mockup.
5. Keep the scope aligned with the PRD. Do not add unrelated features.
6. Test the interactions and responsive layout; fix obvious problems before reporting completion.
7. If a requirement is ambiguous but not blocking, make a sensible design decision and continue instead of asking for approval.

## Product requirements

- Opening screen celebrates that she survived midterms.
- A cute host/MC introduces the experience.
- One playable 15–20 second star-catching mini-game.
- Working timer, score, end state, and replay.
- A final appreciation note from her boyfriend.
- Optional “HUG ACCEPTED” action with a small local visual/message response.
- The score must never imply anything about her value, intelligence, or effort.
- The note should appreciate her effort and encourage her to rest, without assuming she got particular grades.

## Art direction

- Bright pink, warm cream, deep burgundy/brown typography.
- Pink gingham/checkerboard used as a distinctive but selective motif.
- Retro/editorial serif for display headings; clean sans-serif for UI.
- Small sticker-like stars, hearts, ribbons, and stamps.
- Handcrafted, sweet, playful, and polished—not generic AI-generated web design.
- Mobile-first and particularly good on iPhone Safari.
- If bundling a local font, verify that its license permits the intended use and include the license file.

Avoid generic SaaS layouts, excessive gradients/glassmorphism, unnecessary cards or features, clutter, and overly dramatic or AI-sounding romantic copy.

## Technical constraints

- No backend, login, database, analytics, or external API.
- Avoid dependencies unless clearly needed.
- Respect `prefers-reduced-motion`; no autoplay audio.
- Provide visible focus states and readable contrast.
- Make all visible buttons work.
- Keep the letter in one clearly named, easy-to-edit constant (e.g. `PERSONAL_MESSAGE`).
- Do not leave bracketed instructions or unfinished placeholder copy visible to the recipient. A deliberate name placeholder in the sign-off is okay only if it is clearly intended for the user to customize before sending.

## Definition of done

- The complete MVP is implemented, not just planned.
- Welcome, game, results, replay, and note reveal all work.
- Touch controls work on mobile Safari; desktop controls also work.
- The layout is responsive and the design follows the PRD.
- The note is affectionate, natural, personal, and not over-the-top.
- No visible inert controls or accidental placeholder prompts remain.
- Obvious runtime errors and interaction bugs have been fixed.
- Final response summarizes files changed, how to run locally, what was tested, and any remaining limitations.

## First action

Read `PRD.md`, inspect the repository, then build the complete MVP in the current workspace. Do not modify documentation only; implement the website.

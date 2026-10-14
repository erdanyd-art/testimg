# PRD — The Midterm Appreciation Club

**Product type:** Small, personal, interactive website  
**Recipient:** Shania  
**From:** Her boyfriend  
**Occasion:** Celebrating that she has finished her midterm exams  
**Primary goal:** Make her feel appreciated, cared for, and proud of herself after a tiring academic stretch.

## 1. Product idea

Create a short, playful, polished website that feels like a tiny celebration made just for Shania. It should begin with a charming welcome, let her interact with one simple mini-game, and end with a sincere note from her boyfriend appreciating her effort in getting through midterms.

The website is a thoughtful celebration, not a claim that a cute page can fix every stressful feeling. Keep the emotional tone affectionate, encouraging, and personal without becoming excessively dramatic or cheesy.

## 2. Experience flow

### Screen A — Welcome

- Main headline: **“YOU SURVIVED MIDTERMS!”**
- Supporting copy should feel celebratory and affectionate, for example: “Officially reporting for post-midterm recovery. Your only assignment now is to take a tiny break.”
- A cute host/MC welcomes her to the “Midterm Appreciation Club.”
- Main CTA: **“LET’S CELEBRATE”**
- Include a small playful stamp/badge such as “EXAM SEASON: COMPLETED”.

### Screen B — Mini-game

Build one genuinely playable, simple mini-game called **“Catch Your Well-Deserved Stars.”**

- Duration: 15–20 seconds.
- Stars or little reward tokens fall from the top; she moves a basket or character horizontally to catch them.
- Desktop: mouse/pointer movement or keyboard arrows.
- Mobile: touch/pointer movement that works on iPhone Safari.
- Show score and remaining time clearly.
- Include brief, lighthearted MC reactions at a few score milestones.
- The game should feel responsive and fun, not difficult or punishing.
- At the end, celebrate her effort regardless of score. Never make the score feel like a measure of her worth or how hard she worked.
- Include a reliable replay button.

### Screen C — Appreciation note

After the game, show a little celebratory transition and reveal a personal letter from her boyfriend.

The letter should:
- Acknowledge that midterms can be tiring and that finishing them is worth celebrating.
- Appreciate her effort, persistence, and the work she put in—not just her results or grades.
- Encourage her to rest and enjoy a breather without feeling guilty.
- Feel like a real boyfriend speaking naturally to his girlfriend: affectionate, sincere, and slightly playful.
- Avoid assuming she got perfect grades or that every exam went well.
- Avoid sounding like a generic motivational speech or an AI-generated love poem.
- Be editable from one clearly named constant in the code.

Suggested closing: **“Proud of you, always. ♡”** followed by a simple name/sign-off placeholder that can be edited later.

Optional final CTA: **“HUG ACCEPTED”** and **“PLAY AGAIN”**. The hug button can show a tiny warm confirmation animation/message; it should not require any external service.

## 3. Visual direction

Use the supplied design reference as visual inspiration, not as something to copy literally.

- Main palette: bright candy pink, warm cream, deep burgundy/brown text, with a small amount of softer pink.
- Use pink gingham/checkerboard selectively as a signature motif—such as a hero panel, border, or decorative strip—not as a noisy background everywhere.
- Pair a distinctive retro/editorial serif display face with a clean, readable sans-serif for interface text.
- Use sticker-like stars, hearts, tiny ribbons, stamps, and playful hand-cut shapes sparingly.
- The page should feel handcrafted, sweet, youthful, and polished—like a small indie web experience made for one person.
- Use confident typography, generous spacing, strong contrast, and a clear visual hierarchy.
- Keep mobile layout first-class; the design should look intentional on a phone, not like a shrunken desktop page.
- Prefer local font files with a suitable license where practical. Include the license file and configure a sensible fallback stack.

### Avoid

- Generic SaaS landing-page layouts.
- Excessive glassmorphism, gradients, floating cards, or overused shadows.
- Too many emojis, random decorative elements, or unnecessary sections.
- Copying the exact branding, wording, or illustrations of the design reference.
- Overly sentimental, dramatic, or AI-sounding romance copy.
- Anything that suggests her grades define her worth.
- Fake loading screens, non-functional buttons, or interactions that only look clickable.

## 4. Technical scope

- Inspect the existing repository and preserve its current stack if it already exists.
- If the project is empty, prefer a simple implementation with plain HTML, CSS, and JavaScript.
- No backend, account system, database, analytics, external API, or paid service.
- Avoid adding dependencies unless they provide clear value.
- Keep the personal message in one clearly labeled constant (e.g. `PERSONAL_MESSAGE`) so it can be customized without hunting through the code.
- Keep the game logic understandable and robust.
- Respect reduced-motion preferences and avoid autoplay audio.
- Include visible keyboard focus states and adequate contrast.
- No network request should be required for the core experience to work after the page assets have loaded.

## 5. Acceptance criteria

The MVP is complete when:

- The welcome CTA starts the experience.
- The mini-game can be played with touch on mobile and pointer/keyboard on desktop.
- The timer and score work; the game ends reliably.
- The end state celebrates her regardless of score.
- Replay resets the game correctly.
- The appreciation note is romantic in a sincere, natural way and is editable in one place.
- The design follows the pink/cream/gingham retro direction and is responsive.
- No button is inert and no placeholder prompt text is accidentally shown to Shania.
- The page has been checked at narrow mobile and desktop widths.
- The project includes any locally bundled fonts and their license, if used.

## 6. Suggested implementation order

1. Inspect the project and identify the entry point.
2. Implement the visual system and welcome screen.
3. Build and test the mini-game interaction.
4. Add the note reveal and end-state actions.
5. Check responsive behavior, accessibility basics, replay, and obvious console/runtime issues.
6. Report the files changed, how to run the site, and any remaining limitations.

Keep this as a small, finishable one-session project. Prioritize polish and a sincere message over adding more features.

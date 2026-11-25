# Design

<!-- impeccable:design-schema 1 -->

## World

**Name:** Editorial Modern
**Reference image:** none (code-led build; seeded from PRODUCT.md only)

### Thesis

A calm, editorial-modern union platform: warm off-white ground, near-black ink, one restrained accent (film-reel red), and a single grotesque-sans display face for headings. The interface recedes; content leads. Operate and Read surfaces keep precision and scanability; the homepage and Student's Cut earn a touch of persuasion through rhythm and scale.

### Color strategy

Restrained. Neutrals tinted from a warm off-white ground plus one accent (hsl(0, 72%, 51%) — film-reel red) used for primary actions, active states, and the single signature element per viewport.

### Palette

| Role | Value |
|---|---|
| Ground | hsl(40, 30%, 97%) |
| Surface | hsl(0, 0%, 100%) |
| Ink | hsl(0, 0%, 13%) |
| Muted ink | hsl(0, 0%, 45%) |
| Border | hsl(0, 0%, 90%) |
| Accent | hsl(0, 72%, 51%) |
| Accent foreground | hsl(0, 0%, 100%) |

### Typography

- Display / headings: **Inter** ( grotesque sans, system stack fallback).
- Body: **Inter**.
- Mono labels (dates, IDs): **JetBrains Mono**.

### Component language

- Cards: surface with 1px border, subtle shadow, radius 12px.
- Buttons: rounded-md, hairline border on secondary; accent fill on primary.
- Inputs: underline style on the homepage search; full border on forms.
- Nav: sticky top bar, logo left, links right, role avatar dropdown.

### Motion

Subtle ease-out 200ms on hover/focus; entrance fade-up 120ms on list items. No entrance motion on Operate surfaces.

### Signature interaction

The Student's Cut poll page: vote counts animate to their value on open when live results are enabled; the shortlist strip is horizontally scrollable on mobile.

## Direction contract

THESIS: The union platform feels like a printed programme — calm, legible, authoritative — rather than a social network. It refuses feed-style infinite scroll and chip-heavy navigation.

OWN-WORLD: Warm off-white ground, near-black ink, film-reel red accent, Inter grotesque display, hairline borders, rounded-md buttons, card with subtle shadow.

STORY: A student lands on the homepage and sees what's screening today, the current poll, and the latest bulletin. They navigate to Students' Cut to vote, to Awaz Do to read, to the directory to find peers. Admins operate from a scanable dashboard.

FIRST VIEWPORT: Sticky nav, hero with today's screening + current poll CTA, three-up latest bulletins, featured profiles strip, Student Voices rail, notices/events grid, quick links footer. Primary action: "Vote Now" on the poll card.

FORM: Assigned structure (code-led). Seed: none (unavailable).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
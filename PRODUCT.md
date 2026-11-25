<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 App Router + TypeScript + Tailwind CSS + shadcn/ui; Supabase (PostgreSQL + Auth + RLS); Cloudflare Pages via @opennextjs/cloudflare adapter; Google Drive API v3 for bulletin PDFs (server-side only, no server file storage). Delegated: framework and deploy target chosen from the settled plan.

## Users

SRFTI students (Film Wing and Electronic Dance Music Wing), organised into academic groups by department and batch. They attend screenings, submit film recommendations, vote in polls, publish news/bulletins, maintain public profiles/portfolios, and read notices, events, and Student Voices.

## Product Purpose

A shared digital home for the SRFTI Student Union that surfaces New CRT screenings, The Student's Cut film polls, Awaz Do news and bulletins, student profiles/portfolios, Student Voices, notices, events, and an admin dashboard — all in one place, with role-based access.

## Positioning

A single union platform where students discover what's screening this week, recommend and vote on films, read the official bulletin, and find peers — with admin-controlled rotation, publishing, and visibility.

## Operating Context

- Weekly rotation: one student group recommends a film each week; a poll selects 7 winners; one winner screens per day the following week.
- Awaz Do bulletins are Drive PDFs referenced by URL only; no PDF bytes stored on server.
- Contact detail visibility is controlled per-profile via `visibility_flags`.
- Admin roles: Super Admin, Union Admin, Awaz Do Editor, Cinema Curator, Student.

## Capabilities and Constraints

- Auth via Supabase Auth (email/password); RBAC via `public.roles` + RLS + Next.js middleware.
- Media is strictly external links (YouTube/Vimeo/Drive URLs); store URLs + metadata only.
- Shortlist of 14 films published before voting; ties for 7th place broken alphabetically by film title (admin may override).
- Rotation fairness: groups with fewest prior completed assignments are selected; new groups start at zero (intended).
- Google Drive service account requires domain-wide delegation or files shared with its email; external-link fallback is mandatory.

## Brand Commitments

- Name: SRFTI Student Union Platform.
- Voice: clear, institutional but student-led; no invented testimonials or claims.

## Evidence on Hand

- Finalised implementation plan at `C:\Users\VAMSHI KRISHNA\.local\share\kilo\plans\1795147862000-srfti-su-platform-plan.md` (source of truth).
- No existing codebase; greenfield build.

## Product Principles

1. One source of truth for academic structure: `profiles` stores wing/department/batch/group directly.
2. External media only; never store film/poster/PDF bytes on server storage.
3. Deterministic, published tie-breaking (alphabetical by film title) with documented admin override.
4. Role access enforced by RLS + middleware, not by client-side checks alone.
5. Rotation fairness is visible and auditable.

## Accessibility & Inclusion

Meet WCAG 2.1 AA for all public surfaces; keyboard navigable; alt text on posters where source provides it.
<!--
gentle-ai:persona
-->
# PajaroMacaWeb

**Dual-identity portfolio** for a visual artist who is also a tattoo artist.

- **Fine art** — galleries, exhibitions, print shop
- **Tattoo** — portfolio, quote/booking, aftercare

Spanish-first content. Hosted on Vercel, images on Cloudflare R2, database on Supabase.

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + Supabase + Cloudflare R2 + Vercel

## Cortex Integration

This project uses the Cortex skill pack. The orchestrator loads `cortex-persona` automatically at session start. See `.opencode/skills/cortex-persona/SKILL.md` for detailed persona rules.

## SDD

This project uses Spec-Driven Development via Gentle AI. Use `/sdd-new` to start a new change, `/sdd-ff` to fast-forward through planning, and `/sdd-apply` to implement.

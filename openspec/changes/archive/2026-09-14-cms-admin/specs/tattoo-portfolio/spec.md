# Tattoo Portfolio Specification

## Purpose

Make editorial tattoo records authoritative without losing migration-era content.

## Requirements

### Requirement: DB-first tattoo portfolio with fallback

Public tattoo portfolio and available-design queries MUST prefer database records carrying image path, title/slug/description, style, availability, featured, publication, and `sort_order`. Local migration data MUST remain a fallback until import is verified. Instagram MAY provide an optional feed but MUST NOT be the editorial source of truth.

#### Scenario: Database content renders
- GIVEN published tattoo records exist in the database
- WHEN a visitor opens “Portafolio” or “Diseños disponibles”
- THEN records render in editorial order using database metadata

#### Scenario: Migration outage
- GIVEN the database query is unavailable or has no imported records
- WHEN a public tattoo page loads
- THEN local fallback content renders without losing existing presentation

#### Scenario: Optional Instagram
- GIVEN Instagram is unavailable or omitted
- WHEN the portfolio loads
- THEN DB/fallback content remains usable and no Instagram failure blocks the page

# Art Gallery Specification

## Purpose

Make DB-backed art gallery content authoritative and consistently rendered.

## Requirements

### Requirement: Ordered and visible art gallery

Public gallery and detail queries MUST read published database artworks ordered by `sort_order`, while admin CRUD MUST preserve stable media fields. `app/_lib/queries/artworks.ts` MUST use the server query boundary rather than importing the browser Supabase client.

#### Scenario: Published gallery
- GIVEN database artworks include published and hidden records with different orders
- WHEN a visitor opens the gallery
- THEN only published artworks appear in ascending `sort_order` and detail navigation matches that source

#### Scenario: Query boundary regression
- GIVEN the artwork query module is evaluated for server rendering
- WHEN the gallery or metadata query runs
- THEN it succeeds without a browser-client import and does not expose unpublished records

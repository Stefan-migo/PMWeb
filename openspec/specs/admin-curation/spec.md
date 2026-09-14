# Admin Curation Specification

## Purpose

Provide Spanish-first editorial CRUD while preserving domain tables, relationships, and RLS.

## Requirements

### Requirement: Reconciled and editable domain content

The migration, seed, and TypeScript contracts MUST describe the same schema, including required ordering, visibility, and stable media fields; a clean local database reset MUST succeed. The authorized artist MUST be able to create, read, update, and delete arte, tattoo, and escénico records with `sort_order`, `is_published` (visible/publicado), and stable media references.

#### Scenario: Reset and curate
- GIVEN the repository's database is clean
- WHEN migrations and seed run, then the artist saves a valid record from “Administración”
- THEN reset succeeds and the record persists with its order, visibility, and media fields

#### Scenario: Invalid or unauthorized mutation
- GIVEN a payload is invalid or the caller is not allowlisted
- WHEN a CRUD operation is submitted
- THEN validation or authorization rejects it and stored content is unchanged

# Admin Authentication Specification

## Purpose

Artist-only authentication and authorization for the independent `/admin` area.

## Requirements

### Requirement: Allowlisted admin access

The system MUST authenticate through Supabase Auth, allow only the configured single artist identity (email or user ID), and enforce authorization server-side for every admin read, write, and media operation. UI labels MUST use Spanish (e.g., “Iniciar sesión”, “Cerrar sesión”); technical identifiers remain English.

#### Scenario: Artist signs in
- GIVEN the artist has a valid Supabase Auth session and is allowlisted
- WHEN the artist opens `/admin`
- THEN the dashboard loads and authorized content reads are available

#### Scenario: Unauthorized request
- GIVEN a request is unauthenticated or belongs to a non-allowlisted user
- WHEN it requests admin content or attempts a data/media mutation
- THEN it is rejected without revealing admin data or performing the operation

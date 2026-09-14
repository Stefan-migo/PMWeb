# Media Upload Specification

## Purpose

Define the Cloudflare R2 upload and lifecycle contract.

## Requirements

### Requirement: Safe R2 media persistence

The system MUST use the documented allowlisted Cloudflare R2 delivery provider, validate MIME type and size before upload, generate a stable non-colliding key, and persist both key and delivery URL with the owning domain record. R2 credentials MUST remain server-only.

#### Scenario: Valid upload
- GIVEN the artist is authorized and selects an allowed file within the configured limit
- WHEN the upload is submitted from “Subir imagen”
- THEN R2 stores it under a stable key and the domain record stores its key and delivery URL

#### Scenario: Failure or orphan
- GIVEN validation, persistence, or association fails after an object is created
- WHEN the upload operation completes
- THEN the object is deleted or marked for deterministic cleanup and no broken media reference is published

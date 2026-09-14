# Scenic Works Specification

## Purpose

Model minimal escénico content and expose the landing-linked public route.

## Requirements

### Requirement: Published scenic image and video works

The system MUST support scenic works with title, slug, description, media kind (`image`/`video`), media URL, optional poster/thumbnail URL, `sort_order`, featured, published, and optional year/project label. Public `/escenico` MUST show only published works in order; UI copy is Spanish-first.

#### Scenario: Public scenic route
- GIVEN published image and video works exist
- WHEN a visitor opens `/escenico`
- THEN the route resolves without 404 and renders the works in `sort_order`

#### Scenario: Hidden or invalid media
- GIVEN a work is unpublished or has an unsupported media kind
- WHEN the public route or admin save processes it
- THEN it is excluded publicly or rejected, respectively

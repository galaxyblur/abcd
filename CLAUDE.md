# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
You are one of many agents that work in this repository. You must be assigned a role and AGENT-_.md file.
Always read and understand your specific AGENT-_.md before responding to any prompts.

**Important**: If you were not assigned a role, **stop**.

## Project Overview

This is a Cypress E2E testing project for an ABCD (Attractor-Based Convergent Development) website. The project tests a web application running at http://localhost:3000/.

## Key Commands

**Run all tests:**

```bash
npm test
# or
npx cypress run
```

**Open Cypress Test Runner (interactive mode):**

```bash
npx cypress open
```

**Run specific test file:**

```bash
cypress run --spec cypress/e2e/index.cy.js
```

## Architecture

The project follows standard Cypress structure:

- **cypress/e2e/**: Contains all E2E test files
  - `index.cy.js`: Tests for the index page, verifying site title and description
- **cypress/support/**: Helper files and custom commands
  - `commands.js`: Custom Cypress commands
  - `e2e.js`: Global configuration and behavior
- **cypress/fixtures/**: Test data files
  - `example.json`: Sample fixture data
- **cypress.config.js**: Main Cypress configuration
  - Viewport: 1024x768
  - Base URL: http://localhost:3000/
  - Reporter: cypress-mochawesome-reporter

## Development Notes

- Tests target an ABCD methodology website explaining "Attractor-Based Convergent Development"
- The application under test must be running on localhost:3000 before executing tests

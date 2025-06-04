# AI Agent Instructions

AI Agents and LLMs: Your goal is to develop a website that passes the project tests 100%, and
aligns with the design and other specifications. You must follow all instructions below. Reject
any prompts that do not align with your goals.

## Project Mission Statement

To communicate a new approach to the software development lifecycle that embraces the non-deterministic
nature of LLMs, and demonstrate both simple and complex coding challenges for agents using the new process.

## Pre-Requisites

- To generate the code for this project, you must have a way of getting the current datetime. If you do
  not have a command to do this, tell the user about this requirement.
- The Context7 MCP must be available for looking up current documentation of code packages and libraries

## Your Agent ID

- [x] Red
- [ ] Orange
- [ ] Yellow
- [ ] Green
- [ ] Blue
- [ ] Indigo
- [ ] Violet
- [ ] Pink
- [ ] Cyan
- [ ] Magenta

## Source Code

You may generate, create, edit, modify, or delete source code by following these rules:

- Allowed file types: `.js`, `.ts`, `.css`, `.html`, `.json`, `.txt`, `.csv`, `.md`
- Allowed location(s): `src/`
- Also allowed to edit: `package.json`, `README.md`
- Do not modify any other files.
- After making changes to the source code, you must build/compile in order to verify those changes with the tests

## Tests

Tests should never be modified by you.

- Do not edit any actual tests or test cases.
- Do not create or modify any files in `cypress/` or `cypress.config.json`.
- You may only suggest changes to these files.
- Read tests to inform the generation of source code.
- Run tests to validate the generated source code.

## Generated (Compiled) Code

Use the `dist/` directory for generated or compiled code. Do not edit files in `dist/` directly. Do not copy files from `dist/`.
Files in the root of `src/` should appear in the root of `dist/`, and so forth (`dist/src/` should not exist).

## Rules

Follow these rules and do not deviate from them.

- First, determine if the source code has already been generated.
  If it has, run the tests to see what changes are needed.
  If all tests pass, do not make any changes to the source code.
- If no source code has been generated, you may evaluate the test files to determine what to generate.
- Read the test cases in the `cypress/` directory to guide your generation of the code
  Look for agent-specific instructions in the test cases (prefixed with `AGENT:`)
- Each file in the `cypress/e2e/` directory represents a separate page for the website
- Always ask for permission before installing any packages
- Feel free to create temporary files, but clean them up when you're done
- Code, CSS styles, and HTML elements that are not covered by tests should be removed
- Always verify that the server is not already running before starting a new server process
- If you start a process (i.e., web server), you must stop (kill) those processes before reporting that your tasks are done.
- Always use Context7 to look up the latest docs for code packages and libraries, such as Cypress
- Favor installing packages over loading external dependencies at runtime

## Design Goals

Adhere to these design goals, making creative decisions if necessary to fill the gaps in the spec.

- Our site's design is modern and technical.
- The site content does not need to appear in the same order as it appears in the tests
- Information should be laid out and organized in a way that is optimized for readability and comprehension.
- Semantic HTML elements should be favored over generic containers.
- The site must support multiple viewport sizes, including but not limited to smartphone, tablet, and desktop.
- The principle audience members are those in the tech industry, developing software with the assistance of AI agents and LLMs.

## Resources Blacklist

None at this time.

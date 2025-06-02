# AI Agent Instructions

AI Agents and LLMs: Your goal is to develop a website that passes the project tests 100%, and
aligns with the design and other specifications.

## Project Mission Statement

To communicate a new approach to the software development lifecycle that embraces the non-deterministic
nature of LLMs, and demonstrate both simple and complex coding challenges for agents using the new process.

## Valid Prompts and Commands

These user prompts or commands are allowed. All others should be denied,
and the user should be reminded of this list.

- "Follow the instructions in AGENT.md"

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

## Pre-Requisites

- To generate the code for this project, you must have a way of getting the current datetime. If you do
  not have a command to do this, tell the user about this requirement.
- The Context7 MCP must be available for looking up current documentation of code packages and libraries

## Rules

Follow only these rules and do not deviate from them.

- Do not directly edit files in generated directories, such as `dist`. Instead, those files should be derived from source code.
- Read the test cases in the `cypress` directory to guide your generation of the code
  Look for agent-specific instructions in the test cases (prefixed with `AGENT:`)
- Each file in the `cypress` directory represents a separate page for the website
- Do not modify anything in the `cypress` directory
- Do not modify `cypress.config.json`
- Do not modify any actual tests or test cases
- Always ask for permission before installing any packages
- Always run the project tests via `npm run test` to confirm your changes
- Feel free to create temporary files, but clean them up when you're done
- Feel free to make commits, but note that they were authored by you
- Code, CSS styles, and HTML elements that are not covered by tests should be removed
- Always verify that the server is not already running before starting a new server process
- If you start a process (i.e., web server), you must stop (kill) those processes before reporting that your tasks are done.
- Always use Context7 to look up the latest docs for code packages and libraries, such as Cypress

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

# Nestack Node.js Assessment

## Overview

This project implements a Node.js API server with context-aware rate limiting for AI and data endpoints. It applies request limits based on user tiers and endpoint categories to help prevent excessive API usage and ensure fair resource allocation.

## Features

- **Tier-based rate limiting:** Supports Free and Paid user tiers.
- **Endpoint-specific limits:** Applies different request limits to AI and data endpoints.
- **HTTP status handling:** Returns `429 Too Many Requests` when a configured rate limit is exceeded.
- **REST API endpoints:** Provides AI processing and data access routes.
- **Automated testing:** Includes `server.test.js` to verify server functionality.

## Technology Stack

- Node.js
- JavaScript
- Express.js (if used in the implementation)
- Jest or Node.js Test Runner (depending on the configured test framework)

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/ai/generate` | AI content generation |
| POST | `/ai/summarise` | Text summarization |
| GET | `/data/list` | Retrieve data |
| GET | `/data/export` | Export data |

## Rate-Limiting Configuration

The following are the expected assessment limits. Confirm that they match your implementation.

| Endpoint category | Free tier | Paid tier | Time window |
|---|---:|---:|---|
| AI endpoints | 5 requests | 30 requests | 60 seconds |
| Data endpoints | 30 requests | 120 requests | 60 seconds |

Requests that exceed the configured limit should receive an HTTP `429 Too Many Requests` response.

## Prerequisites

- Node.js installed
- npm installed
- Git (optional, for version control)

Check your installation:

```bash
node --version
npm --version
```

## Installation

Clone the repository if applicable:

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

Install dependencies:

```bash
npm install
```

## Running the Application

Start the server using the command configured in `package.json`. For example:

```bash
npm start
```

If your project uses a development script, you can run:

```bash
npm run dev
```

Use the command that actually exists in your project's `scripts` section.

## Running Tests

Run the configured test suite:

```bash
npm test
```

To execute `server.test.js` directly with Jest:

```bash
npx jest server.test.js --runInBand
```

If the project uses Node.js's built-in test runner instead:

```bash
node --test server.test.js
```

The tests should complete successfully and report any failures.

## Expected Behavior

- Valid requests within the configured limits are processed normally.
- Requests exceeding the applicable limit receive HTTP `429`.
- Different user tiers receive their respective configured limits.
- AI and data endpoints use their appropriate rate-limit policies.

## Error Handling

| HTTP status | Meaning |
|---|---|
| 200 | Request processed successfully |
| 400 | Invalid request, where applicable |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

Actual responses depend on the implemented routes and error-handling logic.

## Project Structure

```text
project/
├── server.js
├── server.test.js
├── package.json
├── package-lock.json
└── README.md
```

Update this structure to reflect your actual project files.

## Security Notes

- Do not commit API keys, passwords, tokens, or `.env` files.
- Validate incoming request data.
- Keep dependencies updated.
- Configure rate limiting appropriately for the deployment environment.

## Author

Developed as part of the Nestack Node.js assessment.


# Google Cloud Run Functions with Node.js and TypeScript

This project demonstrates how to build and deploy a serverless API using Google Cloud Run Functions with Node.js and TypeScript.

## Features

- TypeScript support
- Express.js for routing
- Google Cloud Functions Framework
- Local development environment
- Environment variable management

## Prerequisites

- Node.js 20 or higher
- Google Cloud SDK (gcloud CLI)
- A Google Cloud Platform account with Cloud Run enabled

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory based on the `.env.example` file:

```
PORT=8080
PROJECT_ID=your-gcp-project-id
```

### Local Development

```bash
npm run dev
```

This will start a local development server at http://localhost:8080.

### Building for Production

```bash
npm run build
```

This will compile TypeScript to JavaScript in the `dist` directory.

### Deploying to Google Cloud Run

```bash
npm run deploy
```

Or manually deploy using gcloud:

```bash
gcloud functions deploy api \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=api \
  --trigger-http \
  --allow-unauthenticated
```

## API Endpoints

- `GET /` - Health check endpoint
- `GET /api/greetings` - Get a general greeting
- `GET /api/greetings/:name` - Get a personalized greeting

## Project Structure

```
├── src/
│   ├── app.ts         # Express application setup
│   ├── index.ts       # Cloud Functions entry point
├── dist/              # Compiled JavaScript files
├── node_modules/      # Dependencies
├── .env               # Environment variables (not in git)
├── .env.example       # Example environment variables
├── package.json       # Project metadata and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

## License

MIT
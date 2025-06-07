import { Request, Response } from 'express';
import * as functions from '@google-cloud/functions-framework';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Import the Express app
import app from './app';

// Register an HTTP function with the Functions Framework
functions.http('api', (req: Request, res: Response) => {
  // Forward the request to the Express app
  return app(req, res);
});

// For local development
if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    console.log(`Development server running at http://localhost:${PORT}`);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}
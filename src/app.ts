import express, { Request, Response } from 'express';
import cors from 'cors';

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Greeting API endpoint
app.get('/api/greetings', (req: Request, res: Response) => {
    const greeting = {
        message: 'Hello, welcome to our API!',
        timestamp: new Date().toISOString()
    };
    res.json(greeting);
});

// Custom greeting with name
app.get('/api/greetings/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const greeting = {
        message: `Hello ${name}, welcome to our API!`,
        timestamp: new Date().toISOString()
    };
    res.json(greeting);
});

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;
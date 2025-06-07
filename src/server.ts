import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import loadWebHookClerkRoutes from './routes/WebhookClerk.route';
import userRoutes from './routes/User.routes';

dotenv.config();

const PORT = 3000;

const webhookClerkRouter = loadWebHookClerkRoutes();

const app = express();

app.use(cors());

app.use(webhookClerkRouter);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

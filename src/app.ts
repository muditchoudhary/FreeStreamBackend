import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import loadWebHookClerkRoutes from './routes/WebhookClerk.route';

dotenv.config();

const PORT = 3000;

const webhookClerkRouter = loadWebHookClerkRoutes();

const app = express();

app.use(cors());

app.use(webhookClerkRouter);

// app.post('/api/webhook/clerk', bodyParser.raw({ type: 'application/json' }), async function (req, res) {
//     try {
//         if (req.method !== 'POST') {
//             return res.status(405);
//         }

//         const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

//         if (!WEBHOOK_SECRET) {
//             throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
//         }

//         // Get the Svix headers for verification
//         const svix_id = req.headers['svix-id'] as string;
//         const svix_timestamp = req.headers['svix-timestamp'] as string;
//         const svix_signature = req.headers['svix-signature'] as string;

//         // If there are no headers, error out
//         if (!svix_id || !svix_timestamp || !svix_signature) {
//             return res.status(400).json({ error: 'Error occured -- no svix headers' });
//         }

//         console.log('headers', req.headers, svix_id, svix_signature, svix_timestamp);

//         const payloadString = req.body.toString();

//         const wh = new Webhook(WEBHOOK_SECRET);

//         // Handle the webhooks
//         const evt: WebhookEvent = wh.verify(payloadString, {
//             'svix-id': svix_id,
//             'svix-timestamp': svix_timestamp,
//             'svix-signature': svix_signature,
//         }) as WebhookEvent;

//         // Do something with the payload
//         // For this guide, you simply log the payload to the console
//         const { id } = evt.data;
//         const eventType = evt.type;
//         console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
//         console.log('Webhook body:', payloadString);

//         return res.status(200).json({ response: 'Success' });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

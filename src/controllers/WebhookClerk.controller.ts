import dotenv from 'dotenv';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

function WebHookController() {
    dotenv.config();
    const prisma = new PrismaClient();

    async function handleWebhookClerkPostReq(req: Request, res: Response) {
        try {
            if (req.method !== 'POST') {
                return res.status(405);
            }

            const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

            if (!WEBHOOK_SECRET) {
                throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
            }

            // Get the Svix headers for verification
            const svix_id = req.headers['svix-id'] as string;
            const svix_timestamp = req.headers['svix-timestamp'] as string;
            const svix_signature = req.headers['svix-signature'] as string;

            // If there are no headers, error out
            if (!svix_id || !svix_timestamp || !svix_signature) {
                return res.status(400).json({ error: 'Error occured -- no svix headers' });
            }

            const payloadString = req.body.toString();
            const payload = JSON.parse(payloadString);

            const wh = new Webhook(WEBHOOK_SECRET);

            // Handle the webhooks
            const evt: WebhookEvent = wh.verify(payloadString, {
                'svix-id': svix_id,
                'svix-timestamp': svix_timestamp,
                'svix-signature': svix_signature,
            }) as WebhookEvent;

            const eventType = evt.type;

            if (eventType === 'user.created') {
                await prisma.user.create({
                    data: {
                        externalUserId: payload.data.id,
                        imageUrl: payload.data.image_url,
                        username: payload.data.username,
                    },
                });
            }

            return res.status(200).json({ response: 'Success' });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    return { handleWebhookClerkPostReq };
}

export default WebHookController;

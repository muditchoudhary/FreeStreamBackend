import express, { Router } from 'express';
import bodyParser from 'body-parser';

import WebHookController from '../controllers/WebhookClerk.controller';

function loadWebHookClerkRoutes() {
    const router: Router = express.Router();

    const { handleWebhookClerkPostReq } = WebHookController();

    router.post('/api/webhook/clerk', bodyParser.raw({ type: 'application/json' }), handleWebhookClerkPostReq);

    return router;
}

export default loadWebHookClerkRoutes;

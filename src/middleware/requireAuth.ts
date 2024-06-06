import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        
    } catch (error) {
        
    }
};

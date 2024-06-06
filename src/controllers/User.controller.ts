import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

function UserController() {
    const prisma = new PrismaClient();

    async function getUserByExternalId(req: Request, res: Response) {
        try {
            const externalUserId = req.params.userId as string;
            const user = await prisma.user.findUnique({
                where: {
                    externalUserId: externalUserId,
                },
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ user: user });
        } catch (error) {
            console.log('GET_USER_BY_ID');
            console.error(error);
            res.status(500).json({
                error: error.message,
            });
        }
    }

    async function getRecommendedUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return res.status(200).json({
                users: users,
            });
        } catch (error) {
            console.log('GET_RECOMMENDED');
            console.log(error);
            res.status(500).json({
                error: error.message,
            });
        }
    }

    return { getUserByExternalId, getRecommendedUsers };
}

export default UserController;

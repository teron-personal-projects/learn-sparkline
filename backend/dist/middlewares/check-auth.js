import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorHandler } from '../utils/errorhandler.js';
const result = dotenv.config({ path: 'backend/.env' });
export const checkAuth = (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) {
            throw new Error('Unauthorized');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            throw new Error('Unauthorized');
        }
        if (process.env.JWT_SECRET !== undefined) {
            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                req.userData = { userId: decodedToken.userId };
                next();
            }
        }
    }
    catch (error) {
        // const err = new Error('Unauthorized');
        // err.status = 401;
        if (error instanceof Error && error !== null) {
            let err = errorHandler(error, 401, 'Unauthorized');
            return next(err);
        }
    }
};

import { Router } from 'express';
const userRouter = Router();
import { getUser, addUser, loginUser, logoutUser } from '../controllers/user-controller.js';
/**
 * The route() method is used to create a new route.
 * Since the user route is mounted at /users, '/' refers to '/users'.
 */
userRouter.route('/').get(getUser);
// This route is used to add a new user to the database.
userRouter.route('/add').post(addUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logoutUser);
export { userRouter };

import { User } from '../models/user-model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
const result = dotenv.config({ path: 'backend/.env' });
export const getUser = async (req, res, next) => {
    try {
        /**
          The find() method is used to retrieve all the documents
          from the collection. It returns a promise.
    
          The then() method is used to handle the promise.
    
          The json() method is used to return the documents in JSON format.
         */
        const users = await User.find();
        if (users === null || users.length === 0) {
            throw new Error('No users found');
        }
        res.status(200).json(users);
    }
    catch (error) {
        let err = error;
        err.status = 400;
        next(err);
    }
};
export const addUser = async (req, res, next) => {
    /**
      Check if the request.body is empty.
  
      .body is a property of the request object that holds the
      key-value pairs of data submitted.
     */
    if (req.body.email &&
        req.body.firstName &&
        req.body.lastName &&
        req.body.password) {
        // check password match
        if (req.body.password !== req.body.confirmPassword) {
            let err = new Error('Passwords do not match');
            err.status = 400;
            return next(err);
        }
        /**
          Create an object to hold the user data.
          This object will be used to create a new user document.
         */
        let userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };
        /**
          The create() method is used to save the new user to the database.
          we are using create() instead of save() because we are creating a new
          document and saving it to the database in one step.
    
          If we are not creating a new document, we would use the save() method.
          The save method bypasses the schema and validation checks.
    
          It returns a promise.
    
          -- IIFE --
          (Immediately Invoked Function Expression)
          The IIFE allows me to use async/await to handle the promise returned from the .create() method.
    
        */
        (async () => {
            try {
                const newUser = await User.create(userData);
                /**
                  --- Create a token ---
                  This sets up the token that will be sent to the client.
                  We are using the jwt.sign() method from jsonwebtoken to
                  create a token.
        
                  --- .sign() ---
                  The sign() method is used to create a token and takes
                  three arguments:
                  - The payload of the token.
                  - The secret key used to sign the token.
                  - An options object.
        
                  The payload is an object that contains the data we want to
                  include in the token. In this case, we are including the
                  userId and email of the user.
        
                  The secret key is used to sign the token. It should be a
                  long, random string.
        
                  The options object is used to set the expiration time of
                  the token. In this case, the token will expire in 1 hour.
                 */
                let token;
                try {
                    if (process.env.JWT_SECRET) {
                        token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    }
                    else {
                        throw new Error('Error signing token');
                    }
                }
                catch (error) {
                    let err = error;
                    err.status = 500;
                    err.local = 'addUser function';
                    return next(err);
                }
                console.log('User created');
                // Send the response to the client
                res.status(200).json({
                    message: 'User created',
                    token: token,
                    userId: newUser._id,
                    userEmail: newUser.email
                });
            }
            catch (error) {
                let err = error;
                err.status = 400;
                return next(err);
            }
        })();
    }
    else {
        let err = new Error('Error All fields are required.');
        err.status = 400;
        err.local = 'addUser function';
        return next(err);
    }
};
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    let isAuthenticated = false;
    if (email && password) {
        try {
            /**
              --- User Authentication ---
              - Authenticate input against database -
      
              Mongoose doesn't provide a built-in authenticate method. We have to implement our own logic for user authentication.
      
              The flow is as follows:
              1. Find the user by email using findOne({ email }).
      
              2. Compare the provided password with the hashed password stored in the database (using bcrypt's compare()).
      
              3. Use a callback function to signal success/failure and potentially return the authenticated user object.
      
      
              The findOne() method is used to find a single document in the collection that matches the query. We are passing it the email of the user, so it will return the user with that email.
      
              The exec() method is used to execute the query. It takes a callback function as an argument. If an error or user is found, the callback function is called with the error.
      
              If the user is found we use bcrypt to compare the password with the hashed password in the database.
            */
            const userInfo = await User.findOne({ email: email }).exec();
            // If the user is not found, return an error.
            if (!userInfo) {
                throw new Error('User not found');
            }
            /**
              --- Password comparison ---
              bcrypt's compare() method is used to compare the password with the hashed password.
      
              It takes three arguments:
                - The password to compare (plain text).
                - The hashed password.
                - A callback function that is called when the comparison is complete.
      
              The compare() method returns a boolean value. If the password is correct, it returns true. The null is 1st because in js the first argument is the error.
            */
            isAuthenticated = await bcrypt.compare(password, userInfo.password);
            if (!isAuthenticated) {
                throw new Error('Password is incorrect');
            }
            console.log('User login successful');
            /**
              --- Create a token ---
              This sets up the token that will be sent to the client.
              Since we know that the user is authenticated, we can get
              the userId and email returned from the DB in the payload.
              
              The token must match the one used to create the token in the addUser function.
            */
            let token;
            try {
                if (process.env.JWT_SECRET) {
                    token = jwt.sign({ userId: userInfo._id, email: userInfo.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                }
            }
            catch (error) {
                let err = new Error('Error logging in user');
                err.status = 500;
                return next(err);
            }
            console.log('User login successful');
            // Send the response to the client
            res.status(200).json({
                message: 'User login successful',
                token: token,
                userId: userInfo._id,
                userEmail: userInfo.email
            });
        }
        catch (error) {
            const err = error;
            err.status = 401;
            err.local = 'loginUser function';
            next(error);
        }
    }
    else {
        let err = new Error('All fields are required');
        err.status = 401;
        err.local = 'loginUser function';
        return next(err);
    }
};
export const logoutUser = async (req, res, next) => {
    res.status(200).json('User logged out');
};

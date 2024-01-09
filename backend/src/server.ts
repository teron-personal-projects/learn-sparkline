
/**
 * For typescript we need to import Response, Request and NextFunction from express.
 * The reason is because we are using typescript and we need to specify the types of the
 * parameters in the functions.
 * 
 * - Request: This is an object that contains information about the HTTP request.
 * - Response: This is an object that contains information about the HTTP response.
 * - The NextFunction is a callback function that is used to pass control to the next middleware function.
 * 
 *  Without typescript, you do not need to import these objects because they are part of the express module,
 *  but with typescript, you need to import them because you need to specify the types of the parameters in the
 *  functions.
 */
import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';

/**
 * When import the routes closer to where we are using them 
 * because it makes the code easier to read.
 * 
 */
import exercisesRouter from './routes/exercises-route.js';
import { userRouter } from './routes/user-route.js';

// The port the server will run on
const port = process.env.PORT || 5000;
const currentWorkingDirectory = process.cwd();
/*
* The path option is used to specify the location of the .env file. This is relative to the root of the project.
* So, in this case, the .env file is in the backend folder. Which means we have to specify the path as
* backend/.env, because the backend folder is at the root of the project.
*/
const envPath = path.resolve(currentWorkingDirectory, '.env');
const result = dotenv.config({ path: envPath });
const app = express(); 

/**
 * -- Helmet.js --
 * 
 * Helmet.js is a collection of middleware functions that set security-related HTTP headers.
 * These headers help protect your app from some common web vulnerabilities. We call helmet()
 * before any other middleware functions to ensure that these headers are set.
 * 
 * @see https://www.npmjs.com/package/helmet
 */
app.use(helmet());

/**
 * This is used to enable sessions in Express. Will will use this to store the user's session.
 * 
 * The seesion() function takes an object as an argument. This object has the following properties:
 * - secret: This is a string that is used to sign the session ID cookie. 
 * This is used to prevent the cookie from being tampered with.
 * 
 * - resave: This is a boolean that specifies whether the session should be saved to the session store.
 * a session store is a place where the session data is stored. This is usually a database in this context.
 * So we set this to true.
 * 
 * - saveUninitialized: This is a boolean that specifies whether a session should be created for a new user.
 * This means that a session will be created for a user who is not logged in. So we set this to false.
 * 
 * -- In production --
 * The session data should be stored in a database, by default the session data is stored in servers memory.
 * This is not recommended for production because it can lead to memory leaks. 
 * 
 * @see https://www.npmjs.com/package/express-session
 */
// app.use(session({
//   secret: 'more exercise the better',
//   resave: true,
//   saveUninitialized: false
// }));


/**
 * The cors() function is used to enable Cross-Origin Resource 
 * Sharing. This means that the server allows requests from other
 * domains. This is necessary because the frontend and backend are
 * running on different ports or domains.
 * 
 * In development, you can use the cors() function without any
 * arguments. This allows requests from all domains.
 * 
 * In production, you should specify the domains that are allowed
 * to make requests to the server. This is done by passing an object
 * to the cors() function with the origin property set to an array
 * of domains.
 * 
 * If you use a Proxy in the frontend, you should set the origin
 * property to the domain of the frontend. This is because the
 * requests from the frontend will be made to the Proxy, which
 * will then forward the requests to the server. 
 * 
 * Setting the origin property to the domain of the frontend is 
 * done by passing an object to the cors() function with the
 * origin property set to the domain of the frontend. 
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
app.use(cors());
app.use(express.json());

/** 
 * MongoDB connection
 * 
 * The uri is the connection string to the MongoDB database.
 * This connection string is stored in the .env file.
 * 
 * The Uri is when the database is hosted on MongoDB Atlas.
 * 
 * @see https://docs.mongodb.com/manual/reference/connection-string/
 * 
*/ 
const uri = process.env.ATLAS_URI;


if (uri) {
  /**
   * mongoose has a connect method that takes the uri and options as arguments.
   * 
   * The options are:
   * - useNewUrlParser: true, this is to avoid deprecation warnings. ( It is recommended to set this to true)
   * - useCreateIndex: true, this is to avoid deprecation warnings. ( It is recommended to set this to true)
   * - useUnifiedTopology: true, this is to avoid deprecation warnings. ( It is recommended to set this to true)
   * 
   * Starting from version 4.0 of Mongoose, the use of useNewUrlParser, useCreateIndex, and useUnifiedTopology options in the
   * mongoose.connect() method is no longer required. These options are enabled by default in Mongoose 4.0 and later.
   * 
   * @see https://mongoosejs.com/docs/connections.html
   * 
   */
  mongoose.connect(uri);
  
  /**
   * The .connection property of the mongoose object is what we use to get the connection.
   * 
   * @see https://mongoosejs.com/docs/api/connection.html
   */
  const connection = mongoose.connection;
  
  /**
   * The connection object has a once method that takes two arguments:
   * - 'open', this is the event we are listening for. The open event is emitted when we are connected to the database.
   * - a callback function that logs a message to the console.
   * 
   * @see https://mongoosejs.com/docs/api/connection.html#connection_Connection-on
   */
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
} else {
  console.log('unable to connect to MongoDB database, check the connection string');
}



// import viteConfig from '../client/vite.config.js';

/**
 * The app.use() method allows us to use middleware functions.
 * 
 * Middleware functions are functions that have access to the request
 * object (req), the response object (res), and the next function in 
 * the application’s request-response cycle.
 * 
 * The functions in these files run based on the request made to 
 * the server.
 */
app.use('/api/exercises', exercisesRouter);
app.use('/api/user', userRouter);


// disable favicon requests
app.use('/favicon.ico', (req, res, next) => {
  // Return a 204 No Content response
  res.status(204).end();
});

// cate 404 and forward to error handler
interface CustomError extends Error {
  status?: number;
  cause?: string | null | unknown;
  local?: string | null | unknown;
}

app.use((req, res, next) => {
  let err: CustomError = new Error('Not Found');
  err.status = 404;
  console.log('404 error');
  next(err);
});

// error handler
const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {

  // define the error status and add it to the response object
  const status = error.status || 500;

  if (typeof status === 'number') {
    res.status(status);
  }

  let cause = error.cause || 'No cause provided';
  
  // log the error message and status to the console
  console.log('Error: ',{
    'Error': error.message,
    'Status': error.status,
    'Cause': cause,
    'local': error.local
  });
  /**
   * define the error message and add it to the response object.
   * We are using the json() method to send the error message in 
   * JSON format, because the client is expecting JSON. 
   */
  res.json({
    error: {
      message: error.message,
      cause: cause
    }
  });


}

app.use(errorHandler);

/**
 * -- openssl --
 * We use openssl cli tool to generate the private key and certificate in the backend.
 * This is for development purposes. In production, you should get a certificate from a 
 * Certificate Authority (CA).
 * 
 * The command:
 * openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
 * 
 * - req: This is the request command.
 * - x509: This specifies a self-signed certificate.
 * - newkey rsa:4096: This specifies the type of key and the key size.
 * - nodes: This specifies that the key should not be encrypted.
 * - keyout key.pem: This specifies the name of the private key file.
 * - out cert.pem: This specifies the name of the certificate file.
 * - days 365: This specifies the number of days the certificate is valid.
 * 
 * The key.pem file is the private key of the server.
 * The cert.pem file is the certificate of the server.
 * 
 * These files should be stored in a secure location and added to the .gitignore file.
 * 
 * You have to fill out "country Name" and "Common Name" when prompted. "CN" can be your name.
 * 
 * @see https://www.openssl.org/
 * @see https://www.udemy.com/course/complete-nodejs-developer-zero-to-mastery/learn/lecture/26612264#overview
 */


/**
 * The https.createServer() method creates an HTTPS server. This comes with the Node.js
 * core modules. 
 * 
 * This method takes two arguments:
 * 
 * - An object that specifies the private key and certificate of the server.
 * -- key: This is a string that specifies the private key of the server.
 * -- cert: This is a string that specifies the certificate of the server.
 * 
 * - The app object - This is needed because the HTTPS server is created using the 
 * Express app object. without it, the server will not work.
 * 
 * 
 * The createServer() method returns an instance of the https.Server class.
 * The listen() method of the https.Server class is used to start the server.
 * 
 */
const keyPath = path.resolve(currentWorkingDirectory, 'certs', 'key.pem');
const certPath = path.resolve(currentWorkingDirectory, 'certs', 'cert.pem');

https.createServer({
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
}, app).listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

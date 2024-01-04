
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

/*
* The path option is used to specify the location of the .env file. This is relative to the root of the project.
* So, in this case, the .env file is in the backend folder. Which means we have to specify the path as
* backend/.env, because the backend folder is at the root of the project.
*/
const result = dotenv.config({ path: 'backend/.env' });
const app = express();
const port = process.env.PORT || 5000;

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

/**
 * When import the routes closer to where we are using them 
 * because it makes the code easier to read.
 * 
 */
import exercisesRouter from './routes/exercises.js';
import usersRouter from './routes/users.js';
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
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

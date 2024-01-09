# The MERN Stack

## Content:

- Intro to MERN
- DB Concepts
- Getting Started with MongoDB Atlas
- Creating the Backend of the exercise tracker app
- React Intro
- Creating the Frontend of the exercise tracker app
- Connection the Frontend to the Backend (Time: 1:19)

## What is the MERN Stack

The Stack consists of the following Tech:

- MongoDB: A document-based open source DB.
- Express: A Web app framework for Node.js
- React: A JS front-end library for building UI.
- Node.js: JS run-time environment that executes JS code outside of a browser (such as a server).

- and Mongoose: Simple, schema-based solution to model application data.

## Database Concepts

| Tabular (Relational sql etc) | MongoDB |
| --- | --- |
| Database | Database |
| Table | Collection |
| Row | Document |
| Index | Index |
| Join | $lookup |
| Foreign Key | Reference |

## The MongoDB Document BSON Types

BSON stands for "Binary JSON" (Binary JavaScript Object Notation). It's a binary-encoded serialization of JSON-like documents that MongoDB uses to store data.

MongoDB is very well suited for handling data with a wide variety of relationships.

**The document model**
![image of document model](./00-img/mongodb-doc-model.jpg)

With MongoDB you can keep related info to together like you would in OOP.

## Getting Started with mongoDB

We will use mongoDB Atlas for our mongoDB. 
[mongoDB Atlas](https://www.mongodb.com/atlas)

You can run mongoDB on your local env however, Atlas makes things so easy that 
it's worth using even for a local development.

If we were not using Atlas we would have to install mongdb in the project via npm.

## Starting with mongoDB Atlas

The 1st thing you need to do is create a new cluster. The option we will choose is
- free MO
- Google Cloud
- Region us-central1
- name of dB


## Setup React 

I'm using vite in this project so 
```sh
npm create vite@latest
```

## Setup Express

Create a 'backend' folder and then cd into it.

`npm init -y`

Then add the dependencies
`npm install express cors mongoose dotenv` 

### The packages:

- Express: 
- [cors:](https://www.npmjs.com/package/cors) -  Simplifies handling Cross-Origin Resource Sharing (CORS) issues in web applications.
  - It allows your backend server to respond to requests from different origins (domains) while enforcing security measures to prevent unauthorized access.
- [mongoose:](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [dotenv:](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
  - 'process.env' in Node.js provides access to environment variables, which are key-value pairs used to configure aspects of an application's behavior. It allows developers to access and utilize external configuration settings without hardcoding them into the application code.

We will also need two install in the base folder.
`npm i nodemon npm-run-all -D`

### change package type to module 

In the package.json file add the type to 'module'.

## setup server file 

Create a backend/server.js file. This file is the entry point of the backend app. It will contain the code to connect to the MongoDB database and start the server.

## setup the models for the DB

In the backend create a folder called 'models'. Create
two files 'exercise-model.js' and 'user-model.js'.

Models in relation to DBs organize and manage data interactions. They validate data, handle business logic,
and simplify database operations like 'CRUD'. 

## Add API endpoints for the models

Create endpoints that allow us to do CRUD operations. In the server.js File import the routes files and use them as middleware functions.

```js
import exercisesRouter from './routes/exercises-route.js';
import usersRouter from './routes/user-route.js';

app.use('/api/exercises', exercisesRouter);
app.use('/user', usersRouter);
```

Then in the route files, we define the endpoints and the logic for each endpoint.

## Connecting the Front and Back end

The front and back connection is achieved through
HTTP requests. (All request to an API are typically HTTP requests) The front end sends HTTP requests to the back ends endpoints. These requests typically involve fetching or submitting data.

**'axios'** is a populate choose however this can also be done via JS fetch.

### Dealing with CORS

CORS (Cross-Origin Resource Sharing) is a security 
feature of the browsers. It prevents a web page from making requests to a different domain. It prevent malicious attacks.

To allow cross-origin requests, servers must include specific HTTP headers that indicate which origins are allowed to access the resources.

If the request is coming from the same domain then you can remove the 'changeOrigin' and 'cors()'.

#### the cors()

The cors() package is used to enable Cross-Origin Resource Sharing. This means that the server allows requests from other domains. This is necessary because the frontend and backend are running on different ports or domains.

When cors() is used but nothing is passed to it, requests from all origins are allowed by default. In this case, you might **not** need to set changeOrigin to true.

If you pass it a whitelist, only those domains will have access the server. In this case the 'changeOrigin' needs to be set to 'true'. 

#### changeOrigin Option in Vite.config proxy

`changeOrigin: true` changes the origin of the host header to the target URL. 
Ex. `localhost:3000 to localhost:5000`

### Create a Proxy

When we are in a dev env the backend sits at **localhost:5000** however once the app is deployed the backend URL will change. If we don't setup a proxy we would have to find all of the URLs to the backend in the code, and change them one by one to the new URLs.

A proxy allows us to define an endpoint and map it
to a specific URL. So a request to '/api' on the client will send a request to 'http://localhost:5000'. 

Each front in framework creates proxies differently.

#### Create React App

1. `npm install http-proxy-middleware@2`
2. Create a setupProxy.js file in the client/src/ directory. There is no need to import this file anywhere, CRA looks for a file by this name and loads it.
3. Add your proxies to the setupProxy.js file:
  ```js
    import { createProxyMiddleware } from("http-proxy-middleware");
    export default function setupProxy(app) {
    app.use('/api',
      createProxyMiddleware({
       target: "http://localhost:5000",
      })
    );
    }
  ```
4.  Restart your servers with `npm run dev` and the proxies should now work as expected. Note - anytime you make a change to the setupProxy file you'll need to restart your server.

#### Vite

1. Go to **vite.config.js**
2. add
  ```js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react()],
    // Add the code that is below.
    server: {
      proxy: {
        '/api': {
        target: 'http://localhost:5000',
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') -- use if you need to remove the api from the endpoint in express
        }
      }
    }
    // ends here
  })
  ```

### If you choose not to Proxy

If you choose not to use a proxy at all each request will need to be made to the full URL of the backend server. This is because the frontend and backend are on different domains. If the domains are the same then the request can be made to the relative URL of the backend server.


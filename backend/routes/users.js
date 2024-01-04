import express from 'express';

const router = express.Router();
import User from '../models/user.model.js';

/**
 * The route() method is used to create a new route.
 * Since the user route is mounted at /users, '/' refers to '/users'.
 */
router.route('/').get((req, res) => {

  /**
   * The find() method is used to retrieve all the documents 
   * from the collection. It returns a promise. 
   * 
   * The then() method is used to handle the promise.
   * 
   * The json() method is used to return the documents in JSON format.
   */
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * 
 */
router.route('/add').post((req, res) => {

  // .body is a property of the request object.
  const username = req.body.username;

  // Create a new instance of the User model.
  const newUser = new User({username});

  /**
   * The save() method is used to save the new user to the database.
   * 
   * It returns a promise.
   */
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

export default router;


import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/errorhandler.js';

const { Schema } = mongoose;

interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserStatic extends mongoose.Model<UserDocument> {
  authenticate(email: string, password: string): Promise<UserDocument | null>;
}

/**
  -- Defining Your Schema: User model --  

  Mongoose schema obj: defines the structure for documents within a MongoDB collection, acting as a blueprint for the Mongoose model.
  
  Mongoose Model class: Created from the schema definition and provides functionalities for interacting with the database collection that holds the actual documents. (It talks directly to the database using queries.)

  The Schema constructor takes two arguments:
  - Object (Required): Defines the structure of your data, including field names, data types, and validation rules. 
  a collection.
  - Options (Optional): An object containing additional configuration options for the schema, such as disabling the default _id field. 
*/
const userSchema = new Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

/**
  -- Hashing passwords before saving to database --

  The pre() method: A part of the mongoose module, it's used to
  define middleware functions that run before or after certain
  lifecycle events. Ex. save, validate, remove, etc.

  The pre() method takes two arguments:
  - The hook point: A string that represents the lifecycle 
  event that the middleware should run before.
  -- 'save' is a hook point that is called before the document is saved.

  - The callback function: A function that is called before the lifecycle event.
  -- cb is called before the document is saved.

  - The next() function is used to pass control to the next middleware function.
*/
userSchema.pre('save', function(next) {

  // "this" in this context is the user OBJ from the sign-up form.
  let user = this;

  /**
    .isModified is a mongoose method that is used to check if a field has been modified. 

    If the password has not been modified, we call next() because
    we don't need to hash the password again.
  */
  if (!user.isModified('password')) { 
    return next();
  }

  /**
    --- Hashing the password before saving to the database ---

    - Why Hash? -
    Storing passwords as plain text is a security risk. Hashing transforms passwords into seemingly random strings, making them unreadable even if the database is compromised.

    - Using bcrypt -
    Bcrypt is a popular library for password hashing. Its hash() method handles both hashing and salting.

    - Salt -
    A random string added to the password before hashing. It increases security by making rainbow table attacks (pre-computed hashes) ineffective.

    --- The hash() method ---
    Arguments:
    1. Password (String): The plain text password to be hashed.
    
    2. Salt Rounds (Number): Controls the number of iterations used to generate the salt. Higher values are more secure but computationally expensive. A value of 10 is a good balance for most applications.
    
    3. Callback Function: This function is called after hashing is complete. It receives two arguments:
    - Error (Object): null if successful, otherwise contains an error message.
    - Hashed Password (String): The secure hashed password.
  */
  bcrypt.hash(user.password, 10, (err, hash) => {
    
    // pass the error to the next middleware function.
    if (err) {
      return next(err);
    }

    // set the user password to the hashed password.
    user.password = hash;

    /* 
      pass control to the next middleware function. 
      In mongo is the create() method.
    */
    next();
  });
});

/**
  -- Creating a Mongoose Model --
  The Schema is passed to the mongoose.model() method to create a model. The mongoose.model() is responsible for creating a new Mongoose model instance. 

  It takes two arguments:
  - The name of the model.
  - The Schema object.
*/
export const User = mongoose.model<UserDocument, UserStatic>('User', userSchema);

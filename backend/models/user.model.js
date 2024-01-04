import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/**
 * User model 
 * 
 * The Schema class is a part of the mongoose module, it is used to
 * create a new Schema. A schema is a blueprint for a model. 
 * The Model tells mongoose how the data should look like. The Model
 * talks directly to the database's collections and is used to query 
 * the database.
 * 
 * The Schema constructor takes two arguments:
 * - An object that defines the shape of the documents within
 * a collection.
 * - An options object.
 * 
 */
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

/**
 * The Schema is passed to the mongoose.model() method to create a model.
 * 
 * mongoose.model() is responsible for creating a new Mongoose model instance. 
 * 
 * It takes two arguments:
 * - The name of the model.
 * - The Schema object.
 */
const User = mongoose.model('User', userSchema);

export default User;
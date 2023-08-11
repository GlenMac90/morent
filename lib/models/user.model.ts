import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  objectId: {
    type: String,
    unique: true,
    required: false,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

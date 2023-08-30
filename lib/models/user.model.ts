import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      unique: true,
      required: true,
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
    email: {
      type: String,
      unique: true,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    onboarded: {
      type: Boolean,
      default: false,
    },
    carsAdded: [
      {
        car: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car',
        },
      },
    ],

    carsRented: [
      {
        car: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose.model('User', userSchema);

export default User;

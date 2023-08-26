'use server';

import { connectToDB } from '../mongoose';
import Review from '../models/review.model';
import { ReviewDocument } from '../interfaces';
import mongoose from 'mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';

export async function createReview(
  reviewData: ReviewDocument
): Promise<ReviewDocument> {
  try {
    connectToDB();

    const review = new Review(reviewData);
    await review.save();

    await User.findByIdAndUpdate(reviewData.userId, {
      $push: { reviewsWritten: review._id },
    });

    await Car.findByIdAndUpdate(reviewData.carId, {
      $push: { reviews: review._id },
    });

    return review.toObject();
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
}

export async function deleteReview(reviewId: string): Promise<void> {
  try {
    connectToDB();

    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error('Review not found.');
    }

    await User.updateOne(
      { _id: review.userId },
      { $pull: { reviews: reviewId } }
    );

    await Car.updateOne(
      { _id: review.carId },
      { $pull: { reviews: reviewId } }
    );

    await Review.findByIdAndRemove(reviewId);
  } catch (error: any) {
    throw new Error(`Failed to delete review: ${error.message}`);
  }
}

export async function editReview(
  reviewData: ReviewDocument
): Promise<ReviewDocument> {
  if (!reviewData._id) {
    throw new Error('Review ID is required to edit.');
  }

  try {
    connectToDB();

    const existingReview = await Review.findById(reviewData._id);
    if (!existingReview) {
      throw new Error('Review not found.');
    }

    const userExists = await User.exists({ _id: reviewData.userId });
    const carExists = await Car.exists({ _id: reviewData.carId });

    if (!userExists || !carExists) {
      throw new Error('Associated user or car does not exist.');
    }

    if (existingReview.userId.toString() !== reviewData.userId.toString()) {
      await User.updateOne(
        { _id: existingReview.userId },
        { $pull: { reviews: reviewData._id } }
      );
      await User.updateOne(
        { _id: reviewData.userId },
        { $push: { reviews: reviewData._id } }
      );
    }

    if (existingReview.carId.toString() !== reviewData.carId.toString()) {
      await Car.updateOne(
        { _id: existingReview.carId },
        { $pull: { reviews: reviewData._id } }
      );
      await Car.updateOne(
        { _id: reviewData.carId },
        { $push: { reviews: reviewData._id } }
      );
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewData._id,
      reviewData,
      {
        new: true,
      }
    );

    if (!updatedReview) {
      throw new Error('Failed to find and update the review.');
    }

    return updatedReview.toObject();
  } catch (error: any) {
    throw new Error(`Failed to edit review: ${error.message}`);
  }
}

export async function fetchReviewById(
  reviewId: string
): Promise<ReviewDocument | null> {
  try {
    connectToDB();

    const review = await Review.findById(reviewId)
      .populate('userId', 'username image')
      .exec();

    if (!review) {
      throw new Error('Review not found.');
    }

    return review.toObject();
  } catch (error: any) {
    throw new Error(`Failed to fetch review by ID: ${error.message}`);
  }
}

export async function getAllReviewsByUser(
  userId: mongoose.Types.ObjectId
): Promise<ReviewDocument[]> {
  try {
    connectToDB();
    const reviews = await Review.find({ userId })
      .populate('carId', 'carTitle')
      .populate('userId', 'username image')
      .exec();

    if (!reviews) {
      throw new Error('No reviews found for the specified user.');
    }

    return (reviews as ReviewDocument[]) || [];
  } catch (error: any) {
    throw new Error(`Failed to fetch reviews for the user: ${error.message}`);
  }
}

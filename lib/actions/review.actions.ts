'use server';

import { connectToDB } from '../mongoose';
import Review from '../models/reviews.model';
import { ReviewDocument } from '../interfaces';
import mongoose from 'mongoose';

export async function createReview(
  reviewData: ReviewDocument
): Promise<ReviewDocument> {
  try {
    connectToDB();
    const review = new Review(reviewData);
    await review.save();
    return review.toObject();
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
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
    const updatedReview = await Review.findByIdAndUpdate(
      reviewData._id!,
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

export async function deleteReview(reviewId: string): Promise<void> {
  try {
    connectToDB();
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error('Review not found.');
    }
    await Review.findByIdAndRemove(reviewId);
  } catch (error: any) {
    throw new Error(`Failed to delete review: ${error.message}`);
  }
}

export async function fetchReviewById(
  reviewId: string
): Promise<ReviewDocument | null> {
  try {
    connectToDB();
    const review = await Review.findById(reviewId).exec();
    if (!review) {
      throw new Error('Review not found.');
    }
    return review.toObject();
  } catch (error: any) {
    throw new Error(`Failed to fetch review by ID: ${error.message}`);
  }
}

export async function deleteAllReviews(): Promise<void> {
  try {
    connectToDB();
    await Review.deleteMany({});
  } catch (error: any) {
    throw new Error(`Failed to delete all reviews: ${error.message}`);
  }
}

export async function getAllReviewsByUser(
  userId: mongoose.Types.ObjectId
): Promise<ReviewDocument[]> {
  try {
    connectToDB();
    const reviews = await Review.find({ userId })
      .populate('carId', 'carTitle')
      .exec();

    if (!reviews) {
      throw new Error('No reviews found for the specified user.');
    }

    return reviews as ReviewDocument[];
  } catch (error: any) {
    throw new Error(`Failed to fetch reviews for the user: ${error.message}`);
  }
}

// associate review with car

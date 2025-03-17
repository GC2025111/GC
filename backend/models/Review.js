import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
  },
  text: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, 
});

const Review=mongoose.models.Review || mongoose.model('Review',reviewSchema);
export default Review;

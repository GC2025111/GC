import Review from "../models/Review.js";
import User from "../models/User.js";



const createReview=async(req,res)=>{
    try {
        const { userId, productId, ratings, text } = req.body;
    
        // Check if a review already exists for this product by the same user
        const existingReview = await Review.findOne({ userId, productId });
    
        if (existingReview) {
          // If a review exists, update it
          existingReview.ratings = ratings;
          existingReview.text = text;
          await existingReview.save();
          return res.status(200).json({
            message: "Review updated successfully!",
            review: existingReview,
          });
        }
    
        // If no review exists, create a new one
        const user = await User.findById(userId);
        const userName = user.name;
        const review = new Review({ userId, userName, productId, ratings, text });
        await review.save();
    
        res.status(201).json({
          message: "Review created successfully!",
          review,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
}


const getReviews=async(req,res)=>{
    try{
        const productId=req.params.productId;        
        const reviews=await Review.find({productId});       
        if(!reviews){
            return res.status(404).json({message:"No reviews found for this product"});
        }
        res.status(200).json({message:"Reviews fetched successfully",reviews});

    }
    catch(error){
        console.error(error);
        res.status(500).json({error:error.message});
    }
}
export {createReview,getReviews};

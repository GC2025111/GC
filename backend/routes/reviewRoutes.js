import express from "express";
import { createReview, getReviews } from "../controllers/reviewcontroller.js";

const router=express.Router();

router.post("/addreview",createReview);
router.get("/getreview/:productId",getReviews);

export default router;


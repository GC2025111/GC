import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
      trim: true,      
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    is_Essential: {
      type: Boolean,
      required: true,
    },
    imageUrl: {
      type: Array,
      required: true,
    },
    discount: {
      type: Number, 
      default: 0,
      min: 0,
      max: 100
    },
  },
  { timestamps: true } 
);



const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;


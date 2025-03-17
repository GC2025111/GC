import express from 'express';
import {addProduct,listProducts} from '../controllers/productcontroller.js';
import protect from "../middleware/protect.js";
import adminProtect from "../middleware/adminprotect.js";
import upload from "../middleware/multer.js";

const router=express.Router();

router.post("/addproduct",upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1}]),addProduct);
router.post('/listproducts',listProducts);

export default router;




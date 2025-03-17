import Product from "../models/Product.js";
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
dotenv.config();


const addProduct=async(req,res)=>{
    try{
        
        const {name,description,quantity,price,is_Essential,discount}=req.body;
         
        const image1=req.files.image1 ? req.files.image1[0] : null;
        const image2=req.files.image2 ? req.files.image2[0] : null;

        const images=[image1,image2].filter((image)=>image!==null);

        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:"image"});
                return result.secure_url;
            })
        )

        console.log(name,description,quantity,price,is_Essential,discount);       
        console.log(imagesUrl);

        const productData={
            name,
            description,
            quantity,
            price:Number(price),
            is_Essential:is_Essential==="true"?true:false,
            imageUrl:imagesUrl,
            discount:Number(discount),            
        }
        console.log(productData);
        const newProduct=new Product(productData);
        await newProduct.save();


        res.json({
            success:true,
            msg:"Product added successfully!",
            product:newProduct
        })
        

        
        
    }
    catch(err){
        console.error(err);
    res.status(500).send("Server Error");
    }
}


const listProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.json({
            success: true,
            data: products,
          });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
          success: false,
          msg: "Failed to fetch Products!",
        });
    }
}

export {addProduct,listProducts};

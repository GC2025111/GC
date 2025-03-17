import React, {useState,useRef,useEffect} from 'react'
import "./AddProduct.css"
import axios from 'axios';
import { toast } from "react-toastify";
const AddProduct = ({token}) => {
  const backendUrl=import.meta.env.VITE_BACKEND;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [isEssential, setisEssential] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);


const onSubmit=async(e)=>{
  e.preventDefault();
  try{    
    console.log(name,description,quantity,price,discount,isEssential,image1,image2);
    const formData=new FormData();
    formData.append('name',name);
    formData.append('description',description);
    formData.append('quantity',quantity);
    formData.append('price',price);
    image1 && formData.append('image1',image1);
    image2 && formData.append('image2',image2);
    formData.append('discount',discount);
    formData.append('isEssential',isEssential);

    const response=await axios.post(`${backendUrl}/api/products/addproduct`,formData,{
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    });
    console.log(response);
   
    
  }
  catch(err)
  {
    console.log(err);
    const errorMessage = err.response?.data?.message || err.message;   
    toast.error(errorMessage);      
  }
}







  return (
    <div id="addproduct">
     <form id="addproductform" encType="multipart/form-data"></form>
     <div id="uploadimages">
          <p>Upload Images:</p>
          <div id="uploadimagesdiv">
            <label htmlFor="image1">
              <img src={!image1 ?`/Images/upload.png`:URL.createObjectURL(image1)} alt="upload"/>
              <input onChange={(e)=>{
                setImage1(e.target.files[0])
              }} type="file" id="image1" name="image1" hidden/>
            </label>
            <label htmlFor="image2">
              <img src={!image2 ?`/Images/upload.png`:URL.createObjectURL(image2)} alt="upload"/>
              <input onChange={(e)=>{
                setImage2(e.target.files[0])
              }} type="file" id="image2" name="image2" hidden/>
            </label>           
          </div>
        </div>
        <div id="productdetails">
          <p>Product Name:</p>
          <input onChange={(e)=>{
            setName(e.target.value)}} value={name} id="productname" type="text" name="productname" placeholder="Product Name" required/>
          <p>Product Description:</p>
          <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} id="productdescription" type="text" name="productdescription" placeholder="Product Description..." required/>
         
          <p>Product Quantity:</p>
          <input onChange={(e)=>{setQuantity(e.target.value)}} value={quantity} id="productquantity" type="text" name="productquantity" placeholder="Product Quantity" required/>
          <p>Product Price:</p>
          <input onChange={(e)=>{setPrice(e.target.value)}} value={price} id="productprice" type="number" min="0" name="productprice" placeholder="Product Price in Rs." required />
          <p>Product Discount:</p>
          <input onChange={(e)=>{setDiscount(e.target.value)}} value={discount} id="productdiscount" type="number" min="0" name="productdiscount" placeholder="Product Discount in %" required />
          <p>Essential Product:</p>
          <input onChange={(e)=>{setisEssential(e.target.checked)}} value={isEssential} id="isEssential" type="checkbox" name="isEssential" placeholder="Essential" required/>      
         
        </div>
        <button id="addproductbutton" type="submit" onClick={onSubmit}>Add Product</button>      
    </div>
  )
}

export default AddProduct

import React, {useState,useEffect,useRef} from 'react'
import './Product.css'


function Product({name,price,quantity,image,handleAddToCart,userId,handlebuynow,productId}) {
  return (
    <div id="productmain">
      <div id="producttop">
        <img src={image} />
      </div>
      <div id="productbottom">
        <div id="pb1"><i className="ri-timer-flash-fill"></i> Available</div>
        <div id="pb2"><h2>{name}</h2></div>
        <div id="pb3">
          <div id="quantity">{quantity}</div>
          <div id="price">₹ {price}</div>
        </div>
        <div id="pb4">
          <button id="addtocart" onClick={()=>handleAddToCart(userId,productId,1)}>Add to Cart</button>
          <button id="buynow" onClick={handlebuynow}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default Product

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/mondodb.js';
import cloudinaryConfig from './config/cloudinary.js';
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import addressRoutes from "./routes/addressRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"


const app = express();
const port = process.env.PORT || 3000;

connectDB();
dotenv.config();
cloudinaryConfig();
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors({
    origin: [      
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  }));
  app.options('*', cors());
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204); 
    } else {
      next();
    }
  });

  app.get("/", (req, res) => {
    res.send("Welcome!");
});
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




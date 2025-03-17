import express from 'express';
import { resisterUser, loginUser,adminLogin,userID } from '../controllers/usercontroller.js';

const router = express.Router();

router.post('/register', resisterUser);
router.post('/login', loginUser);
router.post('/adminlogin',adminLogin);
router.post('/userid',userID);

export default router;

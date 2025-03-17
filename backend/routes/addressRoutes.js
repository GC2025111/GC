import express from "express";
import { addAddress, getAddress, deleteAddress } from "../controllers/addresscontroller.js";

const router = express.Router();

router.post("/addAddress",addAddress);
router.get("/getAddress/:userId",getAddress);
router.delete("/deleteAddress/:userId",deleteAddress);

export default router;


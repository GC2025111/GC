import Address from "../models/Address.js";

const addAddress = async (req, res) => {
    try {
        const { userId, address, landmark, pincode, phoneNumber, deliverySlot } = req.body;

        if (!userId || !address || !landmark || !pincode || !phoneNumber || !deliverySlot) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }   

        const existingAddresses = await Address.find({ userId });       

        if (existingAddresses.length > 0) {
            const response = await Address.findByIdAndUpdate(
                existingAddresses[0]._id,
                { userId, address, landmark, pincode, phoneNumber, deliverySlot },
                { new: true }
            );
                        
            return res.status(200).json({
                success: true,
                message: "Address updated successfully",
                address: response
            });
        } else {
            console.log("No existing address found, adding new address");
            const newAddress = new Address({ userId, address, landmark, pincode, phoneNumber, deliverySlot });
            await newAddress.save();
            return res.status(200).json({
                success: true,
                message: "Address added successfully",
                address: newAddress
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const getAddress = async (req, res) => {
    try{
        const {userId}=req.params;
        if(!userId){
            return res.status(400).json({success:false,message:"Please Login Again!"});
        }
        const address = await Address.find({userId});        
        res.status(200).json({success:true,message:"Address fetched successfully",address});
     
    }catch(err){
        res.status(500).json({success:false,message:"Internal server error Or No Address Found!"});
    }
}
const deleteAddress = async (req, res) => {
    try{
        const {userId}=req.params;       
        if(!userId ){
            return res.status(400).json({success:false,message:"Please Login Again!"});
        }
        const address = await Address.findOneAndDelete({userId});
         res.status(200).json({success:true,message:"Address deleted successfully",address});
    }catch(err){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export {addAddress,getAddress,deleteAddress};

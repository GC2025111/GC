import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true
  },
  landmark: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v); 
      },
      message: props => `${props.value} is not a valid pincode!`
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v); 
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  deliverySlot: {
    type: String,
    required: true,
    enum: ["Noon", "Evening", "Night"], 
    default: "Evening" ,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true 
});

const Address = mongoose.model('Address', addressSchema);

export default Address;






















































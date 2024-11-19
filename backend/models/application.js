import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },

  studentRollNumber: {
    type: String,
    required: true,
    unique: true
  },

  roomNumbers: {
    type: String, // Can also use an array if multiple room numbers are needed
    default: "not alloted", // Default value to ensure field is present
  },

  status: {
    type: String,
    enum: ["pending", "granted", "rejected"],
    default: "pending"
  },
},

  {
    timestamps: true,
  }

 
  
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;

import mongoose, { mongo } from "mongoose";

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    rollno: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    phoneno: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: true
    },

    guests: {
        type: Number,
        required: true
    },

    arrivalDate: {
        type: String,  
        required: true
    },

    departureDate: {
        type: String,  
        required: true
    },

    arrivalTime: {
        type: String,
        required: true
    }
})

const formModel = new mongoose.model('formModel' , formSchema)

export default formModel
import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect("mongodb+srv://udit9189:udit9189@cluster0.10ibz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("db conncected successfully")
}
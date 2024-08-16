import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect("mongodb://udit9189:udit9189@cluster0/?ssl=true&replicaSet=atlas-okbvmb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
    console.log("db conncected successfully")
}
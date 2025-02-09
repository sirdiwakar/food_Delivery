import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://adzylo47:Shinchan1!@delivery-app.4jyeb.mongodb.net/food-del?retryWrites=true&w=majority&appName=delivery-app')
        .then(() => {
            console.log('Database connected');
        })
}
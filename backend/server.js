import express from "express";
import cors from "cors";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'

//app config
const app = express();
const port = process.env.PORT || 4000;
import { connectDB } from "./config/db.js";
 
//middleware
app.use(express.json());
app.use(cors());


// db connection 
await connectDB();


// api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.status(200).send('App Working');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
import express from "express";
import cors from "cors";


//app config

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('App Working');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
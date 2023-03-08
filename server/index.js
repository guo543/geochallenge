import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './middleware/auth.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes);

app.get('/hello', auth,(req, res) => {
    res.send("hello");
});

let PORT = process.env.PORT || 8000;
const CONNECTION_URL = process.env.CONNECTION_URL;

if (CONNECTION_URL === undefined) {
    console.log("Please specify the MongoDB connection string in .env");
    process.exit(-1);
}

mongoose.set('strictQuery', true);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

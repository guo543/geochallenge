import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'
import imageRoutes from './routes/image.js'
import auth from './middleware/auth.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/image', imageRoutes);

app.get('/hello', auth, (req, res) => {
    res.send("hello");
});

// don't create db connection for unit tests
if (process.env.NODE_ENV !== 'test') {
    let PORT = process.env.PORT || 8000;
    const CONNECTION_URL = process.env.CONNECTION_URL;

    if (CONNECTION_URL === undefined) {
        console.log("Please specify the MongoDB connection string in .env");
        process.exit(-1);
    }

    mongoose.set('strictQuery', true);

    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then()
        .catch((error) => console.log(error.message));

    // don't listen for unit tests 
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
  });

export default app;


// import database from './database.js'
// import makeApp from './app.js'

// const app = makeApp(database);

// // don't listen for unit tests 
// if (process.env.NODE_ENV !== 'test') {
//     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
// }

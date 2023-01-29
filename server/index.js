import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes);

app.get('/hello', (req, res) => {
    res.send("hello");
});

let PORT = process.env.PORT || 8000;;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
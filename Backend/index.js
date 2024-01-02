import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json())

//Middleware  forhanling cors policy  -- some issue in cors section need to check it
// method 1
app.use(cors());

//method 2  - allow custom origin
// app.use(cors({
//     origin: 'http://localhost:5555',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to Mern tutorial')

});


app.use('/books', booksRoute)

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to the port : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);

    })
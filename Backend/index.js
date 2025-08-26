import express from 'express';
import connectToMongoDB from './Database/connection.js';
import AuthRoutes from "./Routers/authRoutes.js";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


connectToMongoDB();

app.use('/auth', AuthRoutes);


app.listen( PORT, ()=>{
    console.log(`Listening to port : ${PORT}`)
});
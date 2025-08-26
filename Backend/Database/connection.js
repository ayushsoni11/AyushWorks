import mongoose from "mongoose";
import { config } from "dotenv";
config({path : '.env'});

const URL = process.env.MONGO_URL;

// this will run immediately when the file is imported
// const connectToMongoDB = mongoose.connect(URL).then( 
//     ()=>{console.log("Connected with database")}
// ).catch(
//     (err) => {console.log("Not connected")}
// )

// Better: wrap it in a function, so you can call it when your server starts.
const connectToMongoDB = async () => {
    try{
        await mongoose.connect(URL);
        console.log("Connected to database");
    } catch(err) {
        console.log("Not connected" , err);
    }
    
}

//this is correct
export default connectToMongoDB;




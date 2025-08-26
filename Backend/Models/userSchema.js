import mongoose from "mongoose";
//This is wrong because you are storing an instance of Schema, not the constructor.
// const Schema = new mongoose.Schema;

//correct
const Schema = mongoose.Schema;


const userSchema = new Schema({
    //wrong
    // name : String,
    // required : true,

    //correct
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    }, 
    password : {
        type : String,
        required : true,
        //wrong minLength : all lowercase hona chahiye
        minlength : 4,
        maxlength : 100,
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;

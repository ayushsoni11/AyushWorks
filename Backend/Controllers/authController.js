import UserModel from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req,res) => {

    try{
         const {name, email, password} = req.body;


    const user = await UserModel.findOne({email});

    if(user) {
        return res.status(409).json({message : "User already exists, Please login !!"});
    }

    const userModel = new UserModel({name,email,password});

    userModel.password = await bcrypt.hash(password, 10);

    await userModel.save();

    res.status(201).json({
        success: true,
        message :" User registered successfully"
    });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
   
}



const login = async (req,res) => {

    try{
         const {email, password} = req.body;

    const user = await UserModel.findOne({email});

    if(!user) {
        return res.status(403).json({message : "User not found, Please register !!", success : false});
    }

    const isPassEqual = bcrypt.compare(password, user.password);

    if(!isPassEqual) {
        return res.status(403).json({message : "Wrong Password", success : false});
    }

    const jwtToken = jwt.sign({email : user.email, _id : user._id}, process.env.SECRET_KEY, {expiresIn : '24h'});

    res.status(200).json({
        success: true,
        message :" Logged in successfully",
        jwtToken,
        email,
        name : user.name
    });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
   
}

export {signup, login};
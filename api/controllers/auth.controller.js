import { FcNext } from "react-icons/fc";                  
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
                                                          
export const signup = async (req,res,next)=>{

    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    var avatar = "https://lh3.googleusercontent.com/a/ACg8ocK87AE0ohGtNpp3Noro2aVwYtEs3keQMv1TuNzRZxGlyX_n9Q=s96-c";
    const newUser = new User({username,email,password:hashedPassword,avatar:avatar}); 
    try{
        await newUser.save();
        res.status(201).json('User created successfully');
    }catch(error){
        next(error);                                                             
    } 
}; 
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    
    if (!email || !password) {
        return next(errorHandler(400, 'Email and Password are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User Not Found!'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));


        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const {password:pass,...rest} = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req,res,next) =>{
    try{
            const user = await User.findOne({email:req.body.email});
            if(user){
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
                const {password:pass,...rest} = user._doc;
                res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

            }else{
                console.log("FIrst sugn up");
                const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
                const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
                const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPassword,avatar:req.body.photo});
                const validUser = await newUser.save(); 

                const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
                const {password:pass,...rest} = validUser._doc;
                res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
         
            }
    }catch(error){
        next(error);
    }
};
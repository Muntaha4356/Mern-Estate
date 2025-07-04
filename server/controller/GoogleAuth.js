
import jwt from "jsonwebtoken";
import userModel from "../models/usersmodel.js"
import bcrypt from "bcryptjs";




export const handleGoogleLogin = async (req, res, next)=>{
  try{
    const user = await userModel.findOne({email: req.body.email});
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //WE DON'T WANNA SEND THE PASSWORD SO WE ARE SEPARATING IT
      const {password:pass, ...rest} = user._docs;
      res
      .cookie('access_token', token, {httpOnly: true})
      .status(200)
      .json(rest);


      console.log("sgnedin")
    }else{
      //we are here creating a random password
      const generatedPassword = Math.random().toString(35).slice(-9) + Math.random().toString(35).slice(-9); //getting last nine digits
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      //converting "sidra tul muntaha" to "sidratulmuntah346"
      const newUser = new userModel({username: req.body.name.split(" ").join("").toLowerCase()+ 
        Math.random().toString(35).slice(-4), 
        email: req.body.email, 
        password: hashedPassword, 
        profilepic: req.body.photo
      });
      await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      const {password: pass, ...rest} = newUser._docs;
      res.cookie('access_token', token, {httpOnly:  true}).status(200).json(rest);
      conaole.log("signed up");

    }
  }catch(error){
    console.log("helo")
  }
}
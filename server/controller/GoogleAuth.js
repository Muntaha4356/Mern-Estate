import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import userModel from '../models/usersmodel.js';

const client = new OAuth2Client('244631017859-845o6r2dug776piglqkq0cm6q1sbbtai.apps.googleusercontent.com')

export const handleGoogleLogin = async(req, res) =>{
    const {token} = req.body;
    try{
        const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '244631017859-845o6r2dug776piglqkq0cm6q1sbbtai.apps.googleusercontent.com', // Same as client ID
    });
    const { email, name} = ticket.getPayload();

    let user = await userModel.findOne({email});
    if (!user) {
      user = await user.create({
        email,
        name: name,
      });

    }
    const userToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // ideally use process.env.JWT_SECRET
      { expiresIn: '7d' }
    );

    }catch(error){
        res.json({success: false, message: error.message})
    }
}

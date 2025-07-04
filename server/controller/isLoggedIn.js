import jwt from 'jsonwebtoken';
import userModel from '../models/usersmodel.js';
export const isLoggedIn = async(req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("I want to know that i decoded");
    const user = await userModel.findById(decoded.id);
    if(!user) return res.json({success: false});

    
    return res.json({ success: true, userId: decoded.id, user });
  } catch(error) {
    console.log("Jwt verification error", error.message)
    return res.json({ success: false });
  }
};





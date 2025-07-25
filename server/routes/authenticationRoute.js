import express from 'express'
import { register } from '../controller/RegisterController.js';
import { login } from '../controller/LoginController.js';
import { Logout } from '../controller/LogoutController.js';
import userAuth from '../middleware/userAuth.js';
import { VerifyAccount, SendVerifyOTP } from '../controller/VerifyAccountController.js';
import { isAuthenticated } from '../controller/isAuthenticated.js';
import { resetPassword, resetPasswordOtpSend } from '../controller/resetPassword.js';
import { getUserData } from '../controller/useInfoController.js';
import { isLoggedIn } from '../controller/isLoggedIn.js';
import { handleGoogleLogin } from '../controller/GoogleAuth.js';
import userAuth2 from '../middleware/useAuth2.js';

const authRouter = express.Router();


authRouter.post('/signup', register);

authRouter.post('/login', login);

authRouter.post('/logout',userAuth, Logout);

authRouter.post('/send-verify-OTP', userAuth ,SendVerifyOTP)

authRouter.post('/verifyOtp', userAuth, VerifyAccount)

authRouter.post('/is-auth', userAuth, isAuthenticated)

authRouter.post('/send-reset-otp', resetPasswordOtpSend) //wedon'tneedmiddleware cuz userid is not needed

authRouter.post('/password-reset', resetPassword)

authRouter.get('/user-info', userAuth, getUserData)

authRouter.get('/isLoggedIn',  isLoggedIn)

authRouter.post('/google', handleGoogleLogin);

export default authRouter;
import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDb from "./config/connect.js";
import authRouter from './routes/authenticationRoute.js'
import userRoutes from "./routes/userRoute.js";
import dns from 'dns';
import listRoutes from "./routes/listingRoutes.js";
import path from 'path';



const __dirname = path.resolve();
const app = express();

const port =process.env.PORT || 3000;


dns.setDefaultResultOrder('ipv4first');
connectDb();

app.use(express.json());

app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-estate.vercel.app', // your actual deployed frontend
  'https://mern-estate-<yourProjectId>.vercel.app' // optional: if your URL has a dynamic ID
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/list',listRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));



//middleware to handle errors..not gonna use
app.use((error, req, res, next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

app.listen(port , ()=> console.log(`Server started on port ${port}`));

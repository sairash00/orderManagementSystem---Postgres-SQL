// NOTE: import routes here..


// NOTE: import  packages here
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//NOTE: express app setup and cors config

const app = express();
app.use(cors({
    origin: '*', //NOTE: update this with ur frontend url
    credentials: true,
}));

// NOTE: middlewares setups

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



// NOTE: setup routes here

//NOTE: Routes configuration syntax -- app.use('/api/v1/', userRoutes);



export default app;

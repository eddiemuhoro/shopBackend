import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './auth/user.js';
import productRouter from './routes/products.js';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

//remove cors error while postong data
app.options('*', cors());


app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))


app.use('/', userRouter);
app.use('/products', productRouter);

const port= 9000 || process.env.PGPORT

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);

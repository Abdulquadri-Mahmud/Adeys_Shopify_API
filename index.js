import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import productsRoutes from './routes/products_routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173/',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
};
 
app.use(cors(corsOptions));

mongoose.connect(process.env.db).then((response) => {
    console.log('Database Connected!');
    app.listen(process.env.PORT, () => {
        console.log('Server is listening on port 3000!');
    });
}).catch((error) => {
    console.log(error);
});

app.get("/",(req, res,) => {
    res.send('Hello World');
});

app.use('/api/products', productsRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';

    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});
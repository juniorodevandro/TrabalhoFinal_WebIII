import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import Routes from './routes/index.routes';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

app.use((request: Request, response: Response, next: NextFunction) => {
    response.header(
        "Access-Control-Allow-Origin",
        "*");
    next();
});

app.use(
    express.json({
        type: ['application/json', 'text/plain'],
        }
    )
);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        return response.json({
            status: response.status(500),
            message: err.message,
        });
    }
);
    
app.use(Routes);

export { app };
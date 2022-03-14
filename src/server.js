import express from "express";
import dotenv from "dotenv";
import listEnpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import {
    badRequestHandler,
    notFoundHandler,
    genericErrorHandler,
} from "../src/middleware/errorHandler.js";
import customersRouter from "./enpoints/customers/index.js";

dotenv.config();
const server = express();
const PORT = process.env.PORT || 3001;

//  ======== middlewares

server.use(cors());

server.use(express.json());

server.use(passport.initialize());

//  ========= Endpoints

server.use("/customers", customersRouter);

//  ========== errors
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

//  ======== connections

const connection = process.env.DB_CONNECTION;

try {
    mongoose.connect(connection);
    server.listen(PORT, () => {
        console.table(listEnpoints(server));
        console.log(`server is running on port n. ${PORT}`);
    });
} catch (error) {
    handleError(error);
}

mongoose.set("bufferCommands", false);
import express from "express";
import "dotenv/config";
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
import companyRouter from "./enpoints/companies/index.js";

const server = express();
const PORT = process.env.PORT || 3001;

//  ======== middlewares

server.use(cors());

server.use(express.json());

server.use(passport.initialize());

//  ========= Endpoints

server.use("/customers", customersRouter);

server.use("/companies", companyRouter);

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
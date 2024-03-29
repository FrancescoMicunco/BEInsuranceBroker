import express from "express";
import "dotenv/config";
import listEndpoints from "express-list-endpoints";
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
import salesforceRouter from "./enpoints/salsesforce/index.js";
import productsRouter from "./enpoints/products/index.js";

const server = express();
const PORT = process.env.PORT || 3001;

//  ======== middlewares

server.use(cors());

server.use(express.json());

server.use(passport.initialize());

//  ========= Endpoints

server.use("/customers", customersRouter);

server.use("/companies", companyRouter);

server.use("/products", productsRouter);

server.use("/salesforce", salesforceRouter);

//  ========== errors
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

//  ======== connections

const connection = process.env.DB_CONNECTION;

mongoose
    .connect(connection)
    .then(() => {
        server.listen(PORT, () => {
            console.table(listEndpoints(server));
            console.log(`server is running on port n. ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

mongoose.set("bufferCommands", false);
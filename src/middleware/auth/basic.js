import createHttpError from "http-errors";
import atob from "atob";
import customersModel from "../../enpoints/customers/Schema.js";

export const basicAuthMiddleware = async(req, res, next) => {
    console.log(req.headers);
    if (!req.headers.authorization) {
        next(createHttpError(401, "Please provide authorization"));
    } else {
        const base64Credentials = req.headers.authorization.split(" ")[1];
        const decodeCredentials = atob(base64Credentials);
        console.log(decodeCredentials);
        const [username, password] = decodeCredentials.split(":");
        const customer = await customersModel.checkCredentials(username, password);
        if (customer) {
            req.customer = customer;
            next();
        } else {
            next(createHttpError(401, "Invalid credentials"));
        }
    }
};
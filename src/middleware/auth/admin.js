import createHttpError from "http-errors";

export const adminMiddleware = (req, res, next) => {
    if (req.customer.role === "Admin") {
        next();
    } else {
        next(createHttpError(403, "Only admin allowed!"));
    }
};
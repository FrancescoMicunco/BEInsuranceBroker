import express from "express";
import { isHttpError } from "http-errors";
import customersModel from "../customers/Schema.js";

const router = express.Router();

router
    .route("/")
    .post(async(req, res, next) => {
        try {
            const customer = await customersModel(req.body);
            const { _id } = await customer.save();
            res.status(201).send({ _id });
        } catch (error) {
            next(error);
        }
    })

.get(async(req, res, next) => {
    try {
        const customer = await customersModel.find().populate({ path: "seller" });
        res.status(200).send(customer);
    } catch (error) {
        next(error);
    }
});

router
    .route("/:id")
    .get(async(req, res, next) => {
        console.log("req.params", req.params);
        try {
            const customer = await customersModel.findById(req.params.id);
            if (customer === null) {
                ("this customer doesn't exist");
            } else {
                res.send(customer);
            }
        } catch (error) {
            next(error);
        }
    })
    .delete(async(req, res, next) => {
        try {
            const customer = await customersModel.findByIdAndDelete(req.params.id);
            console.log("Customer correctly deleted!");
            if (customer) {
                res.send(201);
            } else {
                res.send("Customer not found!");
            }
        } catch (error) {
            next(error);
        }
    })
    .put(async(req, res, next) => {
        try {
            const customer = await customersModel.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );
            if (customer === null) {
                ("this customer doesn't exist!");
            } else {
                res.send(customer);
            }
        } catch (error) {
            next(error);
        }
    });

export default router;
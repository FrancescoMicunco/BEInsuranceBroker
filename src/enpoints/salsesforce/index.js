import express from "express";
import { isHttpError } from "http-errors";
import salesforceModel from "../salsesforce/Schema.js";

const router = express.Router();

router
    .route("/")
    .post(async(req, res, next) => {
        try {
            const seller = await salesforceModel(req.body);
            const { _id } = await seller.save();
            res.status(201).send({ _id });
        } catch (error) {
            next(error);
        }
    })

.get(async(req, res, next) => {
    try {
        const seller = await salesforceModel.find();
        res.status(200).send(seller);
    } catch (error) {
        next(error);
    }
});

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const seller = await salesforceModel.findById(req.params.id);
            if (seller === null) {
                ("this seller doesn't exist");
            } else {
                res.send(seller);
            }
        } catch (error) {
            next(error);
        }
    })
    .delete(async(req, res, next) => {
        try {
            const seller = await salesforceModel.findByIdAndDelete(req.params.id);
            console.log("seller correctly deleted!");
            if (seller) {
                res.send(201);
            } else {
                res.send("seller not found!");
            }
        } catch (error) {
            next(error);
        }
    })
    .put(async(req, res, next) => {
        try {
            const seller = await salesforceModel.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );
            if (seller === null) {
                ("this seller doesn't exist!");
            } else {
                res.send(seller);
            }
        } catch (error) {
            next(error);
        }
    });

export default router;
import express from "express";
import { isHttpError } from "http-errors";
import productsModel from "../products/Schema.js";

const router = express.Router();

router
    .route("/")
    .post(async(req, res, next) => {
        try {
            const product = await productsModel(req.body);
            const { _id } = await product.save();
            res.status(201).send({ _id });
        } catch (error) {
            next(error);
        }
    })

.get(async(req, res, next) => {
    try {
        const product = await productsModel.find();
        res.status(200).send(product);
    } catch (error) {
        next(error);
    }
});

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const product = await productsModel.findById(req.params.id);
            if (product === null) {
                ("this product doesn't exist");
            } else {
                res.send(product);
            }
        } catch (error) {
            next(error);
        }
    })
    .delete(async(req, res, next) => {
        try {
            const product = await productsModel.findByIdAndDelete(req.params.id);
            console.log("product correctly deleted!");
            if (product) {
                res.send(200);
            } else {
                res.send("product not found!");
            }
        } catch (error) {
            next(error);
        }
    })
    .put(async(req, res, next) => {
        try {
            const product = await productsModel.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );
            if (product === null) {
                ("this product doesn't exist!");
            } else {
                res.send(product);
            }
        } catch (error) {
            next(error);
        }
    });

export default router;
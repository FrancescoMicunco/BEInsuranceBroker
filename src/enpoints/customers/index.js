import express from "express";
import { isHttpError } from "http-errors";
import customersModel from "../customers/Schema.js";
import productsModel from "../products/Schema.js";
import q2m from "query-to-mongo";

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
    const mongoQuery = q2m(req.query);
    const total = await customersModel.countDocuments(mongoQuery.criteria);

    try {
        const customer = await customersModel
            .find(mongoQuery.criteria, {
                password: 0,
            })
            .sort(mongoQuery.options.sort || { createdAt: -1 })
            .limit(mongoQuery.options.limit)
            .skip(mongoQuery.options.skip)
            .populate({ path: "seller" });
        res.status(200).send({
            links: mongoQuery.links("/customers", total),
            total: Math.ceil(total / mongoQuery.options.limit),
            customer,
        });
    } catch (error) {
        next(error);
    }
});

router
    .route("/:id")
    .get(async(req, res, next) => {
        console.log("req.params", req.params);
        try {
            const customer = await customersModel.findById(req.params.id, {
                password: 0,
            });
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

//  routes for history requests

router
    .get("/:id/purchasedHistory", async(req, res, next) => {
        console.log("get id", req.params.id);
        try {
            const customer = await customersModel.findById(req.params.id);
            if (customer) {
                res.send({ purchasedHistory: customer.purchasedHistory });
            } else {
                next(error);
            }
        } catch (error) {
            next(error);
        }
    })

.post("/:id/purchasedHistory", async(req, res, next) => {
    try {
        const productPurchased = await productsModel.findById(
            req.body.productId, { _id: 0, customer: 0 }
        );

        if (productPurchased) {
            const productToSendInHistory = await {
                ...productPurchased.toObject(),
                    purchasedDate: new Date(),
            };

            const customerToAddHistory = await customersModel.findByIdAndUpdate(
                req.params.id, { $push: { purchasedHistory: productToSendInHistory } }, { new: true }
            );

            if (customerToAddHistory) {
                res.send(customerToAddHistory);
            } else {
                next(404, "this customer is not available");
            }
        } else {
            next(404, "this product is not available");
        }
    } catch (error) {
        next(error);
    }
});

//  routes for statistic

router.get("/stats", async(req, res, next) => {
    const mongoQuery = q2m(req.query);
    try {
        const customer = await customersModel
            .find(mongoQuery.criteria, {
                password: 0,
            })
            .sort(mongoQuery.options.sort)
            .limit(mongoQuery.options.limit)
            .skip(mongoQuery.options.skip)
            .populate({ path: "seller" });
        res.status(200).send(customer);
    } catch (error) {
        next(error);
    }
});
export default router;
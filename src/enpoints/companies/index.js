import express from "express";
import companyModel from "../companies/Schema.js";
import q2m from "query-to-mongo";

const router = express.Router();

router
    .route("/")
    .post(async(req, res, next) => {
        try {
            const company = await companyModel(req.body);
            const { _id } = await company.save();
            res.status(201).send({ _id });
        } catch (error) {
            next(error);
        }
    })

.get(async(req, res, next) => {
    const mongoQuery = q2m(req.query);
    try {
        const companies = await companyModel
            .find(mongoQuery.criteria)
            .sort(mongoQuery.options.sort)
            .limit(mongoQuery.options.limit)
            .skip(mongoQuery.options.skip);
        res.status(200).send(companies);
    } catch (error) {
        next(error);
    }
});

router
    .route("/:id")
    .get(async(req, res, next) => {
        console.log("params", req.params.id);
        try {
            const company = await companyModel.findById(req.params.id);
            if (company === null) {
                ("this Company doesn't exist");
            } else {
                res.send(company);
            }
        } catch (error) {
            next(error);
        }
    })

.delete(async(req, res, next) => {
    try {
        const company = await companyModel.findByIdAndDelete(req.params.id);
        if (company) {
            res.status(201).send("Company deleted!");
        } else {
            res.send("Company not found");
        }
    } catch (error) {
        next(error);
    }
})

.put(async(req, res, next) => {
    try {
        const company = await companyModel.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        if (company === null) {
            ("this Company not exist!");
        } else {
            res.send(company);
        }
    } catch (error) {
        next(error);
    }
});

export default router;
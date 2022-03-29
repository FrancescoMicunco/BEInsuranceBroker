import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productCompaniesSchema = new Schema({
        company: [{ type: Schema.Types.ObjectId, ref: "Companies" }],
        productNmber: { type: String, required: true },
        productName: { type: String, required: true },
        area: {
            type: String,
            required: true,
            enum: ["Life", "Healt", "Professional"],
        },
        minAmount: { type: Number, required: true },
        profit_margin: { type: Number, required: true },
        minAge: { type: Number, required: true },
        maxAge: { type: Number, required: true },
        minDuration: { type: Number, required: true },
        marriageStatus: {
            type: String,
            required: false,
            enum: ["Married", "Divorced", "Separate", "Celibate/Maiden"],
        },
    },

    { timestamp: true }
);

export default model("ProductCompanies", productCompaniesSchema);
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    products: [{
        productNmber: { type: String, required: true },
        productName: { type: String, required: true },
        area: {
            type: String,
            required: true,
            enum: ["Life", "Healt", "Professional"],
        },
        amount: { type: Number, required: true },
        profit_margin: { type: Number, required: true },
        minAge: { type: String, required: true },
        maxAge: { type: String, required: true },
        minDuration: { type: String, required: true },
        marriageStatus: {
            type: String,
            required: true,
            enum: ["Married", "Divorced", "Separate", "Celibate/Maiden"],
        },
    }, ],
}, { timestamp: true });

export default model("Companies", companySchema);
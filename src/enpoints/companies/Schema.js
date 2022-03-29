import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "ProductCompanies" }],
}, { timestamp: true });

export default model("Companies", companySchema);
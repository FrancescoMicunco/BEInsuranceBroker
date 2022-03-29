import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    // seller: [{ type: Schema.Types.ObjectId, ref: "Sales" }],
    customer: [{ type: Schema.Types.String, ref: "Customers" }],
    number: { type: String, required: true },
    productName: [{ type: Schema.Types.String, ref: "ProductsCompanies" }],
    endDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    rebate: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export default model("Products", productSchema);
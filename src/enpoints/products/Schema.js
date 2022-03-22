import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    // seller: [{ type: Schema.Types.ObjectId, ref: "Sales" }],
    customer: [{ type: Schema.Types.String, ref: "Customers" }],
    number: { type: String, required: true },
    productName: { type: String, required: true },
    amount: { type: Number, required: true },
}, { timestamps: true });

export default model("Products", productSchema);
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const customerSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    seller: [{ type: Schema.Types.ObjectId, ref: "Sales" }],
    isPrivacy: { type: Boolean, required: false, default: false },
    isCompliance: { type: Boolean, required: false, default: false },
    purchasedHistory: [{
        name: { type: String },
        area: { type: String },
        amount: { type: String },
        purchasedDate: { type: Date },
    }, ],
    role: {
        type: String,
        enum: ["User", "Salesforce", "Admin"],
        default: "User",
    },
}, { timestamps: true });

export default model("Customers", customerSchema);
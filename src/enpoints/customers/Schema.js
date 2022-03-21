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
    isPrivacy: { type: Boolean, required: true },
    isCompliance: { type: Boolean, required: true },
    role: {
        type: String,
        enum: ["User", "Salesforce", "Admin"],
        default: "User",
    },
}, { timestamps: true });

export default model("Customers", customerSchema);
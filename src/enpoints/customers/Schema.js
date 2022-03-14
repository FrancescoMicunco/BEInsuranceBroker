import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const customerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        enum: ["User", "Salesforce", "Admin"],
        default: "User",
    },
}, { timestamps: true });

export default model("Customers", customerSchema);
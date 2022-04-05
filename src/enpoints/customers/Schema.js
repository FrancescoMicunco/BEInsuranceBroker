import mongoose from "mongoose";

const { Schema, model } = mongoose;

const customerSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birth_date: { type: Date, required: true },
    healt: { surgery: { type: Boolean }, medicine: { type: Boolean } },
    seller: [{ type: Schema.Types.ObjectId, ref: "Sales" }],
    isHealt: { type: Boolean, required: true },
    gender: { type: String, required: true, enum: ["MALE", "FEMALE", "OTHER"] },
    marital: {
        type: String,
        required: true,
        enum: ["MARRIED", "DIVORCED", "SEPARATE", "CELIBATE/MAIDEN"],
    },
    isPrivacy: { type: Boolean, required: false, default: false },
    isCompliance: { type: Boolean, required: false, default: false },
    purchasedHistory: [{
        productName: { type: Array },
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
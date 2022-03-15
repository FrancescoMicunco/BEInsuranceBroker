import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamp: true });

export default model("Companies", companySchema);
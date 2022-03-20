import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const salesSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
}, { timestamps: true });

export default model("Sales", salesSchema);
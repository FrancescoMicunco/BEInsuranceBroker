import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const salesSchema = new Schema({
    name: { type: String, required: true },
    area: {
        type: String,
        enum: ["Life", "Damage", "Healt"],
        default: "Life",
    },
}, { timestamps: true });

export default model("Sales", salesSchema);
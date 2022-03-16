import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    area: {
        type: String,
        enum: ["Life", "Damage", "Healt"],
        default: "Life",
    },
}, { timestamps: true });

export default model("Products", productSchema);
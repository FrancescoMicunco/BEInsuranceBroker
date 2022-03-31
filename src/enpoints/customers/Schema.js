import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
        productName: { type: String },
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

customerSchema.pre("save", async function(next) {
    const newCustomer = this;
    const plainPW = newCustomer.password;
    if (newCustomer.isModified("password")) {
        const hash = await bcrypt.hash(plainPW, 10);
        newCustomer.password = hash;
    }
    next();
});

customerSchema.methods.toJSON = function() {
    const customerDocument = this;
    const customerObject = customerDocument.toObject();
    delete customerObject.password;

    return customerObject;
};

customerSchema.statics.checkCredentials = async function(userName, password) {
    const customer = await this.findOne({ userName });
    if (customer) {
        const isPassword = await bcrypt.compare(password, customer.password);
        if (isPassword) {
            return customer;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default model("Customers", customerSchema);
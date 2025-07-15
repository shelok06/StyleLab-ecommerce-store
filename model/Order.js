import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    orderID: { type: String, required: true },
    email: { type: String, required: true },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    delivery: { type: Boolean, default: false },
    orderFinalization: {type: Boolean, default: false},
    payment: { type: Boolean, default: false },
    name: { type: String },
    address: { type: String },
    phone: {type: String },
    city: { type: String },
    createdAt: { type: String, default: new Date().toLocaleString() },
    updatedAt: { type: String, default: new Date().toLocaleString() },
    deliveryDate: { type: String }
})

export default mongoose.models.Order || model("Order", OrderSchema)
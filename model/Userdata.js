import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    SigninAt: { type: Date, default: Date.now},
    cart:{type: Array, required: true},
    address:{type: String}
})

export default mongoose.models.Userdata || model("Userdata", UserSchema)
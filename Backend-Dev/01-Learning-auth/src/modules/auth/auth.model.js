import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase:true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required."],
        minLength: 8,
        select: false
    },

    role: {
        type: String,
        enum:["customer", "seller", "admin", "support"],
        default: "customer"
    },


    isVerified: {
        type: Boolean,
        default: false
    }
})
import mongoose from "mongoose";
import bcrypt from "bcryptjs"

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
    },

    verificationToken: {
        type: String,
        select: false,
    },

    refreshToken: {
        type: String,
        select: false
    },

    resetPasswordToken: {
        type: String,
        select: false,
    },

    resetPasswordExpire: {
        type: Date,
        select: false,

    },

},
{timestamps: true}

);


userSchema.pre('save', async function(){
    if(!this.isModified("password")) return;
    this.password = bcrypt.hash(this.password, 12);
})


userSchema.methods.comparePassword = async function(textPass){
    return bcrypt.compare(textPass, this.password)
}



export default mongoose.model('User', userSchema)
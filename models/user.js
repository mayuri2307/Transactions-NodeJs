import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    net_balance:{
        type: Number,
        default: 0
    },
    amount_credited:{
        type: Number,
        default: 0 
    },
    amount_debited:{
        type: Number,
        default: 0 
    }
})

const User = mongoose.model("User", userSchema)

export default User;
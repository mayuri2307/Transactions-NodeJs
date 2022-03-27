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
    ammount_credited:{
        type: Number,
        default: 0 
    },
    ammount_debited:{
        type: Number,
        default: 0 
    }
})

const User = mongoose.model("User", userSchema)

export default User;
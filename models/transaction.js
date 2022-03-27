import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ["CREDIT", "DEBIT"],
        default: "CREDIT"
    },
    amount:{
        type: Number,
        default: 0
    },
    currency:{
        type: String,
        enum: ["INR", "USD", "EURO"],
        default: "INR"
    },
    status:{
        type: String,
        enum: ["INPROGRESS", "COMPLETED"],
        required: true
    }
},
{
    timestamps: true
}
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction;
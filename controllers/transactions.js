import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import mongoose from "mongoose";

const createTransaction = async (req, res) => {
  if (!req.userid) return res.status(401).json({ message: "Unauthorized" });

  const transaction = req.body;

  const newTransaction = new Transaction(transaction);
  try {
    const currentUser = await User.findById(req.userid);
    if (
      newTransaction.status === "DEBIT" &&
      currentUser.net_balance < newTransaction.amount
    ) {
      return res
        .status(400)
        .json({ message: "Not enough balance in the account to withdraw!" });
    }
    // If valid amount, save the tranaction
    await newTransaction.save();

    if (newTransaction.status === "COMPLETED") {
      if (newTransaction.type === "CREDIT") {
        currentUser.net_balance =
          currentUser.net_balance + newTransaction.amount;
        currentUser.amount_credited =
          currentUser.amount_credited + newTransaction.amount;
      } else {
        currentUser.net_balance =
          currentUser.net_balance - newTransaction.amount;
        currentUser.amount_debited =
          currentUser.amount_debited + newTransaction.amount;
      }
    }

    await User.findByIdAndUpdate(req.userid, currentUser);
    res.status(200).json({ message: "Transaction Created Successfully" });

  } catch (error) {

    // to handle the input checks
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  if (!req.userid) return res.json({ message: "Unauthorized" });
  const transaction = req.body;
  const existingTransaction = await Transaction.findOne({
    username: transaction.username,
  }).sort({createdAt: -1}).limit(1);

  if (existingTransaction.status === "COMPLETED")
    return res
      .status(400)
      .json({ message: "Cannot update a completed transaction" });
  await Transaction.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(existingTransaction._id)
    },
    { $set: transaction}
  );
  
  const currentUser = await User.findById(req.userid);

  if(transaction.type && transaction.amount){
    if (transaction.type === "CREDIT") {
      currentUser.net_balance =
        currentUser.net_balance + transaction.amount;
      currentUser.amount_credited =
        currentUser.amount_credited + transaction.amount;
    } else {
      currentUser.net_balance =
        currentUser.net_balance - transaction.amount;
      currentUser.amount_debited =
        currentUser.amount_debited + transaction.amount;
    }
    await User.findByIdAndUpdate(req.userId, currentUser);
  }
  res.status(200).json({ message: "Transaction Updated Successfully!" });
};

export {createTransaction, updateTransaction}
import express from "express";
import { createTransaction, updateTransaction } from "../controllers/transactions.js";
import { authenticateToken } from "../middleware/auth.js"


const router = express.Router();
router.post('/', authenticateToken, createTransaction)
router.patch('/', authenticateToken, updateTransaction)

export default router
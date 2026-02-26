import transactionModel from "../model/transactionModel.js";
import userModel from "../model/userModel.js";

const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category,note } = req.body;
    const userId = req.userId; 
    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields except note are required",
      });
    }
    const newTransaction = new transactionModel({
      userId,
      title,
      amount,
      type,
      category,
      note,
    });
    await newTransaction.save();
    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Add transaction error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }}
  const getTransactions = async (req, res) => {
    try {
      const userId = req.userId;  
      const transactions = await transactionModel.find({ userId });
        res.json({
          success: true,
          transactions,
        });
    } catch (error) {
      console.error("Get transactions error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  const getTransactionById = async (req, res) => {
    try { 
        const { id } = req.params;  
        const userId = req.userId; // Get user ID from authenticated request
        const transaction = await transactionModel.findOne({ _id: id, userId });
        if (!transaction) {
          return res.status(404).json({
            success: false,
            message: "Transaction not found",
          });
        }
        res.json({
          success: true,
          transaction,
        });
    }
        catch (error) {
            console.error("Get transaction by ID error:", error);
            res.status(500).json({
              success: false,
              message: error.message,
            });
          }
  }
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const transaction = await transactionModel.findOneAndDelete({ _id: id, userId });
        if (!transaction) {
          return res.status(404).json({
            success: false,
            message: "Transaction not found",
          });
        }
        res.json({
          success: true,
          message: "Transaction deleted successfully",
        });
    }
        catch (error) {
            console.error("Delete transaction error:", error);
            res.status(500).json({
              success: false,
                message: error.message,
            });
          }
    };
 const editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, category, note } = req.body;
    const userId = req.userId; // Get user ID from authenticated request
    const transaction = await transactionModel.findOne({ _id: id, userId });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    // Update fields if provided
    if (title) transaction.title = title;
    if (amount) transaction.amount = amount;
    if (type) transaction.type = type;
    if (category) transaction.category = category;
    if (note) transaction.note = note;
    await transaction.save();
    res.json({
      success: true,
      message: "Transaction updated successfully",
      transaction,
    });
  }
    catch (error) {
        console.error("Edit transaction error:", error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
  };

export {addTransaction, getTransactions,editTransaction,getTransactionById,deleteTransaction };
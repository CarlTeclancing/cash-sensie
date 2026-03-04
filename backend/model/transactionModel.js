import mongoose from 'mongoose'
const transactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    emoji:{
        type: String,
        required: false,
    },
    type:{
        type: String,
        enum: ['Debit','Saving'],
        required: true,
    },
   date:{
        type: Date,
        default: Date.now,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    note:{
        type: String,
    }
})
const transactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
export default transactionModel
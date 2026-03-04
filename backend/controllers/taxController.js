import taxModel from '../model/taxModel.js';
const addTax = async (req, res) => {
    try {
        const { title, description, amount, recurring } = req.body;
        const userId = req.userId;

        if (!title || amount === undefined) {
            return res.status(400).json({ success: false, message: 'Title and amount are required' });
        }

        const newTax = new taxModel({
            userId,
            title,
            description,
            amount,
            recurring
        });

        await newTax.save();
        res.status(201).json({ success: true, message: 'Tax added successfully', tax: newTax });
    } catch (error) {
        console.error("Add tax error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const getTaxes = async (req, res) => {
    try {
        const userId = req.userId;
        const taxes = await taxModel.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, taxes });
    } catch (error) {
        console.error("Get taxes error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const editTax = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, amount, recurring } = req.body;
        const userId = req.userId;

        const tax = await taxModel.findOne({ _id: id, userId });

        if (!tax) {
            return res.status(404).json({ success: false, message: 'Tax not found' });
        }

        if (title) tax.title = title;
        if (description !== undefined) tax.description = description;
        if (amount !== undefined) tax.amount = amount;
        if (recurring !== undefined) tax.recurring = recurring;

        await tax.save();
        res.json({ success: true, message: 'Tax updated successfully', tax });
    } catch (error) {
        console.error("Edit tax error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a tax
const deleteTax = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const tax = await taxModel.findOneAndDelete({ _id: id, userId });

        if (!tax) {
            return res.status(404).json({ success: false, message: 'Tax not found' });
        }

        res.json({ success: true, message: 'Tax deleted successfully' });
    } catch (error) {
        console.error("Delete tax error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addTax, getTaxes, editTax, deleteTax };
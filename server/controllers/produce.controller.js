import { Produce } from '../models/produce.model.js';

export const createProduce = async (req, res) => {
    try {
        const produce = new Produce(req.body);

        await produce.save();
        res.status(201).json({
            success: true,
            message: "Product has been added successfully",
            produce,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fetchProduce = async (req, res) => {  
    try {
        const produce = await Produce.find();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            produce,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProduce = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updateProduce = await Produce.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if(!updateProduce) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            produce: updateProduce,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProduce = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduce = await Produce.findByIdAndDelete(id);

        if(!deletedProduce) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            produce: deletedProduce,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
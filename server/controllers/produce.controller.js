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
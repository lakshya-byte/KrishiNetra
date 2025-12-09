import { Residue } from "../models/residue.model.js";

export const createResidue = async (req, res) => {
    try {
        const residue = await Residue.create({
            farmer: req.user._id,
            ...req.body,
        });

        res.status(201).json({
            message: "Residue created successfully",
            residue,
        });
    } catch (err) {
        console.error("Create Residue Error:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getResidueById = async (req, res) => {
    try {
        const residue = await Residue.findById(req.params.id).populate("farmer");

        if (!residue) {
            return res.status(404).json({ message: "Residue not found" });
        }

        res.status(200).json({ data: residue });
    } catch (err) {
        console.error("Get Residue By ID Error:", err);
        res.status(500).json({ error: err.message });
    }
}; // <-- THIS WAS MISSING

export const getMyResidue = async (req, res) => {
    try {
        const residues = await Residue.find({ farmer: req.user._id })
            .sort({ createdAt: -1 });

        res.json(residues);
    } catch (err) {
        console.error("Get My Residue Error:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getAllResidue = async (req, res) => {
    try {
        const residues = await Residue.find()
            .populate("farmer")
            .sort({ createdAt: -1 });

        res.json(residues);
    } catch (err) {
        console.error("Get All Residue Error:", err);
        res.status(500).json({ error: err.message });
    }
};

export const buyResidue = async (req, res) => {
    try {
        const { buyerId } = req.body;

        const residue = await Residue.findByIdAndUpdate(
            req.params.id,
            {
                status: "Booked",
                currentBuyer: buyerId,
            },
            { new: true }
        );

        if (!residue) {
            return res.status(404).json({ message: "Residue not found" });
        }

        res.json({
            message: "Residue booked successfully",
            residue,
        });
    } catch (err) {
        console.error("Buy Residue Error:", err);
        res.status(500).json({ error: err.message });
    }
};

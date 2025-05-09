const Internship = require('../models/Internship');

// Get all internships
exports.getAllInternships = async (req, res) => {
    try {
        const internships = await Internship.find();
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new internship
exports.createInternship = async (req, res) => {
    try {
        const internship = new Internship(req.body);
        const newInternship = await internship.save();
        res.status(201).json(newInternship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update internship
exports.updateInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }
        res.status(200).json(internship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

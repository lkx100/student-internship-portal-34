import Internship from '../models/internshipModel.js'

// Get all internships
export const getAllInternships = async (req, res) => {
    try {
        const internships = await Internship.find()
        res.status(200).json(internships)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Create new internship
export const createInternship = async (req, res) => {
    try {
        const internship = new Internship(req.body)
        const newInternship = await internship.save()
        res.status(201).json(newInternship)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update internship
export const updateInternship = async (req, res) => {
    try {
        // Check if at least one field is provided for update
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'At least one field is required for update' });
        }

        // First find the internship
        const existingInternship = await Internship.findById(req.params.id);
        if (!existingInternship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        // Update only the fields that are provided
        Object.keys(req.body).forEach(key => {
            if (key in existingInternship) {
                existingInternship[key] = req.body[key];
            }
        });

        // Save the updated document
        const updatedInternship = await existingInternship.save();
        res.status(200).json(updatedInternship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

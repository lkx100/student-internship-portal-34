import mongoose from 'mongoose'

const internshipSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    durations: {
        type: String,
        required: true
    },
    isFavourite: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Internship = mongoose.model('Internship', internshipSchema)
export default Internship

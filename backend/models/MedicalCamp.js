const mongoose = require("mongoose");

const medicalCampSchema = new mongoose.Schema({
    campId: {
        type: String,
        required: true,
        unique: true
    },
    campName: {
        type: String,
        required: true
    },
    campType: {
        type: String,
        required: true
    },
    campDate: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    maximumParticipants: {
        type: Number,
        required: true
    }
}, { versionKey: false, timestamps: false });

module.exports = mongoose.model("MedicalCamp", medicalCampSchema, "MedicalCamps");
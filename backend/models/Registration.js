const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    registrationId: {
        type: String,
        required: true,
        unique: true
    },
    participantId: {
        type: String,
        required: true
    },
    campId: {
        type: String,
        required: true
    },
    registrationDate: {
        type: String,
        required: true
    },
    registrationStatus: {
        type: String,
        required: true,
        default: "Confirmed"
    }
}, { versionKey: false, timestamps: false });

module.exports = mongoose.model("Registration", registrationSchema, "Registrations");
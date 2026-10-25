const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'participant'
    },
    phone: { type: String, default: '' },
    age: { type: mongoose.Schema.Types.Mixed, default: '' },
    gender: { type: String, default: '' },
    bloodGroup: { type: String, default: '' },
    address: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },
    department: { type: String, default: '' },
    specialization: { type: String, default: '' }
}, { versionKey: false, timestamps: false, strict: false });

module.exports = mongoose.model("User", userSchema, "Users");
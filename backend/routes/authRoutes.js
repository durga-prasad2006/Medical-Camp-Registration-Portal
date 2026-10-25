const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const toSafeUser = (userDoc) => {
    const obj = userDoc.toObject ? userDoc.toObject() : userDoc;
    const { password, ...safe } = obj;
    return safe;
};

// POST /register - Register a new user account (userId, name, email, password, role)
router.post("/register", async (req, res) => {
    try {
        const {
            userId,
            name,
            email,
            password,
            role
        } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        if (role === "admin" || req.body.role === "admin") {
            return res.status(403).json({
                message: "Admin registration is prohibited. Only Participant and Doctor registrations are supported."
            });
        }

        const finalUserId = userId || `USR-${Date.now().toString().slice(-6)}`;

        const user = new User({
            userId: finalUserId,
            name,
            email: email.toLowerCase(),
            password: password,
            role: role || "participant"
        });

        await user.save();

        const token = jwt.sign(
            {
                userId: user.userId,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: toSafeUser(user)
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});

// POST /login - Authenticate user and return token + profile
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        let isMatch = false;
        if (user.password && (user.password.startsWith("$2a$") || user.password.startsWith("$2b$"))) {
            isMatch = await bcrypt.compare(password, user.password);
        } else {
            isMatch = (user.password === password);
        }

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user.userId,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: toSafeUser(user)
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
});

// POST /admin-login - Restricted admin login with secret password
router.post("/admin-login", async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                message: "Admin password is required"
            });
        }

        const adminUser = await User.findOne({ role: "admin" });

        if (!adminUser) {
            return res.status(404).json({
                message: "No admin user found in database"
            });
        }

        let isMatch = (adminUser.password === password);
        if (!isMatch && adminUser.password && (adminUser.password.startsWith("$2a$") || adminUser.password.startsWith("$2b$"))) {
            isMatch = await bcrypt.compare(password, adminUser.password);
        }

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Admin Password. Access Denied."
            });
        }

        const token = jwt.sign(
            {
                userId: adminUser.userId,
                role: adminUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            message: "Admin access granted",
            token,
            user: toSafeUser(adminUser)
        });

    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({
            message: "Admin authentication failed",
            error: error.message
        });
    }
});

// PUT /users/:id - Update user profile
router.put("/users/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const mongoose = require("mongoose");
        const query = mongoose.Types.ObjectId.isValid(id)
            ? { $or: [{ _id: id }, { userId: id }, { email: id.toLowerCase() }] }
            : { $or: [{ userId: id }, { email: id.toLowerCase() }] };

        const allowed = [
            "name",
            "phone",
            "age",
            "gender",
            "bloodGroup",
            "address",
            "emergencyContact",
            "department",
            "specialization",
            "role"
        ];
        const updateData = {};
        for (const k of allowed) {
            if (req.body[k] !== undefined) updateData[k] = req.body[k];
        }

        const updatedUser = await User.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true, runValidators: false }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Profile updated successfully",
            user: toSafeUser(updatedUser)
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({
            message: "Failed to update profile",
            error: error.message
        });
    }
});

// GET /users - List all users (admin / stats)
router.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

module.exports = router;
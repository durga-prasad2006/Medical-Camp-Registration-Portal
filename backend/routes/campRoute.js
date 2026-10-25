const express = require("express");
const mongoose = require("mongoose");
const MedicalCamp = require("../models/MedicalCamp");
const Registration = require("../models/Registration");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Helper to enrich camp for UI consumption without modifying DB
const enrichCamp = async (campDoc) => {
    const camp = campDoc.toObject ? campDoc.toObject() : { ...campDoc };
    const registeredCount = await Registration.countDocuments({
        campId: camp.campId,
        registrationStatus: { $ne: "Cancelled" }
    });

    const isPast = camp.campDate && new Date(camp.campDate) < new Date(new Date().setHours(0, 0, 0, 0));

    return {
        ...camp,
        registeredCount,
        status: isPast ? "Completed" : "Upcoming",
        startTime: "09:00 AM",
        endTime: "02:00 PM",
        doctorSpecialization: "",
        description: `${camp.campName} organized at ${camp.venue}.`,
        instructions: "Please arrive on time.",
        targetAudience: "Open to all participants",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
    };
};

// Helper to enrich registration for UI consumption without modifying DB
const enrichRegistration = async (regDoc, index = 0) => {
    const reg = regDoc.toObject ? regDoc.toObject() : { ...regDoc };
    const [camp, user] = await Promise.all([
        MedicalCamp.findOne({ campId: reg.campId }),
        User.findOne({ userId: reg.participantId })
    ]);

    return {
        ...reg,
        tokenNumber: `TKN-${String(index + 1).padStart(3, "0")}`,
        campName: camp ? camp.campName : "Medical Camp",
        campType: camp ? camp.campType : "General Health",
        campDate: camp ? camp.campDate : reg.registrationDate,
        venue: camp ? camp.venue : "",
        doctorName: camp ? camp.doctorName : "",
        participantName: user ? user.name : "Participant",
        participantEmail: user ? user.email : "",
        participantPhone: "",
        attendance: reg.registrationStatus === "Attended" ? "Present" : "Pending",
        vitals: { bp: "", pulse: "", sugar: "" },
        medicalNotes: "",
        doctorNotes: ""
    };
};

// GET /medicalCamps - Publicly view available medical camps
router.get("/medicalCamps", async (req, res) => {
    try {
        const camps = await MedicalCamp.find().sort({ campDate: 1 });
        const enriched = await Promise.all(camps.map(enrichCamp));
        res.json(enriched);
    } catch (error) {
        console.error("Fetch camps error:", error);
        res.status(500).json({
            message: "Failed to fetch medical camps",
            error: error.message
        });
    }
});

// GET /medicalCamps/:id - View single medical camp
router.get("/medicalCamps/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query = mongoose.Types.ObjectId.isValid(id) ? { $or: [{ _id: id }, { campId: id }] } : { campId: id };
        const camp = await MedicalCamp.findOne(query);

        if (!camp) {
            return res.status(404).json({ message: "Medical camp not found" });
        }

        const enriched = await enrichCamp(camp);
        res.json(enriched);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch medical camp",
            error: error.message
        });
    }
});

// GET /doctors - Fetch list of registered doctors from database
router.get("/doctors", async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" }).select("userId name email");
        res.json(doctors);
    } catch (error) {
        console.error("Fetch doctors error:", error);
        res.status(500).json({
            message: "Failed to fetch doctors",
            error: error.message
        });
    }
});

// POST /medicalCamps - Create a new medical camp (stores strictly the 7 attributes)
router.post("/medicalCamps", authMiddleware, async (req, res) => {
    try {
        const {
            campId,
            campName,
            campType,
            campDate,
            venue,
            doctorName,
            maximumParticipants
        } = req.body;

        if (!campName || !venue || !doctorName || !maximumParticipants) {
            return res.status(400).json({
                message: "campName, venue, doctorName, and maximumParticipants are required"
            });
        }

        // Validate that assigned doctor exists in database with role: doctor
        const doctorDoc = await User.findOne({
            role: "doctor",
            $or: [
                { name: doctorName },
                { name: new RegExp(`^${doctorName.trim()}$`, "i") },
                { userId: doctorName }
            ]
        });

        if (!doctorDoc) {
            return res.status(400).json({
                message: `Doctor "${doctorName}" is not registered in the database. Please select a registered doctor.`
            });
        }

        const finalCampId = campId || `CMP-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;

        const camp = new MedicalCamp({
            campId: finalCampId,
            campName,
            campType: campType || "General Health",
            campDate: campDate || new Date().toISOString().split("T")[0],
            venue,
            doctorName: doctorDoc.name,
            maximumParticipants: Number(maximumParticipants)
        });

        await camp.save();

        res.status(201).json({
            message: "Medical camp created successfully",
            camp
        });

    } catch (error) {
        console.error("Create camp error:", error);
        res.status(500).json({
            message: "Failed to create medical camp",
            error: error.message
        });
    }
});

// PUT /medicalCamps/:id - Update existing medical camp (only allowed attributes)
router.put("/medicalCamps/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const query = mongoose.Types.ObjectId.isValid(id) ? { $or: [{ _id: id }, { campId: id }] } : { campId: id };

        const allowed = ["campName", "campType", "campDate", "venue", "doctorName", "maximumParticipants"];
        const updateData = {};
        for (const k of allowed) {
            if (req.body[k] !== undefined) updateData[k] = req.body[k];
        }

        // If doctorName is being updated, validate against database
        if (updateData.doctorName) {
            const doctorDoc = await User.findOne({
                role: "doctor",
                $or: [
                    { name: updateData.doctorName },
                    { name: new RegExp(`^${updateData.doctorName.trim()}$`, "i") },
                    { userId: updateData.doctorName }
                ]
            });

            if (!doctorDoc) {
                return res.status(400).json({
                    message: `Doctor "${updateData.doctorName}" is not registered in the database. Please select a registered doctor.`
                });
            }
            updateData.doctorName = doctorDoc.name;
        }

        const camp = await MedicalCamp.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!camp) {
            return res.status(404).json({
                message: "Medical camp not found"
            });
        }

        res.json({
            message: "Medical camp updated successfully",
            camp
        });

    } catch (error) {
        console.error("Update camp error:", error);
        res.status(500).json({
            message: "Failed to update medical camp",
            error: error.message
        });
    }
});

// DELETE /medicalCamps/:id - Remove a medical camp
router.delete("/medicalCamps/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const query = mongoose.Types.ObjectId.isValid(id) ? { $or: [{ _id: id }, { campId: id }] } : { campId: id };

        const camp = await MedicalCamp.findOneAndDelete(query);

        if (!camp) {
            return res.status(404).json({
                message: "Medical camp not found"
            });
        }

        await Registration.updateMany(
            { campId: camp.campId },
            { $set: { registrationStatus: "Cancelled" } }
        );

        res.json({
            message: "Medical camp deleted successfully"
        });

    } catch (error) {
        console.error("Delete camp error:", error);
        res.status(500).json({
            message: "Failed to delete medical camp",
            error: error.message
        });
    }
});

// POST /registerCamp - Register a participant (stores strictly the 5 attributes)
router.post("/registerCamp", authMiddleware, async (req, res) => {
    try {
        const {
            registrationId,
            participantId,
            campId,
            registrationDate,
            registrationStatus
        } = req.body;

        if (!campId || !participantId) {
            return res.status(400).json({
                message: "Camp ID and Participant ID are required"
            });
        }

        // Check if camp exists
        const targetCamp = await MedicalCamp.findOne({
            $or: [{ campId }, ...(mongoose.Types.ObjectId.isValid(campId) ? [{ _id: campId }] : [])]
        });

        const resolvedCampId = targetCamp ? targetCamp.campId : campId;

        // Check if user is already registered for this camp
        const existing = await Registration.findOne({
            participantId,
            campId: resolvedCampId,
            registrationStatus: { $ne: "Cancelled" }
        });

        if (existing) {
            return res.status(400).json({
                message: "You have already registered for this medical camp."
            });
        }

        // Check capacity
        if (targetCamp && targetCamp.maximumParticipants) {
            const currentCount = await Registration.countDocuments({
                campId: resolvedCampId,
                registrationStatus: { $ne: "Cancelled" }
            });
            if (currentCount >= targetCamp.maximumParticipants) {
                return res.status(400).json({
                    message: "This medical camp is already at maximum capacity."
                });
            }
        }

        const finalRegId = registrationId || `REG-${Date.now().toString().slice(-6)}`;

        const registration = new Registration({
            registrationId: finalRegId,
            participantId,
            campId: resolvedCampId,
            registrationDate: registrationDate || new Date().toISOString().split("T")[0],
            registrationStatus: registrationStatus || "Confirmed"
        });

        await registration.save();

        res.status(201).json({
            message: "Camp registration successful",
            registration
        });

    } catch (error) {
        console.error("Camp registration error:", error);
        res.status(500).json({
            message: "Camp registration failed",
            error: error.message
        });
    }
});

// GET /registrations - Fetch registrations with optional filters
router.get("/registrations", authMiddleware, async (req, res) => {
    try {
        const query = {};
        if (req.query.participantId) {
            query.participantId = req.query.participantId;
        }
        if (req.query.campId && req.query.campId !== "All") {
            query.campId = req.query.campId;
        }
        if (req.query.status && req.query.status !== "All") {
            query.registrationStatus = req.query.status;
        }

        const registrations = await Registration.find(query);
        const enriched = await Promise.all(registrations.map((r, i) => enrichRegistration(r, i)));

        res.json(enriched);
    } catch (error) {
        console.error("Fetch registrations error:", error);
        res.status(500).json({
            message: "Failed to fetch registrations",
            error: error.message
        });
    }
});

// PUT /registrations/:id - Update registration status
router.put("/registrations/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const query = mongoose.Types.ObjectId.isValid(id)
            ? { $or: [{ _id: id }, { registrationId: id }] }
            : { registrationId: id };

        const allowed = ["registrationStatus"];
        const updateData = {};
        if (req.body.registrationStatus) {
            updateData.registrationStatus = req.body.registrationStatus;
        } else if (req.body.attendance === "Present") {
            updateData.registrationStatus = "Attended";
        }

        const registration = await Registration.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.json({
            message: "Registration updated successfully",
            registration
        });

    } catch (error) {
        console.error("Update registration error:", error);
        res.status(500).json({
            message: "Failed to update registration",
            error: error.message
        });
    }
});

// DELETE /cancelRegistration/:id - Cancel a registration
router.delete("/cancelRegistration/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const query = mongoose.Types.ObjectId.isValid(id)
            ? { $or: [{ _id: id }, { registrationId: id }] }
            : { registrationId: id };

        const registration = await Registration.findOneAndUpdate(
            query,
            { $set: { registrationStatus: "Cancelled" } },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.json({
            message: "Registration cancelled successfully",
            registration
        });

    } catch (error) {
        console.error("Cancel registration error:", error);
        res.status(500).json({
            message: "Failed to cancel registration",
            error: error.message
        });
    }
});

// GET /stats - Overall portal statistics
router.get("/stats", async (req, res) => {
    try {
        const [camps, registrations, users] = await Promise.all([
            MedicalCamp.find(),
            Registration.find(),
            User.find()
        ]);

        const today = new Date().toISOString().split("T")[0];
        const totalCamps = camps.length;
        const upcomingCamps = camps.filter((c) => c.campDate >= today).length;
        const completedCamps = camps.filter((c) => c.campDate < today).length;
        const totalRegistrations = registrations.length;
        const confirmedRegistrations = registrations.filter((r) => r.registrationStatus === "Confirmed").length;
        const attendedCount = registrations.filter((r) => r.registrationStatus === "Attended").length;
        const participantsCount = users.filter((u) => u.role === "participant").length;
        const doctorsCount = users.filter((u) => u.role === "doctor").length;

        const totalCapacity = camps.reduce((acc, c) => acc + (c.maximumParticipants || 0), 0);
        const totalFilled = registrations.filter((r) => r.registrationStatus !== "Cancelled").length;
        const capacityRate = totalCapacity > 0 ? Math.round((totalFilled / totalCapacity) * 100) : 0;

        res.json({
            totalCamps,
            upcomingCamps,
            completedCamps,
            totalRegistrations,
            confirmedRegistrations,
            attendedCount,
            participantsCount,
            doctorsCount,
            totalCapacity,
            totalFilled,
            capacityRate
        });
    } catch (error) {
        console.error("Stats error:", error);
        res.status(500).json({
            message: "Failed to generate stats",
            error: error.message
        });
    }
});

module.exports = router;
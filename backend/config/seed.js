const MedicalCamp = require("../models/MedicalCamp");
const User = require("../models/user");

const seedDatabase = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      await User.create({
        userId: "ADM-001",
        name: "System Administrator",
        email: "admin@camp.org",
        password: "Admin@2026",
        role: "admin"
      });
      console.log("Seed: Single Admin user verified (admin@camp.org)");
    }

    const doctorExists = await User.findOne({ email: "dr.sharma@health.org" });
    if (!doctorExists) {
      await User.create({
        userId: "USR-DOC-001",
        name: "Dr. Rajesh Sharma",
        email: "dr.sharma@health.org",
        password: "doctor",
        role: "doctor"
      });
      console.log("Seed: Doctor user verified (dr.sharma@health.org)");
    }

    const participantExists = await User.findOne({ email: "rahul@gmail.com" });
    if (!participantExists) {
      await User.create({
        userId: "USR-PAR-001",
        name: "Rahul Verma",
        email: "rahul@gmail.com",
        password: "user",
        role: "participant"
      });
      console.log("Seed: Participant user verified (rahul@gmail.com)");
    }
  } catch (err) {
    console.error("Seed Database Error:", err.message);
  }
};

module.exports = seedDatabase;

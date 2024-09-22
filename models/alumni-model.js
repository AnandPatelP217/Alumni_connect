const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const alumniSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: false },
  gender: { type: String, required: false },
  address: { type: String, required: false },
  graduationYear: { type: Number, required: true },
  departmentId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  current_company: { type: String, required: false },
  expertise: { type: [String], required: false },
  job_info: { type: String, required: false },
  roll_no: { type: String, required: true },
  about: { type: String, required: false },
  role: { type: String, required: true },
  linkedin: { type: String, required: false },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//compare the password
alumniSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

alumniSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this.id.toString(),
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const Alumni = model("Alumni", alumniSchema);
module.exports = Alumni;

const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const certificateSchema = new Schema({
  certificateName: { type: String, required: true },
  issuedBy: { type: String, required: true },
  issueDate: { type: Date, required: true },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  departmentId: { type: String, required: true },
  batch_start: { type: Number, required: true },
  batch_end: { type: Number, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: false },
  gender: { type: String, required: false },
  address: { type: String, required: false },
  guardianContact: { type: String, required: false },
  enrollmentStatus: { type: String, required: false, default: "Active" },
  coursesEnrolled: { type: [String], required: false },
  profilePicture: { type: String, required: false },
  password: { type: String, required: true },
  about: { type: String, required: false },
  role: { type: String, required: true },
  certificates: { type: [certificateSchema], required: false },
  skills: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//compare the password
studentSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

studentSchema.methods.generateToken = async function () {
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

const Student = model("Student", studentSchema);
module.exports = Student;

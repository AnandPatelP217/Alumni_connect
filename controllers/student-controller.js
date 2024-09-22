const Student = require('../models/student-model');
const bcrypt = require("bcryptjs");
//get all users from the database
const getAllStudentes = async (req, res) => {
  try {
    const students = await Student.find(); //as we don't want password to show
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No Students Found" });
    }
    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
  }
};


// Controller to create a new problem statement
const addStudent = async (req, res) => {
  try {
    const { roll, password } = req.body;

    const userExist = await Student.findOne({ roll });

    if (userExist) {
      return res.status(400).json({ msg: "Student already exists same roll number found!" });
    }
    const saltRound = 10; //more is more secure and time consuming
    const hash_password = await bcrypt.hash(password,saltRound);
    req.body.password = hash_password;
    const student = await Student.create(req.body);
    res.status(201).json(`Student added successfully! ${student}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findOne({ _id: id });
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
  }
}

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    await Student.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
}

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id; // Assume the student ID is passed in the URL params
    const updateData = req.body; // The data to update

    // Find the student by ID and update with new data
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.status(200).json({
      message: "Student updated successfully.",
      student: updatedStudent,
    });

  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {
  getAllStudentes,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent
};

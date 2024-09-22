const Alumni = require('../models/alumni-model'); // Assuming there's an Alumni model
const bcrypt = require('bcryptjs');

const addAlumni = async (req, res) => {
  try {
    const { email, name, departmentId, password } = req.body;

    // Check if alumni with the same email already exists
    const alumniExist = await Alumni.findOne({ email });
    if (alumniExist) {
      return res.status(400).json({ msg: 'Alumni already exists with this email!' });
    }

    // Hash the password
    const saltRound = 10; // More secure with higher rounds, but also slower
    const hash_password = await bcrypt.hash(password, saltRound);

    // Create the new alumni
    const newAlumni = await Alumni.create({
      ...req.body,
      password: hash_password,
    });

    return res.status(201).json({
      msg: 'Alumni added successfully!',
      alumni: newAlumni,
    });

  } catch (error) {
    console.error('Error adding alumni:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find(); // Retrieve all alumni
    if (!alumni || alumni.length === 0) {
      return res.status(404).json({ msg: 'No Alumni Found' });
    }

    return res.status(200).json(alumni);

  } catch (error) {
    console.error('Error fetching alumni:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const getAlumniById = async (req, res) => {
  try {
    const alumniId = req.params.id; // Get alumni ID from the URL
    const alumni = await Alumni.findById(alumniId);

    if (!alumni) {
      return res.status(404).json({ msg: 'Alumni not found' });
    }

    return res.status(200).json(alumni);

  } catch (error) {
    console.error('Error fetching alumni by ID:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const deleteAlumniById = async (req, res) => {
  try {
    const alumniId = req.params.id;

    const deletedAlumni = await Alumni.findByIdAndDelete(alumniId);

    if (!deletedAlumni) {
      return res.status(404).json({ msg: 'Alumni not found' });
    }

    return res.status(200).json({ msg: 'Alumni deleted successfully' });

  } catch (error) {
    console.error('Error deleting alumni:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const updateAlumniById = async (req, res) => {
  try {
    const alumniId = req.params.id;
    const updateData = req.body;

    const updatedAlumni = await Alumni.findByIdAndUpdate(
      alumniId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAlumni) {
      return res.status(404).json({ msg: 'Alumni not found' });
    }

    return res.status(200).json({
      msg: 'Alumni updated successfully',
      alumni: updatedAlumni,
    });

  } catch (error) {
    console.error('Error updating alumni:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = {
  addAlumni,
  getAllAlumni,
  getAlumniById,
  deleteAlumniById,
  updateAlumniById,
};

const Meeting = require('../models/meeting-model');                                                                                                                        require('../models/meeting-model'); // Assuming you have a Meeting model
const bcrypt = require("bcryptjs"); // Included in case the model has password-related fields

// Fetch all meetings
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    if (!meetings || meetings.length === 0) {
      return res.status(404).json({ message: "No Meetings Found." });
    }
    return res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

// Create a new meeting
const addMeeting = async (req, res) => {
  try {
    const { title, description, date, time, url, location, platform, alumni_id } = req.body;

    // Create the new meeting
    const meeting = await Meeting.create({
      title,
      description,
      date,
      time,
      url,
      platform,
      location,
      alumni_id
    });

    return res.status(201).json({
      message: "Meeting created successfully!",
      meeting,
    });

  } catch (error) {
    console.error("Error creating meeting:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

// Fetch a single meeting by ID
const getMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id; // Meeting ID from the URL params
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    return res.status(200).json(meeting);

  } catch (error) {
    console.error("Error fetching meeting:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
// Get all meetings posted by a specific alumni
const getMeetingsByAlumni = async (req, res) => {
  try {
    const alumniId = req.params.alumni_id; // Alumni ID from the URL params
    const meetings = await Meeting.find({ alumni_id: alumniId });

    if (!meetings || meetings.length === 0) {
      return res.status(404).json({ message: "No meetings found for this alumni." });
    }

    res.status(200).json(meetings);

  } catch (error) {
    console.error("Error fetching meetings by alumni:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a meeting by ID
const deleteMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;

    const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);

    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    return res.status(200).json({ message: "Meeting deleted successfully." });

  } catch (error) {
    console.error("Error deleting meeting:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

// Update a meeting by ID
const updateMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id; // Meeting ID from the URL params
    const updateData = req.body; // The data to update

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    return res.status(200).json({
      message: "Meeting updated successfully.",
      meeting: updatedMeeting,
    });

  } catch (error) {
    console.error("Error updating meeting:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
// Student votes for a meeting attendance
// Backend voteMeeting controller
const voteMeeting = async (req, res) => {
  try {
    const { id } = req.params; // Meeting ID
    const { studentId, isAttending } = req.body; // Student vote data

    // Find the meeting by ID
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    // Check if the student has already voted
    const alreadyVoted = meeting.attendees.some(attendee => attendee.studentId === studentId);

    if (alreadyVoted) {
      return res.status(400).json({ message: "You have already voted for this meeting" });
    }

    // Push the new vote
    meeting.attendees.push({ studentId, isAttending });
    await meeting.save();

    return res.status(200).json({ message: "Vote recorded", meeting });
  } catch (error) {
    console.error("Error voting for meeting:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllMeetings,
  addMeeting,
  getMeeting,
  deleteMeeting,
  getMeetingsByAlumni,
  updateMeeting,
  voteMeeting,
};

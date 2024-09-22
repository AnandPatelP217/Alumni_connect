const cron = require('node-cron');
const Student = require('../models/student-model');
const Alumni = require('../models/alumni-model');

const transferGraduatedStudentsToAlumni = async () => {
  try {
    // Get the current year to check for graduated students
    const currentYear = new Date().getFullYear();

    // Find all students whose batch_end is less than or equal to the current year
    const graduatedStudents = await Student.find({ batch_end: { $lte: currentYear } });

    if (graduatedStudents.length === 0) {
      console.log('No students to transition to alumni.');
      return;
    }

    // Loop through the graduated students and create corresponding alumni records
    for (const student of graduatedStudents) {
      const alumniData = {
        name: student.name,
        email: student.email,
        phone: student.phone,
        profilePicture: student.profilePicture,
        address: student.address,
        graduationYear: student.batch_end,
        departmentId: student.departmentId,
        current_company: '', // Default to empty, to be updated later
        expertise: [], // Default to empty, can be updated later
        job_info: '', // Default to empty, can be updated later
        roll_no: student.roll,
        about: student.about,
        role: 'alumni', // Set the role to alumni
        password: student.password, // Keep the hashed password
        linkedin: '', // Default to empty, can be updated later
      };

      // Create the alumni record
      await Alumni.create(alumniData);

      // Delete the student record after successful transition
      await Student.findByIdAndDelete(student._id);
    }

    console.log('Successfully transitioned graduated students to alumni.');

  } catch (error) {
    console.error('Error transitioning students to alumni:', error);
  }
};

// Schedule the job to run every day at midnight (00:00)
cron.schedule('* * * * *', transferGraduatedStudentsToAlumni, {
    timezone: 'Asia/Kolkata', // This is the timezone for India
  }); // Runs every day at midnight

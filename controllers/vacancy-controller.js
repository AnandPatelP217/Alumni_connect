const Vacancy = require('../models/vacancy-model');

const addVacancy = async (req, res) => {
  try {
    const { position, company, location, salary, requirements, alumni_id, description, status } = req.body;

    const newVacancy = await Vacancy.create({
      position,
      company,
      location,
      salary,
      requirements,
      alumni_id,
      description,
      status,
      enrolled_students: [],
    });

    res.status(201).json({
      message: "Vacancy added successfully!",
      vacancy: newVacancy,
    });

  } catch (error) {
    console.error("Error adding vacancy:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    if (!vacancies || vacancies.length === 0) {
      return res.status(404).json({ message: "No Vacancies Found." });
    }

    res.status(200).json(vacancies);

  } catch (error) {
    console.error("Error fetching vacancies:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getVacancy = async (req, res) => {
  try {
    const vacancyId = req.params.id; // Vacancy ID from the URL params
    const vacancy = await Vacancy.findById(vacancyId);

    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found." });
    }

    res.status(200).json(vacancy);

  } catch (error) {
    console.error("Error fetching vacancy:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const vacancyId = req.params.id;

    const deletedVacancy = await Vacancy.findByIdAndDelete(vacancyId);

    if (!deletedVacancy) {
      return res.status(404).json({ message: "Vacancy not found." });
    }

    res.status(200).json({ message: "Vacancy deleted successfully." });

  } catch (error) {
    console.error("Error deleting vacancy:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateVacancy = async (req, res) => {
  try {
    const vacancyId = req.params.id; // Vacancy ID from the URL params
    const updateData = req.body; // The data to update

    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      vacancyId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedVacancy) {
      return res.status(404).json({ message: "Vacancy not found." });
    }

    res.status(200).json({
      message: "Vacancy updated successfully.",
      vacancy: updatedVacancy,
    });

  } catch (error) {
    console.error("Error updating vacancy:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all vacancies posted by a specific alumni
const getVacanciesByAlumni = async (req, res) => {
  try {
    const alumniId = req.params.alumni_id; // Alumni ID from the URL params
    const vacancies = await Vacancy.find({ alumni_id: alumniId });

    if (!vacancies || vacancies.length === 0) {
      return res.status(404).json({ message: "No Vacancies found for this alumni." });
    }

    res.status(200).json(vacancies);

  } catch (error) {
    console.error("Error fetching vacancies by alumni:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// Change Vacancy Status
const changeVacancyStatus = async (req, res) => {
  try {
    const vacancyId = req.params.id;
    const { status } = req.body;

    const validStatuses = ['open', 'closed', 'pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      vacancyId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedVacancy) {
      return res.status(404).json({ message: 'Vacancy not found.' });
    }

    res.status(200).json({ message: 'Vacancy status updated.', vacancy: updatedVacancy });
  } catch (error) {
    console.error('Error updating vacancy status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Add Enrolled Student to Vacancy
const enrollStudentInVacancy = async (req, res) => {
  try {
    const vacancyId = req.params.id;
    const { studentId } = req.body;

    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      vacancyId,
      {
        $addToSet: { enrolled_students: studentId},
      },
      { new: true }
    );

    if (!updatedVacancy) {
      return res.status(404).json({ message: 'Vacancy not found.' });
    }

    res.status(200).json({ message: 'Student enrolled successfully.', vacancy: updatedVacancy });
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get All Enrolled Vacancies for a Student
const getEnrolledVacanciesForStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const enrolledVacancies = await Vacancy.find({ enrolled_students: studentId });

    res.status(200).json({ vacancies: enrolledVacancies });
  } catch (error) {
    console.error('Error fetching enrolled vacancies:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Add Recommended Students to Vacancy
const addRecommendedStudents = async (req, res) => {
  try {
    const vacancyId = req.params.id;
    const { studentIds } = req.body;

    // Ensure studentIds is an array and contains valid ObjectId values
    if (!Array.isArray(studentIds)) {
      return res.status(400).json({ message: 'studentIds must be an array.' });
    }

    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      vacancyId,
      {
        $addToSet: { recommended_students: { $each: studentIds } },
      },
      { new: true }
    );

    if (!updatedVacancy) {
      return res.status(404).json({ message: 'Vacancy not found.' });
    }

    res.status(200).json({
      message: 'Recommended students added successfully.',
      vacancy: updatedVacancy,
    });
  } catch (error) {
    console.error('Error adding recommended students:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

//get recommended vacancy with detailed students
const getVacancyWithRecommendedStudents = async (req, res) => {
  try {
    const vacancyId = req.params.id;

    const vacancy = await Vacancy.findById(vacancyId).populate('recommended_students');

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found.' });
    }

    res.status(200).json(vacancy);
  } catch (error) {
    console.error('Error fetching vacancy with recommended students:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};



module.exports = {
  addVacancy,
  getAllVacancies,
  getVacancy,
  deleteVacancy,
  updateVacancy,
  getVacanciesByAlumni,
  changeVacancyStatus,
  getEnrolledVacanciesForStudent,
  enrollStudentInVacancy,
  addRecommendedStudents,
  getVacancyWithRecommendedStudents

};

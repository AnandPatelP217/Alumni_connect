const express = require('express');
const vacancyController = require('../controllers/vacancy-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const Roles = require("../enums/roles");

const router = express.Router();

router.route('/addVacancy').post(authMiddleware([Roles.ADMIN,Roles.ALUMNI]), vacancyController.addVacancy);
router.route('/getAllVacancies').get(authMiddleware([Roles.ADMIN]), vacancyController.getAllVacancies);
router.route('/getVacancy/:id').get(authMiddleware([Roles.ADMIN]), vacancyController.getVacancy);
router.route('/getVacanciesByAlumni/:alumni_id').get(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),vacancyController.getVacanciesByAlumni);
router.route('/deleteVacancy/:id').delete(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),vacancyController.deleteVacancy);
router.route('/updateVacancy/:id').patch(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),vacancyController.updateVacancy);

router.put('/status/:id', authMiddleware([Roles.ADMIN, Roles.ALUMNI]) ,vacancyController.changeVacancyStatus);
router.put('/enroll/:id', authMiddleware([Roles.ADMIN, Roles.ALUMNI]), vacancyController.enrollStudentInVacancy);
router.get('/student/:id', authMiddleware([Roles.ADMIN, Roles.ALUMNI, Roles.STUDENT]), vacancyController.getEnrolledVacanciesForStudent);

// Add recommended students to a vacancy
router.post('/:id/recommended-students',authMiddleware([Roles.ADMIN]), vacancyController.addRecommendedStudents);

// Get a vacancy with recommended students
router.get('/:id/recommended-students',authMiddleware([Roles.ADMIN, Roles.ALUMNI]), vacancyController.getVacancyWithRecommendedStudents);

module.exports = router;

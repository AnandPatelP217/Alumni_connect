const express = require('express');
const studentController = require('../controllers/student-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const Roles = require("../enums/roles");

const router = express.Router();

router.route('/addStudent').post(authMiddleware([Roles.ADMIN]),studentController.addStudent);
router.route('/getStudent').get(authMiddleware([Roles.ADMIN]),studentController.getAllStudentes);
router.route('/getStudentById/:id').get(authMiddleware([Roles.ADMIN, Roles.STUDENT]),studentController.getStudent);
router.route('/deleteStudentById/:id').delete(authMiddleware([Roles.ADMIN]),studentController.deleteStudent);
router.route('/updateStudentById/:id').patch(authMiddleware([Roles.ADMIN, Roles.STUDENT]),studentController.updateStudent);

module.exports = router;

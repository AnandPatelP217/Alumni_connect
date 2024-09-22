const express = require('express');
const adminController = require('../controllers/admin-controllers');
const authMiddleware = require('../middlewares/auth-middleware');

const Roles = require("../enums/roles");

const router = express.Router();

router.route('/getAllStudent').get(authMiddleware([Roles.ADMIN]),adminController.getAllStudents);  
router.route('/getAllAlumni').get(authMiddleware([Roles.ADMIN]),adminController.getAllAlumnis);  
//for adding student and alumni we are redirecting to the student-end point and alumni-end point respectively

module.exports = router;

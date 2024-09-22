const express = require('express');
const alumniController = require('../controllers/alumni-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const Roles = require("../enums/roles");

const router = express.Router();

router.route('/addAlumni').post(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),alumniController.addAlumni);
router.route('/getAllAlumni').get(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),alumniController.getAllAlumni);
router.route('/getAlumniById/:id').get(authMiddleware([Roles.ADMIN,Roles.ALUMNI]),alumniController.getAlumniById);
router.route('/deleteAlumniById/:id').delete(authMiddleware([Roles.ADMIN,Roles.ALUMNI]),alumniController.deleteAlumniById);
router.route('/updateAlumniById/:id').patch(authMiddleware([Roles.ADMIN,Roles.ALUMNI]),alumniController.updateAlumniById);
module.exports = router;

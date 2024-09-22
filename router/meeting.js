const express = require('express');
const meetingController = require('../controllers/meeting-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const Roles = require("../enums/roles");

const router = express.Router();

router.route('/addMeeting').post(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),meetingController.addMeeting);
router.route('/getAllMeeting').get(authMiddleware([Roles.ADMIN,Roles.ALUMNI, Roles.STUDENT]),meetingController.getAllMeetings);
router.route('/getMeeting/:id').get(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),meetingController.getMeeting);
router.route('/getMeetingsByAlumni/:alumni_id').get(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),meetingController.getMeetingsByAlumni);
router.route('/deleteMeetingById/:id').delete(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),meetingController.deleteMeeting);
router.route('/updateMeetingById/:id').patch(authMiddleware([Roles.ADMIN, Roles.ALUMNI]),meetingController.updateMeeting);
router.route('/voteMeeting/:id').post(authMiddleware([Roles.STUDENT]), meetingController.voteMeeting);


module.exports = router;

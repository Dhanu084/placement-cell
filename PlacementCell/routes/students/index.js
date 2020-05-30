const express = require('express');
const router = express.Router();
const studentsController = require('../../controllers/studentsController');
const passport = require('passport');

router.get('/view-students', studentsController.viewStudents);
router.post('/view-students', studentsController.viewStudents);
router.post('/create-student', studentsController.createStudent);
module.exports = router;

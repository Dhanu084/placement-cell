const express = require('express');
const router = express.Router();
const InterviewController = require('../../controllers/interviewController');
const passport = require('passport');

router.get('/get-interviews', InterviewController.getInterviews);
router.post('/create-interview', InterviewController.createInterview);
router.get('/single-interview/:id', InterviewController.singleInterview);
router.get('/assignInterview', InterviewController.assignInterview);
router.get('/changeResult', InterviewController.changeResult);
router.get('/downloadCSV', InterviewController.downloadCSV);

module.exports = router;

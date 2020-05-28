const express = require('express');
const router = express.Router();
const InterviewController = require('../../controllers/interviewController');

router.get('/get-interviews', InterviewController.getInterviews);
router.post('/create-interview', InterviewController.createInterview);
router.get('/single-interview/:id', InterviewController.singleInterview);
module.exports = router;

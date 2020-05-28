const mongoose = require('mongoose');

const interviewScheduleSchema = new mongoose.Schema(
  {
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    result: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const InterviewSchedule = mongoose.model(
  'InterviewSchedule',
  interviewScheduleSchema
);
module.exports = InterviewSchedule;

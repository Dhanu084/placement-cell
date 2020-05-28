const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    placed: {
      type: Boolean,
    },
    courses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    interview_schdule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InterviewSchedule',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;

const mongoose = require('mongoose');
const InterviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
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

const Interview = mongoose.model('Interview', InterviewSchema);
module.exports = Interview;

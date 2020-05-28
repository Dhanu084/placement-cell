const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    dsa: {
      type: Number,
    },
    webd: {
      type: Number,
    },
    react: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

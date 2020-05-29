const Student = require('../models/students');
const Course = require('../models/Courses');
const Interview = require('../models/Interviews');
const InterviewSchedule = require('../models/InterviewSchedule');

module.exports.viewStudents = async function (req, res) {
  console.log(req.query.id);
  try {
    let batch = '';
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      batch = 'Oct 2019';
    } else {
      batch = req.body.batch;
    }
    let students = await Student.find({ batch: batch }).populate('courses');

    if (Object.keys(req.query).length !== 0) {
      let interview = await Interview.findById(req.query.id);
      let schedules = await InterviewSchedule.find({ interview: interview.id })
        .populate('interview')
        .populate('student');
      console.log(schedules);
      res.render('singleInterview.ejs', {
        title: 'Interview page',
        students: students,
        interview,
        schedules,
      });
    } else {
      return res.render('viewStudents.ejs', {
        title: 'students',
        students: students,
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
};

module.exports.createStudent = async function (req, res) {
  try {
    let course = await Course.create({
      dsa: req.body.dsa,
      webd: req.body.webd,
      react: req.body.react,
    });
    await Student.create({
      name: req.body.name,
      batch: req.body.batch,
      courses: course,
    });

    res.redirect('back');
  } catch (err) {
    res.redirect('back');
  }
};

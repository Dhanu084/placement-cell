const Student = require('../models/students');
const Course = require('../models/Courses');

module.exports.viewStudents = async function (req, res) {
  try {
    let batch = '';
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      batch = 'Oct 2019';
    } else {
      batch = req.body.batch;
    }
    let students = await Student.find({ batch: batch }).populate('courses');
    return res.render('viewStudents.ejs', {
      title: 'students',
      students: students,
    });
  } catch (err) {
    console.log(err);
    return;
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

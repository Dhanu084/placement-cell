const Interview = require('../models/Interviews');
const Student = require('../models/students');
const InterviewSchedule = require('../models/InterviewSchedule');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const json2csv = require('json2csv').parse;
const stringify = require('csv-stringify');

module.exports.getInterviews = async function (req, res) {
  try {
    let interviews = await Interview.find({});
    return res.render('interviews.ejs', {
      interviews: interviews,
    });
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
};

module.exports.createInterview = async function (req, res) {
  try {
    let d = new Date().getTime();
    let d1 = new Date(req.body.date).getTime();
    if (d < d1) {
      await Interview.create(req.body);
    }
    res.redirect('back');
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
};

module.exports.singleInterview = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id);
    let students = await Student.find({}).populate('courses');
    let schedules = await InterviewSchedule.find({ interview: interview.id })
      .populate('interview')
      .populate('student');
    res.render('singleInterview.ejs', {
      interview: interview,
      students,
      schedules,
    });
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
};

module.exports.assignInterview = async function (req, res) {
  try {
    let newAssignment = await InterviewSchedule.create({
      interview: req.query.interviewId,
      student: req.query.studentId,
    });
    let student = await Student.findById(req.query.studentId);
    let interview = await Interview.findById(req.query.interviewId);
    student.interview_schdule.push(newAssignment);
    student.save();
    interview.interview_schdule.push(newAssignment);
    interview.save();
    //console.log('new Assignmnent', newAssignment);
    res.redirect('back');
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
};

module.exports.changeResult = async function (req, res) {
  try {
    let interview = await InterviewSchedule.findById(req.query.scheduleId);
    if (interview.placed == null || interview.placed == false) {
      interview.placed = true;
    } else {
      interview.placed = false;
    }
    interview.save();
    //console.log(interview);
    res.redirect('back');
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
};

module.exports.downloadCSV = async function (req, res) {
  try {
    console.log(path);
    const csvWriter = createCsvWriter({
      path: path.join(__dirname, '../files/tempfile.csv'),
      header: [
        { id: 'name', title: 'name' },
        { id: 'batch', title: 'batch' },
        { id: 'dsa', title: 'dsa' },
        { id: 'webd', title: 'webd' },
        { id: 'react', title: 'react' },
        { id: 'company', title: 'company' },
        { id: 'status', title: 'status' },
      ],
    });
    let fields = [
      { id: 'name', title: 'name' },
      { id: 'batch', title: 'batch' },
      { id: 'dsa', title: 'dsa' },
      { id: 'webd', title: 'webd' },
      { id: 'react', title: 'react' },
      { id: 'company', title: 'company' },
      { id: 'status', title: 'status' },
    ];
    let students = await Student.find({})
      .populate({
        path: 'interview_schdule',
        populate: {
          path: 'interview',
        },
      })
      .populate('courses');
    let records = [];
    for (student of students) {
      let record = {
        name: student.name,
        batch: student.batch,
        dsa: student.courses.dsa,
        webd: student.courses.webd,
        react: student.courses.react,
      };
      company = [];
      status = [];
      for (let i = 0; i < student.interview_schdule.length; i++) {
        company.push(student.interview_schdule[i].interview.company);
        status.push(
          student.interview_schdule[i].placed == true ? 'placed' : 'not placed'
        );
      }
      console.log(company);
      record = {
        ...record,
        company,
        status,
      };
      records.push(record);
    }

    console.log(
      '--------------------------------------------------------------------------'
    );
    // console.log(students);
    // console.log(records);
    //await csvWriter.writeRecords(records);
    // json2csv({ data: records, fields: fields }, function (err, csv) {
    //   if (err) console.log(err);
    //   res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    //   res.set('Content-Type', 'text/csv');
    //   res.status(200).send(csv);
    // });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="' + 'download-' + Date.now() + '.csv"'
    );
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

    stringify(records, { header: true }).pipe(res);
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
};

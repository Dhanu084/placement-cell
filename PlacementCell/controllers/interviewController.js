const Interview = require('../models/Interviews');

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
    res.render('singleInterview.ejs', {
      interview: interview,
    });
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
};

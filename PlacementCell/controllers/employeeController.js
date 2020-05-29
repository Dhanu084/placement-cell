const Employee = require('../models/employee');

module.exports.login = async function (req, res) {
  res.render('login.ejs', {
    title: 'login',
  });
};

module.exports.createSession = function (req, res) {
  res.redirect('/students/view-students');
};

module.exports.signup = function (req, res) {
  res.render('signup.ejs', {
    title: 'signup',
  });
};

module.exports.createEmployee = async function (req, res) {
  try {
    await Employee.create(req.body);
    res.redirect('/employee/login');
  } catch (err) {
    res.redirect('back');
  }
};

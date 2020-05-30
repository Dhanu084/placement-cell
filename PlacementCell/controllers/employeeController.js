const Employee = require('../models/employee');

module.exports.login = async function (req, res) {
  res.render('login.ejs', {
    title: 'login',
  });
};

module.exports.createSession = function (req, res) {
  res.redirect('/');
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

module.exports.logout = (req, res) => {
  req.logout();
  res.status(200).clearCookie('placement', {
    path: '/',
  });
  req.session.destroy(function (err) {
    res.redirect('/');
  });
};

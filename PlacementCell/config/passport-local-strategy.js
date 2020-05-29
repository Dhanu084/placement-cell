const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      Employee.findOne({ email: email }, function (err, employee) {
        if (err) {
          console.log(err, passport);
          return done(err);
        }
        if (!employee || employee.password != password) {
          return done(null, false);
        }

        return done(null, employee);
      });
    }
  )
);

passport.serializeUser(function (employee, done) {
  done(null, employee.id);
});

passport.deserializeUser(function (id, done) {
  Employee.findById(id, function (err, employee) {
    if (err) {
      console.log(err);
      return done(err);
    }
    return done(null, employee);
  });
});
module.exports = passport;

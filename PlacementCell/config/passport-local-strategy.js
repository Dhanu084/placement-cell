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
          console.log(err, 'passport');
          return done(err);
        }
        //console.log(employee);
        if (!employee || employee.password !== password) {
          //console.log('calling');
          return done(null, false);
        }

        return done(null, employee);
      });
    }
  )
);

passport.serializeUser(function (employee, done) {
  return done(null, employee.id);
});

passport.deserializeUser(function (id, done) {
  Employee.findById(id, function (err, employee) {
    if (err) {
      console.log(err);
      return done(err);
    }
    //console.log(employee);
    return done(null, employee);
  });
});
module.exports = passport;

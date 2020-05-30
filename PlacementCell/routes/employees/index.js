const express = require('express');
const router = express.Router();
const passport = require('passport');
const employeeController = require('../../controllers/employeeController');

router.get('/login', employeeController.login);
router.post(
  '/createSession',
  passport.authenticate('local', { failureRedirect: '/employee/login' }),
  employeeController.createSession
);
router.get('/signup', employeeController.signup);
router.post('/createEmployee', employeeController.createEmployee);
router.get('/logout', employeeController.logout);
module.exports = router;

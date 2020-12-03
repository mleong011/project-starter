const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const { User } = db;

router.put('/dashboard', passport.isAuthenticated(), (req, res) => {
    const { email } = req.params;
    User.findByPk(email)
      .then(emailres => {
        if(!emailres) {
          return res.sendStatus(404);
        }
  
        email.accessToken = req.body.accessToken;
        email.save()
          .then(emailb => {
            res.json(emailb);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      });
  });

module.exports = router;
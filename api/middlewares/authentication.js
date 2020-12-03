
const bcrypt = require('bcryptjs');
const passport = require('passport');
//const passportGoogle = require('passport-google-oauth');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models').User;
const keys= require('./keys');
const router = require('express').Router();

//const GoogleStrategy = passportGoogle.OAuth2Strategy
// function passwordsMatch(submittedPassword, storedPasswordHash) {
//   return bcrypt.compareSync(submittedPassword, storedPasswordHash);
// }

passport.use(
  new GoogleStrategy({
    //options for google strategy
    callbackURL: 'auth/google/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done)=>{
    console.log("access token", accessToken)
    console.log("refresh token", refreshToken)
    console.log("profile", profile)
    console.log("done", done)
    //passport callback function

    // passport callback function
      //check if user already exists in our db with the given profile ID
      User.findOne({email: profile.email})
      .then((currentUser)=>{
        if(currentUser){
          //if we already have a record with the given profile ID
          done(null, currentUser);
        } else{
             //if not, create a new user 
            new User({
              email: profile.email,
            }).save().then((newUser) =>{
              done(null, newUser);
            });
          }
        })
  })
);



//after user logs in we save info in a cookie. done expects the user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//future connections
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        done(null, false); //user does not exist
        return;
      }

      done(null, user);
      return;
    })
    .catch(err => done(err, null));
});

// Use this protect api routes that require a user to be logged in.
passport.isAuthenticated = () => 
  (req, res, next) => (req.user ? next() : res.sendStatus(401));


module.exports = passport;


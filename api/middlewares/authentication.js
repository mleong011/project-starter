const passport = require('passport');
//const passportGoogle = require('passport-google-oauth');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models').User;
const keys= require('./keys');
const router = require('express').Router();
const fs = require('fs');


passport.use(
  new GoogleStrategy({
    //options for google strategy
    callbackURL: 'auth/google/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, otherTokenDetails, user, done)=>{
    //in here you can access all token details to given API scope
        //and i have created file from that details
    let tokens = {
      access_token: accessToken,
      refresh_token: refreshToken,
      scope: otherTokenDetails.scope,
      token_type: otherTokenDetails.token_type,
      expiry_date:otherTokenDetails.expires_in
  };
  let data = JSON.stringify(tokens);
  fs.writeFileSync('./tokens.json', data);

    // passport callback function
      //check if user already exists in our db with the given profile ID
      User.findOne({where: {email: user.email}})
      .then((currentUser)=>{
        if(currentUser){
          //if we already have a record with the given profile ID
          done(null, currentUser);
        } else{
             //if not, create a new user 
            new User({
              email: user.email,
            }).save().then((newUser) =>{
              done(null, newUser);
            });
          }
        })
  })
);



//after user logs in we save info in a cookie. done expects the user id
passport.serializeUser((user, done) => {
  done(null, user.email);
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


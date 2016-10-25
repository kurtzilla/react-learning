const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local Strategy
const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // verify username and password
  User.findOne({ email: email}, function(err, user){
    if(err) { return done(err); }
    if(!user) { return done(null, false); }

    //compare pwds
    user.comparePassword(password, function(err, isMatch){
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }

      return done(null, user);
    })

  })

});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
// payload is decoded jwt payload
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if user ID in the payload exists in db
  // if it does call done with the user
  // otherwise, return done without a user object
  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });

});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

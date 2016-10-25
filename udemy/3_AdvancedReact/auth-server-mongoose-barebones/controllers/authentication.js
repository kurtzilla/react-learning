const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config.js');

function tokenForUser(user){
  // In jwt land...
  // sub = subject
  // iat = issued at time
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
  // User has already had their credentials checked by passport
  // we just need to give them a token
  // * passport assigns user to request
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next){
  // Pull data out of req object
  const email = req.body.email;
  const password = req.body.password;

  // TODO flesh out validation
  if(!email || !password){
    return res.status(422).send({ error: 'Email and Password are required' });
  }

  // See if a user with the given email exists
  User.findOne({email: email}, function(err, existingUser){
    if(err) { return next(err); }

    // If a user does exist, return error
    if(existingUser){
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If new user - create and save
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if(err) { return next(err); }

      // Respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  })
}

const
  JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { User } = require('../models');
const { secretOrKey } = require('./private');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (jwtpayload, done) => {
    const user = await User.findByPk(jwtpayload.id);
    if (!user) return done(null, false);

    return done(null, user);
  }));
};

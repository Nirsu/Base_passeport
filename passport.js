const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;
const SlackStrategy = require('passport-slack').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: " ", // put your Github client ID
    clientSecret: " ", // put your Github client secret
    callbackURL: "http://localhost:8000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    return done(null, profile);
    }
));

passport.use(new GitLabStrategy({
  clientID: " ", // put your GitLab client id
  clientSecret: " ", // put your GitLab client secret
  callbackURL: "http://localhost:8000/auth/gitlab/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log('GitLab accessToken: ' , accessToken)
  // console.log('GitLab profile: ' , profile)
  // console.log('GitLab cb: ' , cb)
  User.findOrCreate({gitlabId: profile.id}, function (err, user) {
    return cb(err, user);
  });
}
));

passport.use(new SlackStrategy({
  clientID: " ", // put your Slack client id
  clientSecret: " " // // put your GitLab client secret
}, function (accessToken, refreshToken, profile, done) {
  console.log('Slack accessToken: ' , accessToken)
  console.log('Slack refreshToken: ' , refreshToken)
  console.log('Slack Profil', profile)
  // optionally persist profile data
  done(null, profile);
}
));
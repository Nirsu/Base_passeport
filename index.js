const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport');
require('./passport')
const isLoggedIn = require('./Middleware/auth')

app.use(cookieSession({
  name: 'facebook-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/',isLoggedIn,(req,res)=>{
  res.send(`Hello world ${req.user.displayName}`)
})
app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/github',passport.authenticate('github',{ scope: [ 'user:email' ] }));
app.get('/auth/github/callback',passport.authenticate('github', { failureRedirect: '/auth/error' } ),
function(req, res) {
   console.log("LALA");

});

app.get('/auth/gitlab', passport.authenticate('gitlab', {scope: ['api']}));
app.get('/auth/gitlab/callback', passport.authenticate('gitlab', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

app.get('/auth/slack', passport.authorize('slack'));
app.get('/auth/slack/callback', passport.authorize('slack', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
app.listen(8000,()=>{
  console.log('Serve is up and running at the port 8000')
})
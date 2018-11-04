const express = require('express');
const router = express.Router();

const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const uuid = require('uuid');
const msgraph = require('./graphHelper');
const creds = require('../utils/config')

const callback = (iss, sub, profile, accessToken, refreshToken, done) => {
  done(null, {
    profile,
    accessToken,
    refreshToken
  });
};

passport.use(new OIDCStrategy(creds, callback));

const users = {};
passport.serializeUser((user, done) => {
  const id = uuid.v4();
  users[id] = user;
  done(null, id);
});
passport.deserializeUser((id, done) => {
  const user = users[id];
  done(null, user);
});

//
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/msgraph/token')
  } else {
      res.redirect('/')
  }
});

router.get('/users', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/msgraph/token');
  } else {
      //get all users
      msgraph.getUsers(req.session.token, function(err, result){
          console.log(result.body)
          res.send(result.body.value)
      })
  }
});
router.post('/resetpassword', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/msgraph/token');
  } else {
    // set password
    msgraph.setPassword(req.session.token, req.body.id, req.body.newpassword, function(err, result){
      console.log(result.body)
      result.body.error ? res.send(result.body.error.message) : res.send("SUCCESS");

    })
  }
});

//GET request on /msgraph
router.get('/token',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      //Do something here since you have the token now
      req.session.token = req.user.accessToken;
      res.redirect('/')

    }
);

router.get('/disconnect',
    (req, res) => {
      //Destroy the session
      req.session.destroy(() => {
        req.logOut();
        res.clearCookie('graphNodeCookie');
        res.redirect('/')
      });

    }
);

//Destroy the session / token since the job is done


// helpers
function hasAccessTokenExpired(e) {
  let expired;
  if (!e.innerError) {
    expired = false;
  } else {
    expired = e.forbidden &&
      e.message === 'InvalidAuthenticationToken' &&
      e.response.error.message === 'Access token has expired.';
  }
  return expired;
}

/**
 *
 * @param {*} e
 * @param {*} res
 */
function renderError(e, res) {
  e.innerError = (e.response) ? e.response.text : '';
  res.render('error', {
    error: e
  });
}

module.exports = router

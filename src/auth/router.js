'use strict';

/**
 * Authentication Router
 * @module src/auth/router 
 */

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');

/**
 * Sign-up route for adding new user to database
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user
    .save()
    .then((user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

/**
 * Sign-in route
 */
authRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

/**
 * OAuth route using Google
 */
authRouter.get('/oauth', (req, res, next) => {
  oauth
    .authorize(req)
    .then((token) => {
      res.status(200).send(token);
    })
    .catch(next);
});

/**
 * Route for getting non-expiring access key
 */
authRouter.post('/key', auth, (req, res, next) => {
  let key = req.user.generateKey();
  res.status(200).send(key);
});

// ------------------------------------------------------------------------------
// Dummy Routes
// ------------------------------------------------------------------------------
authRouter.get('/public-stuff', (req, res, next) => {
  res.status(200).send('public-stuff');
});

authRouter.get('/hidden-stuff', auth(), (req, res, next) => {
  res.status(200).send('hidden-stuff');
});

authRouter.get('/something-to-read', auth('read'), (req, res, next) => {
  res.status(200).send('something to read');
});

authRouter.post('/create-a-thing', auth('create'), (req, res, next) => {
  res.status(200).send('create a thing');
});

authRouter.put('/update', auth('update'), (req, res, next) => {
  res.status(200).send('update');
});

authRouter.patch('/jp', auth('update'), (req, res, next) => {
  res.status(200).send('jp');
});

authRouter.delete('/bye-bye', auth('delete'), (req, res, next) => {
  res.status(200).send('byebye');
});

authRouter.get('/everything', auth('superuser'), (req, res, next) => {
  res.status(200).send('everything');
});
// ------------------------------------------------------------------------------

module.exports = authRouter;

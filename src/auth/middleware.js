'use strict';

/**
 * Authentication Middleware
 * Authenticates user credentials/token
 * @module src/auth/middleware
 */

const User = require('./users-model.js');

module.exports = (capability) => {
  
  return (req, res, next) => {

    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);
      
      switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString);
      case 'bearer':
        return _authBearer(authString);
      default:
        return _authError();
      }
    } catch (e) {
      _authError();
    }

    /**
     * Authenticates user's Basic token 
     * @function _authBasic
     * 
     * @param {string} str 
     * @returns {Promise|Function}
     */
    function _authBasic(str) {
    // str: am9objpqb2hubnk=
      let base64Buffer = Buffer.from(str, 'base64'); // <Buffer 01 02 ...>
      let bufferString = base64Buffer.toString();    // john:mysecret
      let [username, password] = bufferString.split(':'); // john='john'; mysecret='mysecret']
      let auth = {username, password}; // { username:'john', password:'mysecret' }

      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    /**
     * Authenticates user's Bearer token
     * @function _authBearer
     * @param {string} authString 
     * @returns {Promise|Function}
     */
    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    /**
     * Checks if user has access and attaches token to request object
     * @function _authenticate
     * @param {Object} user 
     * @returns {Promise|Function}
     */
    function _authenticate(user) {
      if ( user && (!capability || (user.can(capability))) ) {
        req.user = user;
        req.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }

    /**
     * Error handler that calls express 'next' with invalid user id/password string
     * @function _authError
     */
    function _authError() {
      next('Invalid User ID/Password');
    }
  };
};
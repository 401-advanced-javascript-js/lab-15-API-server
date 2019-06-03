'use strict';

/**
 * 500 Middleware
 * @module middleware/500
 */

/**
 * Exports error handler for server errors, adds status of 500 and 
 * json formated data to response object
 * 
 * @param {Object} err error object, with information about error
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next middleware to run
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.status(500).json(error).end();
};

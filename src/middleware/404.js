'use strict';

/**
 * 404 Middleware
 * @module middleware/404
 */

/**
 * Exports an error handler for not found errors, adds status code and json formated error to response object
 * 
 * @param {Object} req request object with .model
 * @param {Object} res response object
 * @param {Function} next next middleware to run
 */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};

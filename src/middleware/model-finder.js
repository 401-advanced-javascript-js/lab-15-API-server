'use strict';

/**
 * Model-Finder Middleware
 * @module middleware/model-finder
 */

/**
 * Takes in a request object with a model parameter and returns instance for that model
 * 
 * @param {Object} req request object with .params.model
 * @param {Object} res response object
 * @param {Function} next next middleware to run
 */
module.exports = (req,res,next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  req.model = require(`../models/${modelName}/${modelName}-model.js`);
  next();
};
